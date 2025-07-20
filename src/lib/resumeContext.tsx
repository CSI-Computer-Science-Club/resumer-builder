'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Resume, PersonalInfo, SkillCategory, WorkExperience, Education, Project } from '@/types/resume';

interface ResumeContextType {
  resume: Resume;
  updatePersonalInfo: (data: PersonalInfo) => void;
  updateSummary: (summary: string) => void;
  updateSkillCategories: (categories: SkillCategory[]) => void;
  updateWorkExperience: (experience: WorkExperience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateProjects: (projects: Project[]) => void;
}

const defaultResume: Resume = {
  id: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    additionalInfo: []
  },
  summary: '',
  workExperience: [],
  education: [],
  projects: [],
  skillCategories: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume);

  const updatePersonalInfo = (data: PersonalInfo) => {
    setResume(prev => ({
      ...prev,
      personalInfo: data,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateSummary = (summary: string) => {
    setResume(prev => ({
      ...prev,
      summary,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateSkillCategories = (categories: SkillCategory[]) => {
    setResume(prev => ({
      ...prev,
      skillCategories: categories,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateWorkExperience = (experience: WorkExperience[]) => {
    setResume(prev => ({
      ...prev,
      workExperience: experience,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateEducation = (education: Education[]) => {
    setResume(prev => ({
      ...prev,
      education,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateProjects = (projects: Project[]) => {
    setResume(prev => ({
      ...prev,
      projects,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resume,
      updatePersonalInfo,
      updateSummary,
      updateSkillCategories,
      updateWorkExperience,
      updateEducation,
      updateProjects
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}