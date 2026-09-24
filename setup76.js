const fs = require('fs');
const target = 'app/admin/users/[id]/page.js';
let content = fs.readFileSync(target, 'utf8');
let changed = 0;

function replaceOnce(oldStr, newStr, label) {
  if (content.indexOf(oldStr) === -1) {
    console.warn('Skipped (not found): ' + label);
    return;
  }
  content = content.replace(oldStr, newStr);
  changed++;
}

replaceOnce(
  '  async function notifyUser(userId, message, type) {\n    await supabase.from("notifications").insert({ user_id: userId, message, type: type || "info", read: false });\n  }',
  '  async function notifyUser(userId, message, type) {\n    await supabase.from("notifications").insert({ user_id: userId, message, type: type || "info", read: false });\n  }\n\n  async function maybePayReferralReward(referredProfile) {\n    if (!referredProfile || !referredProfile.referred_by || referredProfile.referral_reward_paid) return;\n\n    const { count: approvedCount } = await supabase\n      .from("deposits")\n      .select("id", { count: "exact", head: true })\n      .eq("user_id", referredProfile.id)\n      .eq("status", "Approved");\n\n    if ((approvedCount || 0) !== 1) return;\n\n    const REFERRAL_BONUS = 5;\n    const { data: referrerWallet } = await supabase\n      .from("wallets")\n      .select("*")\n      .eq("user_id", referredProfile.referred_by)\n      .eq("symbol", "USDT")\n      .maybeSingle();\n\n    if (referrerWallet) {\n      await supabase\n        .from("wallets")\n        .update({ amount: Number(referrerWallet.amount) + REFERRAL_BONUS })\n        .eq("id", referrerWallet.id);\n    } else {\n      await supabase.from("wallets").insert({ user_id: referredProfile.referred_by, symbol: "USDT", amount: REFERRAL_BONUS });\n    }\n\n    await supabase.from("transactions").insert({\n      user_id: referredProfile.referred_by,\n      type: "Referral bonus",\n      amount: REFERRAL_BONUS,\n      status: "Completed",\n    });\n\n    await supabase.from("profiles").update({ referral_reward_paid: true }).eq("id", referredProfile.id);\n\n    await notifyUser(referredProfile.referred_by, `You earned a $${REFERRAL_BONUS.toFixed(2)} referral bonus!`, "success");\n  }',
  'maybePayReferralReward function'
);

replaceOnce(
  '    await notifyUser(id, `Your deposit of ${d.amount} ${d.asset} was approved and credited.`, "success");\n\n    setDepositActionId(null);',
  '    await notifyUser(id, `Your deposit of ${d.amount} ${d.asset} was approved and credited.`, "success");\n    await maybePayReferralReward(user);\n\n    setDepositActionId(null);',
  'referral payout hook in approveDeposit'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
