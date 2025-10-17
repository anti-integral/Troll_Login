import React, { useState, useEffect } from 'react';

interface Phase3Props {
  onComplete: () => void;
}

export default function Phase3({ onComplete }: Phase3Props) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [captchaText, setCaptchaText] = useState<string>(`Select all images with traffic lights`);
  const [images, setImages] = useState<number[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [shake, setShake] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const captchaOptions = [
    `Select all images with traffic lights`,
    `Select all images with bicycles`,
    `Select all squares containing a bus`,
    `Select all images with crosswalks`,
    `Select all images with fire hydrants`,
    `Select all images with stairs`,
    `Select all images with chimneys`
  ];

  const trollResponses = [
    `Wrong! Actually, we changed our mind. Try again.`,
    `Close! But not quite. The system detected hesitation.`,
    `Error: Your mouse movement pattern looks suspicious.`,
    `Incorrect. Please select images more confidently.`,
    `Try again. This time, think outside the box.`
  ];

  useEffect(() => {
    setImages(Array.from({ length: 9 }, (_, i) => i));
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedImage === null) {
      setErrorMessage(`Please select an image first!`);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (attempts < 3) {
      const randomResponse = trollResponses[Math.floor(Math.random() * trollResponses.length)];
      const randomCaptcha = captchaOptions[Math.floor(Math.random() * captchaOptions.length)];
      
      setErrorMessage(randomResponse);
      setCaptchaText(randomCaptcha);
      setAttempts(prev => prev + 1);
      setSelectedImage(null);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      setImages(Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5));
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Phase 3: CAPTCHA Hell</h2>
        <p className="text-gray-600 text-sm">Prove you're human... or are you? 🤖</p>
      </div>

      <form onSubmit={handleSubmit} className={shake ? 'animate-shake' : ''}>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-700 text-center mb-4">
            {captchaText}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleImageClick(index)}
                className={`aspect-square rounded-lg overflow-hidden border-4 transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 scale-95'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img
                  src={`https://picsum.photos/150/150?random=${img + attempts * 10}`}
                  alt={`CAPTCHA option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
              <p className="text-red-700 text-sm font-medium">
                ❌ {errorMessage}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="not-robot"
              className="w-5 h-5 text-blue-600 rounded"
              defaultChecked
            />
            <label htmlFor="not-robot">I'm not a robot</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
        >
          Verify
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Attempts: {attempts}/3 (You can do it!)
        </p>
      </form>
    </div>
  );
}