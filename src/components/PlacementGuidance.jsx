import React, { useEffect, useState } from 'react';

// Using a list of 6 logos makes the 3-at-a-time carousel loop perfectly
import ineuron from "../assets/img/companies/inuron.png";
import deloitte from "../assets/img/companies/deloitte.svg";
import diya from "../assets/img/companies/diya.png";
import pw from "../assets/img/companies/pw.jpg";
import codecraft from "../assets/img/companies/code craft.png";
import tetherfi from "../assets/img/companies/tetherfi.png";
import randstad from "../assets/img/companies/randstad.png";
import infiniti from "../assets/img/companies/infinity.jpg";


const PlacementGuidance = () => {
const companies = [
    { name: 'iNeuron', logo: ineuron },
    { name: 'Deloitte', logo: deloitte },
    { name: 'Diya Systems', logo: diya },
    { name: 'PW', logo: pw },
    { name: 'CodeCraft', logo: codecraft },
    { name: 'Tetherfi', logo: tetherfi },
    { name: 'Randstad', logo: randstad },
    { name: 'Infiniti', logo: infiniti },
];


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This triggers the animation when the section is visible
    const element = document.querySelector('#placement-section');
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="placement-section" className="w-full py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Custom CSS for carousel and fade-in animations */}
      <style jsx>{`
        @keyframes subtleFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 2.5rem)); } /* 2.5rem is the gap */
        }
        .animate-subtle-fade-in-up {
          animation: subtleFadeInUp 0.8s ease-out forwards;
        }
        .scrolling-wrapper {
          animation: scroll 40s linear infinite;
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-10 left-1/4 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-100/50 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content (Unchanged) */}
          <div className={`space-y-6 ${isVisible ? 'animate-subtle-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Where Your Talent
              <span className="block text-blue-600">Meets Opportunity</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-sm md:max-w-md">
              Excel in your performance and unlock our exclusive placement assistance. We connect our top students with internships and Pre-Placement Offers (PPOs) at world-leading technology firms.
            </p>
            <div className="pt-4">
              
                {/* <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Enquire Now
                </button> */}
            </div>
          </div>

          {/* Right Column: Logo Carousel */}
          <div className={`relative w-full h-full flex items-center ${isVisible ? 'animate-subtle-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `500ms` }}>
            <div
              className="w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              }}
            >
              <div className="flex w-max gap-10 scrolling-wrapper group-hover:pause">
                {/* We render the list twice for a seamless infinite scroll effect */}
                {[...companies, ...companies].map((company, index) => (
                  <div
                    key={index}
                    // This sets the card width. On mobile it's 50% (2 logos), on screens md and up it's 33.3% (3 logos)
                    className="w-[45vw] md:w-[25vw] lg:w-[12vw] shrink-0"
                  >
                    <div className="flex items-center justify-center p-6 h-full bg-white/60 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                      <img
                        src={company.logo}
                        className="h-14 w-auto object-contain"
                        alt={`${company.name} logo`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlacementGuidance;