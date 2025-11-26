import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_URL = 'https://backend-p00m9plyd-dollaransh17s-projects.vercel.app';

export default function Advisor() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [financialData, setFinancialData] = useState(null);

  // Load financial data from localStorage
  useEffect(() => {
    const data = localStorage.getItem('arthaguide_financial_data');
    if (data) {
      setFinancialData(JSON.parse(data));
    }
  }, []);

  // Quick suggestion buttons
  const quickQuestions = {
    en: [
      { text: "Am I eligible for a loan?", emoji: "💳" },
      { text: "How much can I borrow?", emoji: "💰" },
      { text: "Best loan for gig workers?", emoji: "🎯" },
      { text: "How to improve credit score?", emoji: "⭐" }
    ],
    hi: [
      { text: "क्या मैं ऋण के लिए पात्र हूं?", emoji: "💳" },
      { text: "मैं कितना उधार ले सकता हूं?", emoji: "💰" },
      { text: "गिग वर्कर्स के लिए सबसे अच्छा ऋण?", emoji: "🎯" },
      { text: "क्रेडिट स्कोर कैसे सुधारें?", emoji: "⭐" }
    ],
    kn: [
      { text: "ನಾನು ಸಾಲಕ್ಕೆ ಅರ್ಹನೇ?", emoji: "💳" },
      { text: "ನಾನು ಎಷ್ಟು ಸಾಲ ಪಡೆಯಬಹುದು?", emoji: "💰" },
      { text: "ಗಿಗ್ ವರ್ಕರ್‌ಗಳಿಗೆ ಉತ್ತಮ ಸಾಲ?", emoji: "🎯" },
      { text: "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಿಸುವುದು ಹೇಗೆ?", emoji: "⭐" }
    ]
  };

  const currentQuestions = quickQuestions[i18n.language] || quickQuestions.en;

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    
    try {
      // Detect language from user input
      const hasHindi = /[\u0900-\u097F]/.test(currentInput) || 
                      currentInput.toLowerCase().includes('mujhe') || 
                      currentInput.toLowerCase().includes('chahiye');
      const hasKannada = /[\u0C80-\u0CFF]/.test(currentInput) || 
                        currentInput.toLowerCase().includes('nanu') || 
                        currentInput.toLowerCase().includes('beku');
      
      const responseLang = hasHindi ? 'hi' : hasKannada ? 'kn' : i18n.language;
      
      // Add financial context to the message if available
      let contextualMessage = currentInput;
      if (financialData) {
        contextualMessage = `User's Financial Profile:
- Monthly Income: ₹${financialData.monthlyIncome.toLocaleString()}
- Monthly Expenses: ₹${financialData.monthlyExpenses.toLocaleString()}
- Monthly Savings: ₹${financialData.monthlySavings.toLocaleString()}
- Health Score: ${financialData.healthScore.toFixed(0)}/100

User Query: ${currentInput}`;
      }
      
      // Call backend API
      const response = await axios.post(`${API_URL}/api/advisor/chat`, {
        message: contextualMessage,
        language: responseLang
      });
      
      const botResponse = response.data.response;
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: botResponse, 
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setIsTyping(false);
      
    } catch (error) {
      console.error('Error calling AI advisor:', error);
      
      const fallbackResponses = {
        en: "💬 I'm having trouble connecting right now. Please try again in a moment!",
        hi: "💬 मुझे अभी कनेक्ट करने में परेशानी हो रही है। कृपया एक क्षण में पुनः प्रयास करें!",
        kn: "💬 ನನಗೆ ಈಗ ಸಂಪರ್ಕಿಸಲು ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!"
      };
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: fallbackResponses[i18n.language] || fallbackResponses.en,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    handleSend();
  };

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 fade-in-up overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-25 morphing-blob"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-20 wave-animation"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">🤖 Multilingual Loan Advisor</h2>
          <p className="text-xl text-gray-600">AI-powered financial advice in your language</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">🤖</div>
              <div>
                <h3 className="font-bold text-lg">ArthaGuide AI Advisor</h3>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online • Replies in {i18n.language === 'en' ? 'English' : i18n.language === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ'}</span>
                </div>
              </div>
            </div>
            <div className="text-3xl">🌐</div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 && (
              <div className="text-center mt-16">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-xl text-gray-600 mb-6">
                  {i18n.language === 'en' ? 'Start a conversation!' : i18n.language === 'hi' ? 'बातचीत शुरू करें!' : 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ!'}
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {currentQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.text)}
                      className="bg-blue-50 hover:bg-blue-100 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium transition transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>{q.emoji}</span>
                      <span>{q.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} slide-up`}>
                <div className={`max-w-md ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 'bg-white text-gray-800 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-lg border border-gray-100'} px-5 py-4`}>
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-lg px-5 py-4 border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('chat_placeholder')}
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {t('send')} ➡️
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-3">🌐</div>
            <h4 className="font-bold text-lg mb-2">
              {i18n.language === 'en' ? '3 Languages' : i18n.language === 'hi' ? '3 भाषाएँ' : '3 ಭಾಷೆಗಳು'}
            </h4>
            <p className="text-sm opacity-90">
              {i18n.language === 'en' ? 'English, Hindi, Kannada support' : i18n.language === 'hi' ? 'अंग्रेजी, हिंदी, कन्नड़ समर्थन' : 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಕನ್ನಡ ಬೆಂಬಲ'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-lg mb-2">
              {i18n.language === 'en' ? 'Instant Advice' : i18n.language === 'hi' ? 'तुरंत सलाह' : 'ತತ್ಕಾಲ ಸಲಹೆ'}
            </h4>
            <p className="text-sm opacity-90">
              {i18n.language === 'en' ? 'Get answers in seconds, 24/7' : i18n.language === 'hi' ? 'सेकंड में जवाब, 24/7' : 'ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉತ್ತರಗಳು, 24/7'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-bold text-lg mb-2">
              {i18n.language === 'en' ? 'Private & Secure' : i18n.language === 'hi' ? 'निजी और सुरक्षित' : 'ಖಾಸಗಿ & ಸುರಕ್ಷಿತ'}
            </h4>
            <p className="text-sm opacity-90">
              {i18n.language === 'en' ? 'Your data is encrypted & safe' : i18n.language === 'hi' ? 'आपका डेटा एन्क्रिप्टेड और सुरक्षित है' : 'ನಿಮ್ಮ ಡೇಟಾ ೦ನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ & ಸುರಕ್ಷಿತ'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}