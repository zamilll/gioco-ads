import { CheckCircle2 } from "lucide-react";
import { toArabicDigits } from "@/lib/utils";

export function StatusBanner({
  connected,
  total,
}: {
  connected: number;
  total: number;
}) {
  return (
    <div
      className="mb-[20px] flex items-center gap-[14px] rounded-card border border-line p-[18px]"
      style={{
        background:
          "linear-gradient(135deg, var(--accent-soft), color-mix(in oklab, var(--accent-soft) 40%, var(--panel)))",
      }}
    >
      <div
        className="grid h-[42px] w-[42px] place-items-center rounded-[12px] text-white"
        style={{ background: "var(--accent)" }}
      >
        <CheckCircle2 size={20} strokeWidth={2} />
      </div>
      <div className="flex-1">
        <h2 className="text-[16px] font-bold text-ink">
          {toArabicDigits(connected)} من {toArabicDigits(total)} منصات متصلة
        </h2>
        <p className="mt-[2px] text-[13px] text-ink-2">
          تسحب gioco البيانات تلقائيًا كل ١٥ دقيقة وتوحّد القياسات في مكان واحد.
        </p>
      </div>
      <span className="num hidden text-[22px] font-bold text-accent md:block">
        {toArabicDigits(connected)}/{toArabicDigits(total)}
      </span>
    </div>
  );
}
