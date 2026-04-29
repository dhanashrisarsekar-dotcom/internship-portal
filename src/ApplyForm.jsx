import React, { useState, useEffect } from 'react';

/*
  HOW TO SET UP EMAILJS (one-time setup):
  1. Go to https://www.emailjs.com and create a free account
  2. Add a new Email Service → connect your Gmail → copy the Service ID
  3. Create a new Email Template with these variables:
       {{to_name}}         - applicant full name
       {{to_email}}        - applicant email (set as "To Email" in template)
       {{job_title}}       - position applied for
       {{company_name}}    - company name
       {{application_id}}  - unique application reference
       {{application_date}}- date of application
  4. Copy the Template ID
  5. Go to Account → copy your Public Key
  6. Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY in this file
  Free plan: 200 emails/month — enough for development and small scale
*/

import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ResumePreview from './ResumePreview';
import SkillsInput from './components/SkillsInput';
import HiddenResumeTemplate from './components/HiddenResumeTemplate';
import html2pdf from 'html2pdf.js';
import emailjs from '@emailjs/browser';
import {

  ChevronDown, ChevronRight, ChevronLeft, X, Search, Check, Info,

  Phone, Mail, User, MapPin, Plus, Briefcase

} from 'lucide-react';



// ─── Data ──────────────────────────────────────────────────────────────────────

import { jobsData } from './data/jobsData';



const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "French", "Japanese", "Bengali", "Kannada", "Gujarati", "Punjabi", "Urdu", "Malayalam", "Odia"];

const COURSES = ["B.Tech", "BE", "B.Com", "MBA", "B.A", "B.Sc", "M.Tech", "M.Com", "MCA", "PhD", "Diploma", "Integrated B.Tech & M.Tech"];

const TYPES = ["College student", "Fresher", "Working professional", "School student", "Woman returning to work"];

const CURRENT_YEAR = new Date().getFullYear();

const YEARS = Array.from(
  { length: 20 },
  (_, i) => (CURRENT_YEAR - 19 + i).toString()
);
const STREAMS = [

  "Computer Science & Engineering", "Electronics & Communication", "Mechanical Engineering",

  "Civil Engineering", "Information Technology", "Electrical Engineering",

  "Business Administration", "Commerce", "Arts & Humanities", "Medical Sciences",

  "Architecture", "Law", "Design", "Mass Communication"

];



// ─── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = ({ navigate }) => (

  <nav className="bg-white border-b sticky top-0 z-50 px-6 lg:px-10 py-3 flex items-center justify-between">

    <div

      className="flex items-center gap-1 cursor-pointer"

      onClick={() => navigate('/')}

    >

      <span className="text-[#008bdc] font-black text-2xl italic tracking-tighter">CAREERBRIDGE</span>

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

      <button className="text-gray-500 hover:text-[#008bdc]">Login / Register</button>

    </div>

  </nav>

);



// ─── Toggle Chip ───────────────────────────────────────────────────────────────

const Chip = ({ label, selected, onToggle, removable }) => (

  <button

    onClick={onToggle}

    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-all flex items-center gap-1.5 ${selected

      ? 'bg-[#008bdc] text-white border-[#008bdc]'

      : 'bg-white text-gray-700 border-gray-300 hover:border-[#008bdc] hover:text-[#008bdc]'

      }`}

  >

    {label}

    {selected && removable ? (

      <X className="w-3 h-3" />

    ) : !selected ? (

      <Plus className="w-3 h-3" />

    ) : null}

  </button>

);



// ─── Section label ─────────────────────────────────────────────────────────────

const Label = ({ children, optional }) => (

  <p className="text-[15px] font-semibold text-gray-800 mb-3">

    {children}

    {optional && <span className="text-gray-400 font-normal ml-1">(Optional)</span>}

  </p>

);



// ─── Text Input ────────────────────────────────────────────────────────────────

const TextInput = ({ value, onChange, placeholder, disabled, icon: Icon }) => (

  <div className="relative">

    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}

    <input

      type="text"

      value={value}

      onChange={e => onChange(e.target.value)}

      placeholder={placeholder}

      disabled={disabled}

      className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none transition

        ${Icon ? 'pl-9' : ''}

        ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white focus:border-[#008bdc]'}

      `}

    />

    {value && !disabled && (

      <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">

        <X className="w-4 h-4" />

      </button>

    )}

  </div>

);



