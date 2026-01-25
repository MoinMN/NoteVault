import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-600 text-base sm:text-lg mb-2 flex items-start leading-relaxed">
    <span className="text-purple-600 mr-2 flex-shrink-0">•</span>
    <span>{children}</span>
  </li>
);

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="max-w-4xl mx-auto bg-white md:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-8 sm:py-12 px-4 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">🔒 Privacy Policy</h1>
          <p className="text-base sm:text-xl opacity-95">Your privacy matters to us</p>
        </div>

        {/* Content */}
        <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-8 md:px-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border-l-4 border-purple-600">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Welcome to <strong className="text-purple-600">NoteVault</strong> (operated by PixelMint). Your privacy is important to us,
              and we are committed to protecting your personal information.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <p className="text-gray-600 mb-3 text-base sm:text-lg leading-relaxed">We collect the following information from users:</p>
            <ul className="space-y-1">
              <ListItem>Name, email, and encrypted password</ListItem>
              <ListItem>Notes and todo items created by the user</ListItem>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="space-y-1">
              <ListItem>To provide and maintain your account and access to your notes</ListItem>
              <ListItem>To allow note sharing via apps on your device</ListItem>
              <ListItem>To improve our services and app experience</ListItem>
            </ul>
          </Section>

          <Section title="3. Data Storage">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              All your information is stored securely on our backend (MongoDB).
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold mx-1">
                Passwords are encrypted
              </span>
              , and notes are private to your account.
            </p>
          </Section>

          <Section title="4. Sharing Your Data">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We <strong>do not share</strong> your personal data with any third parties.
              You can choose to share notes using the in-app share feature.
            </p>
          </Section>

          <Section title="5. Notifications">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              NoteVault may send push notifications. You can manage these notifications
              in your device settings.
            </p>
          </Section>

          <Section title="6. Account Deletion">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              You can request deletion of your account and all associated data directly
              through the app.
            </p>
          </Section>

          <Section title="7. Children">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              There is no age restriction for using NoteVault, but we encourage parents
              to supervise children using the app.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              For questions about privacy or support, use the{' '}
              <Link to="/contact" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Contact Us
              </Link>{' '}
              form. We will respond promptly.
            </p>
          </Section>
        </div>
      </div>

      <div className="md:mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;