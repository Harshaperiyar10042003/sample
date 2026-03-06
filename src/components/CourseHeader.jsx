import React, { useState, useEffect, useRef } from 'react';
import CourseCards from './CourseCards';

const CourseHeader = () => {
  // Default headers used as fallback
  const defaultHeaders = [
    { title: "AWS Services", id: 1 },
    { title: "UI/UX Design", id: 2 },
    { title: "Full Stack Development", id: 3 },
    { title: "DV Tools", id: 4 },
    { title: "Photography", id: 5 },
    { title: "Backend Development", id: 6 },
    { title: "Machine Learning", id: 7 },
  ];

  const [headers, setHeaders] = useState(defaultHeaders);
  const [isHeaderLoading, setIsHeaderLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [activeHeader, setActiveHeader] = useState(null);
  const [activeHeaderName, setActiveHeaderName] = useState("");
  const [visibleItemCount, setVisibleItemCount] = useState(4);
  const headerContainerRef = useRef(null);

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setVisibleItemCount(5);
      } else if (width >= 1024) {
        setVisibleItemCount(4);
      } else if (width >= 768) {
        setVisibleItemCount(3);
      } else {
        setVisibleItemCount(2);
      }
    };

    // Fetch course categories
    const fetchCourseCategories = async () => {
      setIsHeaderLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          // Format the server response into our header structure
          const formattedHeaders = data.map((category, index) => ({
            title: category,
            id: index + 1
          }));

          setHeaders(formattedHeaders);
          
          // Set the first category as active by default
          if (formattedHeaders.length > 0) {
            setActiveHeader(formattedHeaders[0].id);
            setActiveHeaderName(formattedHeaders[0].title);
          }
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to default headers
        setHeaders(defaultHeaders);
        setActiveHeader(defaultHeaders[0].id);
        setActiveHeaderName(defaultHeaders[0].title);
      } finally {
        setIsHeaderLoading(false);
      }
    };

    // Set initial value
    handleResize();
    fetchCourseCategories();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex === 0) {
        return headers.length - 1;
      }
      return prevIndex - 1;
    });
  };
  
  const handleNextClick = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex >= headers.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const getVisibleHeaders = () => {
    const visibleHeaders = [];
    
    for (let i = 0; i < visibleItemCount; i++) {
      const index = (startIndex + i) % headers.length;
      visibleHeaders.push(headers[index]);
    }
    return visibleHeaders;
  };

  const handleHeaderClick = (header) => {
    setActiveHeader(header.id);
    setActiveHeaderName(header.title);
  };

  const HeaderItem = ({ header }) => {
    const isActive = activeHeader === header.id;
    
    return (
      <div 
        className={`flex-shrink-0 flex-grow flex items-center justify-center font-bold h-full px-1 md:px-4 py-3 text-center 
                   ${isActive ? 'text-gray-900 border-b-[4px] border-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'} 
                   transition-all duration-200 ease-out cursor-pointer`}
        onClick={() => handleHeaderClick(header)}
        style={{ width: `${100 / visibleItemCount}%` }}
      >
        <h2 className="text-sm md:text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis">{header.title}</h2>
      </div>
    );
  };

  return (
      <div className="flex flex-col w-full bg-white mb-8">
        {/* Header section */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
          <span className="text-black">Build a </span>
          <span className="text-blue-600">better future</span>
          <span className="text-black"> with the </span>
          <span className="text-yellow-400">right skills</span>
        </h1>
        
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
          Gain the in-demand skills you need to enter a new field, change direction, or climb the ladder with our 
          <span className="text-blue-600 font-medium"> Professional training programs</span>.
        </p>
      
      </div>

      {/* Course header navigation */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center border-b border-gray-200">
          <button 
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
            onClick={handlePrevClick} 
            aria-label="Previous"
            disabled={isHeaderLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="text-gray-700"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>

          <div 
            ref={headerContainerRef} 
            className="overflow-hidden flex-1"
          >
            {isHeaderLoading ? (
              <div className="flex font-medium h-14">
                {[...Array(visibleItemCount)].map((_, index) => (
                  <div 
                    key={`skeleton-${index}`}
                    className="flex-shrink-0 flex-grow flex items-center justify-center h-full px-4 py-3"
                    style={{ width: `${100 / visibleItemCount}%` }}
                  >
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex font-medium">
                {getVisibleHeaders().map((header) => (
                  <HeaderItem key={header.id} header={header} />
                ))}
              </div>
            )}
          </div>

          <button 
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none" 
            onClick={handleNextClick} 
            aria-label="Next"
            disabled={isHeaderLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="text-gray-700"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Course content */}
      <div className="w-full bg-gray-50 py-8 relative">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large Blue Circle */}
        {/* <div className="absolute -top-20 -left-20 w-80 h-80 border-4 border-blue-600/30 rounded-full animate-rotate-slow"></div> */}
        
        {/* Yellow Accent Shapes */}
        <div className="absolute top-1/4 right-10 w-16 h-16 bg-yellow-400/20 rounded-lg animate-float rotate-45"></div>
        <div className="absolute top-20 right-1/3 w-8 h-8 bg-yellow-400 rounded-full animate-float-delayed"></div>
        
        {/* Blue Geometric Shapes */}
        <div className="absolute bottom-1/3 left-20 w-24 h-24 border-2 border-blue-600/40 rounded-full animate-float-delayed-2"></div>
        <div className="absolute bottom-20 right-20 w-32 h-2 bg-blue-600/30 rounded-full animate-float"></div>
        
        {/* Abstract Lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-yellow-400/60"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-blue-600/60"></div>
        
        {/* Floating Rectangles */}
        <div className="absolute top-40 left-1/3 w-12 h-20 bg-blue-600/10 rounded-lg animate-float-delayed transform -rotate-12"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-12 bg-yellow-400/10 rounded-lg animate-float transform rotate-12"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

    {/* Center Hexagon */}
    <div
      className="absolute top-1/2 left-1/2 w-12 h-12 bg-green-400/15 animate-rotate transform -translate-x-1/2 -translate-y-1/2"
      style={{
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      }}
    ></div>
  </div>

  {/* Main Content */}
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="min-h-[50vh] md:min-h-[60vh]">
        {activeHeaderName && <CourseCards categoryName={activeHeaderName} categoryId={activeHeader} />}
      </div>
    </div>
  </div>
</div>
  );
};

export default CourseHeader;