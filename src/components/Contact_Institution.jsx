import React, { useState } from 'react';
import logo from '../assets/img/logo.ico';
import { useNavigate } from 'react-router-dom';

const Contact_Institution = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        institutionName: '',
        institutionEmail: '',
        institutionPhone: '',
        applicantName: '',
        applicantPhone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const SendData = {
            iname : formData.institutionName,
            imail : formData.institutionEmail,
            iphone : formData.institutionPhone,
            aname : formData.applicantName,
            aphone : formData.applicantPhone,
        };
      
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/institution-contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(SendData),
            });
      
        if (!response.ok) {
            // If response is not in the 200-299 range
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
  <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10 overflow-hidden">

    {/* Top Left Logo */}
    <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
      <img src={logo} alt="Logo" className="h-10 w-auto" />
      <span className="text-lg font-bold text-blue-700 tracking-wide">
        Institution Portal
      </span>
    </div>

    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 right-6 bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
      ← Back
    </button>

    {/* Decorative Background Blur */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-40"></div>

    {/* Glass Form Card */}
    <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 relative z-10 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex flex-col items-center text-white">
        <img src={logo} alt="Institution Logo" className="h-16 w-auto rounded-full mb-3 shadow-md" />
        <h2 className="text-2xl font-bold tracking-wide">
          Institution Contact Details
        </h2>
      </div>

      {/* Form Section */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

          {/* Institution Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Institution Name
            </label>
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName}
              onChange={handleChange}
              required
              placeholder="Enter institution name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
            />
          </div>

          {/* Institution Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Institution Email
            </label>
            <input
              type="email"
              name="institutionEmail"
              value={formData.institutionEmail}
              onChange={handleChange}
              required
              placeholder="email@institution.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
            />
          </div>

          {/* Institution Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Institution Phone Number
            </label>
            <input
              type="tel"
              name="institutionPhone"
              value={formData.institutionPhone}
              onChange={handleChange}
              required
              placeholder="+91 1234567890"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
            />
          </div>

          {/* Divider */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Applicant Information
            </h3>

            {/* Applicant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Applicant Name
              </label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              />
            </div>

            {/* Applicant Phone */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Applicant Phone Number
              </label>
              <input
                type="tel"
                name="applicantPhone"
                value={formData.applicantPhone}
                onChange={handleChange}
                required
                placeholder="+91 1234567890"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);

};

export default Contact_Institution;