import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Advisor from './components/Advisor';
import Features from './components/Features';
import LoanMarketplace from './components/LoanMarketplace';
import BusinessModel from './components/BusinessModel';
import SMSTracking from './components/SMSTracking';
import AgenticNavigator from './components/AgenticNavigator';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for opening agentic navigator (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsNavigatorOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Agentic Navigator - Smart AI-powered navigation */}
      <AgenticNavigator 
        currentView={currentView}
        onNavigate={handleNavigate}
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
      />

      <Navbar 
        currentView={currentView} 
        setCurrentView={handleNavigate}
        changeLanguage={changeLanguage}
        currentLanguage={i18n.language}
        onOpenNavigator={() => setIsNavigatorOpen(true)}
      />
      
      {currentView === 'hero' && <Hero setCurrentView={setCurrentView} />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'advisor' && <Advisor />}
      {currentView === 'features' && <Features />}
      {currentView === 'loans' && <LoanMarketplace />}
      {currentView === 'business' && <BusinessModel />}
      {currentView === 'sms' && <SMSTracking />}
      
      <Footer />
    </div>
  );
}

export default App;
