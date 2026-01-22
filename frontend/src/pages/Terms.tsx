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
      <div className="mt-4">{children}</div>
    </div>
  );
};

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <li className="relative pl-8 py-2 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold before:text-2xl">
      {children}
    </li>
  );
};

const WarningBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-400 my-5">
      {children}
    </div>
  );
};

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 py-5 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">📋 Terms & Conditions</h1>
          <p className="text-xl opacity-95">Please read carefully before using NoteVault</p>
        </div>

        {/* Content */}
        <div className="py-12 px-8 md:px-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-2xl mb-8 border-l-4 border-purple-600">
            <p className="text-gray-700 text-lg">
              Welcome to <strong className="text-purple-600">NoteVault</strong>! These Terms and Conditions govern your use
              of our mobile application and services. By accessing or using NoteVault, you agree
              to be bound by these terms.
            </p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p className="text-gray-600 text-lg">
              By creating an account or using NoteVault, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions. If you do not
              agree to these terms, please do not use our service.
            </p>
          </Section>

          <Section title="2. User Accounts">
            <ul className="space-y-1">
              <ListItem>You must provide accurate and complete information when creating an account</ListItem>
              <ListItem>You are responsible for maintaining the confidentiality of your password</ListItem>
              <ListItem>You are responsible for all activities that occur under your account</ListItem>
              <ListItem>You must notify us immediately of any unauthorized use of your account</ListItem>
            </ul>
          </Section>

          <Section title="3. User Responsibilities">
            <p className="text-gray-600 text-lg mb-3">When using NoteVault, you agree to:</p>
            <ul className="space-y-1">
              <ListItem>Use the service only for lawful purposes</ListItem>
              <ListItem>Not share content that is illegal, harmful, or violates others' rights</ListItem>
              <ListItem>Not attempt to gain unauthorized access to our systems</ListItem>
              <ListItem>Not use the service to distribute spam or malicious content</ListItem>
              <ListItem>Not reverse engineer or attempt to extract the source code</ListItem>
            </ul>
          </Section>

          <Section title="4. Data and Privacy">
            <p className="text-gray-600 text-lg mb-3">
              Your use of NoteVault is also governed by our{' '}
              <a href="/privacy" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Privacy Policy
              </a>. We collect and process your data as described in the Privacy Policy. Key points include:
            </p>
            <ul className="space-y-1">
              <ListItem>Your notes and todos are private and stored securely</ListItem>
              <ListItem>Passwords are encrypted using industry-standard methods</ListItem>
              <ListItem>We do not share your personal data with third parties</ListItem>
              <ListItem>You can delete your account and data at any time</ListItem>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p className="text-gray-600 text-lg mb-3">
              All content, features, and functionality of NoteVault are owned by{' '}
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold">
                PixelMint
              </span>{' '}
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 text-lg">
              You retain ownership of the notes and content you create. By using NoteVault,
              you grant us a license to store and process your content to provide the service.
            </p>
          </Section>

          <Section title="6. Service Availability">
            <WarningBox>
              <p className="text-gray-700 text-lg">
                <strong>Important:</strong> We strive to provide reliable service, but NoteVault
                is provided "as is" without warranties of any kind. We do not guarantee that the
                service will be uninterrupted, secure, or error-free.
              </p>
            </WarningBox>
            <p className="text-gray-600 text-lg">
              We reserve the right to modify, suspend, or discontinue the service at any time
              with or without notice.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p className="text-gray-600 text-lg">
              To the maximum extent permitted by law, PixelMint and NoteVault shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use the service.
            </p>
          </Section>

          <Section title="8. Account Termination">
            <p className="text-gray-600 text-lg mb-3">We reserve the right to terminate or suspend your account if:</p>
            <ul className="space-y-1">
              <ListItem>You violate these Terms and Conditions</ListItem>
              <ListItem>You engage in fraudulent or illegal activities</ListItem>
              <ListItem>You abuse the service or harm other users</ListItem>
            </ul>
            <p className="text-gray-600 text-lg mt-3">
              You may terminate your account at any time through the app's settings. Upon
              termination, all your data will be permanently deleted.
            </p>
          </Section>

          <Section title="9. Push Notifications">
            <p className="text-gray-600 text-lg">
              NoteVault may send push notifications for task reminders and updates. You can
              manage or disable these notifications through your device settings at any time.
            </p>
          </Section>

          <Section title="10. Age Restrictions">
            <p className="text-gray-600 text-lg">
              There is no minimum age requirement to use NoteVault. However, we encourage
              parents and guardians to supervise children's use of the app.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p className="text-gray-600 text-lg">
              We reserve the right to modify these Terms and Conditions at any time. We will
              notify users of significant changes through the app or via email. Your continued
              use of NoteVault after such modifications constitutes acceptance of the updated terms.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p className="text-gray-600 text-lg">
              These Terms and Conditions shall be governed by and construed in accordance with
              the laws of the jurisdiction where PixelMint operates, without regard to its
              conflict of law provisions.
            </p>
          </Section>

          <Section title="13. Contact Information">
            <p className="text-gray-600 text-lg">
              If you have any questions about these Terms and Conditions, please contact us
              through the{' '}
              <a href="/contact" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Contact Us
              </a>{' '}
              form or visit our website at{' '}
              <a href="https://notevault.moinnaik.bio" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                https://notevault.moinnaik.bio
              </a>
            </p>
          </Section>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-50 py-8 px-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-2">By using NoteVault, you agree to these Terms and Conditions.</p>
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

export default TermsPage;