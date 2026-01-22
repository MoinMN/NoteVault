import { FileText } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">NoteVault</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">Secure note-taking made simple. Developed with ❤️ by PixelMint.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-purple-300">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Privacy Policy', 'Terms & Conditions'].map((item, idx) => (
                <li key={idx}>
                  <a href={`/${item === 'Home' ? '' : item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    → {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-purple-300">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → Contact Us
                </a>
              </li>
              <li>
                <a href="https://www.moinnaik.bio" target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  → Developer Website
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-purple-300">Connect</h3>
            <p className="text-gray-300 mb-3">© 2026 PixelMint</p>
            <p className="text-gray-300 mb-3">All rights reserved</p>
            <div className="inline-block px-4 py-2 bg-purple-600 bg-opacity-30 rounded-lg border border-purple-400 border-opacity-30">
              <p className="text-sm text-purple-200">Version 26.1.22</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-gray-400">Made with ❤️ by PixelMint</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;