import React, { useState, useEffect } from 'react';

interface Phase4Props {
  onComplete: () => void;
}

export default function Phase4({ onComplete }: Phase4Props) {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>(`Initializing login sequence...`);
  const [stuck, setStuck] = useState<boolean>(false);

  const statusMessages = [
    `Connecting to server...`,
    `Authenticating credentials...`,
    `Verifying your identity...`,
    `Checking security protocols...`,
    `Establishing secure connection...`,
    `Validating session token...`,
    `Loading user profile...`,
    `Synchronizing data...`,
    `Almost there...`,
    `Just a moment...`,
    `Processing final checks...`,
    `99% complete...`
  ];

  useEffect(() => {
    if (progress < 99) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 15, 99);
          return newProgress;
        });

        const randomMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
        setStatus(randomMessage);
      }, 800);

      return () => clearInterval(interval);
    } else {
      setStuck(true);
      setStatus(`Loading... 99%`);
      
      const timer = setTimeout(() => {
        setProgress(100);
        setStatus(`Login successful! 🎉`);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Phase 4: The Eternal Wait</h2>
        <p className="text-gray-600 text-sm">Patience is a virtue... right? ⏳</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="animate-spin" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className="text-purple-600"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
                  transition: 'stroke-dashoffset 0.3s ease'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-center text-gray-700 font-medium">
            {status}
          </p>

          {stuck && (
            <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="text-yellow-900 text-sm text-center">
                ⚠️ System appears to be stuck at 99%...
                <br />
                <span className="text-xs">(This is intentional, don't worry!)</span>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Server connection: Active</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Security: Verified</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span>Progress: {stuck ? 'Mysteriously Stuck' : 'In Progress'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}