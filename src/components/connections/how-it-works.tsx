import { KeyRound, ShieldCheck, RefreshCw } from "lucide-react";

const STEPS = [
  {
    icon: KeyRound,
    num: "١",
    title: "تسجيل الدخول",
    desc: "OAuth 2.0 آمن مع كل منصة — بدون مشاركة كلمات المرور.",
  },
  {
    icon: ShieldCheck,
    num: "٢",
    title: "منح الصلاحيات",
    desc: "اختر ما تسمح لـ gioco بقراءته وتعديله. يمكن تعديلها لاحقًا.",
  },
  {
    icon: RefreshCw,
    num: "٣",
    title: "المزامنة التلقائية",
    desc: "تُسحب الحملات والقياسات كل ١٥ دقيقة وتُوحَّد في لوحة واحدة.",
  },
];

export function HowItWorks() {
  return (
    <div className="mb-[20px] grid gap-[14px] md:grid-cols-3">
      {STEPS.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.num}
            className="rounded-card border border-dashed border-line-2 bg-panel/60 p-[16px]"
          >
            <div className="flex items-center gap-[10px]">
              <div className="grid h-[32px] w-[32px] place-items-center rounded-[9px] bg-chip text-ink-2">
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <span className="num text-[11px] font-bold text-ink-4">
                {s.num}
              </span>
            </div>
            <h3 className="mt-[10px] text-[13.5px] font-semibold">{s.title}</h3>
            <p className="mt-[4px] text-[12.5px] leading-[1.55] text-ink-3">
              {s.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
