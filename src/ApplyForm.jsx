import React, { useState } from 'react';

import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {

  ChevronDown, ChevronRight, X, Search, Check, Info,

  Phone, Mail, User, MapPin, Plus

} from 'lucide-react';



// ─── Data ──────────────────────────────────────────────────────────────────────

const jobsData = [

  { id: 1, title: "Content Writer", company: "Appnigma AI", location: "Bangalore" },

  { id: 2, title: "Agentic AI Associate", company: "Awarno", location: "Work from home" },

  { id: 3, title: "Dental Patient Coordinator (USA Remote)", company: "Todays Dental Services", location: "Work from home" },

  { id: 4, title: "Sales Executive", company: "Golden Sparrow LLC", location: "San Francisco" },

  { id: 5, title: "Telecaller", company: "Sunny_6400 Limited", location: "Work from home" },

  { id: 6, title: "Senior Telecaller", company: "Sunny_6400 Limited", location: "Work from home" },

  { id: 7, title: "Video Editor", company: "Ankit Chahal", location: "Work from home" },

  { id: 8, title: "Biomedical Research Assistant", company: "Sandesh Kandel", location: "Work from home" },

  { id: 9, title: "Senior Software Developer", company: "Sanvya Health", location: "Work from home" },

  { id: 10, title: "Human Resources (HR) Supervisor", company: "Sunny_6400 Limited", location: "Work from home" },

  { id: 11, title: "Human Resources (HR) Manager", company: "Sunny_6400 Limited", location: "Work from home" },

  { id: 12, title: "Junior Company Secretary (CS)", company: "Registration Arena", location: "Work from home" },

  { id: 13, title: "CAD Designer", company: "Velozity Global Solutions", location: "Work from home" },

  { id: 14, title: "Video Creator", company: "Napraj Moving Packing Private Limited", location: "Work from home" },

  { id: 15, title: "Revit Drafter", company: "ZAR Architectural", location: "Work from home" },

];



const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Marathi", "French", "Japanese", "Bengali", "Kannada", "Gujarati", "Punjabi", "Urdu", "Malayalam", "Odia"];

const COURSES = ["B.Tech", "BE", "B.Com", "MBA", "B.A", "B.Sc", "M.Tech", "M.Com", "MCA", "PhD", "Diploma", "Integrated B.Tech & M.Tech"];

const TYPES = ["College student", "Fresher", "Working professional", "School student", "Woman returning to work"];

const YEARS = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 2 + i).toString());

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

      <span className="text-[#008bdc] font-black text-2xl italic tracking-tighter">INTERN</span>

      <span className="text-gray-800 font-black text-2xl italic tracking-tighter">SHALA</span>

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

      <button className="text-gray-500 hover:text-[#008bdc]">Login / Register</button>

    </div>

  </nav>

);



// ─── Toggle Chip ───────────────────────────────────────────────────────────────

const Chip = ({ label, selected, onToggle, removable }) => (

  <button

    onClick={onToggle}

    className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-all flex items-center gap-1.5 ${

      selected

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

        <TextInput value={form.email} onChange={() => {}} placeholder="your@email.com" disabled icon={Mail} />

        <p className="text-[12px] text-gray-400 mt-1">Email cannot be changed here.</p>

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

              className={`px-5 py-2 rounded-full text-[14px] font-semibold border-2 transition-all flex items-center gap-2 ${

                form.gender === label

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

              className={`px-5 py-2 rounded-full text-[13px] font-semibold border-2 transition-all ${

                form.type === type

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

              className={`px-4 py-2 rounded-full text-[13px] font-semibold border-2 transition-all ${

                form.course === course

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

          <SelectInput value={form.startYear} onChange={v => setForm(p => ({ ...p, startYear: v }))} options={YEARS} placeholder="Select year" />

        </div>

        <div>

          <Label>End year</Label>

          <SelectInput value={form.endYear} onChange={v => setForm(p => ({ ...p, endYear: v }))} options={YEARS} placeholder="Select year" />

        </div>

      </div>

    </div>

  );

};



// ─── Step 3: Success ───────────────────────────────────────────────────────────

const Step3 = ({ job, navigate }) => (

  <div className="text-center py-12">

    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">

      <Check className="w-10 h-10 text-green-500" strokeWidth={2.5} />

    </div>

    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted! 🎉</h2>

    <p className="text-gray-500 text-[15px] mb-2">

      You've successfully applied for <span className="font-semibold text-gray-800">{job?.title}</span>

    </p>

    <p className="text-gray-400 text-[13px] mb-8">at {job?.company}</p>

    <div className="flex flex-col sm:flex-row gap-3 justify-center">

      <button

        onClick={() => navigate('/jobs/wfh')}

        className="px-8 py-3 border-2 border-[#008bdc] text-[#008bdc] rounded-lg font-bold text-[14px] hover:bg-blue-50 transition"

      >

        Browse more jobs

      </button>

      <button

        onClick={() => navigate('/')}

        className="px-8 py-3 bg-[#008bdc] text-white rounded-lg font-bold text-[14px] hover:bg-[#0079c0] transition"

      >

        Go to Home

      </button>

    </div>

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



  const TOTAL_STEPS = 2;

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});



  const [form, setForm] = useState({

    firstName: '', lastName: '', email: 'user@example.com',

    phone: '', city: '', gender: '',

    languages: ['English'],

    type: 'College student', course: 'B.Tech',

    college: '', stream: '', startYear: '', endYear: '',

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

    }

    setErrors(e);

    return Object.keys(e).length === 0;

  };



  const handleNext = () => {

    if (!validate()) return;

    if (step < TOTAL_STEPS) setStep(s => s + 1);

    else setStep(3); // success

  };



  const handleBack = () => {

    if (step > 1) setStep(s => s - 1);

  };



  return (

    <div className="min-h-screen bg-gray-50 font-sans">

      <Navbar navigate={navigate} />



      {/* Progress bar */}

      {step <= TOTAL_STEPS && (

        <div className="max-w-3xl mx-auto px-4 pt-6">

          <ProgressBar step={step} total={TOTAL_STEPS} />

        </div>

      )}



      {/* Job context banner */}

      {job && step <= TOTAL_STEPS && (

        <div className="max-w-3xl mx-auto px-4 mt-4">

          <div className="border border-[#008bdc]/30 bg-blue-50/50 rounded-xl px-4 py-3 flex items-center gap-2 text-[13px] text-gray-700">

            <Info className="w-4 h-4 text-[#008bdc] flex-shrink-0" />

            <span>

              Applying to <span className="font-semibold text-gray-900">{job.title}</span> Job

              {job.location !== 'Work from home' ? ` in ${job.location}` : ' (Work from home)'}

              {' '}at <span className="font-semibold text-gray-900">{job.company}</span>

            </span>

          </div>

        </div>

      )}



      {/* Form card */}

      <div className="max-w-3xl mx-auto px-4 py-8">



        {step <= TOTAL_STEPS && (

          <>

            {/* Greeting */}

            <div className="text-center mb-8">

              <p className="text-[18px] text-gray-600">Hi there! 👋</p>

              <h1 className="text-3xl font-bold text-gray-900">Let's get started</h1>

            </div>



            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

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

                  className="px-10 py-3 bg-[#008bdc] text-white rounded-lg font-bold text-[14px] hover:bg-[#0079c0] transition shadow-sm shadow-blue-100"

                >

                  {step === TOTAL_STEPS ? 'Submit' : 'Next'}

                </button>

              </div>

            </div>

          </>

        )}



        {step === 3 && <Step3 job={job} navigate={navigate} />}

      </div>

    </div>

  );

};



export default ApplyForm;

