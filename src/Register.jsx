import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4">
      <Link to="/"><div className="text-[#008bdc] font-black text-2xl italic mb-12">INTERNSHALA</div></Link>
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Sign-up and <span className="text-[#00A5EC] border-b-4 border-[#00A5EC] rounded-full px-2">apply for free</span>
        </h1>
        <p className="text-xl font-medium text-gray-600">3,00,000+ companies hiring on Internshala</p>
      </div>

      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="py-4 border-b text-center font-bold text-gray-700">Candidate sign up</div>
        <div className="p-8">
          <button className="w-full flex items-center justify-center gap-3 bg-[#008BD1] text-white py-3 rounded-lg font-bold mb-4 hover:bg-blue-700 transition">
            <div className="bg-white p-1 rounded-full"><img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" /></div>
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-50 mb-6">
            <Mail className="w-5 h-5 text-gray-400" /> Sign up with Email
          </button>
          <p className="text-center text-[11px] text-gray-400 mb-6">By continuing as a candidate, you agree to our <span className="text-sky-500 underline">T&C</span>.</p>
          <div className="text-center text-gray-700 font-medium">Already registered? <Link to="/login" className="text-sky-500 font-bold">Login</Link></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;