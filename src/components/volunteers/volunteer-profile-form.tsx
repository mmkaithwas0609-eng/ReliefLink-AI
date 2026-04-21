"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import {
  volunteerLanguageOptions,
  volunteerSkillOptions,
  volunteerStatusOptions
} from "@/features/volunteers/constants";
import {
  type VolunteerProfileInput,
  volunteerProfileSchema
} from "@/features/volunteers/schema";
import { upsertVolunteerProfile } from "@/features/volunteers/volunteer-service";

type VolunteerProfileFormProps = {
  onSaved?: () => Promise<void> | void;
};

export function VolunteerProfileForm({ onSaved }: VolunteerProfileFormProps) {
  const { user, profile } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    volunteerSkillOptions[0]
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    profile?.preferredLanguage ?? volunteerLanguageOptions[0]
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<VolunteerProfileInput>({
    defaultValues: {
      fullName: profile?.displayName ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
      skills: [volunteerSkillOptions[0]],
      languages: [profile?.preferredLanguage ?? volunteerLanguageOptions[0]],
      status: "available",
      availabilityNote: "Available for immediate response",
      maxTravelDistanceKm: 10,
      address: "",
      lat: 28.6139,
      lng: 77.209
    }
  });

  const canSubmit = useMemo(() => Boolean(user?.uid), [user?.uid]);

  function toggleArrayValue(
    currentValues: string[],
    nextValue: string,
    setter: (values: string[]) => void,
    field: "skills" | "languages"
  ) {
    const nextValues = currentValues.includes(nextValue)
      ? currentValues.filter((item) => item !== nextValue)
      : [...currentValues, nextValue];

    const finalValues = nextValues.length > 0 ? nextValues : [nextValue];
    setter(finalValues);
    setValue(field, finalValues, { shouldValidate: true });
  }

  async function onSubmit(values: VolunteerProfileInput) {
    if (!user?.uid) {
      setSubmitError("You must be signed in to save a volunteer profile.");
      return;
    }

    const parsed = volunteerProfileSchema.safeParse({
      ...values,
      skills: selectedSkills,
      languages: selectedLanguages
    });

    if (!parsed.success) {
      setSubmitError(
        parsed.error.issues[0]?.message ?? "Please correct the volunteer form."
      );
      return;
    }

    try {
      setSubmitError(null);
      setSubmitSuccess(null);
      await upsertVolunteerProfile(parsed.data, user.uid);
      setSubmitSuccess("Volunteer profile saved successfully.");
      reset({
        ...parsed.data
      });
      await onSaved?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save volunteer profile."
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-semibold text-ink">Volunteer profile</h2>
        <p className="mt-2 text-sm text-slate-600">
          Capture responder skills, languages, availability, and operating radius
          for future matching.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" error={errors.fullName?.message}>
          <Input
            placeholder="Ravi Kumar"
            {...register("fullName", { required: true })}
          />
        </FormField>

        <FormField label="Phone number" error={errors.phoneNumber?.message}>
          <Input
            placeholder="+91 9876543210"
            {...register("phoneNumber", { required: true })}
          />
        </FormField>
      </div>

      <FormField
        label="Skills"
        error={errors.skills?.message}
        hint="These skills will be matched against need requirements."
      >
        <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
          {volunteerSkillOptions.map((skill) => {
            const checked = selectedSkills.includes(skill);

            return (
              <label
                key={skill}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked
                    ? "border-brand-300 bg-brand-50 text-brand-900"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() =>
                    toggleArrayValue(
                      selectedSkills,
                      skill,
                      setSelectedSkills,
                      "skills"
                    )
                  }
                />
                {skill}
              </label>
            );
          })}
        </div>
      </FormField>

      <FormField
        label="Languages"
        error={errors.languages?.message}
        hint="Useful for multilingual community coordination."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {volunteerLanguageOptions.map((language) => {
            const checked = selectedLanguages.includes(language);

            return (
              <label
                key={language}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked
                    ? "border-accent-300 bg-accent-50 text-accent-900"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() =>
                    toggleArrayValue(
                      selectedLanguages,
                      language,
                      setSelectedLanguages,
                      "languages"
                    )
                  }
                />
                {language}
              </label>
            );
          })}
        </div>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Status" error={errors.status?.message}>
          <Select {...register("status", { required: true })}>
            {volunteerStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Max travel distance (km)"
          error={errors.maxTravelDistanceKm?.message}
        >
          <Input
            type="number"
            min="1"
            step="1"
            {...register("maxTravelDistanceKm", {
              valueAsNumber: true,
              required: true
            })}
          />
        </FormField>
      </div>

      <FormField
        label="Availability note"
        error={errors.availabilityNote?.message}
      >
        <Input
          placeholder="Available evenings and weekends"
          {...register("availabilityNote", { required: true })}
        />
      </FormField>

      <FormField label="Address" error={errors.address?.message}>
        <Input
          placeholder="Dwarka Sector 10, New Delhi"
          {...register("address", { required: true })}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Latitude" error={errors.lat?.message}>
          <Input
            type="number"
            step="any"
            {...register("lat", { valueAsNumber: true, required: true })}
          />
        </FormField>

        <FormField label="Longitude" error={errors.lng?.message}>
          <Input
            type="number"
            step="any"
            {...register("lng", { valueAsNumber: true, required: true })}
          />
        </FormField>
      </div>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      {submitSuccess ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {submitSuccess}
        </div>
      ) : null}

      <Button type="submit" fullWidth disabled={isSubmitting || !canSubmit}>
        {isSubmitting ? "Saving profile..." : "Save volunteer profile"}
      </Button>
    </form>
  );
}
