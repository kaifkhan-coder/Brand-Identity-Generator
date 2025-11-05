
import React from 'react';

interface LogoDisplayProps {
  primaryLogo: string;
  secondaryLogo1: string;
  secondaryLogo2: string;
}

const LogoCard: React.FC<{ title: string, logoSrc: string, isPrimary?: boolean }> = ({ title, logoSrc, isPrimary = false }) => (
    <div className={`flex flex-col items-center justify-center p-6 rounded-lg ${isPrimary ? 'bg-gray-700/50' : 'bg-gray-700/30'} border border-gray-600`}>
        <div className={`p-4 rounded-lg flex items-center justify-center ${isPrimary ? 'w-48 h-48' : 'w-32 h-32'}`}>
            <img src={`data:image/png;base64,${logoSrc}`} alt={title} className="max-w-full max-h-full object-contain" />
        </div>
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
    </div>
);


const LogoDisplay: React.FC<LogoDisplayProps> = ({ primaryLogo, secondaryLogo1, secondaryLogo2 }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Logos & Marks</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-1">
             <LogoCard title="Secondary Mark 1" logoSrc={secondaryLogo1} />
        </div>
        <div className="lg:col-span-1 order-first lg:order-none">
             <LogoCard title="Primary Logo" logoSrc={primaryLogo} isPrimary />
        </div>
        <div className="lg:col-span-1">
             <LogoCard title="Secondary Mark 2" logoSrc={secondaryLogo2} />
        </div>
      </div>
    </section>
  );
};

export default LogoDisplay;
