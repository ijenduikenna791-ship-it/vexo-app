import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyPassword } from "../../../lib/passwordHash";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const { data: admin } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .ilike("email", email)
    .maybeSingle();

  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  return NextResponse.json({
    admin: { id: admin.id, email: admin.email, displayName: admin.display_name },
  });
}
