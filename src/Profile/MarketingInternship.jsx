import React from 'react';
import { Link } from 'react-router-dom';

export const marketingInternships = [
  { id: 601, title: "Digital Marketing", company: "Growth Media", location: "Work from home", stipend: "₹ 8,000 - 12,000 /month", duration: "3 Months", skills: ["SEO", "SM Marketing", "Analytics"] },
  { id: 602, title: "Content Marketing", company: "Creative Pulse", location: "Delhi", stipend: "₹ 15,000 /month", duration: "6 Months", skills: ["Writing", "Strategy"] },
  { id: 605, title: "Brand Management", company: "Iconic Brands", location: "Bangalore", stipend: "₹ 12,000 - 18,000 /month", duration: "6 Months", skills: ["Research", "Projects"] }
  // ... Add all 10 mapping objects here for the UI
];

const MarketingInternship = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">10 Marketing Internships</h1>
          <p className="text-gray-500 text-sm mt-1">Boost your career with top Marketing roles</p>
        </header>
        <div className="space-y-6">
          {marketingInternships.map((job) => (
            <div key={job.id} className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>
              <div className="mt-4 flex gap-4 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>💰 {job.stipend}</span>
              </div>
              <div className="mt-4 flex justify-between items-center border-t pt-4">
                <Link to={`/internship/${job.id}`} className="text-blue-600 font-bold text-sm">View details ›</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingInternship;