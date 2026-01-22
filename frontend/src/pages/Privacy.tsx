import React from 'react';
import Footer from '../components/Footer';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-purple-600 mb-4 pb-3 border-b-4 border-purple-600 inline-block">
        {title}
      </h2>
      {children}
    </div>
  );
};

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <li className="relative pl-8 py-2 before:content-['✓'] before:absolute before:left-0 before:text-purple-600 before:font-bold before:text-xl">
      {children}
    </li>
  );
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 py-5 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🔒 Privacy Policy</h1>
          <p className="text-xl opacity-95">Your privacy matters to us</p>
        </div>

        {/* Content */}
        <div className="py-12 px-8 md:px-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-2xl mb-8 border-l-4 border-purple-600">
            <p className="text-gray-700 text-lg">
              Welcome to <strong className="text-purple-600">NoteVault</strong> (operated by PixelMint). Your privacy is important to us,
              and we are committed to protecting your personal information.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <p className="text-gray-600 mb-3 text-lg">We collect the following information from users:</p>
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
            <p className="text-gray-600 text-lg">
              All your information is stored securely on our backend (MongoDB).
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold mx-1">
                Passwords are encrypted
              </span>
              , and notes are private to your account.
            </p>
          </Section>

          <Section title="4. Sharing Your Data">
            <p className="text-gray-600 text-lg">
              We <strong>do not share</strong> your personal data with any third parties.
              You can choose to share notes using the in-app share feature.
            </p>
          </Section>

          <Section title="5. Notifications">
            <p className="text-gray-600 text-lg">
              NoteVault may send push notifications. You can manage these notifications
              in your device settings.
            </p>
          </Section>

          <Section title="6. Account Deletion">
            <p className="text-gray-600 text-lg">
              You can request deletion of your account and all associated data directly
              through the app.
            </p>
          </Section>

          <Section title="7. Children">
            <p className="text-gray-600 text-lg">
              There is no age restriction for using NoteVault, but we encourage parents
              to supervise children using the app.
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p className="text-gray-600 text-lg">
              For questions about privacy or support, use the{' '}
              <a href="/contact" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Contact Us
              </a>{' '}
              form. We will respond promptly.
            </p>
          </Section>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-50 py-8 px-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-2">By using NoteVault, you agree to this Privacy Policy.</p>
          <p className="text-gray-600 mb-4">Last updated: <strong className="text-gray-900">January 2026</strong></p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="/" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Home</a>
            <span className="text-gray-400">|</span>
            <a href="/about" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">About</a>
            <span className="text-gray-400">|</span>
            <a href="/privacy" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Privacy Policy</a>
            <span className="text-gray-400">|</span>
            <a href="/terms" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;