const en = {
  common: {
    appName: "ReliefLink AI",
    overview: "Overview",
    modules: "Modules",
    analytics: "Analytics",
    signIn: "Sign in",
    signOut: "Sign out",
    createAccount: "Create account",
    dashboard: "Dashboard",
    save: "Save",
    loading: "Loading...",
    configured: "Configured",
    pending: "Pending"
  },
  hero: {
    badge: "NGO response intelligence, rethought",
    title:
      "Coordinate urgent community relief with AI-powered prioritization and volunteer matching.",
    description:
      "ReliefLink AI centralizes incoming needs, scores urgency with Gemini, matches volunteers by skill and location, and gives admins a live command center for faster, smarter action.",
    primaryCta: "Build MVP Modules",
    secondaryCta: "Firebase-secured architecture"
  },
  auth: {
    loginTitle: "Sign in to the ReliefLink command center",
    loginDescription:
      "Coordinators, admins, and volunteers use the same secure Firebase login.",
    registerTitle: "Create a ReliefLink AI account",
    registerDescription:
      "Every registration creates a Firebase Auth user and a Firestore profile."
  },
  dashboard: {
    title: "Intake and manage community needs",
    description:
      "Authentication, Firestore-backed user profiles, and protected navigation are now connected to the first real workflow in the platform: structured need intake."
  },
  language: {
    label: "Language",
    english: "English",
    hindi: "Hindi",
    bengali: "Bengali",
    tamil: "Tamil",
    telugu: "Telugu",
    marathi: "Marathi"
  }
} as const;

export default en;
