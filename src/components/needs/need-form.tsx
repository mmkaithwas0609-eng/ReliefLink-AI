"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  needCategories,
  needLanguages,
  needSkillOptions
} from "@/features/needs/constants";
import { createNeedSchema, type CreateNeedInput } from "@/features/needs/schema";
import { createNeed } from "@/features/needs/need-service";
import { useAuth } from "@/hooks/use-auth";

type NeedFormProps = {
  onCreated?: () => Promise<void> | void;
};

export function NeedForm({ onCreated }: NeedFormProps) {
  const { user, profile } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    needSkillOptions[0]
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateNeedInput>({
    defaultValues: {
      title: "",
      description: "",
      category: needCategories[0],
      requiredSkills: [needSkillOptions[0]],
      language: profile?.preferredLanguage ?? needLanguages[0],
      address: "",
      lat: 28.6139,
      lng: 77.209,
      requesterName: profile?.displayName ?? "",
      requesterPhone: profile?.phoneNumber ?? ""
    }
  });

  const canSubmit = useMemo(() => Boolean(user?.uid), [user?.uid]);

  function toggleSkill(skill: string) {
    const nextSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((item) => item !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(nextSkills.length > 0 ? nextSkills : [skill]);
    setValue("requiredSkills", nextSkills.length > 0 ? nextSkills : [skill], {
      shouldValidate: true
    });
  }

  async function onSubmit(values: CreateNeedInput) {
    if (!user?.uid) {
      setSubmitError("You must be signed in to submit a need.");
      return;
    }

    const parsed = createNeedSchema.safeParse({
      ...values,
      requiredSkills: selectedSkills
    });

    if (!parsed.success) {
      setSubmitError(
        parsed.error.issues[0]?.message ?? "Please correct the form."
      );
      return;
    }

    try {
      setSubmitError(null);
      setSubmitSuccess(null);
      await createNeed(parsed.data, user.uid);
      setSubmitSuccess("Need submitted successfully.");
      reset({
        title: "",
        description: "",
        category: needCategories[0],
        requiredSkills: [needSkillOptions[0]],
        language: profile?.preferredLanguage ?? needLanguages[0],
        address: "",
        lat: 28.6139,
        lng: 77.209,
        requesterName: profile?.displayName ?? "",
        requesterPhone: profile?.phoneNumber ?? ""
      });
      setSelectedSkills([needSkillOptions[0]]);
      await onCreated?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit the need."
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-semibold text-ink">Post a new need</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Collect structured need details so the platform can score urgency and
          match volunteers in the next modules.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Need title" error={errors.title?.message}>
          <Input
            placeholder="Urgent medicine delivery for elderly resident"
            {...register("title", { required: true })}
          />
        </FormField>

        <FormField label="Category" error={errors.category?.message}>
          <Select {...register("category", { required: true })}>
            {needCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-900/40"
          placeholder="Describe the situation, who is affected, what help is needed, and any safety concerns."
          {...register("description", { required: true })}
        />
      </FormField>

      <FormField
        label="Required skills"
        error={errors.requiredSkills?.message}
        hint="Select the volunteer capabilities needed for this case."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {needSkillOptions.map((skill) => {
            const checked = selectedSkills.includes(skill);

            return (
              <label
                key={skill}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  checked
                    ? "border-brand-300 bg-brand-50 text-brand-900 dark:border-brand-500/50 dark:bg-brand-500/15 dark:text-brand-200"
                    : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={() => toggleSkill(skill)}
                />
                {skill}
              </label>
            );
          })}
        </div>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Language" error={errors.language?.message}>
          <Select {...register("language", { required: true })}>
            {needLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="Address" error={errors.address?.message}>
          <Input
            placeholder="Sector 21, Noida"
            {...register("address", { required: true })}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Latitude" error={errors.lat?.message}>
          <Input
            type="number"
            step="any"
            placeholder="28.6139"
            {...register("lat", { valueAsNumber: true, required: true })}
          />
        </FormField>

        <FormField label="Longitude" error={errors.lng?.message}>
          <Input
            type="number"
            step="any"
            placeholder="77.2090"
            {...register("lng", { valueAsNumber: true, required: true })}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Requester name" error={errors.requesterName?.message}>
          <Input
            placeholder="Anita Sharma"
            {...register("requesterName", { required: true })}
          />
        </FormField>

        <FormField
          label="Requester phone"
          error={errors.requesterPhone?.message}
        >
          <Input
            placeholder="+91 9876543210"
            {...register("requesterPhone", { required: true })}
          />
        </FormField>
      </div>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {submitError}
        </div>
      ) : null}

      {submitSuccess ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
          {submitSuccess}
        </div>
      ) : null}

      <Button type="submit" fullWidth disabled={isSubmitting || !canSubmit}>
        {isSubmitting ? "Submitting need..." : "Submit need"}
      </Button>
    </form>
  );
}
