import React, { useEffect, useState } from 'react';

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
  {
    name: "HKBK College of Engineering",
    url: hkbk,
  },
  {
    name: "Nitte (Deemed to be University)",
    url: nitte,
  },
  {
    name: "East Point College of Engineering & Technology",
    url: eastpoint,
  },
  {
    name: "Madanapalle Institute of Technology & Science",
    url: madit,
  },
  {
    name: "Mohan Babu University",
    url: mohanbabu,
  },
  {
    name: "Cambridge Institute of Technology",
    url: cit,
  },
  {
    name: "Gokaraju Rangaraju Institute of Engineering & Technology",
    url: goku,
  },
  {
    name: "MLR Institute of Technology",
    url: mlrit,
  },
  {
    name: "Koneru Lakshmaiah Education Foundation",
    url: klu,
  },
  {
    name: "Malla Reddy University",
    url: malla,
  },
];

const ClientsInstitutions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes logo-cloud {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 1.5rem));
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-slide-in { animation: slideIn 0.6s ease-out; }
        .animate-scroll { animation: scroll 12s linear infinite; }
        .animate-logo-cloud { animation: logo-cloud 20s linear infinite; }
        .animate-float { animation: float 2s ease-in-out infinite; }

        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }

        .logo-container {
          transition: all 0.3s ease;
        }
        .logo-container:hover {
          transform: translateY(-5px) scale(1.05);
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-yellow-100/25 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex w-full flex-col items-center justify-center">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Clients & Institutions 
              <span className="text-blue-600"> We've Served</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
              Trusted partnerships with leading educational institutions and technology organizations.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-logo-yellow mx-auto rounded-full"></div>
          </div>

          {/* Logo Carousel Container */}
          <div className={`w-full max-w-6xl transition-all duration-1000 ${isVisible ? 'animate-slide-in delay-100' : 'opacity-0'}`}>
            <div className="w-full py-12">
              <div className="mx-auto w-full px-4 md:px-8">
                <div
                  className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                  style={{
                    maskImage:
                      'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                  }}
                >
                  {Array(5)
                    .fill(null)
                    .map((index) => (
                      <div
                        key={index}
                        className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                      >
                        {logos.map((logo, key) => (
                          <img
                            key={key}
                            src={logo.url}
                            className="h-14 w-50 px-2"
                            alt={`${logo.name}`}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Made Horizontal */}
          <div className={`mt-16 flex flex-wrap justify-center items-center gap-16 w-full max-w-6xl transition-all duration-1000 ${isVisible ? 'animate-slide-in delay-500' : 'opacity-0'}`}>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-float">20+</div>
              <div className="text-gray-600 font-medium">Institutions Served</div>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">|</div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-float delay-200">3000+</div>
              <div className="text-gray-600 font-medium">Students Trained</div>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">|</div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300 animate-float delay-400">25+</div>
              <div className="text-gray-600 font-medium">Workshops Conducted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsInstitutions;