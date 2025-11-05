
import React from 'react';
import { BrandIdentity } from '../types';
import LogoDisplay from './LogoDisplay';
import ColorPalette from './ColorPalette';
import TypographyGuide from './TypographyGuide';

interface BrandDashboardProps {
  brandIdentity: BrandIdentity | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-gray-700 rounded-lg"></div>
            <div className="h-48 bg-gray-700 rounded-lg"></div>
            <div className="h-48 bg-gray-700 rounded-lg"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-1/4 mt-8"></div>
        <div className="flex space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-700"></div>
            <div className="w-24 h-24 rounded-full bg-gray-700"></div>
            <div className="w-24 h-24 rounded-full bg-gray-700"></div>
            <div className="w-24 h-24 rounded-full bg-gray-700"></div>
            <div className="w-24 h-24 rounded-full bg-gray-700"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-1/4 mt-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-700 rounded-lg"></div>
            <div className="h-32 bg-gray-700 rounded-lg"></div>
        </div>
    </div>
);

const BrandDashboard: React.FC<BrandDashboardProps> = ({ brandIdentity, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 min-h-[calc(100vh-120px)]">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 text-red-300 p-8 rounded-lg flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
         <h2 className="text-2xl font-bold mb-4">Generation Failed</h2>
         <p>{error}</p>
      </div>
    );
  }

  if (!brandIdentity) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)]">
        <h2 className="text-3xl font-bold text-white mb-4">Your Brand Bible Awaits</h2>
        <p className="text-gray-400 max-w-md">Describe your company's mission in the panel on the left and click "Generate" to create your complete brand identity dashboard.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 space-y-12">
      <h1 className="text-4xl font-bold text-center text-white pb-4 border-b-2 border-indigo-500">
        Brand Bible: {brandIdentity.companyName}
      </h1>
      <LogoDisplay
        primaryLogo={brandIdentity.primaryLogo}
        secondaryLogo1={brandIdentity.secondaryLogo1}
        secondaryLogo2={brandIdentity.secondaryLogo2}
      />
      <ColorPalette colors={brandIdentity.colorPalette} />
      <TypographyGuide typography={brandIdentity.typography} />
    </div>
  );
};

export default BrandDashboard;
