import { NextResponse } from "next/server";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { bytesToUuid, getOriginAndRpID } from "../../../lib/webauthnServer";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { sessionId, response } = body;

  if (!sessionId || !response) {
    return NextResponse.json({ error: "Missing login data." }, { status: 400 });
  }

  const { data: challengeRow } = await supabaseAdmin
    .from("webauthn_login_challenges")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!challengeRow) {
    return NextResponse.json({ error: "Login expired. Please try again." }, { status: 400 });
  }
  await supabaseAdmin.from("webauthn_login_challenges").delete().eq("session_id", sessionId);

  const userHandle = response.response?.userHandle;
  if (!userHandle) {
    return NextResponse.json({ error: "This device isn't registered for biometric sign-in." }, { status: 400 });
  }

  const userId = bytesToUuid(Buffer.from(userHandle, "base64url"));

  const { data: credRow } = await supabaseAdmin
    .from("webauthn_credentials")
    .select("*")
    .eq("credential_id", response.id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!credRow) {
    return NextResponse.json({ error: "This device isn't registered for biometric sign-in." }, { status: 400 });
  }

  const { origin, rpID } = getOriginAndRpID(req);

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: credRow.credential_id,
        publicKey: Buffer.from(credRow.public_key, "base64"),
        counter: Number(credRow.counter),
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Could not verify. Please try again." }, { status: 400 });
  }

  if (!verification.verified) {
    return NextResponse.json({ error: "Could not verify. Please try again." }, { status: 400 });
  }

  await supabaseAdmin
    .from("webauthn_credentials")
    .update({ counter: verification.authenticationInfo.newCounter })
    .eq("id", credRow.id);

  const { data: authUserData, error: authUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (authUserError || !authUserData?.user?.email) {
    return NextResponse.json({ error: "Could not sign you in. Please try again." }, { status: 400 });
  }

  const email = authUserData.user.email;

  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (linkError || !linkData?.properties?.hashed_token) {
    return NextResponse.json({ error: "Could not sign you in. Please try again." }, { status: 400 });
  }

  return NextResponse.json({ email, tokenHash: linkData.properties.hashed_token });
}
