import React, { useEffect, useState } from "react";

import workshopTrainingImg from "../assets/img/WhatWeDo/Uni-tr.png";
import aptiImg from "../assets/img/WhatWeDo/AptiImg.png";
import onlineClassesImg from "../assets/img/WhatWeDo/Online-tr.png";

const slides = [
  {
    title: "Offline Workshops for Institutions",
    desc:
      "Comprehensive hands-on workshops delivered directly to educational institutions, covering cutting-edge technologies and practical implementation strategies for faculty and students.",
    img: aptiImg,
    color: "text-blue-700",
    font: "font-[Poppins]",
  },
  {
    title: "Aptitude & Placement Training",
    desc:
      "Specialized programs designed to sharpen analytical thinking, problem-solving abilities, and technical aptitude to prepare students for competitive examinations and career success.",
    img: workshopTrainingImg,
    color: "text-emerald-700",
    font: "font-[Montserrat]",
  },
  {
    title: "Online Classes & Certification",
    desc:
      "Interactive virtual learning experiences with live instruction, recorded sessions, and personalized mentoring to make quality education accessible from anywhere.",
    img: onlineClassesImg,
    color: "text-purple-700",
    font: "font-[Raleway]",
  },
];

const WhatWeDo = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className={`space-y-8 ${slides[index].font}`}>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            What We Do at{" "}
            <span className="text-yellow-400">c</span>
            <span className="text-blue-600">T</span>
            <span className="text-yellow-400">c</span>
          </h1>

          {/* FIXED INTRO */}
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            We empower institutions and individuals through comprehensive
            technology education, skill enhancement programs, and flexible
            learning solutions designed for the modern world.
          </p>

          {/* SLIDE CONTENT */}
          <div>
            <h3
              className={`text-2xl md:text-3xl font-semibold ${slides[index].color}`}
            >
              {slides[index].title}
            </h3>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-xl">
              {slides[index].desc}
            </p>
          </div>

          {/* DOTS — NOW BELOW LEFT CONTENT */}
          <div className="flex gap-4 pt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-blue-600 scale-125 shadow-md"
                    : "bg-blue-300 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="blob-image shadow-2xl">
            <img
              src={slides[index].img}
              alt={slides[index].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* BLOB STYLE */}
      <style jsx>{`
        .blob-image {
          width: 560px;
          height: 480px;
          border-radius: 58% 42% 63% 37% / 45% 55% 45% 55%;
          overflow: hidden;
          transition: all 0.6s ease;
          background: white;
        }

        .blob-image:hover {
          border-radius: 42% 58% 37% 63% / 55% 45% 55% 45%;
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .blob-image {
            width: 320px;
            height: 380px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;
