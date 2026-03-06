import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Single Course Card
const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course._id || course.id}`, {
      state: { courseData: course },
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Advanced":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:translate-y-[-2px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
          {course.category || "Category"}
        </div>
        <img
          src={course.imageUrl || "https://via.placeholder.com/400x320"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem] leading-snug">
          {course.title}
        </h3>

        {course.duration && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
              <Clock size={14} className="text-gray-500" />
              <span className="font-medium">{course.duration} hrs</span>
            </div>
          </div>
        )}

        <div className="flex-grow"></div>

        <div className="flex justify-start">
          <span
            className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${getLevelColor(
              course.level || "Beginner"
            )}`}
          >
            {course.level || "Beginner"}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

// CourseCards Component: Fetch by category
const CourseCards = ({ categoryName }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryName) return;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/get-courses-by-category/${categoryName}`
        );
        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [categoryName]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden rounded-2xl bg-gray-200 animate-pulse h-[320px]"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center py-8">{error}</p>;
  }

  if (!courses.length) {
    return <p className="text-gray-600 text-center py-8">No courses found for {categoryName}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard key={course._id || course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseCards;
