import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import CourseDisplay from "../components/CourseHeader";
import ClientsSec from "../components/ClientsSec";
import PlacementGuidance from "../components/PlacementGuidance";

const HomePage = () => {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(180deg, #f8fafc, #eef2ff);
        }
        html {
          scroll-behavior: smooth;
        }
        .section {
          padding: 0px;
          animation: fadeUp 1s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="section" id="hero">
          <Hero />
        </div>

        <div className="section" id="about">
          <WhatWeDo />
        </div>

        <div className="section" id="courses">
          <CourseDisplay />
        </div>

        <div className="section">
          <ClientsSec />
        </div>

        <div className="section">
          <PlacementGuidance />
        </div>
      </motion.div>
    </>
  );
};

export default HomePage;