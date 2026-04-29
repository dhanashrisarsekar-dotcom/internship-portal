import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Calendar, Clock, Building2, Banknote, CheckCircle2, Users, Briefcase
} from 'lucide-react';

import { jobsData } from './data/jobsData';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobsData.find(j => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Job not found</h2>
        <Link to="/jobs" className="text-blue-600 hover:underline font-bold">
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    switch (badge.toLowerCase()) {
      case 'actively hiring': return 'bg-green-100 text-green-700';
      case 'fresher friendly': return 'bg-purple-100 text-purple-700';
      case 'part-time': return 'bg-yellow-100 text-yellow-700';
      case 'urgent': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 pt-8 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/jobs" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
          </Link>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-xl flex-shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <span className="text-blue-100 font-bold text-lg">{job.company}</span>
                {job.activelyHiring && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeColor('actively hiring')}`}>
                    Actively Hiring
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{job.title}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-50 font-medium">
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 opacity-80"/> {job.location || job.companyLocation || 'Remote'}</span>
                <span className="flex items-center gap-2 capitalize"><Briefcase className="w-5 h-5 opacity-80"/> {job.type === 'wfh' ? 'Work from home' : 'On-site'}</span>
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
              <h3 className="text-xl font-bold text-gray-800 mb-6">Job Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Banknote className="w-4 h-4"/> Salary</span>
                  <span className="font-bold text-gray-800">{job.salary}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Clock className="w-4 h-4"/> Experience</span>
                  <span className="font-bold text-gray-800">{job.experience}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Briefcase className="w-4 h-4"/> Job Type</span>
                  <span className="font-bold text-gray-800">{job.type === 'wfh' ? 'Work from home' : 'On-site'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><MapPin className="w-4 h-4"/> Location</span>
                  <span className="font-bold text-gray-800">{job.location || job.companyLocation || 'Remote'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Calendar className="w-4 h-4"/> Deadline</span>
                  <span className="font-bold text-gray-800">{job.applyBy || 'Applying soon'}</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm mb-1 font-medium flex items-center gap-1"><Users className="w-4 h-4"/> Openings</span>
                  <span className="font-bold text-gray-800">{job.openings || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-lg font-bold text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About this Role</h3>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                {job.aboutWork || job.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Who Can Apply</h3>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                {job.whoCanApply}
              </p>
            </div>

            {(job.perks && job.perks.length > 0) && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Perks & Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {job.perks.map((perk, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> {perk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Apply Card) */}
          <div className="w-full lg:w-[340px]">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-gray-500 font-medium text-sm block mb-1">Salary</span>
                <span className="text-3xl font-black text-blue-600">{job.salary}</span>
              </div>
              
              <Link to={`/jobs/apply/${job.id}`} className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg text-center shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
                Apply Now
              </Link>

              <button className="block w-full py-3 mt-3 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 rounded-xl font-bold text-center transition-all">
                Save Job
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Fast response time
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Direct employer contact
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Applicants</span>
                  <span className="font-bold text-gray-800">{(job.applicants || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Deadline</span>
                  <span className="font-bold text-red-600">{job.applyBy || 'Open'}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
