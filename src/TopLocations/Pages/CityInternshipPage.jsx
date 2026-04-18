import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allCityInternships } from "../Data/MasterCityData";

const CityInternshipPage = () => {
  const { cityName } = useParams(); // This catches "bangalore", "delhi", etc.

  // Filter the master list. We use .toLowerCase() to ensure it matches perfectly.
  const filteredJobs = allCityInternships.filter(
    (job) => job.city.toLowerCase() === cityName.toLowerCase()
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {filteredJobs.length} Internships in {cityName.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Latest internship opportunities in {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS (Standard across all city pages) */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-center gap-2 mb-6 text-blue-600 font-bold border-b pb-4">
                <span>🔍</span> Filters
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Location</label>
                  <div className="flex items-center justify-between border border-blue-200 p-2 rounded text-sm bg-blue-50 text-blue-700 font-medium capitalize">
                    {cityName} <span className="cursor-pointer text-blue-400">✕</span>
                  </div>
                </div>
                <button className="text-blue-600 text-sm font-bold w-full text-right hover:underline">Clear all</button>
              </div>
            </div>
          </aside>

          {/* MAIN LISTING AREA */}
          <main className="w-full lg:w-3/4 space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center font-bold rounded border border-blue-100">
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
                          {job.title}
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">{job.company}</p>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">📍 {job.location}</div>
                    <div className="flex items-center gap-1">💰 {job.stipend}</div>
                    <div className="flex items-center gap-1">📅 {job.duration}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Actively hiring
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">🕒 {job.posted}</span>
                    </div>
                    <Link 
                      to={`/internship/${job.id}`} 
                      className="text-blue-600 font-bold text-sm hover:underline"
                    >
                      View details &gt;
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-20 text-center rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No internships found for this location yet.</p>
                <Link to="/" className="text-blue-600 font-bold mt-4 inline-block">Back to home</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CityInternshipPage;