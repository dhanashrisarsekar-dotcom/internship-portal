import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight, ChevronDown, Home, Clock, Share2,
  Users, Calendar, Timer, Wallet, Building2, TrendingUp
} from 'lucide-react';

// ─── Same jobsData as WFHJobsPage (in real app, move this to a shared file) ───
const jobsData = [
  {
    id: 1, title: "Content Writer", company: "Appnigma AI",
    companyLocation: "Sacramento, United States",
    salary: "₹ 5,00,000 - 8,00,000", experience: "1 year(s)", type: "Work from home",
    description: "We're looking for a LinkedIn Content Writer who will own our brand voice and thought leadership in the AI space.",
    skills: ["Content Writing", "Content Marketing", "LinkedIn Marketing"],
    postedAt: "Just now", badge: "early", tags: ["International"], activelyHiring: true,
    // Detail-specific fields
    startDate: "Immediately",
    duration: "Full-time",
    applicants: 42,
    openings: 2,
    applyBy: "30 Apr' 26",
    aboutWork: `As a Content Writer at Appnigma AI, you will own our brand voice and thought leadership in the AI space.

Selected candidate's day-to-day responsibilities include:

1. Writing high-quality LinkedIn posts, articles, and long-form content on AI topics
2. Developing and maintaining a consistent brand voice across all content channels
3. Researching industry trends and translating complex AI concepts into accessible content
4. Collaborating with marketing and product teams to align messaging
5. Analyzing content performance and optimizing based on engagement metrics
6. Creating email newsletters, blog posts, and case studies
7. Managing content calendar and ensuring timely delivery`,
    whoCanApply: `Only those candidates can apply who:
1. are available for the work from home job
2. can start immediately
3. have relevant skills and interests
4. have 1+ year of content writing experience
* Candidates with strong LinkedIn presence preferred.`,
    perks: ["Certificate", "Letter of recommendation", "Flexible work hours"],
    aboutCompany: "Appnigma AI is a cutting-edge artificial intelligence company based in Sacramento, United States. We build intelligent tools and platforms to help businesses leverage the power of AI for growth and efficiency.",
    activity: { since: "March 2023", opportunities: 45, hired: 120 },
    companyType: null,
  },
  {
    id: 2, title: "Agentic AI Associate", company: "Awarno",
    companyLocation: null,
    salary: "₹ 3,00,000 - 4,50,000", experience: "1 year(s)", type: "Work from home",
    description: "Key Responsibilities: 1. Build and manage automation workflows using n8n 2. Design and deploy intelligent agents.",
    skills: ["Artificial Intelligence"],
    postedAt: "Just now", badge: "early", tags: [], activelyHiring: true,
    startDate: "Immediately", duration: "Full-time", applicants: 28, openings: 3,
    applyBy: "15 May' 26",
    aboutWork: `As an Agentic AI Associate at Awarno, you will be at the forefront of intelligent automation.

Selected candidate's day-to-day responsibilities include:

1. Build and manage automation workflows using n8n
2. Design and deploy intelligent AI agents for various business use cases
3. Integrate LLMs with external APIs and data sources
4. Monitor and improve agent performance over time
5. Document workflows and maintain technical documentation`,
    whoCanApply: `Only those candidates can apply who:
1. are available for the work from home job
2. can start immediately
3. have experience with AI tools and automation platforms
4. have relevant skills and interests`,
    perks: ["Certificate", "Flexible work hours", "5 days a week"],
    aboutCompany: "Awarno is an innovative AI solutions company helping businesses automate complex workflows using cutting-edge agentic AI technology.",
    activity: { since: "January 2024", opportunities: 12, hired: 30 },
    companyType: null,
  },
  {
    id: 3, title: "Dental Patient Coordinator (USA Remote)", company: "Todays Dental Services",
    companyLocation: null,
    salary: "₹ 2,40,000 - 3,00,000", experience: "No experience required", type: "Work from home",
    description: "Key Responsibilities: 1. Handle patient inquiries with excellent communication and listening skills 2. Coordinate appointments.",
    skills: ["Attention to Detail", "Time Management", "Problem Solving", "Client Relationship Management (CRM)", "Effective Communication", "Patient Counseling"],
    postedAt: "Just now", badge: "early", tags: ["Fresher Job"], activelyHiring: true,
    startDate: "Immediately", duration: "Full-time", applicants: 67, openings: 5,
    applyBy: "20 May' 26",
    aboutWork: `As a Dental Patient Coordinator at Todays Dental Services, you will be the first point of contact for patients.

Selected candidate's day-to-day responsibilities include:

1. Handle patient inquiries with excellent communication and listening skills
2. Coordinate and schedule patient appointments efficiently
3. Maintain accurate patient records and follow-up schedules
4. Communicate treatment plans and financial options to patients
5. Work closely with dental teams to ensure seamless patient experience`,
    whoCanApply: `Only those candidates can apply who:
1. are available for the work from home job/internship
2. can start immediately
3. are available for the required duration
4. have relevant skills and interests
* Freshers are welcome to apply.`,
    perks: ["Certificate", "Letter of recommendation"],
    aboutCompany: "Todays Dental Services provides remote patient coordination services to dental practices across the United States.",
    activity: { since: "June 2022", opportunities: 89, hired: 310 },
    companyType: null,
  },
  {
    id: 4, title: "Sales Executive", company: "Golden Sparrow LLC",
    companyLocation: "San Francisco, United States",
    salary: "₹ 2,40,000", experience: "1 year(s)", type: "Work from home",
    description: "Key responsibilities: Conduct cold calling to potential leads and generate new business opportunities for the company.",
    skills: ["Cold Calling", "Effective Communication"],
    postedAt: "Today", badge: null, tags: ["International"], activelyHiring: true,
    startDate: "Immediately", duration: "Full-time", applicants: 35, openings: 4,
    applyBy: "25 Apr' 26",
    aboutWork: `As a Sales Executive at Golden Sparrow LLC, you will drive new business growth through proactive outreach.

Selected candidate's day-to-day responsibilities include:

1. Conduct cold calling to potential leads and generate new business opportunities
2. Follow up with prospects and maintain a consistent sales pipeline
3. Present product/service offerings clearly and persuasively
4. Meet and exceed monthly sales targets
5. Maintain CRM records and report on sales activity`,
    whoCanApply: `Only those candidates can apply who:
1. are available for the work from home job
2. can start immediately
3. have 1+ year of sales experience
4. have relevant skills and interests`,
    perks: ["5 days a week", "Informal dress code"],
    aboutCompany: "Golden Sparrow LLC is a US-based business development firm focused on B2B sales across multiple verticals.",
    activity: { since: "August 2021", opportunities: 200, hired: 750 },
    companyType: null,
  },
  {
    id: 5, title: "Telecaller", company: "Sunny_6400 Limited",
    companyLocation: null, salary: "₹ 4,00,000 - 6,00,000", experience: "No experience required", type: "Work from home",
    description: "Are you a dynamic and energetic individual with excellent communication skills and a knack for sales? Join us!",
    skills: ["MS-Excel"], postedAt: "Today", badge: null, tags: ["Fresher Job", "Part time"], activelyHiring: true,
    startDate: "Immediately", duration: "Part-time", applicants: 91, openings: 10, applyBy: "30 Apr' 26",
    aboutWork: `As a Telecaller at Sunny_6400 Limited, you will connect with customers and drive sales through effective communication.\n\n1. Make outbound calls to potential customers\n2. Explain products/services clearly\n3. Maintain call records in MS-Excel\n4. Meet daily call targets\n5. Handle customer queries professionally`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. are available for part-time work\n4. have relevant skills and interests\n* Freshers are welcome.`,
    perks: ["Flexible work hours", "Certificate"],
    aboutCompany: "Sunny_6400 Limited is a dynamic sales organization with a focus on telecalling and customer outreach.",
    activity: { since: "January 2020", opportunities: 500, hired: 2100 },
    companyType: null,
  },
  {
    id: 6, title: "Senior Telecaller", company: "Sunny_6400 Limited", companyLocation: null,
    salary: "₹ 4,00,000 - 6,00,000", experience: "No experience required", type: "Work from home",
    description: "As a Senior Telecaller at Sunny_6400 Limited, you will be an essential part of our dynamic sales team.",
    skills: ["MS-Excel"], postedAt: "Today", badge: null, tags: ["Fresher Job", "Part time"], activelyHiring: true,
    startDate: "Immediately", duration: "Part-time", applicants: 54, openings: 5, applyBy: "30 Apr' 26",
    aboutWork: `As a Senior Telecaller, you will lead a team and drive sales performance.\n\n1. Handle escalated customer calls\n2. Train junior telecallers\n3. Maintain and update Excel records\n4. Achieve team targets\n5. Report daily performance to management`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. are available for part-time work\n4. have relevant skills\n* Freshers welcome.`,
    perks: ["Flexible work hours", "Certificate", "Letter of recommendation"],
    aboutCompany: "Sunny_6400 Limited is a dynamic sales organization with a focus on telecalling and customer outreach.",
    activity: { since: "January 2020", opportunities: 500, hired: 2100 }, companyType: null,
  },
  {
    id: 7, title: "Video Editor", company: "Ankit Chahal", companyLocation: null,
    salary: "₹ 2,00,000", experience: "1 year(s)", type: "Work from home",
    description: "We are looking for a talented Video Editor to join our team at Ankit Chahal company.",
    skills: ["Video Editing", "Adobe Premiere Pro", "Final Cut Pro", "Video Making"],
    postedAt: "1 day ago", badge: null, tags: [], activelyHiring: false,
    startDate: "Immediately", duration: "Full-time", applicants: 19, openings: 1, applyBy: "10 May' 26",
    aboutWork: `As a Video Editor at Ankit Chahal, you will create compelling video content.\n\n1. Edit and assemble footage into finished content\n2. Add music, effects, and transitions\n3. Color grade and audio mix videos\n4. Deliver assets in required formats\n5. Collaborate with content team`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have 1+ year of video editing experience\n4. are proficient in Premiere Pro or Final Cut Pro`,
    perks: ["Flexible work hours", "5 days a week"],
    aboutCompany: "Ankit Chahal is a content creator and digital media company specializing in YouTube and social media video content.",
    activity: { since: "May 2023", opportunities: 8, hired: 15 }, companyType: null,
  },
  {
    id: 8, title: "Biomedical Research Assistant", company: "Sandesh Kandel", companyLocation: null,
    salary: "₹ 2,50,000 - 10,00,000", experience: "1 year(s)", type: "Work from home",
    description: "Key responsibilities: 1. Assist in assembling and integrating biomedical sensors 2. Guide the practical implementation of research.",
    skills: ["Arduino", "Circuit Design", "Circuit Modeling & Simulation", "ESP32"],
    postedAt: "2 days ago", badge: null, tags: ["Part time"], activelyHiring: false,
    startDate: "Immediately", duration: "Part-time", applicants: 11, openings: 2, applyBy: "5 May' 26",
    aboutWork: `As a Biomedical Research Assistant, you will support cutting-edge sensor research.\n\n1. Assist in assembling and integrating biomedical sensors\n2. Guide practical implementation of research prototypes\n3. Document experiments and results\n4. Work with Arduino and ESP32 platforms\n5. Collaborate remotely with research team`,
    whoCanApply: `1. are available for the work from home job\n2. are available for part-time work\n3. have experience with Arduino/ESP32\n4. have relevant skills and interests`,
    perks: ["Certificate", "Letter of recommendation"],
    aboutCompany: "Sandesh Kandel Research Lab focuses on developing low-cost biomedical devices for healthcare applications.",
    activity: { since: "September 2023", opportunities: 5, hired: 8 }, companyType: null,
  },
  {
    id: 9, title: "Senior Software Developer", company: "Sanvya Health", companyLocation: null,
    salary: "₹ 2,05,000 - 3,85,000", experience: "1 year(s)", type: "Work from home",
    description: "Key responsibilities: 1. Collaborate with the development team to design and implement front-end and back-end solutions.",
    skills: ["PHP", "JavaScript", "Nginx", "AngularJS", "PostgreSQL", "Docker", "GitHub"],
    postedAt: "Today", badge: null, tags: [], activelyHiring: false,
    startDate: "Immediately", duration: "Full-time", applicants: 23, openings: 2, applyBy: "20 May' 26",
    aboutWork: `As a Senior Software Developer at Sanvya Health, you will build and maintain healthcare software.\n\n1. Collaborate with the team to design and implement full-stack solutions\n2. Write clean, maintainable PHP and JavaScript code\n3. Manage deployments using Docker and Nginx\n4. Optimize PostgreSQL database queries\n5. Review code and mentor junior developers`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have 1+ year of relevant experience\n4. are proficient in the required tech stack`,
    perks: ["5 days a week", "Health insurance"],
    aboutCompany: "Sanvya Health is a digital health startup building technology solutions for modern healthcare challenges.",
    activity: { since: "February 2022", opportunities: 30, hired: 65 }, companyType: null,
  },
  {
    id: 10, title: "Human Resources (HR) Supervisor", company: "Sunny_6400 Limited", companyLocation: null,
    salary: "₹ 4,00,000 - 6,00,000", experience: "No experience required", type: "Work from home",
    description: "Are you a dynamic and experienced Human Resources professional looking for a new challenge? Join our growing team.",
    skills: ["MS-Excel"], postedAt: "Today", badge: null, tags: ["Fresher Job", "Part time"], activelyHiring: true,
    startDate: "Immediately", duration: "Part-time", applicants: 77, openings: 8, applyBy: "30 Apr' 26",
    aboutWork: `As an HR Supervisor, you will oversee HR operations at Sunny_6400 Limited.\n\n1. Manage recruitment and onboarding processes\n2. Maintain employee records in MS-Excel\n3. Handle employee queries and grievances\n4. Coordinate performance reviews\n5. Ensure HR policy compliance`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. are available for part-time work\n4. have relevant skills\n* Freshers welcome.`,
    perks: ["Flexible work hours", "Certificate"],
    aboutCompany: "Sunny_6400 Limited is a growing organization with a strong focus on building talented teams.",
    activity: { since: "January 2020", opportunities: 500, hired: 2100 }, companyType: null,
  },
  {
    id: 11, title: "Human Resources (HR) Manager", company: "Sunny_6400 Limited", companyLocation: null,
    salary: "₹ 4,00,000 - 6,00,000", experience: "No experience required", type: "Work from home",
    description: "Are you a skilled Human Resources (HR) Manager with a knack for MS-Excel? Sunny_6400 Limited is looking for you.",
    skills: ["MS-Excel"], postedAt: "Today", badge: null, tags: ["Fresher Job", "Part time"], activelyHiring: true,
    startDate: "Immediately", duration: "Part-time", applicants: 63, openings: 5, applyBy: "30 Apr' 26",
    aboutWork: `As an HR Manager, you will lead the HR function at Sunny_6400 Limited.\n\n1. Develop and implement HR strategies\n2. Oversee recruitment, onboarding, and offboarding\n3. Manage performance management systems\n4. Handle employee relations and conflict resolution\n5. Report HR metrics to senior management`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. are available for part-time work\n4. have relevant skills\n* Freshers welcome.`,
    perks: ["Flexible work hours", "Certificate", "Letter of recommendation"],
    aboutCompany: "Sunny_6400 Limited is a growing organization focused on building excellent teams.",
    activity: { since: "January 2020", opportunities: 500, hired: 2100 }, companyType: null,
  },
  {
    id: 12, title: "Junior Company Secretary (CS)", company: "Registration Arena", companyLocation: null,
    salary: "₹ 2,40,000 - 3,00,000", experience: "No experience required", type: "Work from home",
    description: "Key Responsibilities: 1. Handle company and LLP incorporations. 2. Manage secretarial audits, due diligence, and compliance.",
    skills: ["MS-Office", "Company Law", "English Proficiency (Spoken)", "English Proficiency (Written)"],
    postedAt: "5 days ago", badge: null, tags: ["Fresher Job"], activelyHiring: true,
    startDate: "Immediately", duration: "Full-time", applicants: 48, openings: 3, applyBy: "15 May' 26",
    aboutWork: `As a Junior Company Secretary at Registration Arena, you will handle legal and compliance work.\n\n1. Handle company and LLP incorporations\n2. Manage secretarial audits and due diligence\n3. Prepare and file statutory documents\n4. Maintain statutory registers and records\n5. Assist senior CS professionals`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have knowledge of Company Law\n4. have relevant skills and interests\n* Freshers welcome.`,
    perks: ["Certificate", "Letter of recommendation", "Flexible work hours"],
    aboutCompany: "Registration Arena is a legal and compliance services firm helping businesses navigate company registrations and secretarial compliance.",
    activity: { since: "April 2019", opportunities: 150, hired: 420 }, companyType: null,
  },
  {
    id: 13, title: "CAD Designer", company: "Velozity Global Solutions", companyLocation: null,
    salary: "₹ 2,20,000 - 2,40,000", experience: "1 year(s)", type: "Work from home",
    description: "As a CAD Designer at Velozity Global Solutions, you will have the opportunity to utilize your expertise in AutoCAD.",
    skills: ["AutoCAD", "Autodesk 3ds Max"],
    postedAt: "3 days ago", badge: null, tags: [], activelyHiring: true,
    startDate: "Immediately", duration: "Full-time", applicants: 16, openings: 2, applyBy: "1 May' 26",
    aboutWork: `As a CAD Designer at Velozity Global Solutions, you will create technical drawings and 3D models.\n\n1. Create detailed CAD drawings using AutoCAD\n2. Develop 3D models using Autodesk 3ds Max\n3. Review and revise designs based on feedback\n4. Coordinate with engineering and production teams\n5. Maintain design documentation`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have 1+ year of CAD experience\n4. are proficient in AutoCAD`,
    perks: ["Certificate", "5 days a week"],
    aboutCompany: "Velozity Global Solutions is a product design and engineering firm delivering innovative CAD solutions.",
    activity: { since: "July 2021", opportunities: 40, hired: 95 }, companyType: null,
  },
  {
    id: 14, title: "Video Creator", company: "Napraj Moving Packing Private Limited", companyLocation: null,
    salary: "₹ 12,00,000", experience: "No experience required", type: "Work from home",
    description: "As a Video Creator, you will have the exciting opportunity to showcase your creative talents and make an impact.",
    skills: ["Video Making"], postedAt: "Just now", badge: "early", tags: ["Fresher Job"], activelyHiring: false,
    startDate: "Immediately", duration: "Full-time", applicants: 7, openings: 1, applyBy: "30 May' 26",
    aboutWork: `As a Video Creator at Napraj Moving Packing, you will produce engaging video content.\n\n1. Conceptualize and create video content for social media\n2. Script, shoot, and edit videos\n3. Optimize content for different platforms\n4. Track performance metrics and improve content strategy\n5. Collaborate with the marketing team`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have passion for video creation\n4. have relevant skills and interests\n* Freshers welcome.`,
    perks: ["Certificate", "Flexible work hours", "Letter of recommendation"],
    aboutCompany: "Napraj Moving Packing Private Limited is expanding its digital presence through creative video content.",
    activity: { since: "March 2022", opportunities: 20, hired: 45 }, companyType: null,
  },
  {
    id: 15, title: "Revit Drafter", company: "ZAR Architectural Prospective Drawings Services Co LLC", companyLocation: null,
    salary: "₹ 5,00,000 - 6,00,000", experience: "1 year(s)", type: "Work from home",
    description: "Key responsibilities: 1. Creating BIM (building information model) with Autodesk Revit Software 2. Architectural drafting.",
    skills: ["AutoCAD", "Autodesk Revit", "BIM (Building Information Modeling)"],
    postedAt: "3 weeks ago", badge: null, tags: [], activelyHiring: false,
    startDate: "Immediately", duration: "Full-time", applicants: 33, openings: 2, applyBy: "5 May' 26",
    aboutWork: `As a Revit Drafter at ZAR Architectural, you will produce high-quality BIM models.\n\n1. Create BIM models using Autodesk Revit\n2. Produce architectural drawings and documentation\n3. Coordinate with architects and project managers\n4. Ensure drawings meet project specifications\n5. Maintain and update drawing sets throughout project lifecycle`,
    whoCanApply: `1. are available for the work from home job\n2. can start immediately\n3. have 1+ year of Revit experience\n4. have relevant skills and interests`,
    perks: ["Flexible work hours", "Certificate"],
    aboutCompany: "ZAR Architectural Prospective Drawings Services Co LLC provides architectural drafting and BIM services to clients worldwide.",
    activity: { since: "October 2020", opportunities: 60, hired: 180 }, companyType: null,
  },
];

// ─── Navbar (reused) ───────────────────────────────────────────────────────────
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 lg:px-10 py-3 flex items-center justify-between">
      <div
        className="text-[#008bdc] font-black text-2xl italic tracking-tighter cursor-pointer"
        onClick={() => navigate('/')}
      >
        INTERNSHALA
      </div>
      <div className="hidden md:flex items-center gap-6 text-[14px] font-semibold text-gray-500">
        <button className="hover:text-[#008bdc] flex items-center gap-1">Internships <ChevronDown className="w-4 h-4" /></button>
        <button className="hover:text-[#008bdc] flex items-center gap-1">
          Courses
          <span className="ml-1 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">OFFER</span>
          <ChevronDown className="w-4 h-4" />
        </button>
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
          <button onClick={() => navigate('/jobs/wfh')} className="text-[#008bdc] underline text-sm mt-2">
            ← Back to WFH Jobs
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
          <button onClick={() => navigate('/jobs/wfh')} className="hover:text-[#008bdc]">Jobs</button>
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

              {/* Activity on Internshala */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-[13px] font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#008bdc]" /> Activity on Internshala
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
