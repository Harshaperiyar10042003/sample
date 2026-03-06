import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// CourseCard Component
const CourseCard = (props) => {
  const { 
    id,
    title, 
    level, 
    duration, 
    img, 
    category 
  } = props;
  
  const navigate = useNavigate();

  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`, { 
      state: { courseId, courseData: props } 
    });
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Intermediate': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Advanced': return 'bg-rose-50 text-rose-700 border border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:translate-y-[-2px] cursor-pointer"
      onClick={() => handleCardClick(id || '')}>
      
      {/* Course Header with Image */}
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
        {/* Category Tag */}
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
          {category || "Category"}
        </div>
        
        {/* Course Image */}
        <img 
          src={img || '/api/placeholder/400/320'} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Course Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Course Title */}
        <h3 className="mb-3 text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] leading-snug">
          {title || "Course Title"}
        </h3>
        
        {/* Course Duration */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-gray-500" />
            <span className="font-medium">{duration || "0 hours"}</span>
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex-grow"></div>
        
        {/* Level Badge */}
        <div className="flex justify-start">
          <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${getLevelColor(level)}`}>
            {level || "Beginner"}
          </span>
        </div>
      </div>
      
      {/* Hover effect accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-logo-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

// Skeleton loader for courses with reduced animation time
const CourseCardSkeleton = ({ index }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
      {/* Image Skeleton */}
      <div className="h-44 sm:h-48 md:h-52 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]"></div>
      
      {/* Content Skeleton */}
      <div className="flex flex-col p-5 flex-grow">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%]"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse bg-[length:200%_100%] w-3/4"></div>
        </div>
        
        {/* Duration Skeleton */}
        <div className="mb-4">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] w-24"></div>
        </div>
        
        <div className="flex-grow"></div>
        
        {/* Level Badge Skeleton */}
        <div className="flex justify-start">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] w-20"></div>
        </div>
      </div>
    </div>
  );
};

// CourseCards Component
const CourseCards = ({ categoryId, categoryName }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fallback course data
  const fallbackCourseData = [
    {
      id: 1,
      title: "Introduction to Web Development",
      level: "Beginner",
      duration: "8 hours",
      img: "/api/placeholder/400/320",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Advanced React Concepts",
      level: "Advanced",
      duration: "12 hours",
      img: "/api/placeholder/400/320",
      category: "Frontend"
    }
  ];

  // Fetch courses when categoryName changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!categoryName) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Minimum loading time to show smooth transition
        const minLoadTime = 800;
        const startTime = Date.now();
        
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-courses-by-category/${categoryName}`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        
        const data = await response.json();
        
        // Ensure minimum loading time for smooth UX
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
          if (data && Array.isArray(data)) {
            setCourses(data);
          } else {
            const filteredFallback = fallbackCourseData.filter(
              course => course.category === categoryName
            );
            setCourses(filteredFallback.length > 0 ? filteredFallback : fallbackCourseData);
          }
          setIsLoading(false);
        }, remainingTime);
        
        // Preload the next category data
        if (categoryId && typeof categoryId === 'number') {
          const nextCategoryId = categoryId + 1; 
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'fetch';
          preloadLink.href = `${import.meta.env.VITE_SERVER_URL}/get-courses-by-category/${nextCategoryId}`;
          document.head.appendChild(preloadLink);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
        const filteredFallback = fallbackCourseData.filter(
          course => course.category === categoryName
        );
        setCourses(filteredFallback.length > 0 ? filteredFallback : fallbackCourseData);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [categoryName, categoryId]);

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
      {isLoading ? (
        // Show skeleton loaders while loading
        Array.from({ length: 8 }).map((_, index) => (
          <CourseCardSkeleton key={`skeleton-${categoryName}-${index}`} index={index} />
        ))
      ) : courses.length > 0 ? (
        // Show actual courses with staggered animation
        courses.map((course, index) => (
          <div 
            key={`course-${course.id || course._id}`}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 10}ms` }}
          >
            <CourseCard
              id={course._id || course.id}
              title={course.title}
              level={course.level}
              duration={course.duration}
              img={course.imageUrl || course.img}
              category={course.category || categoryName}   
            />
          </div>
        ))
      ) : (
        // No courses found message
        <div className="col-span-full text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">We couldn't find any courses for {categoryName}.</p>
        </div>
      )}
    </div>
  );
};

export default CourseCards;