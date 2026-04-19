"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastTone = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastState {
  items: ToastItem[];
  push: (t: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  items: [],
  push: (t) => {
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    set((s) => ({ items: [...s.items, { ...t, id }] }));
    return id;
  },
  dismiss: (id) =>
    set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
}));

export function toast(t: Omit<ToastItem, "id">) {
  return useToastStore.getState().push(t);
}

export function ToastViewport() {
  const items = useToastStore((s) => s.items);
  const dismiss = useToastStore((s) => s.dismiss);
  return (
    <div className="pointer-events-none fixed bottom-[20px] end-[20px] z-[100] flex w-[340px] max-w-[calc(100vw-40px)] flex-col gap-[8px]">
      {items.map((item) => (
        <ToastCard key={item.id} item={item} onClose={() => dismiss(item.id)} />
      ))}
    </div>
  );
}

function ToastCard({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const Icon =
    item.tone === "success"
      ? CheckCircle2
      : item.tone === "error"
        ? AlertCircle
        : Info;
  const iconBg =
    item.tone === "success"
      ? "bg-good-bg text-good"
      : item.tone === "error"
        ? "bg-bad-bg text-bad"
        : "bg-accent-soft text-accent";

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-[10px] rounded-[12px] border border-line bg-panel p-[12px] shadow-token-md",
        "animate-in slide-in-from-bottom-2 fade-in-0 duration-200",
      )}
      role="status"
    >
      <span
        className={cn(
          "grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px]",
          iconBg,
        )}
      >
        <Icon size={15} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-ink">{item.title}</div>
        {item.description ? (
          <div className="mt-[2px] text-[12px] text-ink-3">
            {item.description}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="إغلاق"
        className="grid h-[22px] w-[22px] place-items-center rounded-[6px] text-ink-3 hover:bg-chip hover:text-ink"
      >
        <X size={13} strokeWidth={1.8} />
      </button>
    </div>
  );
}
