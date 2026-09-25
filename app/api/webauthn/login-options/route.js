import { NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { getOriginAndRpID } from "../../../lib/webauthnServer";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const { rpID } = getOriginAndRpID(req);

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
  });

  const { data: row } = await supabaseAdmin
    .from("webauthn_login_challenges")
    .insert({ challenge: options.challenge })
    .select()
    .single();

  return NextResponse.json({ options, sessionId: row.session_id });
}
