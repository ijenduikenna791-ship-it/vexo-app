import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

const ALLOWED_TABLES = ["transactions", "notifications", "deposits", "withdrawals"];

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { table, action, data, match } = body;

  if (!table || !ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: "Table not allowed." }, { status: 400 });
  }
  if (!action || (action !== "insert" && action !== "update")) {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Missing data." }, { status: 400 });
  }

  if (action === "insert") {
    const { error } = await supabaseAdmin.from(table).insert(data);
    if (error) {
      return NextResponse.json({ error: "Insert failed." }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  }

  if (action === "update") {
    if (!match || !match.column || match.value === undefined) {
      return NextResponse.json({ error: "Missing match for update." }, { status: 400 });
    }
    const { error } = await supabaseAdmin.from(table).update(data).eq(match.column, match.value);
    if (error) {
      return NextResponse.json({ error: "Update failed." }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unhandled action." }, { status: 400 });
}