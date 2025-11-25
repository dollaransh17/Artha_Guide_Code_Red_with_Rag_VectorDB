import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Advisor from './components/Advisor';
import Features from './components/Features';
import LoanMarketplace from './components/LoanMarketplace';
import BusinessModel from './components/BusinessModel';
import SMSTracking from './components/SMSTracking';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        changeLanguage={changeLanguage}
        currentLanguage={i18n.language}
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
