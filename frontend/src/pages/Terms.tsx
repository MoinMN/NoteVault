import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import useSEO from '../seo/useSEO';

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

const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 sm:p-5 rounded-xl border-l-4 border-yellow-400 mb-4">
    {children}
  </div>
);

const TermsPage: React.FC = () => {
  useSEO({
    title: "Terms & Conditions – NoteVault",
    description:
      "Review the terms and conditions for using the NoteVault notes and todo mobile application.",
    url: "https://notevault.moinnaik.bio/terms",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="max-w-4xl mx-auto bg-white md:rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-8 sm:py-12 px-4 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">📋 Terms & Conditions</h1>
          <p className="text-base sm:text-xl opacity-95">Please read carefully before using NoteVault</p>
        </div>

        {/* Content */}
        <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-8 md:px-12">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border-l-4 border-purple-600">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Welcome to <strong className="text-purple-600">NoteVault</strong>! These Terms and Conditions govern your use
              of our mobile application and services. By accessing or using NoteVault, you agree
              to be bound by these terms.
            </p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
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
            <p className="text-gray-600 text-base sm:text-lg mb-3 leading-relaxed">When using NoteVault, you agree to:</p>
            <ul className="space-y-1">
              <ListItem>Use the service only for lawful purposes</ListItem>
              <ListItem>Not share content that is illegal, harmful, or violates others' rights</ListItem>
              <ListItem>Not attempt to gain unauthorized access to our systems</ListItem>
              <ListItem>Not use the service to distribute spam or malicious content</ListItem>
              <ListItem>Not reverse engineer or attempt to extract the source code</ListItem>
            </ul>
          </Section>

          <Section title="4. Data and Privacy">
            <p className="text-gray-600 text-base sm:text-lg mb-3 leading-relaxed">
              Your use of NoteVault is also governed by our{' '}
              <Link to="/privacy" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Privacy Policy
              </Link>. We collect and process your data as described in the Privacy Policy. Key points include:
            </p>
            <ul className="space-y-1">
              <ListItem>Your notes and todos are private and stored securely</ListItem>
              <ListItem>Passwords are encrypted using industry-standard methods</ListItem>
              <ListItem>We do not share your personal data with third parties</ListItem>
              <ListItem>You can delete your account and data at any time</ListItem>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p className="text-gray-600 text-base sm:text-lg mb-3 leading-relaxed">
              All content, features, and functionality of NoteVault are owned by{' '}
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded font-semibold">
                PixelMint
              </span>{' '}
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              You retain ownership of the notes and content you create. By using NoteVault,
              you grant us a license to store and process your content to provide the service.
            </p>
          </Section>

          <Section title="6. Service Availability">
            <WarningBox>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <strong>Important:</strong> We strive to provide reliable service, but NoteVault
                is provided "as is" without warranties of any kind. We do not guarantee that the
                service will be uninterrupted, secure, or error-free.
              </p>
            </WarningBox>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the service at any time
              with or without notice.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              To the maximum extent permitted by law, PixelMint and NoteVault shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use or inability to use the service.
            </p>
          </Section>

          <Section title="8. Account Termination">
            <p className="text-gray-600 text-base sm:text-lg mb-3 leading-relaxed">We reserve the right to terminate or suspend your account if:</p>
            <ul className="space-y-1">
              <ListItem>You violate these Terms and Conditions</ListItem>
              <ListItem>You engage in fraudulent or illegal activities</ListItem>
              <ListItem>You abuse the service or harm other users</ListItem>
            </ul>
            <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
              You may terminate your account at any time through the app's settings. Upon
              termination, all your data will be permanently deleted.
            </p>
          </Section>

          <Section title="9. Push Notifications">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              NoteVault may send push notifications for task reminders and updates. You can
              manage or disable these notifications through your device settings at any time.
            </p>
          </Section>

          <Section title="10. Age Restrictions">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              There is no minimum age requirement to use NoteVault. However, we encourage
              parents and guardians to supervise children's use of the app.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. We will
              notify users of significant changes through the app or via email. Your continued
              use of NoteVault after such modifications constitutes acceptance of the updated terms.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with
              the laws of the jurisdiction where PixelMint operates, without regard to its
              conflict of law provisions.
            </p>
          </Section>

          <Section title="13. Contact Information">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us
              through the{' '}
              <Link to="/contact" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                Contact Us
              </Link>{' '}
              form or visit our website at{' '}
              <a href="https://notevault.moinnaik.bio" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors break-all" target="_blank" rel="noopener noreferrer">
                https://notevault.moinnaik.bio
              </a>
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

export default TermsPage;