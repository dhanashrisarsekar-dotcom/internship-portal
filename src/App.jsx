import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import LoginPage from './login';
import SignupPage from './Register';
import WFHJobsPage from './WFHJobsPage';
import JobDetailPage from './JobDetailPage';
import ApplyForm from './ApplyForm';
import ResumePreview from './ResumePreview';
import InternshipPage from './InternshipPage';
import InternshipDetail from './InternshipDetail';
import EducationForm from './Registration/EducationForm';
import ComputerScienceInternship from './Profile/ComputerScienceInternship';
import MarketingInternship from './Profile/MarketingInternship';
import FinanceInternship from './Profile/FinanceInternship';
import WorkFromHome from './TopLocations/Pages/WorkFromHome';
import BangaloreInternships from './TopLocations/Pages/BangaloreInternships';
import DelhiInternships from './TopLocations/Pages/DelhiInternships';
import HyderabadInternships from './TopLocations/Pages/HyderabadInternships';
import CityInternshipPage from './TopLocations/Pages/CityInternshipPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import EnrollPage from './pages/EnrollPage';
import HackathonsPage from './pages/HackathonsPage';
import CreateHackathonPage from './pages/CreateHackathonPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import HackathonApplyPage from './pages/HackathonApplyPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="77697696973-5bomdo3g8b12bo1j92gmdilt0nsf667o.apps.googleusercontent.com">
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path="/courses/:id/enroll" element={<EnrollPage />} />
              <Route path="/hackathons" element={<HackathonsPage />} />
              <Route path="/hackathons/create" element={<CreateHackathonPage />} />
              <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="/hackathons/:id/apply" element={<HackathonApplyPage />} />
              <Route path="/" element={<HeroSection />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/jobs" element={<WFHJobsPage />} />
              <Route path="/jobs/detail/:id" element={<JobDetailPage />} />
              <Route path="/jobs/apply/:id" element={<ApplyForm />} />

              {/* 1. Main Landing Pages */}
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
