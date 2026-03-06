import React, { useState } from "react";
import logo from "../assets/img/logo.ico";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar1 = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          flex items-center justify-between
          py-4 px-5 md:px-12
          backdrop-blur-xl
          shadow-md
          bg-[linear-gradient(to_right,#fff1f2,#fef9c3,#f0fdf4,#eff6ff,#faf5ff)]
        "
      >
        {/* Moving Light Background */}
        <div
          className="
            absolute inset-0 -z-10
            bg-[linear-gradient(to_right,#ffe4e6,#fefce8,#dcfce7,#dbeafe,#f3e8ff)]
            bg-[length:200%_200%]
            animate-rainbowMove
          "
        ></div>

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="
              h-10 w-10 md:h-14 md:w-14
              rounded-full shadow-lg
              bg-[linear-gradient(to_right,#fbcfe8,#bfdbfe,#ddd6fe)]
              p-[2px]
            "
          >
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full rounded-full object-contain bg-white"
            />
          </motion.div>

          {/* TITLE */}
          <h1
            className="
              hidden sm:block
              text-xl md:text-3xl font-bold
              overflow-hidden whitespace-nowrap
              animate-typing
            "
          >
            <span className="font-serif bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Code
            </span>{" "}
            <span className="font-serif bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              To
            </span>{" "}
            <span className="font-serif bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent">
              Create
            </span>
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-20">
          {[
            { name: "About Us", id: "about" },
            { name: "Courses", id: "courses" },
            { name: "Contact", id: "contact" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() =>
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="
                relative
                text-lg font-bold
                text-gray-800
                after:content-['']
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[3px]
                after:w-0
                after:bg-gradient-to-r
                after:from-pink-500
                after:to-purple-600
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
  <Link
    to="/Contact_Institution"
    className="
      hidden sm:block
      px-6 py-2.5 rounded-full
      font-semibold
      text-gray-800
      bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200
      shadow-[0_4px_20px_rgba(255,200,0,0.25)]
      transition-all duration-300 ease-in-out
      hover:shadow-[0_8px_30px_rgba(255,180,0,0.45)]
      hover:-translate-y-1
      hover:scale-105
      hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-300
      active:scale-95
    "
  >
    For Institutions
  </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-700"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="
              fixed top-[72px] left-0 w-full z-40
              md:hidden
              bg-[linear-gradient(to_bottom,#fff1f2,#eff6ff,#faf5ff)]
              shadow-md
            "
          >
            <div className="flex flex-col px-6 py-6 gap-5 text-gray-700 font-medium">
              <Link to="/about" onClick={() => setOpen(false)}>
                About Us
              </Link>
              <Link to="/courses" onClick={() => setOpen(false)}>
                Courses
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>

              <Link
  to="/Contact_Institution"
  onClick={() => setOpen(false)}
  className="
    mt-4 text-center px-6 py-2.5 rounded-full
    font-semibold text-gray-800
    bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200
    shadow-[0_4px_20px_rgba(255,200,0,0.25)]
    transition-all duration-300 ease-in-out
    hover:shadow-[0_8px_30px_rgba(255,180,0,0.45)]
    hover:scale-105
    active:scale-95
  "
>
  For Institutions
</Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar1;
