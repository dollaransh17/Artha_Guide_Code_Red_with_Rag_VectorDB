import { useTranslation } from 'react-i18next';

export default function Navbar({ currentView, setCurrentView, changeLanguage, currentLanguage, onOpenNavigator }) {
  const { t } = useTranslation();

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              A
            </div>
            <span className="text-2xl font-bold text-gray-900 glow-text">
              ArthaGuide
            </span>
          </div>
          <div className="hidden md:flex space-x-10">
            <button onClick={() => setCurrentView('hero')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_home')}</button>
            <button onClick={() => setCurrentView('sms')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_sms')}</button>
            <button onClick={() => setCurrentView('dashboard')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_dashboard')}</button>
            <button onClick={() => setCurrentView('advisor')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_advisor')}</button>
            <button onClick={() => setCurrentView('loans')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_loans')}</button>
            <button onClick={() => setCurrentView('business')} className="text-gray-600 hover:text-gray-900 font-medium transition">{t('nav_business')}</button>
          </div>
          <div className="flex items-center space-x-3">
            {/* Smart Navigation Button */}
            <button 
              onClick={onOpenNavigator}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg group"
              title="Smart Navigation (Cmd/Ctrl + K)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden lg:inline font-medium">{t('nav_smart')}</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-xs bg-white bg-opacity-20 rounded border border-white border-opacity-30">⌘K</kbd>
            </button>
            
            <button onClick={() => changeLanguage('en')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentLanguage === 'en' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>EN</button>
            <button onClick={() => changeLanguage('hi')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentLanguage === 'hi' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>हिं</button>
            <button onClick={() => changeLanguage('kn')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentLanguage === 'kn' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>ಕನ್ನಡ</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
