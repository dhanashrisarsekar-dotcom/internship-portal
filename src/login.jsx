import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative border border-gray-100">
        <Link to="/" className="absolute top-4 right-4 text-gray-400 text-2xl">&times;</Link>
        
        <div className="flex border-b mb-8">
          <button onClick={() => setActiveTab('student')} className={`flex-1 pb-3 text-lg font-bold ${activeTab === 'student' ? 'text-[#00A5EC] border-b-2 border-[#00A5EC]' : 'text-gray-400'}`}>Student</button>
          <button onClick={() => setActiveTab('employer')} className={`flex-1 pb-3 text-lg font-bold ${activeTab === 'employer' ? 'text-[#00A5EC] border-b-2 border-[#00A5EC]' : 'text-gray-400'}`}>Employer / T&P</button>
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md mb-6 font-medium text-gray-600 hover:bg-gray-50">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
          Login with Google
        </button>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 text-xs font-bold">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">Email</label>
            <input type="email" placeholder="john@example.com" className="w-full px-4 py-2 border rounded-md outline-none focus:border-sky-400" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1 text-sm">Password</label>
            <input type="password" placeholder="Must be atleast 6 characters" className="w-full px-4 py-2 border rounded-md outline-none focus:border-sky-400" />
          </div>
          <div className="text-right"><a href="#" className="text-[#00A5EC] text-sm font-bold hover:underline">Forgot password?</a></div>
          <button className="w-full bg-[#00A5EC] text-white py-3 rounded-md font-bold text-lg">Login</button>
        </form>

        <p className="mt-8 text-center text-sm">New to Internshala? Register (<Link to="/register" className="text-[#00A5EC] font-bold">Student</Link> / <Link to="/register" className="text-[#00A5EC] font-bold">Company</Link>)</p>
      </div>
    </div>
  );
};

export default LoginPage;