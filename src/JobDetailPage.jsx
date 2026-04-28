import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, Home, Clock, Share2,
  Users, Calendar, Timer, Wallet, Building2, TrendingUp
} from 'lucide-react';

// ─── Same jobsData as WFHJobsPage (in real app, move this to a shared file) ───
import { jobsData } from './data/jobsData';

// ─── Navbar (reused) ───────────────────────────────────────────────────────────
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 lg:px-10 py-3 flex items-center justify-between">
      <div
        className="text-[#008bdc] font-black text-2xl italic tracking-tighter cursor-pointer"
        onClick={() => navigate('/')}
      >
        CAREERBRIDGE
      </div>
      <div className="hidden md:flex items-center gap-6 text-[14px] font-semibold text-gray-500">
        <button className="hover:text-[#008bdc] flex items-center gap-1">Internships <ChevronDown className="w-4 h-4" /></button>
        <Link to="/courses" className="hover:text-[#008bdc] flex items-center gap-1">
          Courses
          <span className="ml-1 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">OFFER</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
        <button className="text-[#008bdc] border-b-2 border-[#008bdc] pb-0.5 flex items-center gap-1">
          Jobs <ChevronDown className="w-4 h-4" />
        </button>
        <span className="text-gray-300">|</span>
        <button className="text-gray-500 hover:text-[#008bdc]">Login / Register <ChevronDown className="w-4 h-4 inline" /></button>
      </div>
    </nav>
  );
};

// ─── Main Job Detail Page ──────────────────────────────────────────────────────
const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const job = jobsData.find(j => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <p className="text-xl font-bold text-gray-600 mb-2">Job not found</p>
          <button onClick={() => navigate('/jobs')} className="text-[#008bdc] underline text-sm mt-2">
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#008bdc]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/jobs')} className="hover:text-[#008bdc]">Jobs</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-medium truncate">{job.title}</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title} - Job</h1>
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 pb-16">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {/* ── Top Section ── */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Actively Hiring Badge */}
                {job.activelyHiring && (
                  <div className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-4">
                    <TrendingUp className="w-3.5 h-3.5 text-[#008bdc]" /> Actively hiring
                  </div>
                )}

                <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-600 font-medium text-[15px]">{job.company}</span>
                  {job.companyLocation && (
                    <span className="text-gray-400 text-[13px]">({job.companyLocation})</span>
                  )}
                </div>

                {/* Work type */}
                <div className="flex items-center gap-1.5 mt-3 text-[14px] text-gray-600">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span>{job.type}</span>
                </div>
              </div>

              {/* Company Logo */}
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 flex-shrink-0">
                <svg viewBox="0 0 40 40" className="w-10 h-10">
                  <rect width="40" height="40" rx="4" fill="#f3f4f6" />
                  <rect x="8" y="14" width="24" height="18" rx="2" fill="#d1d5db" />
                  <rect x="13" y="8" width="14" height="10" rx="2" fill="#9ca3af" />
                  <rect x="16" y="23" width="8" height="9" rx="1" fill="#f9fafb" />
                </svg>
              </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Calendar className="w-3.5 h-3.5" /> START DATE
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{job.startDate}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Timer className="w-3.5 h-3.5" /> DURATION
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{job.duration}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Wallet className="w-3.5 h-3.5" /> SALARY
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{job.salary}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5" /> APPLY BY
                </p>
                <p className="text-[15px] font-semibold text-gray-800">{job.applyBy}</p>
              </div>
            </div>

            {/* ── Tags ── */}
            <div className="flex items-center gap-2 flex-wrap mt-5">
              <span className={`flex items-center gap-1 text-[12px] font-medium ${
                ["Just now","Today"].includes(job.postedAt) ? "text-green-600" : "text-[#008bdc]"
              }`}>
                <Clock className="w-3.5 h-3.5" /> Posted {job.postedAt}
              </span>
              <span className="text-[12px] text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">Job</span>
              {job.tags.map((t, i) => (
                <span key={i} className="text-[12px] text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">{t}</span>
              ))}
            </div>

            {/* ── Applicants + Actions ── */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <Users className="w-4 h-4" />
                <span><strong className="text-gray-700">{job.applicants}</strong> applicants</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-[13px] font-semibold hover:border-[#008bdc] hover:text-[#008bdc] transition"
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? "Copied!" : "Share"}
                </button>
                <button
                  onClick={() => navigate(`/jobs/apply/${job.id}`)}
                  className="bg-[#008bdc] text-white px-8 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#0079c0] transition shadow-sm shadow-blue-200"
                >
                  Apply now
                </button>
              </div>
            </div>
          </div>

          {/* ── Body Content ── */}
          <div className="p-6 md:p-8 space-y-8">

            {/* About the work */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">About the work from home job</h3>
              <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                {job.aboutWork}
              </div>
            </section>

            {/* Skills required */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Skill(s) required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span key={i} className="text-[13px] text-gray-700 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-lg hover:border-[#008bdc] hover:text-[#008bdc] cursor-pointer transition">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Who can apply */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">Who can apply</h3>
              <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                {job.whoCanApply}
              </div>
            </section>

            {/* Perks */}
            {job.perks?.length > 0 && (
              <section>
                <h3 className="text-[17px] font-bold text-gray-900 mb-3">Perks</h3>
                <div className="flex flex-wrap gap-2">
                  {job.perks.map((perk, i) => (
                    <span key={i} className="text-[13px] text-gray-700 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-lg">
                      {perk}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Number of openings */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-2">Number of openings</h3>
              <p className="text-[15px] text-gray-700">{job.openings}</p>
            </section>

            {/* About the company */}
            <section>
              <h3 className="text-[17px] font-bold text-gray-900 mb-3">About {job.company}</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">{job.aboutCompany}</p>

              {/* Activity on CareerBridge */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-[13px] font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#008bdc]" /> Activity on CareerBridge
                </p>
                <div className="flex flex-wrap gap-6 text-[13px] text-gray-600">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    Hiring since {job.activity.since}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {job.activity.opportunities} opportunities posted
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    {job.activity.hired} candidates hired
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ── Bottom Apply Button ── */}
          <div className="px-6 md:px-8 pb-8 flex justify-center">
            <button
              onClick={() => navigate(`/jobs/apply/${job.id}`)}
              className="bg-[#008bdc] text-white px-16 py-3 rounded-lg font-bold text-[15px] hover:bg-[#0079c0] transition shadow-sm shadow-blue-200"
            >
              Apply now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
