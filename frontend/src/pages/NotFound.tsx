import React from 'react';
import { Home, Search, FileText, ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="max-w-4xl w-full">
          {/* 404 Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-8 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="relative z-10">
                {/* 404 Number with Animation */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center">
                    <div className="text-9xl md:text-[12rem] font-black leading-none animate-bounce-slow">
                      4
                    </div>
                    <div className="relative mx-4">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-white bg-opacity-20 rounded-full backdrop-blur-sm flex items-center justify-center animate-spin-slow">
                        <AlertCircle className="w-12 h-12 md:w-16 md:h-16" />
                      </div>
                    </div>
                    <div className="text-9xl md:text-[12rem] font-black leading-none animate-bounce-slow" style={{ animationDelay: '0.2s' }}>
                      4
                    </div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black mb-4">Page Not Found</h1>
                <p className="text-xl opacity-95 max-w-2xl mx-auto">
                  Oops! The page you're looking for seems to have vanished into thin air.
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What happened?</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  The page you requested doesn't exist or has been moved. Don't worry though —
                  we'll help you get back on track!
                </p>
              </div>

              {/* Action Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a href="/" className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Go Home</h3>
                  <p className="text-gray-600">Return to our homepage and start fresh</p>
                </a>

                <a href="/contact" className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h3>
                  <p className="text-gray-600">Report this issue or get help</p>
                </a>

                <button onClick={() => window.history.back()} className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <ArrowLeft className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Go Back</h3>
                  <p className="text-gray-600">Return to the previous page</p>
                </button>
              </div>

              {/* Popular Pages */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Search className="w-6 h-6 text-purple-600" />
                  Popular Pages
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="/" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md hover:scale-105 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Home</div>
                      <div className="text-sm text-gray-500">Main landing page</div>
                    </div>
                  </a>

                  <a href="/about" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md hover:scale-105 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">About</div>
                      <div className="text-sm text-gray-500">Learn about NoteVault</div>
                    </div>
                  </a>

                  <a href="/privacy" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md hover:scale-105 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Privacy Policy</div>
                      <div className="text-sm text-gray-500">Your privacy matters</div>
                    </div>
                  </a>

                  <a href="/contact" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md hover:scale-105 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Contact</div>
                      <div className="text-sm text-gray-500">Get in touch</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Error Code Display */}
          <div className="mt-8 text-center">
            <div className="inline-block px-6 py-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border border-white border-opacity-30">
              <p className="text-white font-semibold">Error Code: 404 - Page Not Found</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;