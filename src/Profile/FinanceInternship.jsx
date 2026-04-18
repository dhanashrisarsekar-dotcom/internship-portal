import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

const FinanceInternship = () => {
  const financeJobs = [
    { id: 701, title: "Investment Banking Intern", company: "Goldman Sachs", location: "Bangalore", stipend: "₹70,000 - ₹1,50,000", icon: <Landmark className="text-blue-600" /> },
    { id: 702, title: "Financial Analyst", company: "J.P. Morgan", location: "Mumbai", stipend: "₹70,000 - ₹1,20,000", icon: <TrendingUp className="text-green-600" /> },
    { id: 703, title: "Equity Research Intern", company: "Morgan Stanley", location: "Mumbai", stipend: "₹60,000 - ₹1,10,000", icon: <PieChart className="text-purple-600" /> },
    { id: 704, title: "Risk Advisory Intern", company: "Deloitte", location: "Delhi", stipend: "₹30,000 - ₹50,000", icon: <ShieldCheck className="text-red-600" /> },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finance Internships</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {financeJobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">{job.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{job.location}</span>
              <span className="text-gray-700 font-semibold">{job.stipend}</span>
            </div>
            <Link 
              to={`/internship/${job.id}`}
              className="mt-6 block w-full text-center py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceInternship;