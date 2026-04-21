type FormFieldProps = Readonly<{
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}>;

export function FormField({ label, error, children, hint }: FormFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </span>
      {children}
      {hint ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
