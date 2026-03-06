import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.ico';

const Enroll = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let courseName = decodeURIComponent(location.pathname.split('/').pop().replace(/-/g, ' '));

    const [formData, setFormData] = useState({
        StudentName: '',
        StudentMail: '',
        StudentPhone: '',
        courseName: courseName,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Student name validation (minimum 3 characters)
        if (!formData.StudentName.trim()) {
            newErrors.StudentName = 'Student name is required';
        } else if (formData.StudentName.trim().length < 3) {
            newErrors.StudentName = 'Student name must be at least 3 characters long';
        }

        // Student email validation
        if (!formData.StudentMail.trim()) {
            newErrors.StudentMail = 'Student email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.StudentMail)) {
                newErrors.StudentMail = 'Please enter a valid email address';
            }
        }

        // Student phone validation (exactly 10 digits)
        if (!formData.StudentPhone.trim()) {
            newErrors.StudentPhone = 'Student phone is required';
        } else {
            const phoneRegex = /^\d{10,13}$/;
            if (!phoneRegex.test(formData.StudentPhone)) {
                newErrors.StudentPhone = 'Phone number must be exactly 10 digits';
            }
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/enroll-now`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong on the server.');
            }

            const responseData = await response.json();
            alert(responseData.message || 'Form submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Error: ${error.message || 'An error occurred while submitting the form. Please try again.'}`);
        }
    };

    return (
  <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 overflow-hidden">

    {/* ===== TOP BAR ===== */}
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-20">
      
      {/* Logo Left */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="Institution Logo"
          className="h-12 w-12 rounded-full shadow-md hover:scale-105 transition"
        />
        <span className="font-bold text-lg text-gray-700 hidden sm:block">
          Learnify
        </span>
      </div>

      {/* Back Button Right */}
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-white shadow-md rounded-full text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition duration-300"
      >
        ← Back
      </button>
    </div>

    {/* ===== ENROLL CARD ===== */}
    <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10 border border-white/40">

      <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Enroll Now
      </h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Start your learning journey today 🚀
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="StudentName"
            value={formData.StudentName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.StudentName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.StudentName && (
            <p className="text-red-500 text-xs mt-1">{errors.StudentName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="StudentMail"
            value={formData.StudentMail}
            onChange={handleChange}
            placeholder="abc@email.com"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.StudentMail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.StudentMail && (
            <p className="text-red-500 text-xs mt-1">{errors.StudentMail}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="StudentPhone"
            value={formData.StudentPhone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
              errors.StudentPhone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.StudentPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.StudentPhone}</p>
          )}
        </div>

        {/* Course Display */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Selected Course
          </label>
          <input
            type="text"
            value={formData.courseName}
            disabled
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transform transition duration-300 shadow-lg"
        >
          Submit Enrollment
        </button>

      </form>
    </div>
  </div>
);

};

export default Enroll;