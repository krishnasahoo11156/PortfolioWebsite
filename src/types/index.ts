// ============================================================
// Krishna's Portfolio — Global Type Definitions
// ============================================================

export interface Project {
  id: string;
  number: string;            // "01", "02", etc.
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export type ProjectCategory =
  | "WEB APP"
  | "AI TOOL"
  | "OPEN SOURCE"
  | "MOBILE APP"
  | "CLI TOOL"
  | "API";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: Proficiency;
  years: number;
  relatedSkills: string[];   // IDs of connected skills
  projects: string[];        // IDs of projects using this skill
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Language"
  | "Tool";

export type Proficiency =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export interface Achievement {
  id: string;
  icon: AchievementIcon;
  category: string;          // "HACKATHON", "CERTIFICATION", etc.
  title: string;
  description: string;
  date: string;              // "Mar 2024"
}

export type AchievementIcon =
  | "trophy"
  | "medal"
  | "code"
  | "star"
  | "certificate"
  | "rocket";

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  techTags: string[];
  type: TimelineType;
}

export type TimelineType =
  | "education"
  | "project"
  | "hackathon"
  | "opensource"
  | "internship"
  | "milestone";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface HeartCounterData {
  totalClicks: number;
}

export interface DevConsoleCommand {
  name: string;
  description: string;
  action: () => void;
}

export interface EasterEgg {
  id: number;
  name: string;
  hint: string;
  found: boolean;
}
