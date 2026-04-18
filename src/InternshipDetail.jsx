import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './InternshipPage.css';

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const internshipData = {
    // --- COMPUTER SCIENCE CATEGORY (500s) ---
    "501": {
      title: "Software Development",
      company: "TringBox",
      location: "Work from home",
      startDate: "Immediately",
      duration: "2 Months",
      stipend: "₹ 5,000 - 20,000 /month",
      applyBy: "25 Apr '26",
      about: ["Develop and maintain software applications.", "Work with Java, Python, and Node.js.", "Collaborate on UI & UX Design."],
      skills: ["Java", "JavaScript", "Python", "Node.js", "UI & UX Design"],
      whoCanApply: ["Available for Work from home", "Available for 2 months", "Can start immediately"],
      perks: ["Certificate", "Job offer post internship", "Part time"],
      openings: 2
    },
    "504": {
      title: "Unity3D (Virtual Labs)",
      company: "Mediosim Technology Private Limited",
      location: "Pune",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 10,000 - 15,000 /month",
      applyBy: "30 Apr '26",
      about: ["Develop interactive 3D virtual lab experiments.", "Implement physics-based simulations."],
      skills: ["C#", "Git", "Unity Engine", "VR"],
      whoCanApply: ["Available for 6 months", "Strong in Unity/C#"],
      perks: ["Certificate", "Letter of Recommendation"],
      openings: 2
    },

    // --- MARKETING CATEGORY (600s) ---
    "601": {
      title: "Digital Marketing",
      company: "Growth Media",
      location: "Work from home",
      startDate: "Immediately",
      duration: "3 Months",
      stipend: "₹ 8,000 - 12,000 /month",
      applyBy: "15 May '26",
      about: ["Manage social media campaigns.", "Optimize SEO for client websites.", "Analyze traffic using Google Analytics."],
      skills: ["SEO", "Social Media Marketing", "Google Analytics"],
      whoCanApply: ["Available for 3 months", "Knowledge of FB Ads"],
      perks: ["Certificate", "Letter of Recommendation"],
      openings: 3
    },
    "602": {
      title: "Content Marketing",
      company: "Creative Pulse",
      location: "Delhi",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 15,000 /month",
      applyBy: "20 May '26",
      about: ["Create engaging blog posts.", "Develop content strategies for brands."],
      skills: ["Content Writing", "Creative Writing", "English Proficiency"],
      whoCanApply: ["Available for 6 months in Delhi", "Strong writing portfolio"],
      perks: ["Certificate", "Job offer post internship"],
      openings: 2
    },

    // --- FINANCE CATEGORY (700s) ---
    "701": {
      title: "Investment Banking Intern",
      company: "Goldman Sachs",
      location: "Bangalore",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 45,000 /month",
      applyBy: "30 May '26",
      about: ["Analyze financial statements and market trends.", "Prepare pitch books for M&A deals.", "Assist in valuation modeling."],
      skills: ["Financial Modeling", "Excel", "Valuation", "Accounting"],
      whoCanApply: ["MBA Finance or CA students", "Available for 6 months"],
      perks: ["Certificate", "Premium Cafeteria", "Job Offer post-internship"],
      openings: 5
    },
    "702": {
      title: "Equity Research",
      company: "Morgan Stanley",
      location: "Mumbai",
      startDate: "Immediately",
      duration: "3 Months",
      stipend: "₹ 35,000 /month",
      applyBy: "25 May '26",
      about: ["Conduct fundamental analysis of listed companies.", "Write research reports on sector trends.", "Track stock price movements and news."],
      skills: ["Stock Market Analysis", "Report Writing", "Financial Statement Analysis"],
      whoCanApply: ["Available for 3 months", "Strong interest in Markets"],
      perks: ["Certificate", "Letter of Recommendation"],
      openings: 2
    },
    "703": {
      title: "Chartered Accountancy (CA) Intern",
      company: "Deloitte India",
      location: "Delhi",
      startDate: "Immediately",
      duration: "12 Months",
      stipend: "₹ 15,000 - 20,000 /month",
      applyBy: "10 June '26",
      about: ["Support statutory and internal audits.", "Handle taxation and compliance filings.", "Prepare financial audit workpapers."],
      skills: ["Auditing", "Income Tax", "GST", "Tally"],
      whoCanApply: ["CA IPCC Cleared students", "Based in Delhi/NCR"],
      perks: ["Certificate", "Professional Training"],
      openings: 10
    },
    "704": {
      title: "Financial Planning & Analysis",
      company: "HDFC Bank",
      location: "Work from home",
      startDate: "Immediately",
      duration: "4 Months",
      stipend: "₹ 10,000 /month",
      applyBy: "20 May '26",
      about: ["Assist in budget preparation.", "Monitor departmental expenses vs budgets.", "Analyze variances in financial reports."],
      skills: ["Budgeting", "Advanced Excel", "MS-PowerPoint"],
      whoCanApply: ["B.Com/BBA graduates", "Available for 4 months"],
      perks: ["Certificate", "Flexible work hours"],
      openings: 3
    },
    "705": {
      title: "Tally & GST Consultant",
      company: "FinTax Solutions",
      location: "Hyderabad",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 8,000 /month",
      applyBy: "15 May '26",
      about: ["Record day-to-day business transactions in Tally.", "Prepare GST reconciliation sheets.", "Assist in filing monthly returns."],
      skills: ["Tally", "GST", "Accounting"],
      whoCanApply: ["Local Hyderabad candidates", "Basic Accounting knowledge"],
      perks: ["Certificate", "Job Offer"],
      openings: 4
    },
    "706": {
      title: "Corporate Finance Intern",
      company: "Reliance Industries",
      location: "Mumbai",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 25,000 /month",
      applyBy: "05 June '26",
      about: ["Assist in capital structure analysis.", "Manage cash flow forecasting.", "Evaluate investment opportunities."],
      skills: ["Corporate Finance", "Business Analysis", "Financial Modeling"],
      whoCanApply: ["MBA/PGDM Finance", "Full-time availability"],
      perks: ["Certificate", "Corporate exposure"],
      openings: 2
    },
    "707": {
      title: "Wealth Management",
      company: "ICICI Securities",
      location: "Pune",
      startDate: "Immediately",
      duration: "3 Months",
      stipend: "₹ 5,000 /month + Incentives",
      applyBy: "22 May '26",
      about: ["Help clients manage their investment portfolios.", "Pitch mutual funds and insurance products.", "Market research on wealth products."],
      skills: ["Mutual Funds", "Sales", "Communication"],
      whoCanApply: ["Available for 3 months", "Outgoing personality"],
      perks: ["Certificate", "Performance Incentives"],
      openings: 8
    },
    "708": {
      title: "Risk Management",
      company: "Standard Chartered",
      location: "Bangalore",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 30,000 /month",
      applyBy: "28 May '26",
      about: ["Identify credit and operational risks.", "Build risk assessment models.", "Conduct stress testing simulations."],
      skills: ["Risk Assessment", "Statistics", "SQL"],
      whoCanApply: ["B.Tech/Eco(Hons) with Math", "Available for 6 months"],
      perks: ["Certificate", "Global Team Interaction"],
      openings: 2
    },
    "709": {
      title: "Cost Accounting",
      company: "Tata Motors",
      location: "Pune",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 12,000 /month",
      applyBy: "01 June '26",
      about: ["Analyze manufacturing costs.", "Assist in inventory valuation and audits.", "Support cost reduction projects."],
      skills: ["Costing", "ERP Systems", "Excel"],
      whoCanApply: ["CMA Inter candidates preferred", "Based in Pune"],
      perks: ["Certificate", "Industry Training"],
      openings: 3
    },
    "710": {
      title: "Forensic Accounting",
      company: "EY (Ernst & Young)",
      location: "Mumbai",
      startDate: "Immediately",
      duration: "5 Months",
      stipend: "₹ 20,000 /month",
      applyBy: "18 May '26",
      about: ["Investigate financial fraud and white-collar crimes.", "Analyze bank statements for irregularities.", "Assist in data recovery for litigation."],
      skills: ["Investigation", "Audit", "Critical Thinking"],
      whoCanApply: ["B.Com/M.Com/CA", "Available for 5 months"],
      perks: ["Certificate", "High-profile projects"],
      openings: 1
    },

    // --- OTHER INTERNSHIPS ---
    "1": {
      title: "Full Stack Development",
      company: "New Era Consultancy Services",
      location: "Jalgaon",
      startDate: "Immediately",
      duration: "6 Months",
      stipend: "₹ 5,000 - 10,000 /month",
      applyBy: "18 Apr '26",
      about: ["Customize and develop WordPress websites.", "Work with PHP and Python."],
      skills: ["HTML", "JavaScript", "PHP", "WordPress"],
      whoCanApply: ["Available for full time internship", "Open to relocate"],
      perks: ["Certificate", "Job offer"],
      openings: 1
    }
  };

  const job = internshipData[id] || internshipData["501"];

  return (
    <div className="detail-view-container">
      <div className="detail-nav">
        <Link to="/internships" className="back-link">← Back to all internships</Link>
      </div>

      <div className="main-detail-card">
        <div className="header-top">
          <div className="header-text">
            <h2>{job.title}</h2>
            <p className="company-name">{job.company}</p>
          </div>
          <div className="company-logo-placeholder">
            <div className="logo-box">{job.company.substring(0, 2).toUpperCase()}</div>
          </div>
        </div>

        <div className="location-tag">📍 {job.location}</div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">START DATE</span>
            <span className="stat-value">{job.startDate}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">DURATION</span>
            <span className="stat-value">{job.duration}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">STIPEND</span>
            <span className="stat-value">{job.stipend}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">APPLY BY</span>
            <span className="stat-value">{job.applyBy}</span>
          </div>
        </div>

        <div className="action-bar">
          <button className="apply-btn-top" onClick={() => navigate('/register')}>Apply now</button>
        </div>

        <hr className="divider" />

        <div className="detail-body">
          <section className="info-section">
            <h3>About the internship</h3>
            <ul>
              {job.about.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="info-section">
            <h3>Skill(s) required</h3>
            <div className="skills-list">
              {job.skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </section>

          <section className="info-section">
            <h3>Who can apply</h3>
            <ul className="apply-list">
              {job.whoCanApply.map((item, index) => (
                <li key={index}>{index + 1}. {item}</li>
              ))}
            </ul>
          </section>

          <section className="info-section">
            <h3>Perks</h3>
            <div className="skills-list">
              {job.perks.map(perk => (
                <span key={perk} className="skill-badge">{perk}</span>
              ))}
            </div>
          </section>

          <section className="info-section">
            <h3>Number of openings</h3>
            <p>{job.openings}</p>
          </section>
        </div>

        <div className="footer-apply">
          <button className="apply-btn-bottom" onClick={() => navigate('/register')}>Apply now</button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;