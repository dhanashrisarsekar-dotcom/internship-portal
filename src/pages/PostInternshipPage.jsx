import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { internships } from '../data/internships';

export default function PostInternshipPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    website: '',
    type: 'engineering',
    mode: 'work-from-home',
    location: '',
    stipend: '',
    duration: '',
    openings: '',
    deadline: '',
    skills: '',
    description: '',
    email: '',
    perks: []
  });

  const perkOptions = [
    "Certificate", "Letter of Recommendation", "PPO Opportunity", 
    "Flexible Hours", "Free Meals", "Mentorship"
  ];

  const handlePerkToggle = (perk) => {
    setFormData(prev => ({
      ...prev,
      perks: prev.perks.includes(perk) 
        ? prev.perks.filter(p => p !== perk)
        : [...prev.perks, perk]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new internship object
    const newInternship = {
      id: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      title: formData.title,
      company: formData.company,
      logo: "🏢", // Default logo
      type: formData.type,
      mode: formData.mode,
      location: formData.location || "Remote",
      stipend: formData.stipend,
      duration: formData.duration,
      openings: parseInt(formData.openings, 10),
      deadline: formData.deadline,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      description: formData.description,
      perks: formData.perks,
      applicants: 0,
      badge: "Actively Hiring" // Default badge for new posts
    };

    // Add to mock data at the beginning
    internships.unshift(newInternship);
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-xl border border-gray-100 text-center">
          <div className="text-5xl mb-6">🎉</div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Internship Posted!</h2>
          <p className="text-gray-500 mb-8">
            Your internship is now live and visible to students across India.
          </p>
          <Link to="/internships" className="block w-full py-4 bg-[#008bdc] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-200">
            View All Internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Post an Internship</h1>
          <p className="text-xl text-gray-500 font-medium">Reach 10M+ students and fresh graduates</p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Internship Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. Software Engineering Intern" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. Acme Corp" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Website</label>
                <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="https://" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-white cursor-pointer">
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="mba">MBA</option>
                  <option value="media">Media</option>
                  <option value="part-time">Part-Time</option>
                  <option value="work-from-home">Work From Home</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mode</label>
                <select required value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-white cursor-pointer">
                  <option value="work-from-home">Remote</option>
                  <option value="in-office">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. Bangalore, India" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Stipend</label>
                <input required type="text" value={formData.stipend} onChange={e => setFormData({...formData, stipend: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. ₹15,000/month" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. 3 months" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Openings</label>
                <input required type="number" min="1" value={formData.openings} onChange={e => setFormData({...formData, openings: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. 5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Application Deadline</label>
                <input required type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-sans" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="hr@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Required Skills (Comma separated)</label>
              <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="e.g. React, Node.js, Leadership" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Perks</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {perkOptions.map(perk => (
                  <label key={perk} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-[#008bdc] focus:ring-blue-500 rounded border-gray-300"
                      checked={formData.perks.includes(perk)}
                      onChange={() => handlePerkToggle(perk)}
                    />
                    <span className="text-sm font-medium text-gray-700">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
              <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none" placeholder="Describe the role, responsibilities, and expectations..."></textarea>
            </div>

            <hr className="border-gray-100 my-8" />

            <button type="submit" className="w-full py-4 bg-[#008bdc] hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-sky-200 hover:-translate-y-0.5">
              Post Internship
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


