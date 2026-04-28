import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';

const EnrollPage = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Enrolled Successfully!</h2>
          <p className="text-gray-600 mb-8">Welcome aboard. You now have full access to <strong>{course.title}</strong>.</p>
          <Link to="/courses" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition inline-block w-full">
            Browse More Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline font-medium mb-6 inline-block">← Back to Course</Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/2 p-10 bg-blue-50 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center">
            <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-2">Order Summary</h3>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
              <div className="flex justify-between mb-2 text-gray-600"><span>Original Price</span> <span>₹{course.price}</span></div>
              <div className="flex justify-between mb-4 border-b pb-4 text-green-600"><span>Discount</span> <span>-₹0</span></div>
              <div className="flex justify-between font-bold text-xl text-gray-900"><span>Total</span> <span>₹{course.price}</span></div>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">🛡️ Secure 256-bit SSL encryption</p>
          </div>
          
          <div className="md:w-1/2 p-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input required type="tel" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg outline-none bg-white focus:border-blue-500 cursor-pointer">
                  <option>Card (Credit/Debit)</option>
                  <option>UPI</option>
                  <option>Net Banking</option>
                  <option>EMI</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition text-lg mt-4 shadow-md">
                Pay ₹{course.price} & Enroll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;
