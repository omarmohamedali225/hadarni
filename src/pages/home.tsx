import { useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/Auth";
import { supabase } from "../lib/supabase";
import * as QRCode from "qrcode";
import Scanner from "../components/Scanner";
interface ProfileType {
  id: string;
  role: string;
  full_name: string;
}

export default function Home() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user) return;
    async function fetchProfile() {
      const res = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      
      setProfile(res.data);
    }
    if (user) fetchProfile();
  }, []);

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(
        document.createElement("canvas"),
        (profile?.id as string) || "unknown",
      ).then((c) => {
        if (qrRef.current) {
          qrRef.current.innerHTML = "";
          qrRef.current.append(c as HTMLCanvasElement | any);
        }
      });
    }
  }, [profile]);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-purple-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl shadow-purple-100 p-10 w-full max-w-sm">
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-1">
            مرحبا{" "}
            <span className="text-lg font-semibold">{profile?.full_name}</span>
          </h1>

          {profile?.role === "admin" ? (
            <>
              <Scanner />
            </>
          ) : (
            <>
              {!profile ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  {" "}
                  <div
                    ref={qrRef}
                    className="w-full flex items-center justify-center mt-5"
                  ></div>
                  <button
                    onClick={() => {
                      supabase.auth.signOut();
                    }}
                    className="w-full h-12 mt-5 bg-linear-to-r from-violet-500 to-purple-700 text-white rounded-xl text-base font-bold tracking-wide shadow-lg shadow-purple-200 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-75 mb-5"
                  >
                    خروج
                  </button>
                </>
              )}
              <p className="text-sm text-gray-600 m-5 text-center">
                قم بمشاركة هذا الكود مع المسؤول لتمكين الدخول
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
