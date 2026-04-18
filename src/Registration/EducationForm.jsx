import React, { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';

const EducationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pursuing');
  const [performanceScale, setPerformanceScale] = useState('Percentage');
  const [formData, setFormData] = useState({
    college: '',
    degree: '',
    stream: '',
    performance: '',
    resume: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: Only proceed if college, degree, performance, and resume are present
    if (!formData.college || !formData.degree || !formData.performance || !formData.resume) {
      alert("Please fill in all required details and upload your resume.");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg p-8 animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Successfully Applied!</h2>
        <p className="text-gray-500 mt-2 text-center">
          Your application has been submitted. The employer will review your profile soon.
        </p>
        <button 
          onClick={() => window.location.href = '/internships'}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse More Internships
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 my-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Education details</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Graduation Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graduation status</label>
          <div className="flex gap-4">
            {['Pursuing', 'Completed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-2 border-2 rounded-full font-medium transition-all ${
                  selectedStatus === status 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* College Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
          <input 
            type="text" 
            placeholder="e.g. IIT Delhi" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.college}
            onChange={(e) => setFormData({...formData, college: e.target.value})}
            required
          />
        </div>

        {/* Years Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start year</label>
            <select className="w-full p-3 border rounded-lg outline-none">
              <option>Choose year</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End year</label>
            <select className="w-full p-3 border rounded-lg outline-none">
              <option>Choose year</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
            </select>
          </div>
        </div>

        {/* Degree & Stream */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input 
              type="text" 
              placeholder="e.g. B.Tech" 
              className="w-full p-3 border rounded-lg outline-none"
              value={formData.degree}
              onChange={(e) => setFormData({...formData, degree: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stream (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Computer Science" 
              className="w-full p-3 border rounded-lg outline-none"
              value={formData.stream}
              onChange={(e) => setFormData({...formData, stream: e.target.value})}
            />
          </div>
        </div>

        {/* Performance Scale (Clickable Changes) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Performance scale</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {['Percentage', 'CGPA (10)', 'CGPA (7)', 'CGPA (5)', 'CGPA (4)'].map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => setPerformanceScale(scale)}
                className={`px-4 py-1 border rounded-full text-sm transition-all ${
                  performanceScale === scale 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'text-gray-600 hover:border-blue-400 border-gray-300'
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder={`Enter ${performanceScale}`} 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.performance}
            onChange={(e) => setFormData({...formData, performance: e.target.value})}
            required
          />
        </div>

        {/* Resume Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <label className="cursor-pointer flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {formData.resume ? formData.resume.name : "Click to upload PDF resume"}
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept=".pdf"
                onChange={(e) => setFormData({...formData, resume: e.target.files[0]})}
              />
            </label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button 
            type="button" 
            className="px-6 py-2 text-gray-500 font-medium hover:text-gray-700"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button 
            type="submit" 
            className="px-10 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;