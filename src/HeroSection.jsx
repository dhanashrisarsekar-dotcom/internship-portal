import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { 
  Search, ChevronLeft, ChevronRight, Mail, ChevronDown, 
  MoveUpRight, MapPin, Wallet, Calendar, ExternalLink, TrendingUp 
} from 'lucide-react';

// --- Updated Dropdown Data Structure to match your images ---
const dropdownData = {
  internships: {
    categories: [
      {
        label: "Top Locations",
        links: ["Work from home", "Internship in Bangalore", "Internship in Delhi", "Internship in Hyderabad", "Internship in Mumbai", "Internship in Chennai", "Internship in Pune", "Internship in Kolkata", "Internship in Jaipur"]
      },
      {
        label: "Top Categories",
        links: ["Graphic Design", "Marketing", "Finance", "Human Resources", "Digital Marketing", "Computer Science", "Content Writing"]
      },
      {
        label: "Explore More Internships",
        links: ["Internships by Category", "Internships by Location", "Internships by Stream", "Internships by Duration"]
      }
    ]
  },
  jobs: {
    categories: [
      {
        label: "Top Locations",
        links: ["Work from home", "Jobs in Bangalore", "Jobs in Delhi", "Jobs in Hyderabad", "Jobs in Gurgaon", "Jobs in Kolkata", "Jobs in Mumbai", "Jobs in Pune", "Jobs in Chennai", "Jobs in Noida", "Jobs in Jaipur"]
      },
      {
        label: "Top Categories",
        links: ["Data Entry Jobs", "Content Writing Jobs", "Digital Marketing Jobs", "Data Science Jobs", "Cyber Security Jobs", "Pharma Jobs", "Teaching Jobs", "HR Jobs", "MBA Jobs", "Graphic Design Jobs", "Part Time Jobs"]
      },
      {
        label: "Fresher Jobs",
        links: ["Work from home", "Fresher Jobs in Bangalore", "Fresher Jobs in Delhi", "Fresher Jobs in Hyderabad", "Fresher Jobs in Chennai", "Fresher Jobs in Pune", "MBA Fresher Jobs", "HR Fresher Jobs", "Civil Fresher Jobs", "Digital Marketing Fresher Jobs"]
      },
      {
        label: "Explore More Jobs",
        links: ["Jobs by Category", "Jobs by Location", "Jobs by Designation", "Jobs by Skill", "Jobs by Company", "WFH Job Types"]
      },
      {
        label: "Online Placement Courses",
        isNew: true,
        links: ["Full Stack Development Course", "Data Science Course", "Human Resource Management Course", "Digital Marketing Course", "UI/UX Design Course", "Product Management Course", "Financial Modelling Course", "Supply Chain Logistics Course"]
      }
    ]
  },
  courses: {
    categories: [
      {
        label: "Popular Programs",
        links: ["Data Science", "Full Stack Development", "Digital Marketing", "UI/UX Design"]
      },
      {
        label: "Data Science",
        links: ["Machine Learning", "Data Analytics", "Tableau", "Power BI"]
      }
    ]
  }
};

const DropdownMenu = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="absolute top-[100%] left-0 pt-2 hidden group-hover:block z-[100]">
      <div className="bg-white shadow-2xl rounded-xl border border-gray-100 flex overflow-hidden min-w-[650px] min-h-[400px]">
        {/* Left Side Menu */}
        <div className="w-[260px] bg-gray-50/50 p-2 border-r border-gray-100">
          {data.categories.map((item, idx) => (
            <div 
              key={idx} 
              onMouseEnter={() => setActiveTab(idx)} 
              className={`group/item py-3 px-4 text-[14px] font-medium cursor-pointer rounded-lg flex items-center justify-between transition-all ${
                activeTab === idx ? 'text-[#008bdc] bg-white shadow-sm' : 'text-gray-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.label}
                {item.isNew && (
                  <span className="bg-orange-500 text-white text-[9px] px-1 rounded font-bold">NEW</span>
                )}
              </div>
              <ChevronRight className={`w-4 h-4 transition-opacity ${activeTab === idx ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* Right Side Content (Dynamic based on Hover) */}
        <div className="flex-1 p-6 bg-white overflow-y-auto max-h-[500px]">
          <div className="grid grid-cols-1 gap-y-4">
            {data.categories[activeTab]?.links.map((link, idx) => (
              <div 
                key={idx} 
                className="text-[14px] text-gray-700 hover:text-[#008bdc] cursor-pointer transition-colors font-normal"
              >
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [jobIndex, setJobIndex] = useState(0);
  const [internIndex, setInternIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [courseVisibleSlides, setCourseVisibleSlides] = useState(4);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const details = jwtDecode(credentialResponse.credential);
      const response = await axios.post('http://localhost:8081/api/login/google-login', {
        token: credentialResponse.credential,
        email: details.email
      });
      if (response.data === "Login successful!") {
        localStorage.setItem("userEmail", details.email);
        localStorage.setItem("isLoggedIn", "true");
        navigate('/'); 
        window.location.reload();
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSlides(1);
        setCourseVisibleSlides(1);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
        setCourseVisibleSlides(2);
      } else {
        setVisibleSlides(3);
        setCourseVisibleSlides(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ["Big brands", "Work from home", "Part-time", "MBA", "Engineering", "Media", "Design", "Data Science"];
  
  const jobs = [
    { id: 1, title: "Human Resources (HR) Executive", company: "Avenue E-Commerce Limited", location: "Vadodara", salary: "₹ 3,00,000 - 3,50,000 /year" },
    { id: 2, title: "Corporate Sales Manager", company: "Ion Exchange India Limited", location: "Work From Home", salary: "₹ 5,50,000 - 8,00,000 /year" },
    { id: 3, title: "Business Development Executive", company: "Netscribes (India) Private Limited", location: "Mumbai (Hybrid)", salary: "₹ 3,00,000 /year" },
    { id: 4, title: "Electronics Engineer", company: "VIZON", location: "Dehradun", salary: "₹ 12,80,000 - 25,00,000 /year" },
  ];

  const internships = [
    { id: 1, title: "Telecalling", company: "Novo Learning Private Limited", location: "Bangalore", stipend: "₹ 25,000 - 40,000 /month", duration: "1 Month" },
    { id: 2, title: "Content & E-Commerce Management", company: "Kanha Creation", location: "Delhi (Hybrid)", stipend: "₹ 4,100 - 7,000 /month", duration: "3 Months" },
    { id: 3, title: "Client Acquisition", company: "Angel One (AP)", location: "Work From Home", stipend: "₹ 1,000 - 20,000 /month", duration: "1 Month" },
    { id: 4, title: "Video Editing/Making", company: "DCC", location: "Work From Home", stipend: "₹ 3,000 - 4,000 /month", duration: "6 Months" },
  ];

  const certificationCourses = [
    { id: 1, title: "Artificial Intelligence and Machine Learning", duration: "8 weeks", learners: "91,313", rating: "4.1", trending: true, icon: "🧠" },
    { id: 2, title: "Full Stack Web Development with AI", duration: "8 weeks", learners: "91,313", rating: "4.1", icon: "🌐" },
    { id: 3, title: "Programming with Python with AI", duration: "6 weeks", learners: "73,600", rating: "4.1", icon: "🐍" },
    { id: 4, title: "Complete Digital Marketing with AI", duration: "8 weeks", learners: "56,913", rating: "4.1", icon: "📈" },
    { id: 5, title: "Machine Learning with AI", duration: "6 weeks", learners: "28,103", rating: "4.5", icon: "🤖" },
  ];

  const next = (index, setIndex, items, visibleCount) => { 
    if (index < (items.length + 1) - visibleCount) setIndex(index + 1); 
  };
  const prev = (index, setIndex) => { 
    if (index > 0) setIndex(index - 1); 
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-sky-100">
      
      {/* 1. NAVBAR */}
      <nav className="flex items-center justify-between px-6 lg:px-10 py-3 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center space-x-8">
          <div className="text-[#008bdc] font-black text-2xl italic tracking-tighter cursor-pointer">INTERNSHALA</div>
          <div className="hidden lg:flex items-center space-x-1 font-semibold text-gray-600 text-[14px]">
            <div className="relative group py-2">
              <span className="flex items-center cursor-pointer hover:text-[#008bdc] px-4">
                Internships <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </span>
              <DropdownMenu data={dropdownData.internships} />
            </div>
            <div className="relative group py-2">
              <span className="flex items-center cursor-pointer hover:text-[#008bdc] px-4">
                Jobs <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </span>
              <DropdownMenu data={dropdownData.jobs} />
            </div>
            <div className="relative group py-2">
              <span className="flex items-center cursor-pointer hover:text-[#008bdc] px-4">
                Courses <span className="ml-1 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">Offer</span> 
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
              </span>
              <DropdownMenu data={dropdownData.courses} />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none w-52 text-sm focus:border-[#008bdc]" />
          </div>
          <Link to="/login" className="px-5 py-2 border border-[#008bdc] text-[#008bdc] rounded font-bold text-[14px]">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-[#008bdc] text-white rounded font-bold text-[14px]">Register</Link>
        </div>
      </nav>

      {/* 2. HERO AREA */}
      <section className="bg-[#005c9e] min-h-[480px] flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex flex-col lg:flex-row items-center justify-between py-12">
          <div className="lg:w-1/2 z-10 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">India's <span className="text-yellow-400">#1 platform</span></h1>
            <p className="text-xl text-white font-medium mb-12 border-b-2 border-white/20 w-fit pb-4 mx-auto lg:mx-0">For fresher jobs, internships and courses</p>
            <div className="bg-[#004a80]/40 backdrop-blur-sm border border-white/10 p-8 rounded-2xl max-w-md mx-auto lg:mx-0">
              <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest text-center opacity-80">Candidate sign up</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <GoogleLogin onSuccess={handleGoogleSuccess} width="100%" />
                </div>
                <button onClick={() => navigate('/register')} className="flex-1 bg-white/10 border border-white/20 py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-white text-sm hover:bg-white/20 transition">
                  <Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 ">
             <img src="https://internshala.com/static/images/homepage/banner/r991.webp" alt="Banner" className="max-w-md ml-auto object-contain" />
          </div>
        </div>
      </section>

      {/* 3. CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">What are you looking for today?</h2>
        
        {/* Categories bar */}
        <div className="flex space-x-3 mb-16 overflow-x-auto no-scrollbar justify-start md:justify-center">
          {categories.map((cat, i) => (
            <button key={i} className={`px-6 py-2 rounded-full border text-[14px] font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-[#008bdc] text-white border-[#008bdc] shadow-md shadow-sky-100' : 'bg-white text-gray-500 border-gray-200 hover:border-[#008bdc] hover:text-[#008bdc]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* INTERNSHIPS SECTION */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Internships</h3>
            <button className="text-[#008bdc] font-bold text-sm flex items-center gap-1 hover:underline">View all internships <ChevronRight className="w-4 h-4"/></button>
          </div>
          <SliderTemplate 
            items={internships} index={internIndex} visibleSlides={visibleSlides} 
            next={() => next(internIndex, setInternIndex, internships, visibleSlides)} 
            prev={() => prev(internIndex, setInternIndex)} type="Internship" 
          />
        </div>

        {/* JOBS SECTION */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Jobs <span className="ml-2 bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-black">Fresher</span></h3>
            <button className="text-[#008bdc] font-bold text-sm flex items-center gap-1 hover:underline">View all jobs <ChevronRight className="w-4 h-4"/></button>
          </div>
          <SliderTemplate 
            items={jobs} index={jobIndex} visibleSlides={visibleSlides} 
            next={() => next(jobIndex, setJobIndex, jobs, visibleSlides)} 
            prev={() => prev(jobIndex, setJobIndex)} type="Job" 
          />
        </div>

        {/* POPULAR COURSES SECTION */}
        <div className="mb-24">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Popular certification courses</h3>
            <p className="text-gray-500 font-medium">Fastest way to build your CV</p>
          </div>
          <div className="relative group">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${courseIndex * (100 / courseVisibleSlides)}%)` }}
              >
                {certificationCourses.map((course) => (
                  <div key={course.id} style={{ minWidth: `${100 / courseVisibleSlides}%` }} className="p-3">
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                      <div className="h-32 bg-blue-50/50 flex items-center justify-center text-4xl">{course.icon}</div>
                      <div className="p-4 flex-grow flex flex-col">
                        <span className="text-[11px] font-bold text-gray-400 mb-1">{course.duration}</span>
                        <h4 className="font-bold text-[15px] text-gray-800 mb-2 leading-tight h-10">{course.title}</h4>
                        {course.trending && (
                          <div className="flex items-center gap-1 text-[#4f46e5] bg-indigo-50 px-2 py-0.5 rounded text-[10px] font-bold w-fit mb-3">
                            <TrendingUp className="w-3 h-3" /> Trending in AI
                          </div>
                        )}
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-gray-400 text-[12px]">{course.learners} learners</span>
                          <button className="text-[#008bdc] font-bold text-[13px] flex items-center hover:gap-1 transition-all">
                            Know more <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ minWidth: `${100 / courseVisibleSlides}%` }} className="p-3">
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
                    <p className="font-bold text-gray-700 text-sm mb-4">Learn in-demand skills and get certified</p>
                    <button className="px-5 py-2 border border-[#008bdc] text-[#008bdc] rounded font-bold text-sm hover:bg-blue-50">View all</button>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => prev(courseIndex, setCourseIndex)} 
              className={`absolute -left-4 top-1/2 bg-white shadow-xl rounded-full p-2.5 z-10 border border-gray-100 ${courseIndex === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => next(courseIndex, setCourseIndex, certificationCourses, courseVisibleSlides)} 
              className={`absolute -right-4 top-1/2 bg-white shadow-xl rounded-full p-2.5 z-10 border border-gray-100 ${courseIndex >= certificationCourses.length + 1 - courseVisibleSlides ? 'invisible' : ''}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

const SliderTemplate = ({ items, index, visibleSlides, next, prev, type }) => (
  <div className="relative group/slider">
    <div className="overflow-hidden">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * (100 / visibleSlides)}%)` }}>
        {items.map((item) => (
          <div key={item.id} className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] p-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-all flex flex-col hover:border-b-4 hover:border-b-[#008bdc]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center border border-blue-100 bg-blue-50/50 text-[#008bdc] text-[10px] font-bold px-2 py-1 rounded">
                  <MoveUpRight className="w-3 h-3 mr-1" /> Actively hiring
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center text-[10px] text-gray-400 font-bold border border-gray-100">LOGO</div>
              </div>
              <h4 className="font-bold text-[16px] text-gray-800 mb-1">{item.title}</h4>
              <p className="text-gray-400 text-[13px] font-medium mb-6">{item.company}</p>
              <div className="space-y-3 text-[13px] text-gray-600 mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-300"/> {item.location}</div>
                <div className="flex items-center gap-2"><Wallet className="w-3.5 h-3.5 text-gray-300"/> {item.salary || item.stipend}</div>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase">{type}</span>
                <button className="text-[#008bdc] font-bold text-[13px] flex items-center">View details <ChevronRight className="w-4 h-4 ml-0.5"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <button onClick={prev} className={`absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-full p-2.5 z-10 ${index === 0 ? 'invisible' : ''}`}><ChevronLeft className="w-5 h-5"/></button>
    <button onClick={next} className={`absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-full p-2.5 z-10 ${index >= items.length - visibleSlides ? 'invisible' : ''}`}><ChevronRight className="w-5 h-5"/></button>
  </div>
);

export default HeroSection;