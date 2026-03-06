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
        <div className="flex justify-center items-center min-h-screen bg-white p-4 relative overflow-hidden">
            {/* Animated Background - Hidden on mobile (md and smaller) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                {/* Custom CSS for animations */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-20px) rotate(3deg); }
                        66% { transform: translateY(-10px) rotate(-2deg); }
                    }

                    @keyframes floatLarge {
                        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                        50% { transform: translateY(-30px) rotate(5deg) scale(1.1); }
                    }

                    @keyframes drift {
                        0% { transform: translateX(0px) rotate(0deg); }
                        50% { transform: translateX(25px) rotate(180deg); }
                        100% { transform: translateX(0px) rotate(360deg); }
                    }

                    @keyframes pulse-glow {
                        0%, 100% { 
                            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
                            opacity: 0.6;
                        }
                        50% { 
                            box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
                            opacity: 1;
                        }
                    }

                    @keyframes rotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes rotateReverse {
                        0% { transform: rotate(360deg); }
                        100% { transform: rotate(0deg); }
                    }

                    @keyframes morphing {
                        0%, 100% { border-radius: 60% 40% 30% 70%; }
                        25% { border-radius: 30% 60% 70% 40%; }
                        50% { border-radius: 70% 30% 40% 60%; }
                        75% { border-radius: 40% 70% 60% 30%; }
                    }

                    @keyframes slideHorizontal {
                        0%, 100% { transform: translateX(-15px); }
                        50% { transform: translateX(15px); }
                    }

                    @keyframes bounce {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-25px); }
                    }

                    @keyframes yellowPulse {
                        0%, 100% { 
                            box-shadow: 0 0 25px rgba(250, 204, 21, 0.4);
                            opacity: 0.7;
                        }
                        50% { 
                            box-shadow: 0 0 40px rgba(250, 204, 21, 0.6);
                            opacity: 1;
                        }
                    }

                    .animate-float { animation: float 10s ease-in-out infinite; }
                    .animate-float-large { animation: floatLarge 12s ease-in-out infinite; }
                    .animate-drift { animation: drift 18s ease-in-out infinite; }
                    .animate-pulse-glow { animation: pulse-glow 5s ease-in-out infinite; }
                    .animate-yellow-pulse { animation: yellowPulse 4s ease-in-out infinite; }
                    .animate-rotate-slow { animation: rotate 25s linear infinite; }
                    .animate-rotate-reverse { animation: rotateReverse 30s linear infinite; }
                    .animate-morphing { animation: morphing 15s ease-in-out infinite; }
                    .animate-slide-h { animation: slideHorizontal 8s ease-in-out infinite; }
                    .animate-bounce-slow { animation: bounce 10s ease-in-out infinite; }
                    
                    .delay-1000 { animation-delay: 1s; }
                    .delay-2000 { animation-delay: 2s; }
                    .delay-3000 { animation-delay: 3s; }
                    .delay-4000 { animation-delay: 4s; }
                    .delay-5000 { animation-delay: 5s; }
                    .delay-6000 { animation-delay: 6s; }
                `}</style>

                {/* Large Background Elements */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] border-4 border-blue-500/15 rounded-full animate-rotate-slow"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 border-3 border-yellow-400/20 rounded-full animate-rotate-reverse"></div>
                
                {/* Morphing Blobs */}
                <div className="absolute top-20 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/8 to-blue-600/6 animate-morphing blur-sm"></div>
                <div className="absolute bottom-1/4 left-1/5 w-48 h-48 bg-gradient-to-r from-yellow-400/6 to-yellow-500/4 animate-morphing delay-4000 blur-md"></div>
                
                {/* Floating Geometric Shapes */}
                <div className="absolute top-1/6 left-16 w-20 h-20 bg-blue-500/10 rounded-lg animate-float rotate-45"></div>
                <div className="absolute top-32 right-1/4 w-16 h-16 bg-yellow-400/15 rounded-full animate-bounce-slow delay-2000"></div>
                <div className="absolute bottom-1/3 right-20 w-24 h-24 border-2 border-blue-500/20 rounded-lg animate-drift transform rotate-12"></div>
                <div className="absolute top-1/2 left-1/6 w-10 h-32 bg-yellow-400/12 rounded-full animate-float-large delay-3000"></div>
                <div className="absolute bottom-48 left-1/3 w-18 h-18 bg-gradient-to-br from-blue-500/15 to-black/8 rounded-lg animate-float delay-5000 transform -rotate-30"></div>
                
                {/* Abstract Lines */}
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse"></div>
                <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent animate-pulse delay-3000"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/15 to-transparent animate-pulse delay-6000"></div>
                
                {/* Animated Bars */}
                <div className="absolute top-52 left-8 w-3 h-40 bg-blue-500/15 rounded-full animate-slide-h delay-2000"></div>
                <div className="absolute bottom-40 right-10 w-4 h-32 bg-yellow-400/12 rounded-full animate-slide-h delay-4000"></div>
                <div className="absolute top-2/3 right-1/5 w-2 h-48 bg-black/10 rounded-full animate-bounce-slow delay-3000"></div>
                
                {/* Corner Design Elements - Reduced */}
                <div className="absolute top-16 left-16 w-20 h-20 border-l-3 border-t-3 border-blue-500/30 animate-pulse-glow"></div>
                <div className="absolute bottom-16 right-16 w-20 h-20 border-r-3 border-b-3 border-yellow-400/30 animate-yellow-pulse delay-2000"></div>
                
                {/* Enhanced Central Elements */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-500/12 rounded-lg animate-float rotate-12"></div>
                <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-400/15 rounded-full animate-bounce-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-yellow-400/10 rounded-lg animate-drift delay-2000 transform rotate-45"></div>
                <div className="absolute top-1/2 right-1/3 w-18 h-18 bg-black/8 rounded-full animate-float-large delay-3000"></div>
                
                {/* Central Floating Orbs */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-500/8 to-purple-400/6 rounded-full blur-lg animate-morphing delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-tr from-yellow-400/7 to-orange-400/5 rounded-full blur-lg animate-morphing delay-4000"></div>
                
                {/* Additional Central Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-40 bg-blue-500/8 rounded-full animate-slide-h delay-2000"></div>
                <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-yellow-400/12 rotate-45 animate-rotate-slow"></div>
                <div className="absolute bottom-1/6 left-1/2 transform-translate-x-1/2 w-16 h-16 bg-black/6 rounded-lg animate-float delay-3000 transform rotate-30"></div>
                
                {/* Diamond Shapes */}
                <div className="absolute top-40 right-16 w-14 h-14 bg-blue-500/12 rotate-45 animate-rotate-slow"></div>
                <div className="absolute bottom-40 left-20 w-16 h-16 bg-yellow-400/10 rotate-45 animate-rotate-reverse delay-3000"></div>
                <div className="absolute top-2/3 left-16 w-12 h-12 bg-black/8 rotate-45 animate-drift delay-4000"></div>
                
                {/* Large Gradient Orbs */}
                <div className="absolute top-1/6 right-1/6 w-60 h-60 bg-gradient-to-br from-blue-500/6 to-blue-600/3 rounded-full blur-3xl animate-float-large"></div>
                <div className="absolute bottom-1/6 left-1/6 w-72 h-72 bg-gradient-to-tr from-yellow-400/5 to-yellow-500/2 rounded-full blur-3xl animate-float-large delay-4000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-black/3 to-gray-800/2 rounded-full blur-2xl animate-morphing delay-2000"></div>
                
                {/* Triangular Elements */}
                <div className="absolute top-48 left-2/5 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-blue-500/15 animate-float delay-2000"></div>
                <div className="absolute bottom-32 right-1/3 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-yellow-400/20 animate-bounce-slow delay-4000"></div>
                
                {/* Additional Floating Elements */}
                <div className="absolute top-1/5 right-1/5 w-20 h-6 bg-blue-500/12 rounded-full animate-slide-h delay-3000"></div>
                <div className="absolute bottom-1/5 left-1/5 w-24 h-4 bg-yellow-400/15 rounded-full animate-slide-h delay-5000"></div>
                <div className="absolute top-4/5 right-2/5 w-16 h-8 bg-black/8 rounded-full animate-drift delay-2000"></div>
                
                {/* Hexagon Shapes */}
                <div className="absolute top-56 right-3/5 w-16 h-16 bg-blue-500/10 transform rotate-30 animate-rotate-slow" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}></div>
                <div className="absolute bottom-48 left-3/5 w-20 h-20 bg-yellow-400/8 transform rotate-45 animate-rotate-reverse delay-3000" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}></div>
                
                {/* Additional Accent Elements */}
                <div className="absolute top-1/8 left-3/4 w-6 h-6 bg-black/12 rounded-full animate-float delay-1000"></div>
                <div className="absolute bottom-1/8 right-3/4 w-8 h-8 bg-blue-500/15 rounded-full animate-bounce-slow delay-2000"></div>
                <div className="absolute top-7/8 left-1/8 w-10 h-10 bg-yellow-400/18 rounded-full animate-drift delay-4000"></div>
            </div>

            {/* Original Form Content with z-index to stay on top */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden relative z-10">
                <div className="bg-blue-600 p-4 flex justify-center">
                    <img src={logo} alt="Institution Logo" className="h-16 w-auto rounded-full" />
                </div>
                
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Institution Contact Details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
                        <div className="space-y-1">
                            <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
                                Institution Name
                            </label>
                            <input
                                type="text"
                                id="institutionName"
                                name="institutionName"
                                value={formData.institutionName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter institution name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="institutionEmail" className="block text-sm font-medium text-gray-700">
                                Institution Email
                            </label>
                            <input
                                type="email"
                                id="institutionEmail"
                                name="institutionEmail"
                                value={formData.institutionEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="email@institution.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="institutionPhone" className="block text-sm font-medium text-gray-700">
                                Institution Phone Number
                            </label>
                            <input
                                type="tel"
                                id="institutionPhone"
                                name="institutionPhone"
                                value={formData.institutionPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="+91 1234567890"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700 mb-3">Applicant Information</h3>
                            
                            <div className="space-y-1">
                                <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
                                    Applicant Name
                                </label>
                                <input
                                    type="text"
                                    id="applicantName"
                                    name="applicantName"
                                    value={formData.applicantName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-1 mt-4">
                                <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700">
                                    Applicant Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="applicantPhone"
                                    name="applicantPhone"
                                    value={formData.applicantPhone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+91 1234567890"
                                />
                            </div>
                        </div>

                        <div className="pt-5">
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact_Institution;