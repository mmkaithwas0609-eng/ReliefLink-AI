import { AppShell } from "@/components/layout/app-shell";
import { AuthCta } from "@/components/home/auth-cta";
import { HeroSection } from "@/components/home/hero-section";
import { IntegrationStatus } from "@/components/home/integration-status";
import { ModulePreviewGrid } from "@/components/home/module-preview-grid";
import { PlatformStats } from "@/components/home/platform-stats";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <HeroSection />
        <PlatformStats />
        <IntegrationStatus />
        <AuthCta />
        <ModulePreviewGrid />
      </div>
    </AppShell>
  );
}
