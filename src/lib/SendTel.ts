import { supabase } from "./supabase";

const token = "8666070076:AAGtLfaWEWu0TPn9on6pKGayXMGK92XALgQ";

const URL = `https://api.telegram.org/bot${token}/sendMessage`;

const chat_id = "1851491678";

export default function SendTel(user: any, admin: any, today: string) {
  async function send() {
    const adminProfile = await supabase
      .from("profiles")
      .select("*")
      .eq("id", admin?.id)
      .single();
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆕 تسجيل جديد
━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 الاسم: ${user?.full_name || "مجهول"}
👨‍💼 المسجل بواسطة: ${adminProfile.data.full_name || "مجهول"}
⏰ وقت التسجيل: ${today || "مجهول"}

✅ تم إتمام العملية بنجاح
━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        reply_markup: {
          keyboard: [
            [
             {text: "تقرير اليوم"},
            ],
          ],
        },
      }),
    }).then(e=>{console.log(e)}).catch(e=>{console.log(e)});
  }

  send();
}


