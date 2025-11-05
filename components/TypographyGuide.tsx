
import React from 'react';
import { Typography } from '../types';

interface TypographyGuideProps {
  typography: Typography;
}

const TypographyGuide: React.FC<TypographyGuideProps> = ({ typography }) => {
  const { headerFont, bodyFont } = typography;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Typography</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-400 mb-2">Header Font</p>
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: `'${headerFont.name}', sans-serif` }}>
            {headerFont.name}
          </h3>
          <p
            className="text-6xl"
            style={{ fontFamily: `'${headerFont.name}', sans-serif`, fontWeight: headerFont.weight }}
          >
            Aa
          </p>
          <p className="text-gray-300 mt-4" style={{ fontFamily: `'${headerFont.name}', sans-serif` }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        <div className="bg-gray-700/30 p-6 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-400 mb-2">Body Font</p>
          <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: `'${bodyFont.name}', sans-serif` }}>
            {bodyFont.name}
          </h3>
           <p
            className="text-6xl"
            style={{ fontFamily: `'${bodyFont.name}', sans-serif`, fontWeight: bodyFont.weight }}
          >
            Aa
          </p>
          <p className="text-gray-300 mt-4" style={{ fontFamily: `'${bodyFont.name}', sans-serif` }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TypographyGuide;
