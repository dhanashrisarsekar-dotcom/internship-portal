import React, { useState } from 'react';

const Registration = () => {
  const [step, setStep] = useState(2); // Set to 2 to show the new page

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Education details</h1>
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        <form className="space-y-8">
          
          {/* Graduation Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Graduation status</label>
            <div className="flex gap-4">
              {['Pursuing', 'Completed'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className="px-6 py-2 border rounded-full text-sm font-medium border-blue-500 text-blue-600 bg-blue-50"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* College Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">College</label>
            <input 
              type="text" 
              placeholder="e.g. IIT Delhi" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Start Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start year</label>
              <select className="w-full p-3 border rounded-lg bg-white outline-none">
                <option>Choose year</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
            </div>
            {/* End Year */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End year</label>
              <select className="w-full p-3 border rounded-lg bg-white outline-none">
                <option>Choose year</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
              </select>
            </div>
          </div>

          {/* Degree & Stream */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Degree</label>
              <input type="text" placeholder="e.g. B.Tech" className="w-full p-3 border rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stream (Optional)</label>
              <input type="text" placeholder="e.g. Computer Science" className="w-full p-3 border rounded-lg outline-none" />
            </div>
          </div>

          {/* Performance Scale */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Performance scale</label>
            <div className="flex gap-4">
              {['Percentage', 'CGPA (10)', 'CGPA (7)', 'CGPA (5)', 'CGPA (4)'].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  className="px-4 py-2 border rounded-full text-xs font-medium text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  {scale}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
             <button type="button" className="text-gray-400 font-bold px-6">Back</button>
             <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all"
             >
                Next
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;