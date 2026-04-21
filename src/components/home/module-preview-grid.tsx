import { modules } from "@/lib/constants/dashboard";

export function ModulePreviewGrid() {
  return (
    <section id="modules" className="panel px-6 py-8 sm:px-8">
      <div className="flex max-w-3xl flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
          Planned build sequence
        </p>
        <h2 className="section-title">
          Modular architecture for a fast hackathon MVP that can scale beyond
          demo day.
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Each feature is isolated into focused domains so we can build
          incrementally without coupling UI, data access, AI scoring, mapping,
          notifications, and analytics.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {modules.map((module, index) => (
          <article
            key={module.title}
            className="rounded-3xl border border-slate-200 bg-surface p-5 dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  Module {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{module.title}</h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-slate-800 dark:text-brand-300">
                {module.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {module.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
