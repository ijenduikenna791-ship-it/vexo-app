"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconEye, IconEyeOff, IconBrandGoogleFilled, IconBrandApple, IconArrowRight } from "@tabler/icons-react";
import { signup } from "../lib/auth";

const countries = [
  { name: "Afghanistan", code: "AF", dial: "+93" },
  { name: "Albania", code: "AL", dial: "+355" },
  { name: "Algeria", code: "DZ", dial: "+213" },
  { name: "Andorra", code: "AD", dial: "+376" },
  { name: "Angola", code: "AO", dial: "+244" },
  { name: "Antigua and Barbuda", code: "AG", dial: "+1268" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Armenia", code: "AM", dial: "+374" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Austria", code: "AT", dial: "+43" },
  { name: "Azerbaijan", code: "AZ", dial: "+994" },
  { name: "Bahamas", code: "BS", dial: "+1242" },
  { name: "Bahrain", code: "BH", dial: "+973" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Barbados", code: "BB", dial: "+1246" },
  { name: "Belarus", code: "BY", dial: "+375" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Belize", code: "BZ", dial: "+501" },
  { name: "Benin", code: "BJ", dial: "+229" },
  { name: "Bhutan", code: "BT", dial: "+975" },
  { name: "Bolivia", code: "BO", dial: "+591" },
  { name: "Bosnia and Herzegovina", code: "BA", dial: "+387" },
  { name: "Botswana", code: "BW", dial: "+267" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Brunei", code: "BN", dial: "+673" },
  { name: "Bulgaria", code: "BG", dial: "+359" },
  { name: "Burkina Faso", code: "BF", dial: "+226" },
  { name: "Burundi", code: "BI", dial: "+257" },
  { name: "Cabo Verde", code: "CV", dial: "+238" },
  { name: "Cambodia", code: "KH", dial: "+855" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Central African Republic", code: "CF", dial: "+236" },
  { name: "Chad", code: "TD", dial: "+235" },
  { name: "Chile", code: "CL", dial: "+56" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Comoros", code: "KM", dial: "+269" },
  { name: "Congo (Republic)", code: "CG", dial: "+242" },
  { name: "Congo (DRC)", code: "CD", dial: "+243" },
  { name: "Costa Rica", code: "CR", dial: "+506" },
  { name: "Croatia", code: "HR", dial: "+385" },
  { name: "Cuba", code: "CU", dial: "+53" },
  { name: "Cyprus", code: "CY", dial: "+357" },
  { name: "Czechia", code: "CZ", dial: "+420" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Djibouti", code: "DJ", dial: "+253" },
  { name: "Dominica", code: "DM", dial: "+1767" },
  { name: "Dominican Republic", code: "DO", dial: "+1809" },
  { name: "Ecuador", code: "EC", dial: "+593" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "El Salvador", code: "SV", dial: "+503" },
  { name: "Equatorial Guinea", code: "GQ", dial: "+240" },
  { name: "Eritrea", code: "ER", dial: "+291" },
  { name: "Estonia", code: "EE", dial: "+372" },
  { name: "Eswatini", code: "SZ", dial: "+268" },
  { name: "Ethiopia", code: "ET", dial: "+251" },
  { name: "Fiji", code: "FJ", dial: "+679" },
  { name: "Finland", code: "FI", dial: "+358" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Gabon", code: "GA", dial: "+241" },
  { name: "Gambia", code: "GM", dial: "+220" },
  { name: "Georgia", code: "GE", dial: "+995" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "Greece", code: "GR", dial: "+30" },
  { name: "Grenada", code: "GD", dial: "+1473" },
  { name: "Guatemala", code: "GT", dial: "+502" },
  { name: "Guinea", code: "GN", dial: "+224" },
  { name: "Guinea-Bissau", code: "GW", dial: "+245" },
  { name: "Guyana", code: "GY", dial: "+592" },
  { name: "Haiti", code: "HT", dial: "+509" },
  { name: "Honduras", code: "HN", dial: "+504" },
  { name: "Hungary", code: "HU", dial: "+36" },
  { name: "Iceland", code: "IS", dial: "+354" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Iran", code: "IR", dial: "+98" },
  { name: "Iraq", code: "IQ", dial: "+964" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Jamaica", code: "JM", dial: "+1876" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Jordan", code: "JO", dial: "+962" },
  { name: "Kazakhstan", code: "KZ", dial: "+7" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Kiribati", code: "KI", dial: "+686" },
  { name: "Kuwait", code: "KW", dial: "+965" },
  { name: "Kyrgyzstan", code: "KG", dial: "+996" },
  { name: "Laos", code: "LA", dial: "+856" },
  { name: "Latvia", code: "LV", dial: "+371" },
  { name: "Lebanon", code: "LB", dial: "+961" },
  { name: "Lesotho", code: "LS", dial: "+266" },
  { name: "Liberia", code: "LR", dial: "+231" },
  { name: "Libya", code: "LY", dial: "+218" },
  { name: "Liechtenstein", code: "LI", dial: "+423" },
  { name: "Lithuania", code: "LT", dial: "+370" },
  { name: "Luxembourg", code: "LU", dial: "+352" },
  { name: "Madagascar", code: "MG", dial: "+261" },
  { name: "Malawi", code: "MW", dial: "+265" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Maldives", code: "MV", dial: "+960" },
  { name: "Mali", code: "ML", dial: "+223" },
  { name: "Malta", code: "MT", dial: "+356" },
  { name: "Marshall Islands", code: "MH", dial: "+692" },
  { name: "Mauritania", code: "MR", dial: "+222" },
  { name: "Mauritius", code: "MU", dial: "+230" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Micronesia", code: "FM", dial: "+691" },
  { name: "Moldova", code: "MD", dial: "+373" },
  { name: "Monaco", code: "MC", dial: "+377" },
  { name: "Mongolia", code: "MN", dial: "+976" },
  { name: "Montenegro", code: "ME", dial: "+382" },
  { name: "Morocco", code: "MA", dial: "+212" },
  { name: "Mozambique", code: "MZ", dial: "+258" },
  { name: "Myanmar", code: "MM", dial: "+95" },
  { name: "Namibia", code: "NA", dial: "+264" },
  { name: "Nauru", code: "NR", dial: "+674" },
  { name: "Nepal", code: "NP", dial: "+977" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Nicaragua", code: "NI", dial: "+505" },
  { name: "Niger", code: "NE", dial: "+227" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "North Korea", code: "KP", dial: "+850" },
  { name: "North Macedonia", code: "MK", dial: "+389" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Oman", code: "OM", dial: "+968" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Palau", code: "PW", dial: "+680" },
  { name: "Palestine", code: "PS", dial: "+970" },
  { name: "Panama", code: "PA", dial: "+507" },
  { name: "Papua New Guinea", code: "PG", dial: "+675" },
  { name: "Paraguay", code: "PY", dial: "+595" },
  { name: "Peru", code: "PE", dial: "+51" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Portugal", code: "PT", dial: "+351" },
  { name: "Qatar", code: "QA", dial: "+974" },
  { name: "Romania", code: "RO", dial: "+40" },
  { name: "Russia", code: "RU", dial: "+7" },
  { name: "Rwanda", code: "RW", dial: "+250" },
  { name: "Saint Kitts and Nevis", code: "KN", dial: "+1869" },
  { name: "Saint Lucia", code: "LC", dial: "+1758" },
  { name: "Saint Vincent and the Grenadines", code: "VC", dial: "+1784" },
  { name: "Samoa", code: "WS", dial: "+685" },
  { name: "San Marino", code: "SM", dial: "+378" },
  { name: "Sao Tome and Principe", code: "ST", dial: "+239" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Senegal", code: "SN", dial: "+221" },
  { name: "Serbia", code: "RS", dial: "+381" },
  { name: "Seychelles", code: "SC", dial: "+248" },
  { name: "Sierra Leone", code: "SL", dial: "+232" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Slovakia", code: "SK", dial: "+421" },
  { name: "Slovenia", code: "SI", dial: "+386" },
  { name: "Solomon Islands", code: "SB", dial: "+677" },
  { name: "Somalia", code: "SO", dial: "+252" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "South Sudan", code: "SS", dial: "+211" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Sri Lanka", code: "LK", dial: "+94" },
  { name: "Sudan", code: "SD", dial: "+249" },
  { name: "Suriname", code: "SR", dial: "+597" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Syria", code: "SY", dial: "+963" },
  { name: "Taiwan", code: "TW", dial: "+886" },
  { name: "Tajikistan", code: "TJ", dial: "+992" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Thailand", code: "TH", dial: "+66" },
  { name: "Timor-Leste", code: "TL", dial: "+670" },
  { name: "Togo", code: "TG", dial: "+228" },
  { name: "Tonga", code: "TO", dial: "+676" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1868" },
  { name: "Tunisia", code: "TN", dial: "+216" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Turkmenistan", code: "TM", dial: "+993" },
  { name: "Tuvalu", code: "TV", dial: "+688" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "Ukraine", code: "UA", dial: "+380" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "Uruguay", code: "UY", dial: "+598" },
  { name: "Uzbekistan", code: "UZ", dial: "+998" },
  { name: "Vanuatu", code: "VU", dial: "+678" },
  { name: "Vatican City", code: "VA", dial: "+379" },
  { name: "Venezuela", code: "VE", dial: "+58" },
  { name: "Vietnam", code: "VN", dial: "+84" },
  { name: "Yemen", code: "YE", dial: "+967" },
  { name: "Zambia", code: "ZM", dial: "+260" },
  { name: "Zimbabwe", code: "ZW", dial: "+263" },
];

function flagEmoji(code) {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [creating, setCreating] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const selectedCountry = countries.find((c) => c.name === form.country);
  const filteredCountries = countries.filter((c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const progress = step === 1 ? 50 : 100;

  const handleContinue = (e) => {
    e.preventDefault();
    if (!form.country) {
      setError("Please select your country.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const dialCode = countries.find((c) => c.name === form.country)?.dial || "";
    const fullPhone = `${dialCode} ${form.phone}`.trim();

    setLoading(true);
    const result = await signup({ ...form, phone: fullPhone, referralCode });
    setLoading(false);

    if (result.success) {
      if (result.needsConfirmation) {
        setInfo("Account created! Check your email to confirm it, then sign in.");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-vexo-orange flex items-center justify-center text-white font-bold text-lg">V</div>
          <p className="text-xl font-extrabold">Vexo</p>
        </div>

        <h1 className="text-2xl font-extrabold text-center">Create your account</h1>
        <p className="text-vexo-muted text-sm text-center mt-2">Join 248,000+ crypto traders on Vexo</p>

        <div className="w-full h-1 bg-vexo-border rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-vexo-orange rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {info && (
          <div className="mt-6 bg-vexo-green/10 border border-vexo-green/30 text-vexo-green text-sm rounded-xl px-4 py-3">
            {info}
          </div>
        )}

        {referralCode && (
          <div className="mt-6 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm text-vexo-muted">
            Referral code applied: <span className="text-white font-semibold">{referralCode}</span>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleContinue} className="flex flex-col gap-5 mt-8">
            <div>
              <label className="text-sm font-semibold">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Choose a username"
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full mt-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Country</label>
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="w-full flex items-center gap-2 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange text-left"
                >
                  {selectedCountry ? (
                    <>
                      <img src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`} alt="" className="w-5 h-4 rounded-sm object-cover" />
                      <span>{selectedCountry.name}</span>
                    </>
                  ) : (
                    <span className="text-vexo-muted">Select your country</span>
                  )}
                </button>
                {countryOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCountryOpen(false)} />
                    <div className="absolute z-20 mt-1 w-full bg-vexo-card border border-vexo-border rounded-xl max-h-64 overflow-y-auto">
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search countries"
                        className="w-full px-4 py-2.5 text-sm bg-vexo-card border-b border-vexo-border outline-none sticky top-0"
                      />
                      {filteredCountries.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => { setForm({ ...form, country: c.name }); setCountryOpen(false); setCountrySearch(""); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-vexo-card2 text-left"
                        >
                          <img src={`https://flagcdn.com/24x18/${c.code.toLowerCase()}.png`} alt="" className="w-5 h-4 rounded-sm object-cover" />
                          <span>{c.name}</span>
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <p className="text-vexo-muted text-xs text-center py-4">No countries found.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Phone number</label>
              <div className="flex gap-2 mt-2">
                <div className="flex items-center justify-center bg-vexo-card border border-vexo-border rounded-xl px-3 text-sm text-vexo-muted min-w-[64px]">
                  {countries.find((c) => c.name === form.country)?.dial || "+__"}
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="555 123 4567"
                  required
                  className="flex-1 bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 text-sm outline-none focus:border-vexo-orange"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold flex items-center justify-center gap-2">
              Continue <IconArrowRight size={18} />
            </button>

            <div className="flex items-center gap-3 text-vexo-muted text-xs">
              <div className="flex-1 h-px bg-vexo-border" />
              or sign up with
              <div className="flex-1 h-px bg-vexo-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 bg-vexo-card border border-vexo-border rounded-xl py-3 text-sm font-semibold">
                <IconBrandGoogleFilled size={16} /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 bg-vexo-card border border-vexo-border rounded-xl py-3 text-sm font-semibold">
                <IconBrandApple size={16} /> Apple
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCreateAccount} className="flex flex-col gap-5 mt-8">
            <p className="text-sm text-vexo-muted">
              Almost done, <span className="text-white font-semibold">{form.username || "there"}</span> - just set a password.
            </p>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-vexo-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vexo-muted"
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Confirm password</label>
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  required
                  minLength={6}
                  className="w-full bg-vexo-card border border-vexo-border rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-vexo-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vexo-muted"
                >
                  {showConfirm ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
              <p className="text-vexo-muted text-xs mt-2">Must be at least 8 characters.</p>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-vexo-orange text-white font-bold disabled:opacity-60">
              {loading ? "Creating account..." : "Create Free Account"}
            </button>

            <button type="button" onClick={() => setStep(1)} className="text-vexo-muted text-sm font-semibold">
              Back
            </button>
          </form>
        )}

        <p className="text-vexo-muted text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-vexo-orange font-semibold">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
