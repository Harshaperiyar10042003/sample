import React, { useEffect, useState } from "react";
import { GraduationCap, Users, Presentation } from "lucide-react";

import hkbk from "../assets/img/Colleges/hkbk.png";
import nitte from "../assets/img/Colleges/Nitte.png";
import eastpoint from "../assets/img/Colleges/eastpoint.png";
import madit from "../assets/img/Colleges/madit.jpg";
import mohanbabu from "../assets/img/Colleges/Mohan babu.png";
import cit from "../assets/img/Colleges/CIT.png";
import goku from "../assets/img/Colleges/goku.png";
import mlrit from "../assets/img/Colleges/MLRIT.jpg";
import klu from "../assets/img/Colleges/klu.png";
import malla from "../assets/img/Colleges/malla.png";

const logos = [
  { name: "HKBK College of Engineering", url: hkbk },
  { name: "Nitte (Deemed to be University)", url: nitte },
  { name: "East Point College of Engineering & Technology", url: eastpoint },
  { name: "Madanapalle Institute of Technology & Science", url: madit },
  { name: "Mohan Babu University", url: mohanbabu },
  { name: "Cambridge Institute of Technology", url: cit },
  { name: "Gokaraju Rangaraju Institute of Engineering & Technology", url: goku },
  { name: "MLR Institute of Technology", url: mlrit },
  { name: "Koneru Lakshmaiah Education Foundation", url: klu },
  { name: "Malla Reddy University", url: malla },
];

const ClientsInstitutions = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* ===== LOGO SCROLL ANIMATION ===== */}
      <style jsx>{`
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-track {
          display: flex;
          width: max-content;
          animation: scrollLogos 35s linear infinite;
        }

        .logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dot Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)] bg-[size:32px_32px]" />

      {/* Soft Gradient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* ===== HEADER ===== */}
        <div className={`text-center mb-16 transition duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clients & Institutions{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              We've Served
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Trusted partnerships with leading educational institutions and technology organizations.
          </p>

          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        </div>

        {/* ===== LOGO SLIDER ===== */}
        <div
          className="overflow-hidden relative rounded-2xl"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="logo-track gap-6 sm:gap-10">

            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="min-w-[150px] sm:min-w-[180px] md:min-w-[200px] bg-white/80 backdrop-blur-md border border-blue-100 rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-500"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-10 sm:h-12 object-contain"
                />
              </div>
            ))}

          </div>
        </div>

        {/* ===== STATS SECTION ===== */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

          {/* Institutions */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-500 border border-blue-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <GraduationCap className="text-blue-600" size={28} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-blue-600">20+</h3>
            <p className="text-gray-600 text-sm mt-1">Institutions Served</p>
          </div>

          {/* Students */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-500 border border-green-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="text-green-600" size={28} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-green-600">3000+</h3>
            <p className="text-gray-600 text-sm mt-1">Students Trained</p>
          </div>

          {/* Workshops */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-500 border border-purple-100">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Presentation className="text-purple-600" size={28} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-purple-600">25+</h3>
            <p className="text-gray-600 text-sm mt-1">Workshops Conducted</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ClientsInstitutions;
