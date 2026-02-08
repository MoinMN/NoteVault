import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-5 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">NoteVault</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Secure note-taking made simple. Developed with ❤️ by PixelMint.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-purple-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { title: "Home", route: "/" },
                { title: "About", route: "/about" },
                { title: "Privacy Policy", route: "/privacy" },
                { title: "Terms & Conditions", route: "/terms" },
              ].map((link) => (
                <li key={link.route}>
                  <Link
                    to={link.route}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    → {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-purple-300">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  → Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://www.moinnaik.bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  → Developer Website
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 md:mb-5 text-purple-300">
              Connect
            </h3>
            <p className="text-gray-300 mb-3">© 2026 PixelMint</p>
            <p className="text-gray-300 mb-3">All rights reserved</p>
            <div className="inline-block px-4 py-2 bg-purple-600 bg-opacity-30 rounded-lg border border-purple-400 border-opacity-30">
              <p className="text-sm text-purple-200">Version 26.2.8</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 md:pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm md:text-base">
            Made with ❤️ by PixelMint
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;