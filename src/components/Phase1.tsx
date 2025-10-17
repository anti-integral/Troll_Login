import React, { useState, useRef, useEffect } from 'react';

interface Phase1Props {
  onComplete: () => void;
}

export default function Phase1({ onComplete }: Phase1Props) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !containerRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    
    const buttonCenterX = button.left + button.width / 2;
    const buttonCenterY = button.top + button.height / 2;
    
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 150) {
      const maxX = container.width - button.width;
      const maxY = container.height - button.height;
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      
      setButtonPosition({ x: newX, y: newY });
      setAttempts(prev => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onComplete();
  };

  useEffect(() => {
    if (attempts >= 5) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [attempts, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative"
      style={{ minHeight: '500px' }}
      onMouseMove={handleMouseMove}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Phase 1: The Evasive Button</h2>
        <p className="text-gray-600 text-sm">Try to submit the form... if you can 😈</p>
        {attempts > 0 && (
          <p className="text-purple-600 font-semibold mt-2">
            Attempts: {attempts}/5
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className={shake ? 'animate-shake' : ''}>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="relative" style={{ height: '150px' }}>
          <button
            ref={buttonRef}
            type="submit"
            className="absolute px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
            style={{
              left: `${buttonPosition.x}px`,
              top: `${buttonPosition.y}px`,
              transition: 'left 0.3s ease, top 0.3s ease'
            }}
          >
            Login
          </button>
        </div>
      </form>

      {attempts >= 5 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600 mb-2">Nice try! 😄</p>
            <p className="text-gray-600">Moving to next phase...</p>
          </div>
        </div>
      )}
    </div>
  );
}