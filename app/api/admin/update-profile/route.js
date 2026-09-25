import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { adminId, email, displayName } = body;

  if (!adminId || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("admin_users")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (existing && existing.id !== adminId) {
    return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
  }

  const { data: updated, error } = await supabaseAdmin
    .from("admin_users")
    .update({ email, display_name: displayName || null })
    .eq("id", adminId)
    .select()
    .maybeSingle();

  if (error || !updated) {
    return NextResponse.json({ error: "Could not update profile." }, { status: 400 });
  }

  return NextResponse.json({
    admin: { id: updated.id, email: updated.email, displayName: updated.display_name },
  });
}
