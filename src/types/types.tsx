export interface SimpleInfo {
    title: string,
    value: string,
    isLink: boolean
}

export interface PersonalInfo {
    firstName: string,
    lastName: string,
    email: string,
    linkedIn: string,
    phone?: string,
    location?: string,
    github?: string,
    website?: string,
    additionalInfo?: SimpleInfo[]
}

export interface Education {
    id: string,
    institution: string,
    degree: string,
    major: string,
    minor?: string[],
    current: boolean,
    startDate: string,
    endDate: string | null,
    gpa?: string,
    honors?: string[]
}

export interface WorkExperience {
    id: string,
    company: string,
    position: string,
    startDate: string,
    endDate: string | null,
    current: boolean,
    location: string,
    description: string[]
}

export interface Project {
    id: string,
    name: string,
    description: string[],
    technologies: string[],
    startDate: string,
    endDate: string | null,
    current: boolean,
    link?: string,
}

export interface Skill {
    id: string,
    name: string,
}

export interface SkillCategory {
    id: string,
    title: string,
    skills?: Skill[]
}

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skillCategories: SkillCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  latexTemplate: string;
}