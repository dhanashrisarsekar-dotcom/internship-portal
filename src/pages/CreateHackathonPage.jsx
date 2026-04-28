import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { hackathons } from '../data/hackathons';

const CreateHackathonPage = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    category: 'local',
    prize: '',
    deadline: '',
    duration: '',
    teamSize: '',
    mode: 'Online',
    location: '',
    tags: '',
    description: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate simple id based on title
    const generateId = (title) => {
      return title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    };

    const newHackathon = {
      id: generateId(formData.title),
      title: formData.title,
      organizer: formData.organizer,
      category: formData.category,
      prize: formData.prize,
      deadline: formData.deadline,
      duration: formData.duration,
      teamSize: formData.teamSize,
      mode: formData.mode,
      location: formData.location,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      description: formData.description,
      registered: 0 // recently published, starts at 0
    };

    // Store in JS memory state so it appears on the same timeline logic
    hackathons.unshift(newHackathon);
    
    setIsPublished(true);
  };

  if (isPublished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
          <div className="text-8xl mb-6 animate-pulse">🚀</div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Hackathon Published!</h2>
          <p className="text-gray-600 text-lg mb-10 font-medium">
            Your hackathon is now live and visible to all users. Let the building begin!
          </p>
          <Link 
            to="/hackathons" 
            className="block w-full bg-[#008bdc] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            View All Hackathons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-[#005c9e] p-8 md:p-12 text-white border-b-4 border-[#008bdc]">
          <h1 className="text-3xl md:text-5xl font-extrabold">Create a Hackathon</h1>
          <p className="text-blue-100 text-lg font-medium mt-4">Publish your event to thousands of energetic builders and problem solvers.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Hackathon Title <span className="text-red-500">*</span></label>
              <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all font-medium text-lg" placeholder="e.g. Meta Global Hackathon 2026" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Organizer Name <span className="text-red-500">*</span></label>
              <input required name="organizer" value={formData.organizer} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. Meta Community" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
              <select required name="category" value={formData.category} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all">
                <option value="local">Local</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Prize Amount <span className="text-red-500">*</span></label>
              <input required name="prize" value={formData.prize} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. ₹1,00,000 or $5,000" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Registration Deadline <span className="text-red-500">*</span></label>
              <input required name="deadline" value={formData.deadline} onChange={handleChange} type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all text-gray-700" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration <span className="text-red-500">*</span></label>
              <input required name="duration" value={formData.duration} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. 48 hours, 3 days" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Team Size <span className="text-red-500">*</span></label>
              <input required name="teamSize" value={formData.teamSize} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. 2-5 members" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mode <span className="text-red-500">*</span></label>
              <select required name="mode" value={formData.mode} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all">
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
              <input required name="location" value={formData.location} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. Global/Worldwide or Mumbai, India" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Tags / Technologies (Comma Separated)</label>
              <input name="tags" value={formData.tags} onChange={handleChange} type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="e.g. React, Next.js, OpenAI, Web3..." />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="6" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all resize-y" placeholder="Describe the problem statements, rules, rewards, and sponsors..."></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email <span className="text-red-500">*</span></label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="hello@organizer.com" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#008bdc] hover:bg-blue-700 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-blue-200 text-xl border-t border-white/20 mt-8">
            Publish Hackathon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathonPage;
