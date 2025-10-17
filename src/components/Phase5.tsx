import React, { useState } from 'react';

export default function Phase5() {
  const [showTwist, setShowTwist] = useState<boolean>(false);

  const handleCelebrate = () => {
    setShowTwist(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      {!showTwist ? (
        <div className="text-center space-y-6 animate-pulse-slow">
          <div className="text-8xl mb-4">🎉</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Congratulations!
          </h1>
          
          <p className="text-xl text-gray-700">
            You've successfully completed all phases of the Troll Login Challenge!
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 space-y-3">
            <h3 className="font-bold text-lg text-gray-800">What You Experienced:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>✓ Evasive button mechanics with collision detection</li>
              <li>✓ Dynamic password requirements and form validation</li>
              <li>✓ Impossible CAPTCHA with randomized challenges</li>
              <li>✓ Fake loading screens with progress manipulation</li>
              <li>✓ Interactive DOM manipulation and state management</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-green-900 mb-2">
              🎓 Educational Value
            </h3>
            <p className="text-green-800 text-sm">
              This project demonstrates JavaScript event handling, CSS animations, 
              React state management, and the importance of good UX design through 
              intentional bad examples. Perfect for learning frontend development!
            </p>
          </div>

          <button
            onClick={handleCelebrate}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Celebrate Your Victory! 🎊
          </button>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="text-8xl mb-4">😈</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Just Kidding!
          </h1>
          
          <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
            <p className="text-xl text-red-900 mb-4">
              Did you really think it would be that easy? 😄
            </p>
            <p className="text-red-800">
              Congratulations on completing the challenge! But remember:
              <br />
              <strong>This was all a prank from the beginning!</strong>
            </p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 text-left">
            <h3 className="font-bold text-lg text-blue-900 mb-3">
              🎯 Real Talk
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              You actually DID complete everything successfully! This final twist 
              demonstrates how even success messages can be part of the trolling 
              experience. In real applications, clear feedback and honest communication 
              are essential for good UX.
            </p>
            <p className="text-blue-800 text-sm">
              Thank you for embracing the chaos and learning through this 
              entertaining example of what NOT to do in production code! 😊
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRestart}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
            >
              Start Over 🔄
            </button>
            <button
              onClick={() => window.open('https://github.com', '_blank')}
              className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-all shadow-lg"
            >
              View Code 💻
            </button>
          </div>
        </div>
      )}
    </div>
  );
}