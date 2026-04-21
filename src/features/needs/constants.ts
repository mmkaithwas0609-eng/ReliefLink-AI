export const needCategories = [
  "Food",
  "Medical",
  "Shelter",
  "Transport",
  "Supplies",
  "Rescue",
  "Elderly Support",
  "Child Support"
] as const;

export const needLanguages = [
  "English",
  "Hindi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi"
] as const;

export const needSkillOptions = [
  "First Aid",
  "Driving",
  "Translation",
  "Nursing",
  "Logistics",
  "Counselling",
  "Food Distribution",
  "Rescue Support"
] as const;

export const priorityThresholds = {
  low: 25,
  medium: 50,
  high: 75
} as const;
