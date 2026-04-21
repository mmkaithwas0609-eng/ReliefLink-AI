"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { roleDescriptions, roleLabels } from "@/features/auth/constants";
import { registerSchema, type RegisterInput } from "@/features/auth/schema";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const languageOptions = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi"
];

export function RegisterForm() {
  const { t } = useI18n();
  const { register: registerUser, isLoading } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>({
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      preferredLanguage: "English",
      role: "volunteer",
      password: "",
      confirmPassword: ""
    }
  });

  const selectedRole = watch("role");

  async function onSubmit(values: RegisterInput) {
    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) {
      setSubmitError(
        parsed.error.issues[0]?.message ?? "Invalid registration details."
      );
      return;
    }

    try {
      setSubmitError(null);
      await registerUser(parsed.data);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-semibold text-ink">
          {t("common", "createAccount")}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Register your role and create the Firestore profile used across the
          platform.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" error={errors.displayName?.message}>
          <Input
            placeholder="Asha Verma"
            {...register("displayName", { required: true })}
          />
        </FormField>

        <FormField label="Phone number" error={errors.phoneNumber?.message}>
          <Input
            placeholder="+91 9876543210"
            {...register("phoneNumber", { required: true })}
          />
        </FormField>
      </div>

      <FormField label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="name@relieflink.org"
          {...register("email", { required: true })}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Role"
          error={errors.role?.message}
          hint={roleDescriptions[selectedRole]}
        >
          <Select {...register("role", { required: true })}>
            {Object.entries(roleLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Preferred language"
          error={errors.preferredLanguage?.message}
        >
          <Select {...register("preferredLanguage", { required: true })}>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Password" error={errors.password?.message}>
          <Input
            type="password"
            placeholder="At least 6 characters"
            {...register("password", { required: true })}
          />
        </FormField>

        <FormField
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            placeholder="Re-enter your password"
            {...register("confirmPassword", { required: true })}
          />
        </FormField>
      </div>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Creating account..." : t("common", "createAccount")}
      </Button>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-700">
          {t("common", "signIn")}
        </Link>
      </p>
    </form>
  );
}
