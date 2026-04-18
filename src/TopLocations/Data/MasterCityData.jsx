export const allCityInternships = [
  // DELHI
  { id: 201, city: "delhi", title: "Business Analyst", company: "Capital Solutions", location: "New Delhi", duration: "6 Months", stipend: "₹15,000 /month", type: "Actively hiring", posted: "1 day ago", skills: ["SQL", "Excel"], aboutRole: "Analyze business metrics...", perks: ["Certificate"], openings: 2 },
  { id: 202, city: "delhi", title: "Content Strategy", company: "Media House", location: "New Delhi", duration: "3 Months", stipend: "₹10,000 /month", type: "Actively hiring", posted: "Just now", skills: ["Writing"], aboutRole: "Plan digital content...", perks: ["LOR"], openings: 1 },
  
  // MUMBAI
  { id: 301, city: "mumbai", title: "Finance Intern", company: "Dalal Street Corp", location: "Mumbai", duration: "6 Months", stipend: "₹20,000 /month", type: "Actively hiring", posted: "2 days ago", skills: ["Accounting"], aboutRole: "Assist in auditing...", perks: ["Job Offer"], openings: 3 },
  { id: 302, city: "mumbai", title: "Fashion Marketing", company: "StyleHub", location: "Mumbai", duration: "3 Months", stipend: "₹12,000 /month", type: "Actively hiring", posted: "1 day ago", skills: ["Instagram Marketing"], aboutRole: "Manage brand presence...", perks: ["Certificate"], openings: 2 },
  
  // HYDERABAD
  { id: 401, city: "hyderabad", title: "Java Developer", company: "CyberCity Tech", location: "Hyderabad", duration: "6 Months", stipend: "₹18,000 /month", type: "Actively hiring", posted: "4 days ago", skills: ["Java", "Spring"], aboutRole: "Backend development...", perks: ["Certificate"], openings: 2 },
  { id: 402, city: "hyderabad", title: "Cloud Operations", company: "DataCloud", location: "Hyderabad", duration: "6 Months", stipend: "₹22,000 /month", type: "Actively hiring", posted: "3 days ago", skills: ["AWS", "Linux"], aboutRole: "Manage server clusters...", perks: ["Job Offer"], openings: 1 },

  // PUNE
  { id: 501, city: "pune", title: "Automotive Design", company: "AutoVex", location: "Pune", duration: "6 Months", stipend: "₹15,000 /month", type: "Actively hiring", posted: "1 week ago", skills: ["AutoCAD"], aboutRole: "Design vehicle parts...", perks: ["Certificate"], openings: 1 },
  { id: 502, city: "pune", title: "Software Testing", company: "QualityFirst", location: "Pune", duration: "4 Months", stipend: "₹12,000 /month", type: "Actively hiring", posted: "2 days ago", skills: ["Selenium"], aboutRole: "Manual and automated QA...", perks: ["Certificate"], openings: 3 },

  // CHENNAI
  { id: 601, city: "chennai", title: "UI/UX Designer", company: "Coastal Digital", location: "Chennai", duration: "4 Months", stipend: "₹12,000 /month", type: "Actively hiring", posted: "3 days ago", skills: ["Figma"], aboutRole: "Mobile app design...", perks: ["LOR"], openings: 2 },
  { id: 602, city: "chennai", title: "Front-End Developer", company: "BayTech", location: "Chennai", duration: "6 Months", stipend: "₹18,000 /month", type: "Actively hiring", posted: "5 days ago", skills: ["React", "Tailwind"], aboutRole: "Develop modern web interfaces...", perks: ["Certificate"], openings: 2 },

  // KOLKATA
  { id: 701, city: "kolkata", title: "Social Media Manager", company: "EastEdge Media", location: "Kolkata", duration: "3 Months", stipend: "₹8,000 /month", type: "Actively hiring", posted: "1 day ago", skills: ["Content Creation", "SEO"], aboutRole: "Handle social handles...", perks: ["Certificate"], openings: 4 },
  { id: 702, city: "kolkata", title: "Research Analyst", company: "Insight Bengal", location: "Kolkata", duration: "6 Months", stipend: "₹10,000 /month", type: "Actively hiring", posted: "4 days ago", skills: ["Market Research"], aboutRole: "Data collection and analysis...", perks: ["LOR"], openings: 2 },

  // JAIPUR
  { id: 801, city: "jaipur", title: "Graphic Designer", company: "PinkCity Creative", location: "Jaipur", duration: "4 Months", stipend: "₹9,000 /month", type: "Actively hiring", posted: "2 days ago", skills: ["Photoshop", "Illustrator"], aboutRole: "Design marketing assets...", perks: ["Certificate"], openings: 2 },
  { id: 802, city: "jaipur", title: "E-commerce Manager", company: "CraftVila", location: "Jaipur", duration: "6 Months", stipend: "₹11,000 /month", type: "Actively hiring", posted: "Just now", skills: ["Shopify", "Inventory"], aboutRole: "Manage online storefront...", perks: ["Job Offer"], openings: 1 },

  // AHMEDABAD
  { id: 901, city: "ahmedabad", title: "Node.js Developer", company: "Sabarmati Tech", location: "Ahmedabad", duration: "6 Months", stipend: "₹16,000 /month", type: "Actively hiring", posted: "3 days ago", skills: ["Node.js", "Express"], aboutRole: "Scalable backend systems...", perks: ["Certificate"], openings: 3 },
  { id: 902, city: "ahmedabad", title: "Export Import Intern", company: "Gujarat Trade", location: "Ahmedabad", duration: "3 Months", stipend: "₹10,000 /month", type: "Actively hiring", posted: "1 week ago", skills: ["Communication"], aboutRole: "Documentation for logistics...", perks: ["LOR"], openings: 5 },

  // GURUGRAM
  { id: 1001, city: "gurugram", title: "HR Generalist", company: "Corporate Link", location: "Gurugram", duration: "3 Months", stipend: "₹12,000 /month", type: "Actively hiring", posted: "2 days ago", skills: ["Recruitment", "MS Office"], aboutRole: "Support talent acquisition...", perks: ["Certificate"], openings: 2 },
  { id: 1002, city: "gurugram", title: "Cyber Security", company: "Shield Network", location: "Gurugram", duration: "6 Months", stipend: "₹25,000 /month", type: "Actively hiring", posted: "4 days ago", skills: ["Ethical Hacking"], aboutRole: "Security audit and testing...", perks: ["Job Offer"], openings: 1 },

  // BANGALORE (Included here as well for consistency)
  { id: 101, city: "bangalore", title: "Digital Marketing", company: "Emovur", location: "Bangalore", duration: "3 Months", stipend: "₹15,000 /month", type: "Actively hiring", posted: "1 day ago", skills: ["SEO", "AdWords"], aboutRole: "Strategic marketing...", perks: ["Certificate"], openings: 2 },
  { id: 102, city: "bangalore", title: "App Developer", company: "AppScale", location: "Bangalore", duration: "6 Months", stipend: "₹20,000 /month", type: "Actively hiring", posted: "Just now", skills: ["Flutter", "Dart"], aboutRole: "Cross-platform mobile apps...", perks: ["Job Offer"], openings: 3 }
];