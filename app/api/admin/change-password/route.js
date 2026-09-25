import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { hashPassword, verifyPassword } from "../../../lib/passwordHash";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { adminId, currentPassword, newPassword } = body;

  if (!adminId || !currentPassword || !newPassword) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  const { data: admin } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("id", adminId)
    .maybeSingle();

  if (!admin || !verifyPassword(currentPassword, admin.password_hash)) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("admin_users")
    .update({ password_hash: hashPassword(newPassword) })
    .eq("id", admin.id);

  if (error) {
    return NextResponse.json({ error: "Could not update password." }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
