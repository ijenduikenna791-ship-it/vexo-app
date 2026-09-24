const fs = require('fs');
const target = 'app/signup/page.js';
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
  'import { useState } from "react";',
  'import { useState, useEffect } from "react";',
  'react import'
);

replaceOnce(
  'export default function Signup() {\n  const router = useRouter();\n  const [step, setStep] = useState(1);',
  'export default function Signup() {\n  const router = useRouter();\n  const [step, setStep] = useState(1);\n  const [referralCode, setReferralCode] = useState("");',
  'referralCode state'
);

replaceOnce(
  '  const [error, setError] = useState("");\n\n  const progress = step === 1 ? 50 : 100;',
  '  const [error, setError] = useState("");\n  const [info, setInfo] = useState("");\n  const [creating, setCreating] = useState(false);\n\n  useEffect(() => {\n    const params = new URLSearchParams(window.location.search);\n    const ref = params.get("ref");\n    if (ref) setReferralCode(ref);\n  }, []);\n\n  const progress = step === 1 ? 50 : 100;',
  'info/creating state + ref capture effect'
);

replaceOnce(
  '  const handleCreateAccount = (e) => {\n    e.preventDefault();\n    setError("");\n\n    if (form.password !== form.confirmPassword) {\n      setError("Passwords do not match.");\n      return;\n    }\n\n    const result = signup(form);\n    if (result.success) {\n      router.push("/dashboard");\n    } else {\n      setError(result.error);\n    }\n  };',
  '  const handleCreateAccount = async (e) => {\n    e.preventDefault();\n    setError("");\n    setInfo("");\n\n    if (form.password !== form.confirmPassword) {\n      setError("Passwords do not match.");\n      return;\n    }\n\n    setCreating(true);\n    const result = await signup({ ...form, referralCode });\n    setCreating(false);\n\n    if (result.success) {\n      if (result.needsConfirmation) {\n        setInfo("Account created! Check your email to confirm it, then sign in.");\n      } else {\n        router.push("/dashboard");\n      }\n    } else {\n      setError(result.error);\n    }\n  };',
  'handleCreateAccount async rewrite'
);

replaceOnce(
  '        {error && (\n          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">\n            {error}\n          </div>\n        )}',
  '        {error && (\n          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">\n            {error}\n          </div>\n        )}\n\n        {info && (\n          <div className="mt-6 bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">\n            {info}\n          </div>\n        )}\n\n        {referralCode && (\n          <div className="mt-6 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm text-vexo-muted">\n            Referral code applied: <span className="text-white font-semibold">{referralCode}</span>\n          </div>\n        )}',
  'info + referral note blocks'
);

replaceOnce(
  '            <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold">\n              Create Free Account\n            </button>',
  '            <button type="submit" disabled={creating} className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60">\n              {creating ? "Creating account..." : "Create Free Account"}\n            </button>',
  'submit button loading state'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
