import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Calendar, Clock, Users, MapPin, Target, Layout, MoveLeft } from 'lucide-react';
import { hackathons } from '../data/hackathons';

const HackathonDetailPage = () => {
  const { id } = useParams();
  const hackathon = hackathons.find(h => h.id === id);

  if (!hackathon) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500 text-xl">Hackathon not found</div>;
  }

  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'local': return 'bg-green-100 text-green-800 border-green-200';
      case 'national': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'international': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#005c9e] pt-10 pb-20 px-6 text-white text-center rounded-b-[3rem] shadow-lg">
        <div className="max-w-4xl mx-auto relative">
          <Link to="/hackathons" className="absolute left-0 top-0 text-white/70 hover:text-white flex items-center gap-2 font-medium transition-colors">
            <MoveLeft className="w-5 h-5"/> Back to Hackathons
          </Link>
          
          <div className="pt-12">
            <span className={`inline-block border px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-sm ${getBadgeColor(hackathon.category)}`}>
              {hackathon.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl mx-auto">{hackathon.title}</h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-10 max-w-2xl mx-auto border-b border-blue-400/30 pb-10">
              Organized by <span className="text-white font-bold">{hackathon.organizer}</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {hackathon.tags.map((tag, i) => (
                <span key={i} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                  #{tag}
                </span>
              ))}
              <span className="bg-yellow-500/20 backdrop-blur-md border border-yellow-500/40 text-yellow-300 px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4"/> {(hackathon.registered || 0).toLocaleString()} Registered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 pb-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 border-b border-gray-100 pb-12">
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-start gap-4 shadow-sm h-full">
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Prize Pool</h3>
                <p className="text-2xl font-black text-emerald-700">{hackathon.prize}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Deadline</h3>
                  <p className="text-gray-900 font-bold text-lg">{new Date(hackathon.deadline).toLocaleDateString('en-GB')}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-4 h-4"/> Duration</h3>
                  <p className="text-gray-900 font-bold text-lg">{hackathon.duration}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Users className="w-4 h-4"/> Team Size</h3>
                  <p className="text-gray-900 font-bold text-lg">{hackathon.teamSize}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    {hackathon.mode.toLowerCase() === 'online' ? <Layout className="w-4 h-4"/> : <MapPin className="w-4 h-4"/>} 
                    Location ({hackathon.mode})
                  </h3>
                  <p className="text-gray-900 font-bold text-lg">{hackathon.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#008bdc]" />
              About this Hackathon
            </h2>
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
              {hackathon.description}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-100">
            <Link 
              to={`/hackathons/${hackathon.id}/apply`} 
              className="inline-block w-full md:w-auto px-16 py-5 bg-[#008bdc] text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
