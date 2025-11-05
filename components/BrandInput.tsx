
import React from 'react';

interface BrandInputProps {
  mission: string;
  setMission: (mission: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const BrandInput: React.FC<BrandInputProps> = ({ mission, setMission, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">1. Describe Your Mission</h2>
      <p className="text-sm text-gray-400">
        Tell us about your company. What is your purpose? Who are your customers? The more detail, the better the results.
      </p>
      <textarea
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        placeholder="e.g., 'An eco-friendly coffee brand that sources beans ethically and provides a cozy space for community connection.'"
        className="w-full h-40 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Brand Identity'
        )}
      </button>
    </div>
  );
};

export default BrandInput;
