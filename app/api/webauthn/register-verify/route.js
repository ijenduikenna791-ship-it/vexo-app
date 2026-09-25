import { NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { getOriginAndRpID } from "../../../lib/webauthnServer";

export async function POST(req) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const user = userData.user;

  const body = await req.json();
  const { response, deviceName } = body;

  const { data: challengeRow } = await supabaseAdmin
    .from("webauthn_register_challenges")
    .select("challenge")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!challengeRow) {
    return NextResponse.json({ error: "Registration expired. Please try again." }, { status: 400 });
  }

  const { origin, rpID } = getOriginAndRpID(req);

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (err) {
    return NextResponse.json({ error: "Could not verify device. Please try again." }, { status: 400 });
  }

  await supabaseAdmin.from("webauthn_register_challenges").delete().eq("user_id", user.id);

  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ error: "Could not verify device. Please try again." }, { status: 400 });
  }

  const { credential } = verification.registrationInfo;

  await supabaseAdmin.from("webauthn_credentials").insert({
    user_id: user.id,
    credential_id: credential.id,
    public_key: Buffer.from(credential.publicKey).toString("base64"),
    counter: credential.counter,
    device_name: deviceName || "This device",
  });

  return NextResponse.json({ success: true });
}
