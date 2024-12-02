import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-red-900' : 'bg-red-50'}`}>
      <div className="flex items-center">
        <AlertCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-200' : 'text-red-400'}`} />
        <p className={`ml-3 text-sm ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`mt-3 rounded-md px-4 py-2 text-sm font-medium ${
            isDarkMode
              ? 'bg-red-800 text-red-100 hover:bg-red-700'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
        >
          Try again
        </button>
      )}
    </div>
  );
};