import { motion } from "framer-motion";
import { useEffect } from "react";
import logo from "../assets/img/logo.ico";

const WelcomeIntro = ({ onFinish }) => {

  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap');

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        /* ===== Background ===== */
        .welcome-bg {
          position: fixed;
          inset: 0;
          background: linear-gradient(
            135deg,
            #f8fafc,
            #eef2ff,
            #ecfeff
          );
          overflow: hidden;
          z-index: 1;
        }

        /* Floating gradient blobs */
        .blob {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 10s infinite ease-in-out;
        }

        .blob.blue {
          background: #60a5fa;
          top: -120px;
          left: -120px;
        }

        .blob.cyan {
          background: #22d3ee;
          bottom: -150px;
          right: -120px;
          animation-delay: 2s;
        }

        .blob.purple {
          background: #c084fc;
          top: 50%;
          left: 60%;
          animation-delay: 4s;
        }

        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-40px) translateX(30px); }
          100% { transform: translateY(0) translateX(0); }
        }

        /* Responsive text */
        .brand-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          letter-spacing: 2px;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
        }

        .tagline {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 600;
          letter-spacing: 3px;
          margin-top: 14px;
        }
      `}</style>

      {/* ===== Background ===== */}
      <motion.div
        className="welcome-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <div className="blob blue" />
        <div className="blob cyan" />
        <div className="blob purple" />
      </motion.div>

      {/* ===== Logo + Brand ===== */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: 0.32,
          opacity: 0,
          x: "-44vw",
          y: "-44vh"
        }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Logo */}
          <img
            src={logo}
            alt="Learnify Logo"
            style={{
              transform: "translateX(90px)", // 👈 move right
              width: "clamp(110px, 20vw, 160px)",
              height: "clamp(110px, 20vw, 160px)",
              borderRadius: "50%",
              marginBottom: 26,
              boxShadow: "0 25px 60px rgba(0,0,0,0.2)"
            }}
          />

          {/* Brand Name */}
          <h1
            className="brand-title"
            style={{
              background: "linear-gradient(90deg, #2563eb, #22d3ee, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0
            }}
          >
            
          </h1>

          {/* Tagline */}
          <p
            className="tagline"
            style={{
              background: "linear-gradient(90deg, #334155, #64748b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            LEARN • BUILD • THRIVE
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default WelcomeIntro;
