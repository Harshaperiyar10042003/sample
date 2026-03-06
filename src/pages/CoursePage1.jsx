import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../assets/img/logo.ico';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CoursePage = () => {
  const navigate = useNavigate();
  // State for course data and loading status
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  // State for expanded modules
  const [expandedModules, setExpandedModules] = useState({});
  
  // Get course ID from URL params
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-course/${id}`);
        if (!response.ok) throw new Error("Failed to fetch course data");
        const data = await response.json();
        
        if (data && data.title) {
          setCourse(data);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);

  // Memoize modules parsing for performance
  const modules = useMemo(() => {
    if (!course?.tableOfContents) return [];
    
    const parsedModules = [];
    let currentModule = null;
    let moduleIndex = 1;

    for (let i = 0; i < course.tableOfContents.length; i++) {
      const content = course.tableOfContents[i];
      const contentLower = content.toLowerCase();
      
      // Check if this content starts with "module"
      if (contentLower.startsWith('module')) {
        // Save the previous module if it exists
        if (currentModule) {
          parsedModules.push(currentModule);
        }
        
        // Create new module - include everything after the colon in the title
        const parts = content.split(':');
        let moduleTitle;
        
        if (parts.length > 1) {
          // If there's content after colon, include it in the module title
          moduleTitle = `Module ${moduleIndex}: ${parts[1].trim()}`;
        } else {
          // If no colon, use the whole content (removing the "module" part)
          moduleTitle = `Module ${moduleIndex}: ${content.replace(/^module\s*/i, '').trim()}`;
        }
        
        currentModule = {
          title: moduleTitle,
          lessons: [],
          lessonCount: 0
        };
        moduleIndex++;
      } else {
        if (!currentModule) {
          // If no module has been created yet, create a default one
          currentModule = {
            title: `Module ${moduleIndex}: Course Content`,
            lessons: [],
            lessonCount: 0
          };
          moduleIndex++;
        }
        
        const parts = content.split(':');
        const title = parts.length > 1 ? parts[1].trim() : content.trim();
        
        currentModule.lessons.push({
          title: title
        });
        currentModule.lessonCount++;
      }
    }

    // Don't forget to add the last module
    if (currentModule) {
      parsedModules.push(currentModule);
    }

    return parsedModules;
  }, [course?.tableOfContents]);

  // Memoized toggle function to prevent re-renders
  const toggleModule = useCallback((index) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  // Memoized course stats
  const courseStats = useMemo(() => {
    const totalLessons = course?.tableOfContents?.length || 0;
    const totalModules = modules.length;
    
    return { totalLessons, totalModules };
  }, [course?.tableOfContents?.length, modules.length]);

  // Memoized skills array
  const skills = useMemo(() => {
    return course?.skills || course?.category?.split(',') || ["Web Development", "Programming", "Problem Solving"];
  }, [course?.skills, course?.category]);

  // Memoized learning points (first 6 items from table of contents)
  const learningPoints = useMemo(() => {
    return course?.tableOfContents?.slice(0, 6) || [];
  }, [course?.tableOfContents]);

  // Format price function
  const formatPrice = (price) => {
    if (!price || price === 0) return "Free";
    if (typeof price === 'number') return `₹${price.toFixed(2)}`;
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-100 min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Course Not Found</h2>
            <p className="text-gray-600">The course you're looking for doesn't exist or couldn't be loaded.</p>
            <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const courseIdForEnrollment = course.title;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            <div className="flex justify-between items-center pb-2 pr-2">
              <Link to="/">
                <img 
                  src={Logo || "/api/placeholder/64/64"} 
                  alt="Logo" 
                  className="rounded-full w-12 h-12 cursor-pointer hover:scale-105 transition-transform" 
                />
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-4 leading-tight">{course.title}</h1>
            <div className="flex items-center flex-wrap text-blue-200 space-x-6 text-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{course.duration || "Self-paced"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>{course.category}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h8m-8 0H4a2 2 0 00-2 2v9a1 1 0 001 1h1m0 0h16a1 1 0 001-1V9a2 2 0 00-2-2h-4m-6 0V3a2 2 0 012-2h4a2 2 0 012 2v4" />
                </svg>
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              {/* Add price to hero section */}
              <span>•</span>
              <div className="flex items-center">
                <span className="font-bold">{formatPrice(course.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Course Content */}
          <div className="lg:w-2/3">
            {/* About course */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-1 border border-gray-100">
              <h1 className='text-blue-600 text-2xl font-bold'>About this course</h1>
              <h2 className="text-lg mt-1 mb-1 text-black flex items-center">                
                <p className="text-lg text-black mb-2 leading-relaxed">{course.description}</p>
              </h2>
            </div>

            {/* What You'll Learn Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningPoints.map((content, index) => (
                  <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{content.split(':').pop().trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Course Content
              </h2>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-semibold">{courseStats.totalModules} modules</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{courseStats.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{course.duration || "Self-paced"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <button 
                      className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
                      onClick={() => toggleModule(index)}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2 mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
                          <p className="text-sm text-gray-500">{module.lessonCount} lessons</p>
                        </div>
                      </div>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${expandedModules[index] ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedModules[index] && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        {module.lessons.map((lesson, idx) => (
                          <div key={idx} className="flex justify-between items-center py-4 px-6 hover:bg-white transition-colors border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center">
                              <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <span className="font-medium text-gray-700">{lesson.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Section */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Instructor
              </h2>
              <div className="flex items-start bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <div className="bg-gradient-to-r from-indigo-500 to-yellow-400 rounded-full p-4 mr-6">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Expert Instructor</h3>
                  <p className="text-indigo-600 font-semibold mb-3">Specialist in {course.category}</p>
                  <p className="text-gray-700 leading-relaxed">Our instructor is a seasoned professional with extensive experience in {course.category}. They specialize in creating comprehensive, easy-to-follow courses that help students master complex subjects and apply their knowledge in real-world scenarios.</p>
                </div>
              </div>
            </div> */}

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills You'll Gain
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-gradient-to-r from-yellow-100 to-blue-100 text-black py-2 px-4 rounded-full text-sm font-medium hover:shadow-md transition-shadow">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Course Info Card */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="relative">
                  <div className="h-60">
                    <img 
                      src={course.imageUrl || course.img || "/api/placeholder/400/192"} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/192";
                      }}
                    />
                    <div className="absolute inset-0"></div>
                  </div>
                </div>
                <div className="p-8">
                  {/* Price Display */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {formatPrice(course.price)}
                    </div>
                    {course.price && course.price > 0 && (
                      <p className="text-sm text-gray-500">Enroll today and get an exclusive discount!</p>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-2xl mb-6 text-gray-800 text-center">Ready to Begin?</h3>
                  
                  <Link to={`/Enroll/${courseIdForEnrollment}`}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl mb-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {course.price && course.price > 0 ? 'Get Started' : 'Start Free Course'}
                    </button>
                  </Link>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <div className="bg-green-500 rounded-full p-1 mr-3">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-green-800">Expert instructor support</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="bg-blue-500 rounded-full p-1 mr-3">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-blue-800">Digital learning resources</span>
                    </div>
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <div className="bg-yellow-400 rounded-full p-1 mr-3">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-purple-800">Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;