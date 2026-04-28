import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, MoveLeft } from 'lucide-react';
import { hackathons } from '../data/hackathons';

const HackathonApplyPage = () => {
  const { id } = useParams();
  const hackathon = hackathons.find(h => h.id === id);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!hackathon) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500 text-xl">Hackathon not found</div>;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Application Submitted!</h2>
          <p className="text-gray-600 text-lg mb-10 font-medium">
            You successfully applied for <strong className="text-gray-900 border-b border-gray-300">{hackathon.title}</strong>. Wait for the organizers to respond!
          </p>
          <Link 
            to="/hackathons" 
            className="block w-full bg-[#008bdc] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            Browse More Hackathons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to={`/hackathons/${hackathon.id}`} className="text-[#008bdc] hover:underline font-bold mb-8 flex items-center gap-2">
          <MoveLeft className="w-5 h-5"/> Back to Details
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#005c9e] to-[#008bdc] p-8 md:p-12 text-white">
            <span className="uppercase text-white/70 font-black text-xs tracking-widest mb-2 block">Application Form</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{hackathon.title}</h1>
            <p className="text-blue-100 text-lg font-medium flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-400"/> Prize Pool: <span className="font-bold text-white">{hackathon.prize}</span></p>
          </div>
          
          <form className="p-8 md:p-12 space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input required type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input required type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">College / Company <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="Institute of Technology" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Team Name <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="Code Ninjas" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Team Size <span className="text-red-500">*</span></label>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all">
                  <option>1 (Solo)</option>
                  <option>2 members</option>
                  <option>3 members</option>
                  <option>4 members</option>
                  <option>5 members</option>
                  <option>6 members</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">GitHub Profile URL</label>
              <input type="url" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all" placeholder="https://github.com/username" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Project Idea / Abstract (Short) <span className="text-red-500">*</span></label>
              <textarea required rows="4" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008bdc] focus:ring-4 focus:ring-blue-50 transition-all resize-none" placeholder="We are building a smart contract application that..."></textarea>
            </div>

            <button type="submit" className="w-full bg-[#008bdc] hover:bg-blue-700 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-blue-200 text-xl border-t border-white/20 mt-4">
              Submit Application
            </button>
            <p className="text-center text-gray-400 text-sm mt-4 font-medium">By submitting, you agree to the hackathon code of conduct.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HackathonApplyPage;
