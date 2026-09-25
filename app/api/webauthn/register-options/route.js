import { NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { uuidToBytes, getOriginAndRpID } from "../../../lib/webauthnServer";

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
  const { rpID } = getOriginAndRpID(req);

  const { data: existingCreds } = await supabaseAdmin
    .from("webauthn_credentials")
    .select("credential_id")
    .eq("user_id", user.id);

  const options = await generateRegistrationOptions({
    rpName: "Vexo",
    rpID,
    userName: user.email,
    userID: uuidToBytes(user.id),
    attestationType: "none",
    excludeCredentials: (existingCreds || []).map((c) => ({ id: c.credential_id })),
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "preferred",
    },
  });

  await supabaseAdmin
    .from("webauthn_register_challenges")
    .upsert({ user_id: user.id, challenge: options.challenge });

  return NextResponse.json(options);
}
