import React from 'react';
import { profileMenuData } from '../Data/ProfileData';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Internships by Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileMenuData.map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer group">
              <h3 className="font-bold text-gray-700 group-hover:text-blue-600">{item}</h3>
              <p className="text-sm text-gray-400 mt-2">Explore active opportunities →</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;