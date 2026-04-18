import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './InternshipPage.css';

const InternshipPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredInternships, setFilteredInternships] = useState([]);
  
  // The location selected in the Navbar (e.g., "Work from Home" or "Delhi")
  const locationFilter = searchParams.get('location');

  const internships = [
    { id: 1, title: "Full Stack Web Development", company: "TechNova Solutions", location: "Remote", stipend: "₹ 15,000 - 20,000 /month", duration: "6 Months", tags: ["React.js", "Node.js", "MongoDB"], posted: "Just now", offer: "PPO available" },
    { id: 2, title: "Mobile App Developer", company: "AppScale Systems", location: "Remote", stipend: "₹ 20,000 /month", duration: "4 Months", tags: ["Flutter", "Firebase"], posted: "Today", offer: "Performance bonus" },
    { id: 3, title: "Data Science Intern", company: "Insight AI Labs", location: "Hyderabad", stipend: "₹ 25,000 /month", duration: "6 Months", tags: ["Python", "ML"], posted: "1 day ago", offer: "PhD Mentors" },
    { id: 4, title: "Cybersecurity Analyst", company: "SecureNet IT", location: "Delhi", stipend: "₹ 18,000 /month", duration: "3 Months", tags: ["Security"], posted: "2 days ago", offer: "Certificate" },
    { id: 7, title: "Graphic Design", company: "Visual Vibes", location: "Bangalore", stipend: "₹ 10,000 /month", duration: "4 Months", tags: ["Illustrator"], posted: "2 days ago", offer: "Project Lead" },
    { id: 11, title: "Insurance Advisor", company: "Prost Technologies", location: "Bangalore", stipend: "₹ 22,000 - 30,000 /month", duration: "4 Months", tags: ["Sales"], posted: "Today", offer: "Job offer potential" },
    { id: 15, title: "Public Relations", company: "Star Media", location: "Mumbai", stipend: "₹ 10,000 /month", duration: "3 Months", tags: ["Communication"], posted: "5 days ago", offer: "Networking" },
    // Add more here if needed, but the logic below handles the rest!
  ];

  useEffect(() => {
    if (!locationFilter || locationFilter === "View all internships") {
      setFilteredInternships(internships);
    } else if (locationFilter === "Work from Home") {
      // Filter for items labeled "Remote"
      setFilteredInternships(internships.filter(i => i.location === "Remote"));
    } else {
      // Filter by specific city (e.g., "Delhi", "Bangalore")
      const city = locationFilter.replace("Internship in ", "");
      setFilteredInternships(internships.filter(i => i.location.includes(city)));
    }
  }, [locationFilter]);

  return (
    <div className="internship-container">
      <div className="max-w-7xl mx-auto px-10 py-8">
        <div className="internship-header mb-6 text-center">
          <p className="breadcrumb text-sm text-gray-400">Home {'>'} Internships</p>
          <h2 className="total-count text-2xl font-bold text-gray-800 mt-4">
            {filteredInternships.length} {locationFilter || "Total"} Internships
          </h2>
          <p className="sub-text text-gray-500">Latest opportunities matching your search</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-1/4">
            <div className="bg-white shadow-sm border rounded-lg p-5 sticky top-24">
              <div className="font-bold mb-4 flex items-center gap-2">🔍 Filters</div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600">Location</label>
                <input type="text" value={locationFilter || ""} readOnly className="w-full border rounded p-2 text-sm mt-1 bg-gray-50" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={locationFilter === "Work from Home"} readOnly />
                <label className="text-sm text-gray-600">Work from home</label>
              </div>
            </div>
          </aside>

          {/* Main Cards */}
          <main className="w-3/4">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((job) => (
                <div key={job.id} className="bg-white border rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-400">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.company}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">📈 Actively hiring</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                    <div>📍 {job.location}</div>
                    <div>💰 {job.stipend}</div>
                    <div>⏳ {job.duration}</div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-green-600 text-xs font-medium">💼 {job.offer}</span>
                    <Link to={`/internship/${job.id}`}>
                      <button className="text-blue-500 font-bold hover:underline">View Details &gt;</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border">
                <p className="text-gray-400">No internships found for "{locationFilter}". Try another location!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage;