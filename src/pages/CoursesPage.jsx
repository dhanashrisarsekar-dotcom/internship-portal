import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Most Popular');

  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Business'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortOption === 'Price Low to High') return a.price - b.price;
    if (sortOption === 'Price High to Low') return b.price - a.price;
    if (sortOption === 'Top Rated') return b.rating - a.rating;
    if (sortOption === 'Most Popular') return b.students - a.students;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore Courses</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-8 gap-4">
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full md:w-1/3 p-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            className="w-full md:w-auto p-3 border border-gray-200 rounded-lg outline-none cursor-pointer bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Most Popular</option>
            <option>Top Rated</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-40 bg-blue-50 flex items-center justify-center p-6 text-center border-b border-gray-50">
                <h3 className="text-xl font-bold text-blue-900">{course.title}</h3>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded w-fit mb-3">{course.category}</span>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">⭐ {course.rating}</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>⏱ {course.duration}</span>
                  <span>🎓 {course.level}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">₹{course.price}</span>
                  <span className="text-blue-600 font-semibold text-sm group-hover:underline">View Course</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 text-gray-500">No courses found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
