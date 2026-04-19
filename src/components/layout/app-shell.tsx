import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({
  crumbTitle,
  children,
}: {
  crumbTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-[244px_1fr]">
      <Sidebar />
      <div className="min-w-0">
        <Topbar crumbTitle={crumbTitle} />
        <main className="max-w-[1400px] px-[28px] pb-[80px] pt-[22px]">
          {children}
        </main>
      </div>
    </div>
  );
}
