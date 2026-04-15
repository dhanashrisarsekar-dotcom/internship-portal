import React from 'react';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ArrowUpTrayIcon 
} from '@heroicons/react/24/outline';

const ResumePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Your Internship Resume
        </h1>

        {/* Import Resume Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Import your resume</h2>
            <p className="text-gray-500 mt-1">
              We will scan your resume and pre-fill sections to help you save time
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-500 font-medium hover:text-blue-600">
            Upload Resume <ArrowUpTrayIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6 flex items-center gap-3">
          <div className="bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            !
          </div>
          <p className="text-orange-800 text-sm">
            This is the resume employers will see when you apply. Please make sure it is up to date.
          </p>
        </div>

        {/* Main Resume Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Header Info */}
          <div className="p-8 border-b border-gray-100 relative">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-800">Dhanashri Sarsekar</h2>
                  <PencilSquareIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
                </div>
                <p className="text-gray-600 mt-2">dhanashrisarsekar@gmail.com</p>
                <p className="text-gray-600">+91 7741945536</p>
                <p className="text-gray-600">Sangli</p>
              </div>
              <button className="flex items-center gap-1 text-blue-500 font-medium text-sm">
                <ArrowDownTrayIcon className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {/* Dynamic Sections */}
          <div className="p-8 space-y-10">
            {/* Career Objective */}
            <ResumeSection title="CAREER OBJECTIVE">
              <AddButton label="Add career objective" />
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="EDUCATION">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800">B.Tech, Computer Science & Engineering</h4>
                  <p className="text-gray-600">BIT Sindri</p>
                  <p className="text-gray-500 text-sm">2026 - 2031</p>
                </div>
                <div className="flex gap-4 text-gray-400">
                  <PencilSquareIcon className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                  <TrashIcon className="w-5 h-5 cursor-pointer hover:text-red-500" />
                </div>
              </div>
              <AddButton label="Add education" />
            </ResumeSection>

            {/* Work Experience */}
            <ResumeSection title="WORK EXPERIENCE">
              <div className="flex gap-6">
                <AddButton label="Add job" />
                <AddButton label="Add internship" />
              </div>
            </ResumeSection>

            {/* Extra Curricular */}
            <ResumeSection title="EXTRA CURRICULAR ACTIVITIES">
              <AddButton label="Add extra curricular activities" />
            </ResumeSection>

            {/* Projects */}
            <ResumeSection title="ACADEMICS/ PERSONAL PROJECTS">
              <AddButton label="Add academic/ personal project" />
            </ResumeSection>

            {/* Skills */}
            <ResumeSection title="SKILLS">
              <AddButton label="Add skill" />
            </ResumeSection>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-500 text-white font-bold py-3 px-10 rounded shadow-md hover:bg-blue-600 transition-colors">
            Proceed to application
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const ResumeSection = ({ title, children }) => (
  <div className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
    <h3 className="text-gray-500 font-bold text-sm tracking-widest mb-4">{title}</h3>
    {children}
  </div>
);

// Reusable Add Button Component
const AddButton = ({ label }) => (
  <button className="flex items-center gap-1 text-blue-500 font-medium text-sm hover:underline">
    <PlusIcon className="w-4 h-4" /> {label}
  </button>
);

export default ResumePage;