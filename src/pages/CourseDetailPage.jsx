import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
          <div className="lg:w-2/3">
            <span className="text-blue-300 font-bold tracking-wider text-sm uppercase mb-3 block">{course.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{course.title}</h1>
            <p className="text-xl text-blue-100 mb-6">Master the skills with our comprehensive {course.title} program. Taught by industry experts.</p>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">⭐ {course.rating} Rating</span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">👥 {course.students.toLocaleString()} Students</span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">⏱ {course.duration}</span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">🎓 Level: {course.level}</span>
            </div>
            <p className="mt-8 text-blue-200">Instructor: <span className="text-white font-semibold">{course.instructor}</span></p>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-xl sticky top-24">
              <h3 className="text-3xl font-black mb-2">₹{course.price}</h3>
              <p className="text-gray-500 text-sm mb-6">Full lifetime access & certificate included.</p>
              <Link to={`/courses/${course.id}/enroll`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition text-lg mb-4 shadow-md">
                Enroll Now
              </Link>
              <div className="text-center text-xs text-gray-400">30-Day Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.topics.map((topic, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-green-500 mt-0.5">✅</div>
                <span className="text-gray-700 font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
