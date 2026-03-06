import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = ({ openChat }) => {
  const navigate = useNavigate();

  const goToCourses = () => {
    navigate("/", { state: { scrollTo: "courses-section" } });
  };

  return (
    <footer id="contact" className="relative w-full pt-20 pb-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* Dot Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)] bg-[size:32px_32px]" />

      {/* Soft Gradient Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* ===== CHAT CTA CARD (Aligned Properly) ===== */}
        <div className="mb-16 bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Not Sure What To Do Next?
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Chat with us and get personalized guidance on courses, internships and career paths.
            </p>
          </div>

          <button
  onClick={openChat}
  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
>
  <MessageCircle size={18} />
  Start Chat
</button>
        </div>

        {/* ===== FOOTER GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Code-To-Create
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering students with practical tech skills and real placement opportunities through structured learning programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
  <Link
    to="/"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="hover:text-blue-600 transition"
  >
    Home
  </Link>
</li>
              <li>
  <Link
    to="/courses"
    className="hover:text-blue-600 transition"
  >
    Courses
  </Link>
</li>
              
              <li className="hover:text-blue-600 transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              Services
            </h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>Placement Assistance</li>
              <li>Internship Support</li>
              <li>Career Guidance</li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
  Contact
</h4>

<div className="flex items-center space-x-4 mb-4">
  {/* Email Icon */}
  <a
    href="mailto:smagjinfo@gmail.com"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <i className="fas fa-envelope text-blue-600"></i>
  </a>

  <span className="text-sm text-gray-600">
    smagjinfo@gmail.com
  </span>
</div>

<div className="flex space-x-4">
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/showcase/ctc-training-cell/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <i className="fab fa-linkedin text-blue-600"></i>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/invites/contact/?igsh=1vqonqf31630v&utm_content=zbctnoy"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <i className="fab fa-instagram text-pink-500"></i>
  </a>
</div>

          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-14 pt-6 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 Code-To-Create. All Rights Reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-blue-600 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-blue-600 cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
