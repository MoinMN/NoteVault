import React, { useState } from 'react';
import {
  FileText, CheckSquare,
  Search, Share2, Moon,
  Cloud, Smartphone, Download,
  Store, Zap, Shield
} from 'lucide-react';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const tryOpenApp = () => {
    const appScheme = 'notevault://';
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.pixelmint.notevault';
    const apkDownloadUrl = '/downloads/notevault.apk';

    window.location.href = appScheme;

    setTimeout(() => {
      const userChoice = window.confirm(
        "Couldn't open the app. Would you like to:\n\nOK - Visit Play Store\nCancel - Download APK"
      );

      if (userChoice) {
        window.open(playStoreUrl, '_blank');
      } else {
        window.location.href = apkDownloadUrl;
      }
    }, 2000);
  };

  const handleDownload = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border border-white border-opacity-30">
                <p className="text-sm font-semibold text-black">✨ Your Secure Note Companion</p>
              </div>

              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  NoteVault
                </span>
              </h1>

              <p className="text-2xl md:text-3xl opacity-95 leading-relaxed">
                Simple, powerful, and always with you. Transform the way you take notes.
              </p>

              <div className="flex flex-wrap gap-5">
                <button onClick={tryOpenApp} className="group px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
                  <Smartphone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Open in App
                </button>
                <a href="/downloads/notevault.apk" download onClick={handleDownload} className="group px-10 py-5 bg-white bg-opacity-20 border-2 border-white rounded-2xl font-bold text-lg hover:bg-opacity-30 hover:scale-105 transition-all duration-300 backdrop-blur-sm flex items-center gap-3 text-purple-600">
                  <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                  Download APK
                </a>
              </div>

              <div className="pt-6">
                <a href="https://play.google.com/store/apps/details?id=com.pixelmint.notevault" target="_blank" rel="noopener noreferrer" className="inline-block hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-14" />
                </a>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-black">50K+</div>
                  <div className="text-sm opacity-90">Downloads</div>
                </div>
                <div className="w-px h-12 bg-white opacity-30"></div>
                <div className="text-center">
                  <div className="text-3xl font-black">4.8⭐</div>
                  <div className="text-sm opacity-90">Rating</div>
                </div>
                <div className="w-px h-12 bg-white opacity-30"></div>
                <div className="text-center">
                  <div className="text-3xl font-black">99%</div>
                  <div className="text-sm opacity-90">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-100 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-sm opacity-75">Today</div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                      <div className="flex items-start gap-3 text-black">
                        <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">Project Meeting</div>
                          <div className="text-sm opacity-75">Discuss Q1 goals</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                      <div className="flex items-start gap-3 text-black">
                        <FileText className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">Weekly Summary</div>
                          <div className="text-sm opacity-75">Review achievements</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm hover:bg-opacity-30 transition-all">
                      <div className="flex items-start gap-3 text-black">
                        <Zap className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">Quick Ideas</div>
                          <div className="text-sm opacity-75">Brainstorm session</div>
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-6">
              <p className="text-sm font-bold text-purple-600">FEATURES</p>
            </div>
            <h2 className="text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay organized and productive in one beautiful app
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
            <p className="text-sm font-bold text-black">GET STARTED NOW</p>
          </div>

          <h2 className="text-5xl font-black mb-6">Get NoteVault Now</h2>
          <p className="text-2xl mb-16 opacity-95 max-w-3xl mx-auto">
            Available on Android. Download and start organizing your life today!
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-black">
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
                action: handleDownload,
                buttonText: 'Download APK',
                href: '/downloads/notevault.apk',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Store,
                title: 'Google Play',
                desc: 'Get it from the Play Store',
                buttonText: 'View on Play Store',
                href: 'https://play.google.com/store/apps/details?id=com.pixelmint.notevault',
                external: true,
                gradient: 'from-purple-500 to-pink-500'
              }
            ].map((option, idx) => (
              <div key={idx} className="group bg-white bg-opacity-10 backdrop-blur-lg border-2 border-white border-opacity-20 rounded-3xl p-10 hover:bg-opacity-15 hover:scale-105 transition-all duration-500 hover:border-opacity-40">
                <div className={`w-20 h-20 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                  <option.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{option.title}</h3>
                <p className="opacity-90 mb-8 text-lg">{option.desc}</p>

                {option.href ? (
                  <a href={option.href} download={!option.external} target={option.external ? '_blank' : undefined} rel={option.external ? 'noopener noreferrer' : undefined} onClick={option.action} className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                    {option.buttonText}
                  </a>
                ) : (
                  <button onClick={option.action} className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
                    {option.buttonText}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Download Notification */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl max-w-sm z-50 transform transition-all duration-500 animate-slide-in border-2 border-white border-opacity-20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Download Started!</h3>
              <p className="text-sm opacity-95">After installation, click "Open in App" to launch NoteVault.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;