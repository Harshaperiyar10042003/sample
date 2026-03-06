import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

    const goToCourses = () => {
        // Navigate to homepage first, then scroll
        navigate('/', { state: { scrollTo: 'courses-section' } });
    };
  return (
    <footer className="bg-logo-yellow text-[#333333] pt-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Us Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm">
              Empowering learners with high-quality courses and resources to excel in their careers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to='/' className="text-sm hover:text-gray-700">Home</Link></li>
              <li><Link to="/#courses-section" className="text-sm hover:text-gray-700">Courses</Link></li>
            </ul>
          </div>

          {/* Connect with Us Section */}
          <div>
              <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
              <div className="flex space-x-4 mb-4">
                
                <a href="https://www.linkedin.com/showcase/ctc-training-cell/" className="text-xl hover:text-gray-700">
                  <i className="fab fa-linkedin w-6 h-6"></i>
                </a>
                <a href="https://www.instagram.com/invites/contact/?igsh=1vqonqf31630v&utm_content=zbctnoy" className="text-xl hover:text-gray-700">
                  <i className="fab fa-instagram w-6 h-6"></i>
                </a>
              </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact us</h4>
            <ul className="space-y-2">
              <li><a href="mailto:smagjinfo@gmail.com" className="text-sm hover:text-gray-700">smagjinfo@gmail.com</a></li>
              
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-600 py-2 text-center">
        <p className="text-sm text-white">&copy; 2025 Code-To-Create. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
