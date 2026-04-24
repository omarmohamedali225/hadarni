import { useState } from "react";
import { useAuth } from "../lib/Auth";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) return;
    setLoading(true);

    await signIn(form.email, form.password);

    setLoading(false);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl shadow-purple-100 p-10 relative overflow-hidden">
            <div className="absolute -top-14 -right-14 w-44 h-44 rounded-full bg-gradient-to-br from-violet-100/60 to-purple-50 pointer-events-none" />
            <Welcome />
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-600 mb-2 text-right">
                اسم الموظف
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={form.email}
                  name="email"
                  type="email"
                  placeholder="omar@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white placeholder:text-gray-300"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-600 mb-2 text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:bg-white placeholder:text-gray-300"
                />
                <button
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPwd ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-700 text-white rounded-xl text-base font-bold tracking-wide shadow-lg shadow-purple-200 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-75 mb-5"
            >
              {loading ? "...جاري التحقق" : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Welcome() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mb-4 shadow-lg shadow-purple-300">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-indigo-950 mb-1">
        أهلاً بك مجدداً
      </h1>
      <p className="text-sm text-gray-400">سجّل دخولك للمتابعة</p>
    </div>
  );
}
