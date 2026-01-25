import React from 'react';
import { Store, Download, X } from 'lucide-react';

interface AppNotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayStore: () => void;
  onDownloadApk: () => void;
}

const AppNotFoundModal: React.FC<AppNotFoundModalProps> = ({
  isOpen,
  onClose,
  onPlayStore,
  onDownloadApk,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-3 text-gray-800">
              App Not Found
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 text-center mb-8 leading-relaxed">
              NoteVault isn't installed on your device. Choose how you'd like to get it:
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Play Store Button */}
              <button
                onClick={onPlayStore}
                className="w-full group px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Store className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Get from Play Store
              </button>

              {/* Download APK Button */}
              <button
                onClick={onDownloadApk}
                className="w-full group px-6 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold text-base sm:text-lg hover:bg-purple-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
                Download APK
              </button>

              {/* Cancel Button */}
              <button
                onClick={onClose}
                className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold text-sm sm:text-base transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AppNotFoundModal;