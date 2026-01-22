import { AlertCircle, CheckCircle, X } from "lucide-react";
import React from 'react';


const Toast: React.FC<{
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  return (
    <div className="fixed top-8 right-8 max-w-md z-50 transform transition-all duration-500 animate-slide-in">
      <div className={`${type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'} text-white p-6 rounded-2xl shadow-2xl border-2 border-white border-opacity-20`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded-xl flex items-center justify-center flex-shrink-0">
            {type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-black" />
            ) : (
              <AlertCircle className="w-6 h-6 text-black" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {type === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p className="text-sm opacity-95">{message}</p>
          </div>
          <button
            title="title"
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;