// ─── Dropdown Select ───────────────────────────────────────────────────────────

const SelectInput = ({ value, onChange, options, placeholder }) => (

  <div className="relative">

    <select

      value={value}

      onChange={e => onChange(e.target.value)}

      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#008bdc] bg-white appearance-none cursor-pointer text-gray-700"

    >

      <option value="">{placeholder}</option>

      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}

    </select>

    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

  </div>

);



// ─── Step 1: Personal Details ──────────────────────────────────────────────────

const Step1 = ({ form, setForm }) => {

  const [langSearch, setLangSearch] = useState('');



  const toggleLanguage = (lang) => {

    setForm(prev => ({

      ...prev,

      languages: prev.languages.includes(lang)

        ? prev.languages.filter(l => l !== lang)

        : [...prev.languages, lang]

    }));

  };



  const filteredLangs = LANGUAGES.filter(l =>

    l.toLowerCase().includes(langSearch.toLowerCase()) && !form.languages.includes(l)

  );



  return (

    <div className="space-y-7">

      {/* Name */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>

          <Label>First name</Label>

          <TextInput value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} placeholder="e.g. Rahul" />

        </div>

        <div>

          <Label optional>Last name</Label>

          <TextInput value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} placeholder="e.g. Sharma" />

        </div>

      </div>



      {/* Email */}

      <div>

        <Label>Email</Label>

        <TextInput
          value={form.email}
          onChange={v => setForm(p => ({ ...p, email: v }))}
          placeholder="your@email.com"
          icon={Mail}
        />
      </div>



      {/* Phone */}

      <div>

        <Label>Contact number</Label>

        <div className="flex gap-2">

          <div className="border border-gray-300 rounded-lg px-3 py-3 text-[14px] text-gray-700 font-semibold bg-gray-50 flex-shrink-0">+91</div>

          <input

            type="tel"

            value={form.phone}

            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}

            placeholder="10-digit mobile number"

            maxLength={10}

            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#008bdc] transition"

          />

        </div>

      </div>



      {/* City */}

      <div>

        <Label>Current city</Label>

        <p className="text-[12px] text-gray-500 mb-2">To connect you with opportunities closer to you</p>

        <TextInput value={form.city} onChange={v => setForm(p => ({ ...p, city: v }))} placeholder="e.g. Mumbai, Maharashtra" icon={MapPin} />

      </div>



      {/* Gender */}

      <div>

        <Label>Gender</Label>

        <div className="flex flex-wrap gap-3">

          {[

            { label: "Female", emoji: "👧" },

            { label: "Male", emoji: "👦" },

            { label: "Others", emoji: "⭐" },

          ].map(({ label, emoji }) => (

            <button

              key={label}

              onClick={() => setForm(p => ({ ...p, gender: label }))}

              className={`px-5 py-2 rounded-full text-[14px] font-semibold border-2 transition-all flex items-center gap-2 ${form.gender === label

                ? 'bg-[#008bdc] text-white border-[#008bdc]'

                : 'bg-white text-gray-700 border-gray-300 hover:border-[#008bdc]'

                }`}

            >

              <span>{emoji}</span> {label}

            </button>

          ))}

        </div>

      </div>



      {/* Languages */}

      <div>

        <Label>Languages you know</Label>

        {/* Selected languages */}

        <div className="flex flex-wrap gap-2 mb-3">

          {form.languages.map(lang => (

            <Chip key={lang} label={lang} selected onToggle={() => toggleLanguage(lang)} removable />

          ))}

          {LANGUAGES.filter(l => !form.languages.includes(l)).slice(0, 5).map(lang => (

            <Chip key={lang} label={lang} selected={false} onToggle={() => toggleLanguage(lang)} />

          ))}

        </div>

        {/* Search more */}

        <div className="relative mt-2">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input

            type="text"

            value={langSearch}

            onChange={e => setLangSearch(e.target.value)}

            placeholder="+ Add more languages"

            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-[#008bdc] transition"

          />

        </div>

        {langSearch && filteredLangs.length > 0 && (

          <div className="border border-gray-200 rounded-lg mt-1 bg-white shadow-sm max-h-40 overflow-y-auto">

            {filteredLangs.map(lang => (

              <button

                key={lang}

                onClick={() => { toggleLanguage(lang); setLangSearch(''); }}

                className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#008bdc]"

              >

                {lang}

              </button>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};



// ─── Step 2: Academic Details ──────────────────────────────────────────────────

const Step2 = ({ form, setForm }) => {

  const [courseSearch, setCourseSearch] = useState('');



  return (

    <div className="space-y-7">

      {/* Type */}

      <div>

        <Label>Type</Label>

        <div className="flex flex-wrap gap-2">

          {TYPES.map(type => (

            <button

              key={type}

              onClick={() => setForm(p => ({ ...p, type }))}

              className={`px-5 py-2 rounded-full text-[13px] font-semibold border-2 transition-all ${form.type === type

                ? 'bg-[#008bdc] text-white border-[#008bdc]'

                : 'bg-white text-gray-700 border-gray-300 hover:border-[#008bdc]'

                }`}

            >

              {type}

            </button>

          ))}

        </div>

      </div>



      {/* Course */}

      <div>

        <Label>Course</Label>

        <div className="flex flex-wrap gap-2 mb-3">

          {COURSES.map(course => (

            <button

              key={course}

              onClick={() => setForm(p => ({ ...p, course }))}

              className={`px-4 py-2 rounded-full text-[13px] font-semibold border-2 transition-all ${form.course === course

                ? 'bg-[#008bdc] text-white border-[#008bdc]'

                : 'bg-white text-gray-700 border-gray-300 hover:border-[#008bdc]'

                }`}

            >

              {course}

            </button>

          ))}

        </div>

        {/* Course search */}

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input

            type="text"

            value={courseSearch}

            onChange={e => setCourseSearch(e.target.value)}

            placeholder="Find your courses"

            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-[#008bdc] transition"

          />

        </div>

        {courseSearch && (

          <div className="border border-gray-200 rounded-lg mt-1 bg-white shadow-sm">

            {COURSES.filter(c => c.toLowerCase().includes(courseSearch.toLowerCase())).map(c => (

              <button

                key={c}

                onClick={() => { setForm(p => ({ ...p, course: c })); setCourseSearch(''); }}

                className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#008bdc]"

              >

                {c}

              </button>

            ))}

          </div>

        )}

      </div>



      {/* College name */}

      <div>

        <Label>College name</Label>

        <TextInput value={form.college} onChange={v => setForm(p => ({ ...p, college: v }))} placeholder="e.g. IIT Bombay" />

      </div>



      {/* Stream */}

      <div>

        <Label optional>Stream</Label>

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />

          <input

            type="text"

            list="streams"

            value={form.stream}

            onChange={e => setForm(p => ({ ...p, stream: e.target.value }))}

            placeholder="e.g. Computer Science & Engineering"

            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-3 text-[14px] outline-none focus:border-[#008bdc] bg-white"

          />

          <datalist id="streams">

            {STREAMS.map(s => <option key={s} value={s} />)}

          </datalist>

          {form.stream && (

            <button onClick={() => setForm(p => ({ ...p, stream: '' }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">

              <X className="w-4 h-4" />

            </button>

          )}

        </div>

      </div>



      {/* Start year / End year */}

      <div className="grid grid-cols-2 gap-4">

        <div>

          <Label>Start year</Label>

          <SelectInput
            value={form.startYear}
            onChange={v =>
              setForm(p => {
                const newStart = parseInt(v);
                const currentEnd = parseInt(p.endYear);

                return {
                  ...p,
                  startYear: v,
                  endYear:
                    p.endYear && currentEnd < newStart + 3
                      ? ''
                      : p.endYear
                };
              })
            }
            options={
              YEARS.filter(y => parseInt(y) <= new Date().getFullYear())
            }
            placeholder="Select year"
          />

        </div>

        <div>

          <Label>End year</Label>

          <SelectInput
            value={form.endYear}
            onChange={v => setForm(p => ({ ...p, endYear: v }))}
            options={
              form.startYear
                ? YEARS.filter(y => parseInt(y) >= parseInt(form.startYear) + 3)
                : YEARS
            }
            placeholder="Select year"
          />

        </div>

      </div>

    </div>

  );

};

// ─── Step 3: Add skills ──────────────────────────────────────────────────
const Step3Form = ({ form, setForm }) => {
  return (
    <div className="space-y-7">
      {/* Skills */}
      <div className="mb-8">
        <Label>Skills</Label>
        <SkillsInput skills={form.skills} setForm={setForm} />
      </div>

      {/* About */}
      <div>
        <Label>About you</Label>
        <textarea
          value={form.about}
          onChange={e => setForm(p => ({ ...p, about: e.target.value }))}
          placeholder="Tell something about yourself..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#008bdc]"
          rows={4}
        />
      </div>

    </div>
  );
};

// ─── Step 4: Success ───────────────────────────────────────────────────────────

const Step4 = ({ job, form, applicationId, emailError, emailErrorDetails }) => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <div className="text-6xl mb-4">🎉</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
    <p className="text-gray-500 mb-1">You applied for <span className="font-semibold text-blue-600">{job.title}</span> at <span className="font-semibold">{job.company}</span></p>
    <p className="text-sm text-gray-400 mb-2">Application ID: <span className="font-mono font-semibold">{applicationId}</span></p>
    {emailError ? (
      <div className="mb-4">
        <p className="text-sm text-amber-500 mb-1">⚠️ Confirmation email could not be sent. Please save your Application ID.</p>
        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded max-w-sm mx-auto">
          ⚠️ Email failed: {emailErrorDetails}<br/>
          <span className="text-gray-400">Check browser console for full details</span>
        </div>
      </div>
    ) : (
      <p className="text-sm text-green-600 mb-4">✅ A confirmation email has been sent to {form.email}</p>
    )}
    <p className="text-gray-400 text-sm mb-6">Our team will review your application within 3–5 business days.</p>
    <Link to="/jobs" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
      Browse More Jobs
    </Link>
  </div>
);



// ─── Progress Bar ──────────────────────────────────────────────────────────────

const ProgressBar = ({ step, total }) => {

  const pct = Math.round((step / total) * 100);

  return (

    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">

      <div

        className="h-full bg-teal-500 rounded-full transition-all duration-500"

        style={{ width: `${pct}%` }}

      />

    </div>

  );

};



// ─── Main ApplyForm ────────────────────────────────────────────────────────────

const ApplyForm = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const job = jobsData.find(j => j.id === Number(id));



  const TOTAL_STEPS = 4;

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorDetails, setEmailErrorDetails] = useState('');

  const SERVICE_ID = 'YOUR_SERVICE_ID';    // ← REPLACE with your EmailJS Service ID
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← REPLACE with your EmailJS Template ID
  const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // ← REPLACE with your EmailJS Public Key

  // Temporary test send to verify credentials
  useEffect(() => {
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name: 'Test User',
        to_email: 'your-own-email@gmail.com',  // ← put your own email here to test
        job_title: 'Test Job',
        company_name: 'Test Company',
        application_id: 'CB000000',
        application_date: new Date().toLocaleDateString()
      },
      { publicKey: PUBLIC_KEY }
    ).then(
      () => console.log('✅ EmailJS test send SUCCESS'),
      (err) => console.error('❌ EmailJS test send FAILED:', err)
    );
  }, []);



  const [form, setForm] = useState({

    firstName: '', lastName: '', email: localStorage.getItem('userEmail') || '',

    phone: '', city: '', gender: '',

    languages: ['English'],

    type: 'College student', course: 'B.Tech',

    college: '', stream: '', startYear: '', endYear: '',

    skills: [],
    about: '',
    workExperience: [],
    extraCurricular: [],
    trainings: [],
    projects: [],
    portfolio: [],
    accomplishments: [],
    resumeFile: null,
  });



  // ── Validation ──

  const validate = () => {

    const e = {};

    if (step === 1) {

      if (!form.firstName.trim()) e.firstName = 'First name is required';

      if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Valid 10-digit number required';

      if (!form.city.trim()) e.city = 'City is required';

      if (!form.gender) e.gender = 'Please select your gender';

      if (form.languages.length === 0) e.languages = 'Select at least one language';

    }

    if (step === 2) {
      if (!form.college.trim()) e.college = 'College name is required';
      if (!form.startYear) e.startYear = 'Start year is required';
      if (!form.endYear) e.endYear = 'End year is required';

      if (form.startYear && form.endYear) {
        const start = parseInt(form.startYear);
        const end = parseInt(form.endYear);

        if (end < start + 3) {
          e.endYear = 'End year must be at least 3 years after start year';
        }
      }
    }

    setErrors(e);

    return Object.keys(e).length === 0;

  };



  async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "resumeforcareerbridge");
    formData.append("resource_type", "raw");

    const res = await fetch("https://api.cloudinary.com/v1_1/dbeblgobt/raw/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    return data.secure_url;
  }

  const sendConfirmationEmail = async (formData, jobTitle, companyName) => {
    if (!formData.email || !formData.email.includes('@')) {
      throw new Error('Invalid email address in form data');
    }

    const applicationId = 'CB' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const templateParams = {
      to_name: formData.firstName + ' ' + formData.lastName,
      to_email: formData.email,
      job_title: jobTitle,
      company_name: companyName,
      application_id: applicationId,
      application_date: today,
      reply_to: 'careers@careerbridge.in'
    };

    console.log('Sending email with params:', {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      public_key: PUBLIC_KEY,
      templateParams
    });

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    return applicationId;
  };

  const handleNext = async () => {
    if (!validate()) return;

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        const element = document.getElementById("pdf-content");
        if (element) {
          const pdfBlob = await html2pdf().from(element).outputPdf("blob");
          const pdfFile = new File([pdfBlob], "generated_resume.pdf");
          await uploadFile(pdfFile);
        }
        if (form.resumeFile) {
          await uploadFile(form.resumeFile);
        }

        const appId = await sendConfirmationEmail(form, job.title, job.company);
        setApplicationId(appId);
        setSubmitted(true);
        setStep(5); // go to success
      } catch (error) {
        console.error('EmailJS error status:', error?.status);
        console.error('EmailJS error text:', error?.text);
        console.error('Full error object:', JSON.stringify(error));
        
        setEmailErrorDetails(error?.text || error?.message || 'Unknown error');
        setSubmitted(true);
        setEmailError(true);
        setStep(5);
      } finally {
        setIsSubmitting(false);
      }
    }
  };



  const handleBack = () => {

    if (step > 1) setStep(s => s - 1);

  };



  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link to={`/jobs/detail/${id}`} className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to job
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {step <= TOTAL_STEPS && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-blue-100 font-bold mb-2 block text-sm uppercase tracking-wider">{job.company}</span>
                <h1 className="text-3xl font-extrabold mb-2 leading-tight">Apply for {job.title}</h1>
                <p className="text-blue-100 font-medium">Submit your details below to stand out.</p>
              </div>
              <Briefcase className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-10" />
            </div>
          )}

          <div className="p-8">
        {step <= TOTAL_STEPS && (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <ProgressBar step={step} total={TOTAL_STEPS} />
            </div>
              {/* Step indicator */}

              <div className="flex items-center gap-2 mb-6 text-[13px] text-gray-400 font-medium">

                <span className={step === 1 ? 'text-[#008bdc] font-bold' : 'text-gray-400'}>Personal Details</span>

                <ChevronRight className="w-3.5 h-3.5" />

                <span className={step === 2 ? 'text-[#008bdc] font-bold' : 'text-gray-400'}>Academic Details</span>

              </div>



              {/* Error summary */}

              {Object.keys(errors).length > 0 && (

                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-[13px] text-red-600">

                  Please fill in all required fields correctly.

                </div>

              )}


              {step === 1 && <Step1 form={form} setForm={setForm} errors={errors} />}
              {step === 2 && <Step2 form={form} setForm={setForm} errors={errors} />}
              {step === 3 && <Step3Form form={form} setForm={setForm} />}
              {step === 4 && <ResumePreview form={form} setForm={setForm} />}



              {/* Navigation buttons */}

              <div className={`flex mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>

                {step > 1 && (

                  <button

                    onClick={handleBack}

                    className="px-8 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-bold text-[14px] hover:border-[#008bdc] hover:text-[#008bdc] transition"

                  >

                    Back

                  </button>

                )}

                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition ${step < TOTAL_STEPS ? 'md:w-auto px-10' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : (step === TOTAL_STEPS ? 'Submit Application' : 'Continue')}
                </button>

              </div>

          </>

        )}



        {step === 5 && <Step4 job={job} form={form} applicationId={applicationId} emailError={emailError} emailErrorDetails={emailErrorDetails} />}

        <HiddenResumeTemplate form={form} />
          </div>
        </div>
      </div>
    </div>

  );

};



export default ApplyForm;

