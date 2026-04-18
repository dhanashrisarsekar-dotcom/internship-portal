import React from 'react';
import { Link } from 'react-router-dom';

// 1. Data specifically for the Computer Science Category
// Added IDs 501-503 and ensured 504-510 match your screenshots
export const csInternships = [
  {
    id: 501,
    title: "Software Development",
    company: "TringBox",
    location: "Work from home",
    duration: "2 Months",
    stipend: "₹ 5,000 - 20,000 /month",
    posted: "Few hours ago",
    offer: "Job offer upto ₹ 10LPA",
    skills: ["Java", "Python", "Node.js", "UI & UX Design"]
  },
  {
    id: 502,
    title: "Flutter Development",
    company: "Kibou Systems",
    location: "Work from home",
    duration: "3 Months",
    stipend: "₹ 2,500 - 3,000 /month",
    posted: "1 week ago",
    skills: ["Flutter", "REST API", "Dart", "Android"]
  },
  {
    id: 503,
    title: "Product Management",
    company: "Trade Pe Tech Private Limited (TreQ)",
    location: "Mumbai",
    duration: "6 Months",
    stipend: "₹ 15,000 - 25,000 /month",
    posted: "3 weeks ago",
    offer: "Job offer upto ₹ 9LPA",
    skills: ["Product Management", "Jira", "SDLC"]
  },
  {
    id: 504,
    title: "Unity3D (Virtual Labs – Education Sector)",
    company: "Mediosim Technology Private Limited",
    location: "Pune",
    duration: "6 Months",
    stipend: "₹ 10,000 - 15,000 /month",
    posted: "2 weeks ago",
    skills: ["C#", "Git", "UI Development", "Unity Engine", "VR"]
  },
  {
    id: 505,
    title: "Backend + DevOps (AWS/GCP)",
    company: "EROEI Tech Private Limited",
    location: "Bangalore",
    duration: "6 Months",
    stipend: "₹ 10,000 - 15,000 /month",
    posted: "Today",
    skills: ["Python", "SQL", "MongoDB", "NoSQL", "Docker", "GitHub"]
  },
  {
    id: 506,
    title: "Quality Assurance & Production Manager",
    company: "Assocom Foods Private Limited",
    location: "Greater Noida",
    duration: "6 Months",
    stipend: "₹ 6,000 - 17,000 /month",
    posted: "2 weeks ago",
    skills: ["MS-Excel", "Report Writing", "Food Safety"]
  },
  {
    id: 507,
    title: "Quality Analyst",
    company: "Sethwala Food Solutions",
    location: "Vasai",
    duration: "3 Months",
    stipend: "₹ 5,000 - 7,000 /month",
    posted: "Today",
    skills: ["Retail Store Audit", "Documentation", "Food Safety"]
  },
  {
    id: 508,
    title: "Java Developer",
    company: "Jarurat Care",
    location: "Work from home",
    duration: "4 Months",
    stipend: "Unpaid",
    posted: "Few hours ago",
    skills: ["Java", "Spring Boot", "WhatsApp Chatbot", "Backend"]
  },
  {
    id: 509,
    title: "Full Stack Development (MERN)",
    company: "TechVeda Solutions",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹ 12,000 - 18,000 /month",
    posted: "2 days ago",
    skills: ["MongoDB", "Express", "React", "Node.js"]
  },
  {
    id: 510,
    title: "Cyber Security Intern",
    company: "Shield InfoSec",
    location: "Delhi",
    duration: "3 Months",
    stipend: "₹ 8,000 /month",
    posted: "1 week ago",
    skills: ["Ethical Hacking", "Networking", "Linux", "Penetration Testing"]
  }
];

const ComputerScienceInternship = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">10 Computer Science Internships</h1>
          <p className="text-gray-500 text-sm mt-1">Latest Computer Science Intern Jobs in India</p>
        </header>

        <div className="space-y-6">
          {/* FIXED: Changed csData to csInternships to match the variable above */}
          {csInternships.map((job) => (
            <div key={job.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600 text-sm font-medium">{job.company}</p>
                </div>
                <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded border font-bold text-gray-400">
                  {job.company.substring(0, 2).toUpperCase()}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>💰 {job.stipend}</span>
                <span>📅 {job.duration}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div className="text-[11px]">
                  <span className="text-green-600 font-medium">🕒 {job.posted}</span>
                  {job.offer && <span className="ml-3 bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">🎁 {job.offer}</span>}
                </div>
                <Link to={`/internship/${job.id}`} className="text-blue-600 font-bold text-sm hover:underline">
                  View details ›
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComputerScienceInternship;