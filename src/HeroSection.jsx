import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ChevronLeft, ChevronRight, Mail, ChevronDown, 
  MoveUpRight, MapPin, Wallet, Calendar, ExternalLink 
} from 'lucide-react';

const HeroSection = () => {
  const [jobIndex, setJobIndex] = useState(0);
  const [internIndex, setInternIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  // Dropdown Data - Split into Left (Categories) and Right (Specific Links)
  const dropdownData = {
    internships: {
      left: ["Top Categories", "Top Locations", "Profile", "Top Cities"],
      right: ["Work from Home", "Internship in Bangalore", "Internship in Delhi", "Internship in Hyderabad", "Internship in Mumbai", "Internship in Chennai", "Internship in Pune"]
    },
    jobs: {
      left: ["Top Categories", "Top Locations", "Profile", "Top Cities"],
      right: ["Full Time Jobs", "Work from Home", "Jobs in Bangalore", "Jobs in Delhi", "Jobs in Hyderabad", "Jobs in Mumbai", "Jobs in Chennai"]
    },
    courses: {
      left: ["Popular Programs", "Data Science", "Development", "Business"],
      right: ["Full Stack Development", "Data Science Specialization", "Digital Marketing", "UI/UX Design", "Machine Learning"]
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(3);
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

  const next = (index, setIndex, items) => { if (index < items.length - (visibleSlides - 1)) setIndex(index + 1); };
  const prev = (index, setIndex) => { if (index > 0) setIndex(index - 1); };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-sky-100">
      
      {/* 1. NAVBAR WITH DUAL-PANE DROPDOWNS */}
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
          <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
          <button className="text-gray-600 font-semibold text-[14px] items-center hover:text-[#008bdc] hidden md:flex">
            Employer sign up <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
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
                <button className="flex-1 bg-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-gray-800 text-sm hover:bg-gray-50 transition">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" /> Google
                </button>
                <button className="flex-1 bg-white/10 border border-white/20 py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-white text-sm hover:bg-white/20 transition">
                  <Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-1/2">
             <img 
               src="https://internshala.com/static/images/home/fresher/banner-main.png" 
               alt="" 
               className="max-w-md ml-auto object-contain"
             />
          </div>
        </div>
      </section>

      {/* 3. SCROLLING CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">What are you looking for today?</h2>
        
        {/* Categories Pills */}
        <div className="flex space-x-3 mb-16 overflow-x-auto no-scrollbar justify-start md:justify-center">
          {categories.map((cat, i) => (
            <button key={i} className={`px-6 py-2 rounded-full border text-[14px] font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-[#008bdc] text-white border-[#008bdc] shadow-md shadow-sky-100' : 'bg-white text-gray-500 border-gray-200 hover:border-[#008bdc] hover:text-[#008bdc]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* INTERNSHIPS SLIDER */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Internships</h3>
            <button className="text-[#008bdc] font-bold text-sm flex items-center gap-1 hover:underline">View all internships <ChevronRight className="w-4 h-4"/></button>
          </div>
          <SliderTemplate 
            items={internships} index={internIndex} visibleSlides={visibleSlides} 
            next={() => next(internIndex, setInternIndex, internships)} 
            prev={() => prev(internIndex, setInternIndex)} type="Internship" 
          />
        </div>

        {/* JOBS SLIDER */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Jobs <span className="ml-2 bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-black">Fresher</span></h3>
            <button className="text-[#008bdc] font-bold text-sm flex items-center gap-1 hover:underline">View all jobs <ChevronRight className="w-4 h-4"/></button>
          </div>
          <SliderTemplate 
            items={jobs} index={jobIndex} visibleSlides={visibleSlides} 
            next={() => next(jobIndex, setJobIndex, jobs)} 
            prev={() => prev(jobIndex, setJobIndex)} type="Job" 
          />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
    </div>
  );
};

// COMPONENT: Dual-Pane Hover Dropdown
const DropdownMenu = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="absolute top-[100%] left-0 pt-2 hidden group-hover:block z-[100]">
      <div className="bg-white shadow-2xl rounded-xl border border-gray-100 flex overflow-hidden min-w-[550px] animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Left Pane: Categories */}
        <div className="w-[200px] bg-gray-50/50 p-3 border-r border-gray-100">
          {data.left.map((item, idx) => (
            <div 
              key={idx} 
              onMouseEnter={() => setActiveTab(idx)}
              className={`py-2.5 px-4 text-[13px] font-semibold cursor-pointer rounded-lg flex items-center justify-between transition-all ${activeTab === idx ? 'text-[#008bdc] bg-white shadow-sm' : 'text-gray-500 hover:bg-white hover:text-[#008bdc]'}`}
            >
              {item} <ChevronRight className={`w-3 h-3 ${activeTab === idx ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>
        
        {/* Right Pane: Links */}
        <div className="flex-1 p-6 grid grid-cols-2 gap-y-3 gap-x-6 bg-white">
          {data.right.map((link, idx) => (
            <div key={idx} className="text-[13px] text-gray-600 hover:text-[#008bdc] cursor-pointer transition-colors font-medium">
              {link}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// COMPONENT: Horizontal Slider
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

              <h4 className="font-bold text-[16px] text-gray-800 leading-tight mb-1">{item.title}</h4>
              <p className="text-gray-400 text-[13px] font-medium mb-6">{item.company}</p>
              
              <div className="space-y-3 text-[13px] text-gray-600 mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-300"/> {item.location}</div>
                <div className="flex items-center gap-2"><Wallet className="w-3.5 h-3.5 text-gray-300"/> {item.salary || item.stipend}</div>
                {item.duration && <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-gray-300"/> {item.duration}</div>}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">{type}</span>
                <button className="text-[#008bdc] font-bold text-[13px] flex items-center group/btn">
                  View details <ChevronRight className="w-4 h-4 ml-0.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Unlock potential card */}
        <div className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] p-3">
          <div className="bg-blue-50/30 border border-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
             <img src="https://internshala.com/static/images/home/fresher/max_res.png" alt="" className="w-24 mb-4" />
             <h4 className="font-bold text-lg text-gray-800 mb-2">Unlock your true potential</h4>
             <p className="text-gray-500 text-[13px] mb-6">Explore more than 15,000+ opportunities</p>
             <button className="text-[#008bdc] font-bold text-sm flex items-center">View all <ChevronRight className="w-4 h-4 ml-1"/></button>
          </div>
        </div>
      </div>
    </div>
    
    <button onClick={prev} className={`absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-full p-2.5 z-10 hover:bg-gray-50 transition-all ${index === 0 ? 'opacity-0 invisible' : 'opacity-100 visible'}`}><ChevronLeft className="w-5 h-5"/></button>
    <button onClick={next} className={`absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-gray-100 rounded-full p-2.5 z-10 hover:bg-gray-50 transition-all ${index >= items.length - (visibleSlides - 1) ? 'opacity-0 invisible' : 'opacity-100 visible'}`}><ChevronRight className="w-5 h-5"/></button>
  </div>
);

export default HeroSection;