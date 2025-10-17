import React from 'react';

interface DisclaimerProps {
  onContinue: () => void;
}

export default function Disclaimer({ onContinue }: DisclaimerProps) {
  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-pulse-slow">
      <div className="text-center space-y-6">
        <div className="text-6xl mb-4">⚠️</div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          Warning: Troll Login Ahead
        </h1>
        
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 text-left space-y-4">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">
            ⚡ Educational Prank Notice
          </h2>
          
          <ul className="space-y-2 text-yellow-900">
            <li className="flex items-start">
              <span className="mr-2">🎯</span>
              <span>This is an <strong>intentionally frustrating</strong> login experience</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎓</span>
              <span>Designed for <strong>entertainment and education</strong> purposes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔧</span>
              <span>Demonstrates JavaScript, CSS, and UX principles through humor</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🚪</span>
              <span>An emergency exit button will appear if you get stuck</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">❤️</span>
              <span>No actual authentication occurs - your data is safe</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-4">
          <p className="text-gray-600 text-sm">
            By continuing, you acknowledge this is a prank and agree to embrace the chaos
          </p>
          
          <button
            onClick={onContinue}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            I Accept the Challenge 🎮
          </button>
        </div>
      </div>
    </div>
  );
}