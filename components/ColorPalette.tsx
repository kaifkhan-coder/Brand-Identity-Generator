
import React from 'react';
import { Color } from '../types';

interface ColorPaletteProps {
  colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Color Palette</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div
              className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg transition-transform group-hover:scale-105"
              style={{ backgroundColor: color.hex }}
            />
            <div className="mt-4">
              <h4 className="font-bold text-lg text-white">{color.name}</h4>
              <button 
                onClick={() => copyToClipboard(color.hex)}
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                title="Copy to clipboard"
              >
                {color.hex}
              </button>
              <p className="text-xs text-gray-500 mt-1">{color.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ColorPalette;
