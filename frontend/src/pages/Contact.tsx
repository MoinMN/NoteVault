import React, { useState } from 'react';
import { Mail, Globe, Clock, Smartphone, FileText, Shield } from 'lucide-react';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.subject) newErrors.subject = true;
    if (!formData.message) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotification({
        show: true,
        type: 'error',
        message: 'Please fill in all required fields before submitting.'
      });
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);
      return;
    }

    setIsLoading(true);

    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://notevault-api.moinnaik.bio/support/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setNotification({
          show: true,
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you within 24-48 hours.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);
      } else {
        setNotification({
          show: true,
          type: 'error',
          message: 'Failed to send message. Please try again or email us directly at crichit45@gmail.com'
        });
        setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Network error. Please check your connection or email us at crichit45@gmail.com'
      });
      setTimeout(() => setNotification({ show: false, type: 'success', message: '' }), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Mail className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4">Contact Us</h1>
              <p className="text-xl opacity-95 max-w-2xl mx-auto">
                We'd love to hear from you! Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>

          {/* Split Content */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-6">Have a question, feedback, or need support? We're here to help!</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Email</h3>
                    <a href="mailto:crichit45@gmail.com" className="text-lg font-semibold text-purple-600 hover:underline">
                      crichit45@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Website</h3>
                    <a href="https://www.moinnaik.bio" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                      www.moinnaik.bio
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Response Time</h3>
                    <p className="text-lg font-semibold text-gray-800">Within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 mb-1">Version</h3>
                    <p className="text-lg font-semibold text-gray-800">NoteVault 26.1.22</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12 bg-white">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-5 py-3 border-2 rounded-xl text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-purple-600'
                      }`}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-5 py-3 border-2 rounded-xl text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-600'
                      }`}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    title='subject'
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 border-2 rounded-xl text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all cursor-pointer ${errors.subject ? 'border-red-500' : 'border-gray-200 focus:border-purple-600'
                      }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="account">Account Issue</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Please describe your question or issue in detail..."
                    className={`w-full px-5 py-3 border-2 rounded-xl text-base bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all resize-y ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-purple-600'
                      }`}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Footer Links */}
        <div className="bg-white rounded-3xl shadow-lg py-6 px-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
              <FileText className="w-4 h-4" /> Home
            </a>
            <a href="/about" className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
              <Shield className="w-4 h-4" /> About
            </a>
            <a href="/privacy" className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
              <Shield className="w-4 h-4" /> Privacy Policy
            </a>
            <a href="/terms" className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors">
              <FileText className="w-4 h-4" /> Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>

      {/* Notification */}
      {notification.show && (
        <Toast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ show: false, type: 'success', message: '' })}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;