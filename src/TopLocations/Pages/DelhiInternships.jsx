import React from 'react';
import { Link } from 'react-router-dom';
import { delhiInternships } from "../Data/DelhiData";

const DelhiInternships = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Internships in Delhi
        </h1>
        
        <div className="space-y-6">
          {delhiInternships.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center font-bold rounded border border-blue-100 uppercase">
                    {job.company.substring(0, 1)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{job.company}</p>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {job.type}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500 font-medium">
                <span>📍 {job.location}</span>
                <span>📅 {job.duration}</span>
                <span>💰 {job.stipend}</span>
              </div>

              <div className="mt-4">
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 w-fit">
                  📈 Actively hiring
                </span>
              </div>

              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <span className="text-xs text-gray-400 font-medium">🕒 {job.posted}</span>
                <Link 
                  to={`/internship/${job.id}`} 
                  className="text-blue-500 font-bold text-sm hover:underline flex items-center gap-1"
                >
                  View Details <span className="text-lg">›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Register Section from your UI requirements */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Register now to find personalized matches in Delhi
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
              Continue with Google
            </button>
            <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors">
              Continue with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelhiInternships;