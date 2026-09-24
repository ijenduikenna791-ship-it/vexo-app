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
  '  const handleCreateAccount = async (e) => {\n    e.preventDefault();\n    setError("");\n\n    if (form.password !== form.confirmPassword) {',
  '  const handleCreateAccount = async (e) => {\n    e.preventDefault();\n    setError("");\n    setInfo("");\n\n    if (form.password !== form.confirmPassword) {',
  'clear info on submit'
);

replaceOnce(
  '    setLoading(true);\n    const result = await signup(form);\n    setLoading(false);\n\n    if (result.success) {\n      router.push("/dashboard");\n    } else {\n      setError(result.error);\n    }\n  };',
  '    setLoading(true);\n    const result = await signup({ ...form, referralCode });\n    setLoading(false);\n\n    if (result.success) {\n      if (result.needsConfirmation) {\n        setInfo("Account created! Check your email to confirm it, then sign in.");\n      } else {\n        router.push("/dashboard");\n      }\n    } else {\n      setError(result.error);\n    }\n  };',
  'pass referralCode into signup + handle needsConfirmation'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
