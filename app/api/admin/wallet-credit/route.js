import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export async function POST(req) {
  const supabaseAdmin = getSupabaseAdmin();
  const body = await req.json();
  const { userId, symbol, delta } = body;

  if (!userId || !symbol || typeof delta !== "number" || Number.isNaN(delta)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const { data: existingWallet } = await supabaseAdmin
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .eq("symbol", symbol)
    .maybeSingle();

  let newAmount;
  if (existingWallet) {
    newAmount = Number(existingWallet.amount) + delta;
    const { error } = await supabaseAdmin
      .from("wallets")
      .update({ amount: newAmount })
      .eq("id", existingWallet.id);
    if (error) {
      return NextResponse.json({ error: "Could not update balance." }, { status: 400 });
    }
  } else {
    newAmount = delta;
    const { error } = await supabaseAdmin
      .from("wallets")
      .insert({ user_id: userId, symbol, amount: newAmount });
    if (error) {
      return NextResponse.json({ error: "Could not update balance." }, { status: 400 });
    }
  }

  return NextResponse.json({ success: true, amount: newAmount });
}
