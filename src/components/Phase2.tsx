import React, { useState, useEffect } from 'react';

interface Phase2Props {
  onComplete: () => void;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export default function Phase2({ onComplete }: Phase2Props) {
  const [password, setPassword] = useState<string>('');
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { text: `Must contain at least 8 characters`, met: false },
    { text: `Must include an uppercase letter`, met: false },
    { text: `Must include a number`, met: false },
    { text: `Must include a special character`, met: false }
  ]);
  const [absurdRequirements, setAbsurdRequirements] = useState<PasswordRequirement[]>([]);
  const [showAbsurd, setShowAbsurd] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);

  const absurdOptions = [
    `Must contain the name of a Pokemon`,
    `Must include today's date in Roman numerals`,
    `Must spell a word backwards`,
    `Must include the answer to: What is 7 x 13?`,
    `Must contain an emoji 🎭`,
    `Must include the word 'please'`,
    `Must start with a vowel`,
    `Must end with the letter 'z'`,
    `Must be a palindrome`,
    `Must contain the current year`
  ];

  useEffect(() => {
    const newRequirements = [...requirements];
    newRequirements[0].met = password.length >= 8;
    newRequirements[1].met = /[A-Z]/.test(password);
    newRequirements[2].met = /[0-9]/.test(password);
    newRequirements[3].met = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setRequirements(newRequirements);

    if (showAbsurd) {
      const updatedAbsurd = absurdRequirements.map(req => ({
        ...req,
        met: password.toLowerCase().includes('pokemon') || 
             password.includes('91') || 
             password.toLowerCase().includes('please')
      }));
      setAbsurdRequirements(updatedAbsurd);
    }
  }, [password, showAbsurd, absurdRequirements]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allBasicMet = requirements.every(req => req.met);
    
    if (!allBasicMet) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!showAbsurd && attempts < 2) {
      setAttempts(prev => prev + 1);
      setShowAbsurd(true);
      
      const randomAbsurd = absurdOptions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(text => ({ text, met: false }));
      
      setAbsurdRequirements(randomAbsurd);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    onComplete();
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Phase 2: Password Chaos</h2>
        <p className="text-gray-600 text-sm">Meet ALL the requirements... we promise they won't change 🤞</p>
      </div>

      <form onSubmit={handleSubmit} className={shake ? 'animate-shake' : ''}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Create Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Enter your password"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <p className="font-semibold text-gray-700 mb-3">Password Requirements:</p>
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className={`text-lg ${req.met ? 'text-green-500' : 'text-red-500'}`}>
                {req.met ? '✓' : '✗'}
              </span>
              <span className={`text-sm ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                {req.text}
              </span>
            </div>
          ))}

          {showAbsurd && (
            <>
              <div className="border-t border-gray-300 my-3 pt-3">
                <p className="font-semibold text-purple-700 mb-2 text-sm">
                  Oh, and also... 😈
                </p>
              </div>
              {absurdRequirements.map((req, index) => (
                <div key={`absurd-${index}`} className="flex items-center space-x-2">
                  <span className={`text-lg ${req.met ? 'text-green-500' : 'text-red-500'}`}>
                    {req.met ? '✓' : '✗'}
                  </span>
                  <span className={`text-sm ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
        >
          Submit Password
        </button>

        {attempts > 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Attempts: {attempts}/2 (Keep trying!)
          </p>
        )}
      </form>
    </div>
  );
}