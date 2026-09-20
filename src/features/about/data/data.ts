export interface SkillCategory {
  title: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "MOBILE DEVELOPMENT",
    skills: [
      "Flutter",
      "Dart",
      "React Native",
      "BLoC / Provider",
      "Clean Architecture",
    ],
  },
  {
    title: "FULLSTACK & WEB",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Vue",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "BACKEND & DATABASES",
    skills: [
      "RESTful APIs",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Git / CI/CD",
    ],
  },
];
