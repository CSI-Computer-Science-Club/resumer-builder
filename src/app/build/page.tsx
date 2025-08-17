'use client';

import { ResumeProvider } from '@/lib/resumeContext';
import { UnifiedResumeForm } from '@/components/form/unifiedResumeForm';

function ResumeBuilderContent() {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-xl">
      <div className="max-w-4xl mx-auto">
        <UnifiedResumeForm />
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
}