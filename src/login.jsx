import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  
  // States to capture user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Initialize navigate for redirection
  const navigate = useNavigate();

  // --- Login Logic for Email/Password ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await axios.post('http://localhost:8081/api/login/login', {
        email: email,
        password: password
      });

      if (response.data === "Login successful!") {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        
        // Redirect to your project's main dashboard or home page
        navigate('/'); 
      } else {
        alert(response.data); 
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Server is down. Please check if your Spring Boot app is running on port 8080.");
    }
  };

  // --- Logic for Google Login ---
  const handleGoogleSuccess = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    
    try {
      const response = await axios.post('http://localhost:8081/api/login/google-login', {
        token: credentialResponse.credential,
        email: details.email
      });

      if (response.data === "Login successful!") {
        localStorage.setItem("userEmail", details.email);
        localStorage.setItem("isLoggedIn", "true");
        navigate('/');
      }
    } catch (error) {
      alert("Google Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-100">
        <Link to="/" className="absolute top-4 right-4 text-gray-400 text-2xl">&times;</Link>
        
        <div className="flex border-b mb-8">
          <button 
            onClick={() => setActiveTab('student')} 
            className={`flex-1 pb-3 text-lg font-bold ${activeTab === 'student' ? 'text-[#00A5EC] border-b-2 border-[#00A5EC]' : 'text-gray-400'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setActiveTab('employer')} 
            className={`flex-1 pb-3 text-lg font-bold ${activeTab === 'employer' ? 'text-[#00A5EC] border-b-2 border-[#00A5EC]' : 'text-gray-400'}`}
          >
            Employer / T&P
          </button>
        </div>

        {/* --- Google Login Component --- */}
        <div className="w-full flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Login Failed')}
            useOneTap
          />
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 text-xs font-bold">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* --- Email/Password Form --- */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">Email</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">Password</label>
            <input 
              type="password" 
              placeholder="Must be atleast 6 characters" 
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-right"><a href="#" className="text-[#00A5EC] text-sm font-bold hover:underline">Forgot password?</a></div>
          
          <button type="submit" className="w-full bg-[#00A5EC] text-white py-3 rounded-md font-bold text-lg hover:bg-sky-500 transition-colors">
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-sm">
          New to Internshala? Register (
          <Link to="/register" className="text-[#00A5EC] font-bold">Student</Link> / 
          <Link to="/register" className="text-[#00A5EC] font-bold">Company</Link>)
        </p>
      </div>
    </div>
  );
};

export default LoginPage;