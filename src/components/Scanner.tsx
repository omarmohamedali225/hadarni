import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import Dialog from "./Dialog";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

export default function Scanner() {
  const [showDialog, setShowDialog] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [id, setId] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("video");
    }
    const scanner = scannerRef.current;

    if (open) {
      scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 200, disableFlip: true },
        (res) => {
          setShowDialog(true);
          setId(res);
          scanner.stop();
        },
        () => {
          // console.log(err);
        },
      );
    } else {
      if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        scanner.stop();
      }
    }
  }, [open]);

  return (
    <div className="w-full h-full">
      <div id="video" ref={ref} className="mt-5 w-full h-full" />
      {showDialog && <Dialog id={id} setDialog={setShowDialog} />}
      <button
        onClick={() => {
          setOpen((o) => !o);
        }}
        className="w-full h-12 mt-5 bg-linear-to-r from-violet-500 to-purple-700 text-white rounded-xl text-base font-bold tracking-wide shadow-lg shadow-purple-200 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-75 mb-5"
      >
        {open ? "قفل الماسح الضوئي" : "فتح الماسح الضوئي"}
      </button>
      <button
        onClick={() => {
          supabase.auth.signOut();
        }}
        className="w-full h-12 mt-5 bg-linear-to-r from-violet-500 to-purple-700 text-white rounded-xl text-base font-bold tracking-wide shadow-lg shadow-purple-200 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-75 mb-5"
      >
        خروج
      </button>
    </div>
  );
}
