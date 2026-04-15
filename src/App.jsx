import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './HeroSection';
import LoginPage from './login';
import SignupPage from './Register';
import WFHJobsPage from './WFHJobsPage';
import JobDetailPage from './JobDetailPage';
import ApplyForm from './ApplyForm';
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
              <Route path="/jobs/wfh" element={<WFHJobsPage />} />
              <Route path="/jobs/detail/:id" element={<JobDetailPage />} />
              <Route path="/jobs/apply/:id" element={<ApplyForm />} />
          
            </Routes>
          </div>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
