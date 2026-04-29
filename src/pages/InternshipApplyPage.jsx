import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, FileText } from 'lucide-react';
import { internships } from '../data/internships';

export default function InternshipApplyPage() {
  const { id } = useParams();
  const internship = internships.find(i => i.id === id);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!internship) return <div className="p-20 text-center">Internship not found</div>;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            💼
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Application Submitted!</h2>
          <p className="text-gray-500 mb-6">
            You've successfully applied for the <strong className="text-gray-700">{internship.title}</strong> position at <strong className="text-gray-700">{internship.company}</strong>.
          </p>
          <div className="bg-blue-50 p-4 rounded-xl text-sm font-medium text-blue-800 mb-8 border border-blue-100">
            We'll contact you within 3-5 business days.
          </div>
          <Link to="/internships" className="block w-full py-4 bg-[#008bdc] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-200">
            Browse More Internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to={`/internships/${id}`} className="inline-flex items-center text-gray-500 hover:text-[#008bdc] mb-6 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Details
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#008bdc] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-blue-100 font-bold mb-2 block text-sm uppercase tracking-wider">{internship.company}</span>
              <h1 className="text-3xl font-extrabold mb-2 leading-tight">Apply for {internship.title}</h1>
              <p className="text-blue-100 font-medium">Submit your details below to stand out.</p>
            </div>
            <Briefcase className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-10" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">College/University</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="IIT Delhi" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Degree & Branch</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="B.Tech Computer Science" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Graduation Year</label>
                <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-white cursor-pointer">
                  <option value="">Select Year</option>
                  <option value="2028">2028</option>
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn Profile URL</label>
              <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="https://linkedin.com/in/username" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                <span>Resume Link</span>
                <span className="text-xs font-medium text-gray-400 font-normal">Google Drive/Dropbox</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input required type="url" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="Paste link here... (ensure anyone with link can view)" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none" placeholder="Why do you want this internship? Highlight your relevant skills and experience..."></textarea>
            </div>

            <hr className="border-gray-100 my-8" />

            <button type="submit" className="w-full py-4 bg-[#008bdc] hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-sky-200 hover:-translate-y-0.5">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


