import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection';
import LoginPage from './login';
import SignupPage from './Register';
import WFHJobsPage from './WFHJobsPage';
import JobDetailPage from './JobDetailPage';
import ApplyForm from './ApplyForm';
import ResumePreview from './ResumePreview';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="77697696973-5bomdo3g8b12bo1j92gmdilt0nsf667o.apps.googleusercontent.com">
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/jobs" element={<WFHJobsPage />} />
              <Route path="/jobs/detail/:id" element={<JobDetailPage />} />
              <Route path="/jobs/apply/:id" element={<ApplyForm />} />

              {/* 1. Main Landing Pages */}
            <Route path="/" element={<InternshipPage />} />
            <Route path="/internships" element={<InternshipPage />} />
            
            {/* 2. CATEGORY ROUTES (Profile Section) */}
            <Route 
              path="/internships/computer-science-internship" 
              element={<ComputerScienceInternship />} 
            />
            <Route 
              path="/internships/marketing-internship" 
              element={<MarketingInternship />} 
            />
            {/* Added Finance Category Route */}
            <Route 
              path="/internships/finance-internship" 
              element={<FinanceInternship />} 
            />

            {/* 3. LOCATION ROUTES */}
            <Route path="/internships/work-from-home" element={<WorkFromHome />} />
            <Route path="/internships/internship-in-bangalore" element={<BangaloreInternships />} />
            <Route path="/internships/internship-in-delhi" element={<DelhiInternships />} />
            <Route path="/internships/internship-in-hyderabad" element={<HyderabadInternships />} />
            <Route path="/internships/internship-in-:cityName" element={<CityInternshipPage />} />
            
            {/* 4. DYNAMIC DETAIL VIEW */}
            {/* Handles all IDs: 500s (CS), 600s (Marketing), 700s (Finance) */}
            <Route path="/internship/:id" element={<InternshipDetail />} />
            
            {/* 5. APPLICATION FLOW */}
            <Route path="/register" element={<EducationForm />} />
            <Route path="/education-details" element={<EducationForm />} />

            {/* 6. 404 CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          

            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
