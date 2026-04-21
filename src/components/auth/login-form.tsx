"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/providers/i18n-provider";
import type { LoginInput } from "@/features/auth/schema";
import { loginSchema } from "@/features/auth/schema";

export function LoginForm() {
  const { t } = useI18n();
  const { login, isLoading } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginInput) {
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? "Invalid login details.");
      return;
    }

    try {
      setSubmitError(null);
      await login(parsed.data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-semibold text-ink">{t("common", "signIn")}</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use your Firebase-backed ReliefLink AI account credentials.
        </p>
      </div>

      <FormField label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="you@ngo.org"
          {...register("email", { required: true })}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
      </FormField>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Signing in..." : t("common", "signIn")}
      </Button>

      <p className="text-sm text-slate-600">
        New to the platform?{" "}
        <Link href="/register" className="font-semibold text-brand-700">
          {t("common", "createAccount")}
        </Link>
      </p>
    </form>
  );
}
