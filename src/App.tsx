import React, { useState } from 'react';
import Disclaimer from './components/Disclaimer';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Phase3 from './components/Phase3';
import Phase4 from './components/Phase4';
import Phase5 from './components/Phase5';

type Phase = 'disclaimer' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5';

export default function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('disclaimer');
  const [showEscape, setShowEscape] = useState<boolean>(false);

  const nextPhase = () => {
    const phases: Phase[] = ['disclaimer', 'phase1', 'phase2', 'phase3', 'phase4', 'phase5'];
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
    }
  };

  const skipToEnd = () => {
    setCurrentPhase('phase5');
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase !== 'disclaimer' && currentPhase !== 'phase5') {
        setShowEscape(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {showEscape && currentPhase !== 'disclaimer' && currentPhase !== 'phase5' && (
        <button
          onClick={skipToEnd}
          className="fixed top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-lg z-50"
        >
          Emergency Exit 🚪
        </button>
      )}

      {currentPhase === 'disclaimer' && <Disclaimer onContinue={nextPhase} />}
      {currentPhase === 'phase1' && <Phase1 onComplete={nextPhase} />}
      {currentPhase === 'phase2' && <Phase2 onComplete={nextPhase} />}
      {currentPhase === 'phase3' && <Phase3 onComplete={nextPhase} />}
      {currentPhase === 'phase4' && <Phase4 onComplete={nextPhase} />}
      {currentPhase === 'phase5' && <Phase5 />}
    </div>
  );
}