// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage1";
import Contact_Institution from "./components/Contact_Institution";
import Enroll from "./components/CoursePage/Enroll";
import AllCoursesPage from "./components/AllCoursesPage";
import CourseChatbot from "./components/CourseChatbot";
import Footer from "./components/Footer";
import WelcomeIntro from "./components/WelcomeIntro";

const App = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);

  // Show intro only once per session
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem("introShown");
  });

  const handleIntroFinish = () => {
    sessionStorage.setItem("introShown", "true");
    setShowWelcome(false);
  };

  return (
    <>
      {/* Welcome Screen */}
      {showWelcome ? (
        <WelcomeIntro onFinish={handleIntroFinish} />
      ) : (
        <>
          {/* ROUTES */}
          <Routes>

            {/* HOME PAGE WITH FOOTER */}
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                  <Footer openChat={() => setIsChatOpen(true)} />
                </>
              }
            />

            {/* OTHER PAGES (NO FOOTER) */}
            <Route path="/Contact_Institution" element={<Contact_Institution />} />
            <Route path="/courses" element={<AllCoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/Enroll/:id" element={<Enroll />} />

          </Routes>

          {/* CHATBOT */}
          <CourseChatbot
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default App;