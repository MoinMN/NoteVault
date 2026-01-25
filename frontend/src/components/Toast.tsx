// Toast.tsx
import { AlertCircle, CheckCircle, X } from "lucide-react";
import React from 'react';

const Toast: React.FC<{
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  return (
    <div className="fixed top-4 sm:top-8 right-4 sm:right-8 left-4 sm:left-auto max-w-md z-50 transform transition-all duration-500 animate-slide-in">
      <div className={`${type === 'success'
          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
          : 'bg-gradient-to-r from-red-500 to-rose-600'
        } text-white p-4 sm:p-6 rounded-2xl shadow-2xl border-2 border-white border-opacity-20`}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center flex-shrink-0">
            {type === 'success' ? (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            ) : (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg mb-1">
              {type === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p className="text-sm sm:text-base opacity-95 break-words">{message}</p>
          </div>
          <button
            title="Close notification"
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;