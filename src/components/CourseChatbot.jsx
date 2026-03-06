import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CourseChatbot = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const [userData, setUserData] = useState({
    level: "",
    category: "",
    goal: "",
    experience: "",
    preference: "",
  });

  const [recommendedCourse, setRecommendedCourse] = useState(null);

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const goals = ["Get a Job", "Upskill", "Switch Career", "Academic Learning"];
  const experienceOptions = [
    "Just Starting",
    "3-6 Months",
    "1+ Year",
    "2+ Years",
  ];
  const learningPreference = [
    "Project Based",
    "Theory + Practical",
    "Certification Focused",
    "Fast Track Intensive",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      startConversation();
      fetchCategories();
      fetchCourses();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/categories`);
      const data = await res.json();
      setCategories(data || []);
    } catch {
      setCategories(["Web Development", "Data Science", "AI/ML"]);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-courses`);
      const data = await res.json();
      setCourses(data || []);
    } catch {
      setCourses([]);
    }
  };

  const addBotMessage = (text, delay = 600) => {
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text }]);
      setLoading(false);
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const startConversation = () => {
    setMessages([]);
    setStep(1);
    setRecommendedCourse(null);
    setUserData({
      level: "",
      category: "",
      goal: "",
      experience: "",
      preference: "",
    });

    addBotMessage("👋 Hello! I'm your CTC AI Assistant.");
    setTimeout(() => {
      addBotMessage(
        "I'll help you find the perfect course tailored to your goals 🚀"
      );
      askLevel();
    }, 800);
  };

  const askLevel = () => {
    addBotMessage("To begin, what's your current skill level?");
    setOptions(levels);
    setStep(1);
  };

  const askExperience = () => {
    addBotMessage("How long have you been learning in this field?");
    setOptions(experienceOptions);
    setStep(2);
  };

  const askCategory = () => {
    addBotMessage("Which field are you interested in?");
    setOptions(categories);
    setStep(3);
  };

  const askGoal = () => {
    addBotMessage("What is your primary goal?");
    setOptions(goals);
    setStep(4);
  };

  const askPreference = () => {
    addBotMessage("How do you prefer to learn?");
    setOptions(learningPreference);
    setStep(5);
  };

  const recommendCourse = () => {
    const filtered = courses
      .filter((course) => course.category === userData.category)
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (a.level === userData.level) scoreA += 3;
        if (a.goal === userData.goal) scoreA += 2;
        if (a.type === userData.preference) scoreA += 1;

        if (b.level === userData.level) scoreB += 3;
        if (b.goal === userData.goal) scoreB += 2;
        if (b.type === userData.preference) scoreB += 1;

        return scoreB - scoreA;
      });

    if (filtered.length > 0) {
      const course = filtered[0];
      setRecommendedCourse(course);

      addBotMessage("🎉 I found a perfect match for you!");
      addBotMessage(
        `Based on your profile, I highly recommend "${course.title}".`
      );
    } else {
      addBotMessage(
        "I couldn't find an exact match, but you can explore all courses for more options."
      );
    }

    setOptions(["Start Again 🔄"]);
    setStep(6);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option);

    if (step === 1) {
      setUserData({ ...userData, level: option });
      askExperience();
    } else if (step === 2) {
      setUserData({ ...userData, experience: option });
      askCategory();
    } else if (step === 3) {
      setUserData({ ...userData, category: option });
      askGoal();
    } else if (step === 4) {
      setUserData({ ...userData, goal: option });
      askPreference();
    } else if (step === 5) {
      setUserData({ ...userData, preference: option });
      recommendCourse();
    } else {
      startConversation();
    }
  };

  const goToCourse = () => {
    if (recommendedCourse) {
      navigate(`/course/${recommendedCourse._id || recommendedCourse.id}`, {
        state: { courseData: recommendedCourse },
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
       className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 w-auto backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-gray-200 z-50" >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold">
              AI
            </div>
            <div>
              <p className="font-semibold text-sm">CTC Assistant</p>
              <p className="text-xs text-green-200">● Online</p>
            </div>
          </div>
          <button onClick={onClose} className="text-xl font-bold">×</button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 max-h-[450px]">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "bot" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                msg.sender === "bot"
                  ? "bg-white text-gray-800 shadow"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto shadow-lg"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {recommendedCourse && (
            <div className="bg-white rounded-xl p-3 shadow">
              <h4 className="font-semibold">{recommendedCourse.title}</h4>
              <p className="text-xs text-gray-500">
                {recommendedCourse.duration}
              </p>
              <button
                onClick={goToCourse}
                className="mt-2 text-purple-600 text-sm font-semibold"
              >
                View Course →
              </button>
            </div>
          )}

          {loading && (
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Options */}
        {options.length > 0 && (
          <div className="p-3 border-t bg-white space-y-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium transition shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseChatbot;