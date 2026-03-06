import React, { useEffect, useState } from 'react';
import workshopTrainingImg from '../assets/img/WhatWeDo/Uni-tr.png';
import onlineClassesImg from '../assets/img/WhatWeDo/Online-tr.png';
import aptiImg from '../assets/img/WhatWeDo/AptiImg.png';

const WhatWeDo = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-[0.02]" 
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: '60px 60px'
                     }}>
                </div>
                
                {/* Gradient overlay circles */}
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-100 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-100 rounded-full opacity-10 blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    0% { opacity: 0; transform: translateX(-40px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInRight {
                    0% { opacity: 0; transform: translateX(40px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes slideInRight {
                    0% { opacity: 0; transform: translateX(30px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes floatDelayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes bounceSlow {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0px); }
                    40%, 43% { transform: translateY(-8px); }
                }
                @keyframes spinSlow {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes scaleIn {
                    0% { opacity: 0; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
                .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out; }
                .animate-fade-in-right { animation: fadeInRight 0.8s ease-out; }
                .animate-fade-in { animation: fadeIn 0.6s ease-out; }
                .animate-slide-in-right { animation: slideInRight 0.6s ease-out; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-float-delayed { animation: floatDelayed 3s ease-in-out infinite 0.5s; }
                .animate-bounce-slow { animation: bounceSlow 2.5s ease-in-out infinite; }
                .animate-spin-slow { animation: spinSlow 20s linear infinite; }
                .animate-scale-in { animation: scaleIn 0.7s ease-out; }

                .delay-200 { animation-delay: 0.2s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-600 { animation-delay: 0.6s; }
                .delay-800 { animation-delay: 0.8s; }
                .delay-1000 { animation-delay: 1s; }
                .delay-1200 { animation-delay: 1.2s; }
            `}</style>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content Section */}
                    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                        <div className="space-y-4">
                            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight transition-all duration-1000 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                                <span className='text-yellow-400 animate-pulse'>What We Do at</span> c<span className="text-blue-600 animate-bounce">T</span>c
                            </h2>
                            <p className={`text-lg text-gray-600 leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in delay-400' : 'opacity-0'}`}>
                                We empower institutions and individuals through comprehensive technology education, 
                                skill enhancement programs, and flexible learning solutions designed for the modern world.
                            </p>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <div className={`group transition-all duration-1000 ${isVisible ? 'animate-slide-in-right delay-600' : 'opacity-0'}`}>
                                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:bg-white/50 p-4 rounded-lg hover:shadow-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Offline Workshops for Institutions</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Comprehensive hands-on workshops delivered directly to educational institutions, 
                                            covering cutting-edge technologies and practical implementation strategies for faculty and students.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={`group transition-all duration-1000 ${isVisible ? 'animate-slide-in-right delay-800' : 'opacity-0'}`}>
                                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:bg-white/50 p-4 rounded-lg hover:shadow-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">Aptitude & Ability Enhancement</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Specialized programs designed to sharpen analytical thinking, problem-solving abilities, 
                                            and technical aptitude to prepare students for competitive examinations and career success.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={`group transition-all duration-1000 ${isVisible ? 'animate-slide-in-right delay-1000' : 'opacity-0'}`}>
                                <div className="flex items-start space-x-4 transform transition-all duration-500 hover:translate-x-2 hover:bg-white/50 p-4 rounded-lg hover:shadow-lg">
                                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">Online Classes</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Interactive virtual learning experiences with live instruction, recorded sessions, 
                                            and personalized mentoring to make quality education accessible from anywhere.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images Section - Overlapping Layout */}
                    <div className={`relative h-full min-h-96 lg:min-h-[500px] transition-all duration-1000 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
                        {/* First Image - Larger, positioned behind */}
                        <div className={`absolute top-0 left-0 w-72 h-80 md:w-80 md:h-96 lg:w-72 lg:h-80 xl:w-80 xl:h-96 transition-all duration-1000 ${isVisible ? 'animate-scale-in delay-400 animate-float' : 'opacity-0'}`}>
                            <div className="relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 w-full h-full hover:shadow-2xl hover:rotate-1">
                                <img 
                                    src={workshopTrainingImg} 
                                    alt="Workshop Training" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                {/* <div className="absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-2 hover:translate-y-0">
                                    <p className="font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">Workshop Training</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Second Image - Smaller, overlapping on top-right */}
                        <div className={`invisible lg:visible absolute top-16 right-0 md:top-20 md:right-4 lg:top-16 lg:right-0 w-56 h-64 md:w-64 md:h-72 lg:w-56 lg:h-64 xl:w-64 xl:h-72 z-10 transition-all duration-1000 ${isVisible ? 'animate-scale-in delay-600 animate-float-delayed' : 'opacity-0'}`}>
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full h-full hover:shadow-3xl hover:-rotate-1">
                                <img 
                                    src={onlineClassesImg} 
                                    alt="Online Classes" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                {/* <div className="absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-2 hover:translate-y-0">
                                    <p className="font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">Online Classes</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Third Image - Medium-sized rectangular, bottom-right overlap */}
                        <div className={`absolute bottom-4 right-8 md:bottom-8 md:right-12 lg:bottom-4 lg:right-8 w-48 h-56 md:w-52 md:h-60 lg:w-48 lg:h-56 z-20 transition-all duration-1000 ${isVisible ? 'animate-scale-in delay-800 animate-float-reverse' : 'opacity-0'}`}>
                            <div className="relative overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-500 w-full h-full hover:shadow-xl hover:rotate-2">
                                <img 
                                    src={aptiImg} 
                                    alt="Aptitude Enhancement" 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                {/* <div className="absolute bottom-4 left-4 text-white opacity-0 hover:opacity-100 transition-all duration-300 transform translate-y-2 hover:translate-y-0">
                                    <p className="font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">Aptitude Enhancement</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                        {/* Enhanced Decorative Elements */}
                        <div className={`absolute -top-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-30 transition-all duration-1000 ${isVisible ? 'animate-ping delay-1200' : 'opacity-0'}`}></div>
                        <div className={`absolute -bottom-4 -right-4 w-20 h-20 bg-purple-200 rounded-full opacity-20 transition-all duration-1000 ${isVisible ? 'animate-pulse delay-1000' : 'opacity-0'}`}></div>
                        <div className={`absolute top-1/2 -right-8 w-12 h-12 bg-yellow-200 rounded-full opacity-25 transition-all duration-1000 ${isVisible ? 'animate-bounce delay-800' : 'opacity-0'}`}></div>
                        <div className={`absolute bottom-1/4 -left-6 w-8 h-8 bg-green-200 rounded-full opacity-40 transition-all duration-1000 ${isVisible ? 'animate-pulse delay-600' : 'opacity-0'}`}></div>
                    </div>
                </div>
        </section>
    );
};

export default WhatWeDo;