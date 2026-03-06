import React from 'react';
import logo from '../assets/img/logo.ico';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-2 md:px-4 h-auto bg-transparent">
      {/* Logo */}
      <div className="flex items-center">
        <div className="h-12 w-12 md:h-16 md:w-16">
          <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Institution contact */}
        <Link
          to="/Contact_Institution"
          className="group/button relative overflow-hidden text-black text-xs sm:text-sm md:text-base font-thin bg-logo-yellow px-2 py-2 md:px-4
                    rounded-lg transition-all duration-300 whitespace-nowrap border border-black/20  active:scale-95">
          <span className="absolute bottom-0 left-0 z-0 h-0 w-full lg:bg-gradient-to-t lg:from-blue-600 lg:to-blue-400 transition-all duration-500 group-hover/button:h-full" />
          <span className="relative z-10 transition-all duration-500 lg:group-hover/button:text-white">
            CTC for Institutions
          </span>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar1;