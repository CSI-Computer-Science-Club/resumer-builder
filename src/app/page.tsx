'use client';

import { useState } from 'react';
// import { TemplateModal } from '@/components/TemplateModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-10 shadow-xl">
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LaTeX Resume Builder
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes with AI-powered assistance. Upload your existing resume or start from scratch with our intelligent form builder.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl text-center shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              📄
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload & Parse</h3>
            <p className="text-gray-600">
              Upload your existing resume in PDF, DOCX, or TXT format and let our AI extract and organize your information automatically.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl text-center shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🤖
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Enhancement</h3>
            <p className="text-gray-600">
              Get intelligent suggestions to improve your bullet points, optimize for ATS systems, and enhance your professional presentation.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl text-center shadow-md hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6">
              ⚡
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">LaTeX Quality</h3>
            <p className="text-gray-600">
              Generate professional, pixel-perfect PDF resumes using LaTeX formatting that stands out to employers.
            </p>
          </div>
        </div>
      </div>

      {/* <TemplateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      /> */}
    </>
  );
}
