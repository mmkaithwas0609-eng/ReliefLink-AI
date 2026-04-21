export const dashboardHighlights = [
  {
    title: "Critical requests",
    value: "18",
    caption: "Incoming high-priority needs awaiting field action."
  },
  {
    title: "Active volunteers",
    value: "124",
    caption: "Available responders filtered by skills and proximity."
  },
  {
    title: "Average dispatch",
    value: "11 min",
    caption: "Time from need submission to coordinated assignment."
  }
];

export const modules = [
  {
    title: "Project setup and architecture",
    status: "Current",
    description:
      "App router foundation, shared UI system, typed configuration, and environment scaffolding."
  },
  {
    title: "Firebase integration",
    status: "Next",
    description:
      "Centralized Firebase client, Firestore collections, and secure service boundaries."
  },
  {
    title: "Authentication system",
    status: "Queued",
    description:
      "Role-aware sign-in for admins, volunteers, and NGO coordinators using Firebase Auth."
  },
  {
    title: "Need posting module",
    status: "Queued",
    description:
      "Structured need intake form with validation, geolocation, and category tagging."
  },
  {
    title: "Volunteer system",
    status: "Queued",
    description:
      "Volunteer profile management, skills, availability, and region coverage."
  },
  {
    title: "AI urgency scoring",
    status: "Queued",
    description:
      "Gemini-powered urgency analysis that scores severity and provides explainable reasoning."
  },
  {
    title: "Matching algorithm",
    status: "Queued",
    description:
      "Geo-intelligent fit ranking using distance, skills, urgency, and volunteer readiness."
  },
  {
    title: "Map integration",
    status: "Queued",
    description:
      "Live need and volunteer markers with Google Maps overlays and route-aware coordination."
  },
  {
    title: "SMS alerts",
    status: "Queued",
    description:
      "Twilio-triggered notifications for assignment, escalation, and status updates."
  },
  {
    title: "Impact analytics and i18n",
    status: "Queued",
    description:
      "Outcome dashboards, response metrics, and multilingual accessibility for wider reach."
  }
];
