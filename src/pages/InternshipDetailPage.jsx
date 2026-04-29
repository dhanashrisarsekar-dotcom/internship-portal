import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Building2, Banknote, CheckCircle2, Users } from 'lucide-react';
import { internships } from '../data/internships';

export default function InternshipDetailPage() {
  const { id } = useParams();
  const internship = internships.find(i => i.id === id);

  if (!internship) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Internship not found</h2>
        <Link to="/internships" className="text-[#008bdc] hover:underline font-bold">
          ← Back to Internships
        </Link>
      </div>
    );
  }

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    switch (badge.toLowerCase()) {
      case 'actively hiring': return 'bg-green-100 text-green-700';
      case 'top company': return 'bg-purple-100 text-purple-700';
      case 'part-time': return 'bg-yellow-100 text-yellow-700';
      case 'mba preferred': return 'bg-blue-100 text-blue-700';
      case 'high openings': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-[#008bdc] pt-8 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/internships" className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Internships
          </Link>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-xl flex-shrink-0">
              {internship.logo}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <span className="text-blue-100 font-bold text-lg">{internship.company}</span>
                {internship.badge && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeColor(internship.badge)}`}>
                    {internship.badge}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{internship.title}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-50 font-medium">
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 opacity-80"/> {internship.location}</span>
                <span className="flex items-center gap-2 capitalize"><Building2 className="w-5 h-5 opacity-80"/> {internship.mode.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Details) */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Internship Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Banknote className="w-4 h-4"/> Stipend</span>
                  <span className="font-bold text-gray-800">{internship.stipend}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Clock className="w-4 h-4"/> Duration</span>
                  <span className="font-bold text-gray-800">{internship.duration}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Calendar className="w-4 h-4"/> Deadline</span>
                  <span className="font-bold text-gray-800">{new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Users className="w-4 h-4"/> Openings</span>
                  <span className="font-bold text-gray-800">{internship.openings}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {internship.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-[#008bdc] border border-blue-100 px-4 py-2 rounded-lg font-bold text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About this Internship</h3>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                {internship.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Perks & Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {internship.perks.map((perk, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Sticky Apply Card) */}
          <div className="w-full lg:w-[340px]">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-gray-500 font-medium text-sm block mb-1">Stipend</span>
                <span className="text-3xl font-black text-[#008bdc]">{internship.stipend}</span>
              </div>
              
              <Link to={`/internships/${internship.id}/apply`} className="block w-full py-4 bg-[#008bdc] hover:bg-blue-700 text-white rounded-xl font-bold text-lg text-center shadow-lg shadow-sky-200 transition-all hover:-translate-y-0.5">
                Apply Now
              </Link>
              
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Applicants</span>
                  <span className="font-bold text-gray-800">{(internship.applicants || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Deadline</span>
                  <span className="font-bold text-red-600">{new Date(internship.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};


