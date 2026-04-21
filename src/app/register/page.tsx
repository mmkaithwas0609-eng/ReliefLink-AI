import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create a ReliefLink AI account"
      description="Every registration creates a Firebase Auth user and a Firestore profile, which keeps role, language, and contact context available throughout the platform."
      footer={
        <p className="text-sm text-slate-600">
          For hackathon demos, you can create volunteer, coordinator, and admin
          accounts directly from this screen.
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
