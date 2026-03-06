import React, { useEffect, useState } from 'react';

const Hero1 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col h-[65vh] w-full items-center justify-center overflow-hidden bg-white">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }

        @keyframes slideInUp {
          0% { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(250, 204, 21, 0.5);
          }
          50% { 
            text-shadow: 0 0 40px rgba(250, 204, 21, 0.8);
          }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out infinite 2s; }
        .animate-float-delayed-2 { animation: float 8s ease-in-out infinite 4s; }
        .animate-slide-up { animation: slideInUp 1s ease-out; }
        .animate-fade-in { animation: fadeIn 1.2s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate 20s linear infinite; }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

      {/* Geometric Design Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Blue Circle */}
        <div className="absolute -top-20 -left-20 w-80 h-80 border-4 border-blue-600/30 rounded-full animate-rotate-slow"></div>
        
        {/* Yellow Accent Shapes */}
        {/* <div className="absolute top-1/4 right-10 w-16 h-16 bg-yellow-400/20 rounded-lg animate-float rotate-45"></div>
        <div className="absolute top-20 right-1/3 w-8 h-8 bg-yellow-400 rounded-full animate-float-delayed"></div> */}
        
        {/* Blue Geometric Shapes */}
        <div className="absolute bottom-1/3 left-20 w-24 h-24 border-2 border-blue-600/40 rounded-full animate-float-delayed-2"></div>
        <div className="absolute bottom-20 right-20 w-32 h-2 bg-blue-600/30 rounded-full animate-float"></div>
        
        {/* Abstract Lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-10 left-10 w-20 h-20 border-l-4 border-t-4 border-yellow-400/60"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-r-4 border-b-4 border-blue-600/60"></div>
        
        {/* Floating Rectangles */}
        <div className="absolute top-40 left-1/3 w-12 h-20 bg-blue-600/10 rounded-lg animate-float-delayed transform -rotate-12"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-12 bg-yellow-400/10 rounded-lg animate-float transform rotate-12"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-600/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-black mb-8 leading-tight">
            <span className="block text-black">Transforming <span className="text-yellow-400 animate-pulse-glow z-10">Learning</span></span>
            <span className="block text-blue-600">Building <span className="text-black">Careers</span></span>
          </h1>
        </div>

        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl font-light mb-6 max-w-3xl leading-relaxed">
            From classroom to career, equipping tomorrow's leaders with 
            <span className="text-yellow-500 font-medium"> essential industry skills </span> 
            and 
            <span className="text-blue-600 font-medium"> real-world experience</span>.
          </p>
        </div>

        {/* Decorative Text Accents */}
        <div className={`flex items-center gap-6 mb-8 transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in delay-400' : 'opacity-0'}`}>
          <div className="w-12 h-px bg-yellow-400"></div>
          <div className="text-gray-500 text-xs font-light tracking-widest uppercase">Excellence in Education</div>
          <div className="w-12 h-px bg-blue-600"></div>
        </div>

        {/* Stats with Design Elements */}
        {/* <div className={`cursor-pointer flex flex-wrap justify-center gap-12 mt-6 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in delay-600' : 'opacity-0'}`}>
          <div className="text-center group relative">
            <div className="absolute -inset-3 bg-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">3000+</div>
              <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">Students Trained</div>
              <div className="w-10 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center group relative">
            <div className="absolute -inset-3 bg-gray-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
              <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">Institutions</div>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mt-2 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center group relative">
            <div className="absolute -inset-3 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
              <div className="text-gray-500 font-medium text-xs uppercase tracking-wide">Workshops</div>
              <div className="w-10 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
            </div>
          </div>
        </div> */}

        {/* Bottom Decorative Element */}
        <div className={`mt-16 flex items-center gap-4 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in delay-800' : 'opacity-0'}`}>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-px bg-gray-400"></div>
          <div className="w-3 h-3 border border-blue-600 rounded-full animate-pulse delay-500"></div>
          <div className="w-4 h-px bg-gray-400"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-xs mb-3 font-light tracking-wider uppercase">Explore More</span>
          <div className="w-6 h-10 border border-gray-400/50 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Hero1;