import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import axios from 'axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Register the user
      const registerRes = await axios.post('http://localhost:8081/api/login/register', {
        email,
        password,
      });

      if (registerRes.data === "User registered successfully!") {
        // Step 2: Immediate Auto-Login
        const loginRes = await axios.post('http://localhost:8081/api/login/login', {
          email,
          password,
        });

        if (loginRes.data === "Login successful!") {
          // Save session info and redirect to your internship platform home
          localStorage.setItem("userEmail", email);
          localStorage.setItem("isLoggedIn", "true");
          navigate('/'); // Redirects to your landing page/dashboard
        }
      } else {
        alert(registerRes.data); // e.g., "Error: Email already exists!"
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Something went wrong. Please check if the backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4">
      <Link to="/"><div className="text-[#008bdc] font-black text-2xl italic mb-12">INTERNSHALA</div></Link>
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Sign-up and <span className="text-[#00A5EC] border-b-4 border-[#00A5EC] rounded-full px-2">apply for free</span>
        </h1>
        <p className="text-xl font-medium text-gray-600">3,00,000+ companies hiring on Internshala</p>
      </div>

      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-8">
        <div className="py-4 text-center font-bold text-gray-700">Candidate sign up</div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Must be 6+ characters"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-[#008BD1] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition mt-4">
            Register & Login
          </button>
        </form>

        <div className="text-center text-gray-700 font-medium mt-6">
          Already registered? <Link to="/login" className="text-sky-500 font-bold">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;