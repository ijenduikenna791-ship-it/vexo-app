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
  '  const [error, setError] = useState("");\n  const [info, setInfo] = useState("");\n  const [creating, setCreating] = useState(false);',
  '  const [error, setError] = useState("");\n  const [info, setInfo] = useState("");\n  const [creating, setCreating] = useState(false);\n  const [countryOpen, setCountryOpen] = useState(false);\n  const [countrySearch, setCountrySearch] = useState("");\n  const selectedCountry = countries.find((c) => c.name === form.country);\n  const filteredCountries = countries.filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()));',
  'add country dropdown state'
);

replaceOnce(
  '  const handleContinue = (e) => {\n    e.preventDefault();\n    setStep(2);\n  };',
  '  const handleContinue = (e) => {\n    e.preventDefault();\n    if (!form.country) {\n      setError("Please select your country.");\n      return;\n    }\n    setError("");\n    setStep(2);\n  };',
  'validate country before continuing'
);

replaceOnce(
  '            <div>\n              <label className="text-sm font-semibold">Country</label>\n              <select\n                value={form.country}\n                onChange={(e) => setForm({ ...form, country: e.target.value })}\n                required\n                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange appearance-none"\n              >\n                <option value="" disabled>Select your country</option>\n                {countries.map((c) => (\n                  <option key={c.name} value={c.name}>{flagEmoji(c.code)} {c.name}</option>\n                ))}\n              </select>\n            </div>',
  '            <div>\n              <label className="text-sm font-semibold">Country</label>\n              <div className="relative mt-2">\n                <button\n                  type="button"\n                  onClick={() => setCountryOpen(!countryOpen)}\n                  className="w-full flex items-center gap-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange text-left"\n                >\n                  {selectedCountry ? (\n                    <>\n                      <img src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`} alt="" className="w-5 h-4 rounded-sm object-cover" />\n                      <span>{selectedCountry.name}</span>\n                    </>\n                  ) : (\n                    <span className="text-vexo-muted">Select your country</span>\n                  )}\n                </button>\n                {countryOpen && (\n                  <>\n                    <div className="fixed inset-0 z-10" onClick={() => setCountryOpen(false)} />\n                    <div className="absolute z-20 mt-1 w-full bg-vexo-card border border-vexo-border rounded-xl max-h-64 overflow-y-auto">\n                      <input\n                        type="text"\n                        value={countrySearch}\n                        onChange={(e) => setCountrySearch(e.target.value)}\n                        placeholder="Search countries"\n                        className="w-full px-4 py-2.5 text-sm bg-vexo-card border-b border-vexo-border outline-none sticky top-0"\n                      />\n                      {filteredCountries.map((c) => (\n                        <button\n                          key={c.name}\n                          type="button"\n                          onClick={() => { setForm({ ...form, country: c.name }); setCountryOpen(false); setCountrySearch(""); }}\n                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-vexo-card2 text-left"\n                        >\n                          <img src={`https://flagcdn.com/24x18/${c.code.toLowerCase()}.png`} alt="" className="w-5 h-4 rounded-sm object-cover" />\n                          <span>{c.name}</span>\n                        </button>\n                      ))}\n                      {filteredCountries.length === 0 && (\n                        <p className="text-vexo-muted text-xs text-center py-4">No countries found.</p>\n                      )}\n                    </div>\n                  </>\n                )}\n              </div>\n            </div>',
  'custom country dropdown with real flag images'
);

fs.writeFileSync(target, content, 'utf8');
console.log('Patched ' + changed + ' spot(s) in ' + target);
