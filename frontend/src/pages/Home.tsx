import React, { useState } from 'react';
import {
  FileText, CheckSquare,
  Search, Share2, Moon,
  Cloud, Smartphone, Download,
  Store, Zap, Shield
} from 'lucide-react';
import Footer from '../components/Footer';
import AppNotFoundModal from '../components/AppNotFound';

const HomePage: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const APP_SCHEME = 'notevault://';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.im_moin.notevault';

  const downloadAPK = () => {
    setShowNotification(true);

    window.open(
      `https://github.com/MoinMN/NoteVault/releases/download/v26.1.22/NoteVault.apk`,
      "_blank",
      "noopener,noreferrer"
    );

    setTimeout(() => setShowNotification(false), 5000);
  };

  // Try to open app, show modal if not found
  const tryOpenApp = () => {
    window.location.href = APP_SCHEME;

    // Check if app opened after 2 seconds
    setTimeout(() => {
      setShowModal(true);
    }, 2000);
  };

  // Handle Play Store navigation
  const handlePlayStore = () => {
    setShowModal(false);
    window.open(PLAY_STORE_URL, '_blank');
  };

  // Handle APK download from modal
  const handleModalDownload = () => {
    setShowModal(false);
    downloadAPK();
  };

  const features = [
    { icon: Shield, title: 'Secure & Private', desc: 'Your notes are encrypted and stored securely. Only you have access to your data.', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckSquare, title: 'Smart Todos', desc: 'Create, organize, and track your tasks with ease. Never miss a deadline again.', color: 'from-green-500 to-emerald-500' },
    { icon: Search, title: 'Quick Search', desc: 'Find any note instantly with our powerful search feature.', color: 'from-yellow-500 to-orange-500' },
    { icon: Share2, title: 'Easy Sharing', desc: 'Share your notes with other apps seamlessly.', color: 'from-pink-500 to-rose-500' },
    { icon: Moon, title: 'Dark Mode', desc: 'Easy on the eyes with beautiful dark mode support.', color: 'from-indigo-500 to-purple-500' },
    { icon: Cloud, title: 'Cloud Sync', desc: 'Access your notes from anywhere with automatic cloud synchronization.', color: 'from-violet-500 to-fuchsia-500' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white min-h-screen flex items-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 md:py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-block px-3 sm:px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border border-white border-opacity-30">
                  <p className="text-xs sm:text-sm font-semibold text-black">✨ Your Secure Note Companion</p>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    NoteVault
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-95 leading-relaxed">
                  Simple, powerful, and always with you. Transform the way you take notes.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5">
                  <button
                    onClick={tryOpenApp}
                    className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-purple-600 rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                    Open in App
                  </button>
                  <button
                    onClick={downloadAPK}
                    className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-purple-600 bg-opacity-20 border-2 border-white rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-opacity-30 hover:scale-105 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                    Download APK
                  </button>
                </div>

                <div className="pt-4 sm:pt-6">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105"
                  >
                    <img
                      src="/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-10 sm:h-12 md:h-14"
                    />
                  </a>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-2 sm:pt-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black">50K+</div>
                    <div className="text-xs sm:text-sm opacity-90">Downloads</div>
                  </div>
                  <div className="w-px h-8 sm:h-12 bg-white opacity-30"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black">4.8⭐</div>
                    <div className="text-xs sm:text-sm opacity-90">Rating</div>
                  </div>
                  <div className="w-px h-8 sm:h-12 bg-white opacity-30"></div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black">99%</div>
                    <div className="text-xs sm:text-sm opacity-90">Satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-4 sm:p-6 md:p-8 text-white">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs sm:text-sm opacity-75">Today</div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                        <div className="flex items-start gap-2 sm:gap-3 text-black">
                          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Project Meeting</div>
                            <div className="text-xs sm:text-sm opacity-75">Discuss Q1 goals</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                        <div className="flex items-start gap-2 sm:gap-3 text-black">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Weekly Summary</div>
                            <div className="text-xs sm:text-sm opacity-75">Review achievements</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white bg-opacity-20 rounded-xl p-3 sm:p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                        <div className="flex items-start gap-2 sm:gap-3 text-black">
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm sm:text-base">Quick Ideas</div>
                            <div className="text-xs sm:text-sm opacity-75">Brainstorm session</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block px-3 sm:px-4 py-2 bg-purple-100 rounded-full mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-bold text-purple-600">FEATURES</p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Powerful Features
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Everything you need to stay organized and productive in one beautiful app
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-5 text-center relative z-10">
            <div className="inline-block px-3 sm:px-4 py-2 bg-white bg-opacity-20 rounded-full mb-4 sm:mb-6 backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-bold text-black">GET STARTED NOW</p>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">Get NoteVault Now</h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 md:mb-16 opacity-95 max-w-3xl mx-auto px-4">
              Available on Android. Download and start organizing your life today!
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto text-black">
              {[
                {
                  icon: Smartphone,
                  title: 'Open in App',
                  desc: 'Already have NoteVault installed?',
                  action: tryOpenApp,
                  buttonText: 'Launch App',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Download,
                  title: 'Direct Download',
                  desc: 'Download the latest APK file',
                  action: downloadAPK,
                  buttonText: 'Download APK',
                  gradient: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Store,
                  title: 'Google Play',
                  desc: 'Get it from the Play Store',
                  action: () => window.open(PLAY_STORE_URL, '_blank'),
                  buttonText: 'View on Play Store',
                  gradient: 'from-purple-500 to-pink-500'
                }
              ].map((option, idx) => (
                <div
                  key={idx}
                  className="group bg-white bg-opacity-10 backdrop-blur-lg border-2 border-white border-opacity-20 rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-opacity-15 hover:scale-105 transition-all duration-500 hover:border-opacity-40"
                >
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                    <option.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{option.title}</h3>
                  <p className="opacity-90 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">{option.desc}</p>

                  <button
                    onClick={option.action}
                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    {option.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        {/* App Not Found Modal */}
        <AppNotFoundModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onPlayStore={handlePlayStore}
          onDownloadApk={handleModalDownload}
        />

        {/* Download Notification */}
        {showNotification && (
          <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 left-4 sm:left-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-sm z-50 transform transition-all duration-500 animate-slide-in border-2 border-white border-opacity-20">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Download Started!</h3>
                <p className="text-xs sm:text-sm opacity-95">After installation, click "Open in App" to launch NoteVault.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;