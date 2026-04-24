import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import SendTel from "../lib/SendTel";

export default function Dialog({
  id,
  setDialog,
}: {
  id: string | null;
  setDialog: (show: boolean) => void;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const res = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setUser(res.data);

      const {
        data: { user: admin },
      } = await supabase.auth.getUser();
      setAdmin(admin);
    }
    if (id) fetchProfile();
  }, [id]);

  async function onConfirm() {
    const today = new Date().toISOString().split("T")[0];

    const formatted = new Date()
    .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
      
      SendTel(user, admin, formatted);
    const { data } = await supabase
      .from("qr_logs")
      .select("*")
      .eq("userId", id as string)
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`)
      .maybeSingle();


    if (data) {
      alert("تم تأكيد الحضور لهذا المستخدم اليوم بالفعل");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("qr_logs").insert({
      userId: id as string,
      created_at: new Date().toISOString(),
      confirmedBy: admin?.id as string,
    });
    if (error) {
      alert("حدث خطأ أثناء تأكيد الحضور");
    } else {
      alert("تم تأكيد الحضور بنجاح");
      window.location.reload();
    }
    setLoading(false);
    setDialog(false);
  }




  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">بيانات المستخدم</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">الاسم:</span> {user?.full_name||"غير معروف"}
          </p>
          {/* <p>
            <span className="font-medium">عدد أيام الحضور:</span> 20
          </p>
          <p>
            <span className="font-medium">عدد الإجازات:</span> 0
          </p> */}
        </div>

        {/* buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => {
              setDialog(false);
            }}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            إلغاء
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            {loading ? "جاري التأكيد..." : "تأكيد الحضور"}
          </button>
        </div>
      </div>
    </div>
  );
}
