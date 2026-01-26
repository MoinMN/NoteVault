import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

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
    <li className="relative pl-8 py-2 before:content-['✓'] before:absolute before:left-0 before:text-purple-600 before:font-bold before:text-xl">
      {children}
    </li>
  );
};

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto bg-white md:rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-8 sm:py-12 px-4 sm:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">📝 About NoteVault</h1>
            <p className="text-base sm:text-xl opacity-95">Secure. Simple. Efficient.</p>
          </div>

          {/* Content */}
          <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-8 md:px-12">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 border-l-4 border-purple-600">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <strong className="text-purple-600">NoteVault</strong> is a secure and user-friendly note-taking and todo app
                developed by PixelMint. Our mission is to provide a reliable platform for managing
                personal notes and tasks efficiently.
              </p>
            </div>

            <Section title="✨ Features">
              <ul className="space-y-1">
                <ListItem>Create and manage notes securely</ListItem>
                <ListItem>Organize todos and track tasks</ListItem>
                <ListItem>Share notes with other apps</ListItem>
                <ListItem>Search notes for quick access</ListItem>
                <ListItem>Push notifications to remind you about important tasks</ListItem>
              </ul>
            </Section>

            <Section title="📅 Version History">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                <strong>Version 1.0 (January 2026):</strong> Initial release with notes, todos,
                search, sharing, and notifications.
              </p>
            </Section>

            <Section title="🎯 Mission">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-5 rounded-xl border-l-4 border-red-400">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  To provide a simple, secure, and effective way for users to manage their
                  personal notes and tasks anywhere.
                </p>
              </div>
            </Section>

            <Section title="🌐 Contact & Website">
              <p className="text-gray-600 text-base sm:text-lg mb-3 leading-relaxed">
                Visit our website:{' '}
                <a
                  href="https://notevault.moinnaik.bio"
                  className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://notevault.moinnaik.bio
                </a>
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                For support or inquiries, use the{' '}
                <Link to="/contact" className="text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-600 transition-colors">
                  Contact Us
                </Link>{' '}
                form.
              </p>
            </Section>
          </div>
        </div>

        <div className="md:mt-8">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutPage;