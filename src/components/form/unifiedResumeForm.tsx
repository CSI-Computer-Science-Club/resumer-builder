'use client';

import { useState } from 'react';
import { useResume } from '@/lib/resumeContext';
import PersonalInfoForm from './personalInfoForm';
// import { SummaryForm } from './SummaryForm';
// import { WorkExperienceForm } from './WorkExperienceForm';
// import { EducationForm } from './EducationForm';
// import { ProjectsForm } from './ProjectsForm';
import SkillsForm from './skillsForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { FileUpload } from '@/components/FileUpload';
import { Resume } from '@/types/types';
// import { latexTemplates } from '@/lib/latexTemplates';

export function UnifiedResumeForm() {
  const [showUpload, setShowUpload] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    resume,
    updatePersonalInfo,
    updateSummary,
    updateWorkExperience,
    updateEducation,
    updateProjects,
    updateSkillCategories
  } = useResume();

  const handleFileUpload = (parsedData: { data: Resume }) => {
    const uploadedResume = parsedData.data;
    updatePersonalInfo(uploadedResume.personalInfo);
    updateSummary(uploadedResume.summary || '');
    updateWorkExperience(uploadedResume.workExperience);
    updateEducation(uploadedResume.education);
    updateProjects(uploadedResume.projects);
    updateSkillCategories(uploadedResume.skillCategories);
    setShowUpload(false);
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          templateId: selectedTemplate
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      
      if (data.success) {
        // In a real implementation, this would trigger a download
        alert(`Resume generated successfully! LaTeX source created. In production, a PDF would be downloaded.`);
        console.log('LaTeX source:', data.latex);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Build Your Resume</h1>
        <p className="text-gray-600">Upload an existing resume to get started quickly, or fill out the form manually</p>
      </div>

      {/* File Upload Section */}
      {/* {showUpload && (
        <div className="mb-8">
          <FileUpload onFileUploaded={handleFileUpload} />
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowUpload(false)}
            >
              Skip Upload - Start from Scratch
            </Button>
          </div>
        </div>
      )} */}

      {!showUpload && (
        <div className="text-center mb-6">
          <Button
            variant="outline"
            onClick={() => setShowUpload(true)}
          >
            Upload Resume Instead
          </Button>
        </div>
      )}

      {/* Personal Information Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Personal Information</CardTitle>
          <p className="text-gray-600">Your basic contact details and links</p>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm
            data={resume.personalInfo}
            onUpdate={updatePersonalInfo}
          />
        </CardContent>
      </Card>

      {/* Professional Summary Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Professional Summary</CardTitle>
          <p className="text-gray-600">A brief overview of your background and goals</p>
        </CardHeader>
        <CardContent>
          {/* <SummaryForm
            data={resume.summary || ''}
            onUpdate={updateSummary}
          /> */}
        </CardContent>
      </Card>

      {/* Work Experience Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Work Experience</CardTitle>
          <p className="text-gray-600">Your professional work history</p>
        </CardHeader>
        <CardContent>
          {/* <WorkExperienceForm
            data={resume.workExperience}
            onUpdate={updateWorkExperience}
          /> */}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Education</CardTitle>
          <p className="text-gray-600">Your academic background</p>
        </CardHeader>
        <CardContent>
          {/* <EducationForm
            data={resume.education}
            onUpdate={updateEducation}
          /> */}
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Projects</CardTitle>
          <p className="text-gray-600">Notable projects you&apos;ve worked on</p>
        </CardHeader>
        <CardContent>
          {/* <ProjectsForm
            data={resume.projects}
            onUpdate={updateProjects}
          /> */}
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Skills & Technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillsForm
            data={resume.skillCategories}
            onUpdate={updateSkillCategories}
          />
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Choose Template</CardTitle>
          <p className="text-gray-600">Select a professional template for your resume</p>
        </CardHeader>
        <CardContent>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latexTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-500 font-medium">
                  {template.name}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
                {selectedTemplate === template.id && (
                  <div className="mt-3 text-blue-600 text-sm font-medium">
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </div> */}
        </CardContent>
      </Card>

      {/* Generate Resume Button */}
      <div className="text-center py-8">
        <Button
          onClick={handleGenerateResume}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 text-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isGenerating ? 'Generating PDF...' : 'Generate Resume PDF'}
        </Button>
        <p className="text-gray-500 text-sm mt-3">
          Make sure all sections are filled out before generating your resume
        </p>
      </div>
    </div>
  );
}