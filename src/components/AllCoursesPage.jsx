import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

/* ===========================
   Course Card
=========================== */
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
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer"
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

/* ===========================
   Main Page
=========================== */
const AllCoursesPage = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All Categories"]);
  const [selectedLevels, setSelectedLevels] = useState(["All Levels"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  /* Fetch Categories */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/categories`);
        const data = await res.json();
        setCategories(["All Categories", ...data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  /* Fetch Courses */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-courses`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  /* Filtering Logic */
  useEffect(() => {
    let filtered = [...courses];

    if (!selectedCategories.includes("All Categories")) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    if (!selectedLevels.includes("All Levels")) {
  filtered = filtered.filter((course) =>
    selectedLevels
      .map((lvl) => lvl.toLowerCase())
      .includes(course.level?.toLowerCase().trim())
  );
}

    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [courses, selectedCategories, selectedLevels, searchQuery]);

  const handleCategoryChange = (category) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
    } else {
      setSelectedCategories((prev) => {
        const newSelection = prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev.filter((c) => c !== "All Categories"), category];
        return newSelection.length === 0 ? ["All Categories"] : newSelection;
      });
    }
  };

  const handleLevelChange = (level) => {
    if (level === "All Levels") {
      setSelectedLevels(["All Levels"]);
    } else {
      setSelectedLevels((prev) => {
        const newSelection = prev.includes(level)
          ? prev.filter((l) => l !== level)
          : [...prev.filter((l) => l !== "All Levels"), level];
        return newSelection.length === 0 ? ["All Levels"] : newSelection;
      });
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
  
  {/* Dot Background */}
  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)] bg-[size:32px_32px]" />

  {/* Soft Gradient Blobs */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full"></div>

  {/* Content Wrapper */}
  <div className="relative z-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">
        All Courses
      </h1>

      {/* Mobile Search + Filter */}
      <div className="md:hidden mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search courses..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-3 bg-white rounded-lg shadow border text-xl"
        >
          ☰
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div
          className={`w-full md:w-1/4 bg-white/60 p-6 rounded-2xl shadow-md backdrop-blur-sm 
          ${showFilters ? "block" : "hidden"} md:block`}
        >
          {/* Desktop Search */}
          <div className="hidden md:block mb-6">
            <input
              type="text"
              placeholder="Discover Your Next Skill..."
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Categories</h2>
            <div className="flex flex-col space-y-1">
              {categories.map((cat, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div>
            <h2 className="font-semibold mb-2">Level</h2>
            <div className="flex flex-col space-y-1">
              {["All Levels", ...levels].map((lvl, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(lvl)}
                    onChange={() => handleLevelChange(lvl)}
                  />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))
          ) : (
            <p className="text-gray-600 py-20 text-center col-span-full">
              No courses found matching your filters
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AllCoursesPage;
