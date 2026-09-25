import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "Missing user id." }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("kyc_doc_id_path, kyc_doc_selfie_path")
    .eq("id", userId)
    .maybeSingle();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Could not find this user's documents." }, { status: 404 });
  }

  const urls = {};

  if (profile.kyc_doc_id_path) {
    const { data: idSigned } = await supabaseAdmin.storage
      .from("kyc-documents")
      .createSignedUrl(profile.kyc_doc_id_path, 300);
    urls.idUrl = idSigned?.signedUrl || null;
  }

  if (profile.kyc_doc_selfie_path) {
    const { data: selfieSigned } = await supabaseAdmin.storage
      .from("kyc-documents")
      .createSignedUrl(profile.kyc_doc_selfie_path, 300);
    urls.selfieUrl = selfieSigned?.signedUrl || null;
  }

  if (!urls.idUrl && !urls.selfieUrl) {
    return NextResponse.json({ error: "This user hasn't uploaded any documents yet." }, { status: 404 });
  }

  return NextResponse.json(urls);
}
