import { Header } from "@/components/layout/header";

type AppShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="page-shell">
      <Header />
      <main className="mt-8 flex-1">{children}</main>
    </div>
  );
}
