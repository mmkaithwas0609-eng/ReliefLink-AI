import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to the ReliefLink command center"
      description="Coordinators, admins, and volunteers use the same secure Firebase login. Your role-specific profile determines what the platform shows next."
      footer={
        <p className="text-sm text-slate-600">
          Use the same account across future need management, volunteer matching,
          maps, alerts, and analytics modules.
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
