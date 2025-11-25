import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Advisor() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('eligible') || lowerInput.includes('पात्र') || lowerInput.includes('ಅರ್ಹ')) {
        botResponse = i18n.language === 'en'
          ? "✅ Yes! Based on your ₹45,000 monthly income and ₹32,000 expenses, you're eligible for loans up to ₹2,00,000.\n\n📊 Your eligibility score: 72/100\n💡 You can safely borrow up to ₹50,000 without financial stress."
          : i18n.language === 'hi'
          ? "✅ हां! आपकी ₹45,000 मासिक आय और ₹32,000 खर्चों के आधार पर, आप ₹2,00,000 तक के ऋण के लिए पात्र हैं।\n\n📊 आपका पात्रता स्कोर: 72/100\n💡 आप बिना वित्तीय तनाव के ₹50,000 तक सुरक्षित रूप से उधार ले सकते हैं।"
          : "✅ ಹೌದು! ನಿಮ್ಮ ₹45,000 ಮಾಸಿಕ ಆದಾಯ ಮತ್ತು ₹32,000 ವೆಚ್ಚಗಳ ಆಧಾರದ ಮೇಲೆ, ನೀವು ₹2,00,000 ವರೆಗೆ ಸಾಲಕ್ಕೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ.\n\n📊 ನಿಮ್ಮ ಅರ್ಹತೆ ಸ್ಕೋರ್: 72/100\n💡 ನೀವು ಹಣಕಾಸಿನ ಒತ್ತಡವಿಲ್ಲದೆ ₹50,000 ವರೆಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಸಾಲ ಪಡೆಯಬಹುದು.";
      } else if (lowerInput.includes('borrow') || lowerInput.includes('उधार') || lowerInput.includes('ಸಾಲ')) {
        botResponse = i18n.language === 'en'
          ? "💰 You can borrow between ₹20,000 to ₹2,00,000.\n\n🏆 Recommended amount: ₹50,000\n📅 Suggested tenure: 12-18 months\n💵 EMI: ₹4,200-4,500/month\n\n🏦 Best lenders: MoneyTap (13% APR), PaySense (16% APR)"
          : i18n.language === 'hi'
          ? "💰 आप ₹20,000 से ₹2,00,000 तक उधार ले सकते हैं।\n\n🏆 अनुशंसित राशि: ₹50,000\n📅 सुझाई गई अवधि: 12-18 महीने\n💵 EMI: ₹4,200-4,500/माह\n\n🏦 सर्वश्रेष्ठ ऋणदाता: MoneyTap (13% APR), PaySense (16% APR)"
          : "💰 ನೀವು ₹20,000 ರಿಂದ ₹2,00,000 ವರೆಗೆ ಸಾಲ ಪಡೆಯಬಹುದು.\n\n🏆 ಶಿಫಾರಸು ಮೊತ್ತ: ₹50,000\n📅 ಸೂಚಿಸಿದ ಅವಧಿ: 12-18 ತಿಂಗಳುಗಳು\n💵 EMI: ₹4,200-4,500/ತಿಂಗಳು\n\n🏦 ಉತ್ತಮ ಸಾಲದಾತರು: MoneyTap (13% APR), PaySense (16% APR)";
      } else if (lowerInput.includes('credit') || lowerInput.includes('score') || lowerInput.includes('स्कोर') || lowerInput.includes('ಸ್ಕೋರ್')) {
        botResponse = i18n.language === 'en'
          ? "⭐ Tips to improve your credit score:\n\n1️⃣ Pay all EMIs on time (most important!)\n2️⃣ Keep credit utilization below 30%\n3️⃣ Don't apply for multiple loans at once\n4️⃣ Maintain older credit accounts\n5️⃣ Check credit report regularly for errors\n\n📈 Your current financial health: 72/100 - Good!"
          : i18n.language === 'hi'
          ? "⭐ अपना क्रेडिट स्कोर सुधारने के टिप्स:\n\n1️⃣ सभी EMI समय पर भुगतान करें (सबसे महत्वपूर्ण!)\n2️⃣ क्रेडिट उपयोग 30% से कम रखें\n3️⃣ एक साथ कई ऋणों के लिए आवेदन न करें\n4️⃣ पुराने क्रेडिट खाते बनाए रखें\n5️⃣ त्रुटियों के लिए नियमित रूप से क्रेडिट रिपोर्ट जांचें\n\n📈 आपका वर्तमान वित्तीय स्वास्थ्य: 72/100 - अच्छा!"
          : "⭐ ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಿಸಲು ಸಲಹೆಗಳು:\n\n1️⃣ ಎಲ್ಲಾ EMI ಗಳನ್ನು ಸಮಯಕ್ಕೆ ಪಾವತಿಸಿ (ಅತ್ಯಂತ ಮುಖ್ಯ!)\n2️⃣ ಕ್ರೆಡಿಟ್ ಬಳಕೆಯನ್ನು 30% ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಿಸಿ\n3️⃣ ಏಕಕಾಲದಲ್ಲಿ ಹಲವು ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಡಿ\n4️⃣ ಹಳೆಯ ಕ್ರೆಡಿಟ್ ಖಾತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ\n5️⃣ ದೋಷಗಳಿಗಾಗಿ ನಿಯಮಿತವಾಗಿ ಕ್ರೆಡಿಟ್ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ\n\n📈 ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹಣಕಾಸು ಆರೋಗ್ಯ: 72/100 - ಉತ್ತಮ!";
      } else if (lowerInput.includes('save') || lowerInput.includes('savings') || lowerInput.includes('बचत') || lowerInput.includes('ಉಳಿತಾಯ')) {
        botResponse = i18n.language === 'en'
          ? "💡 Smart Savings Tips:\n\n✅ You're saving ₹13,000/month (29%) - Great job!\n\n📌 Recommendations:\n• Set up auto-debit SIP for ₹3,000/month\n• Emergency fund target: ₹1,35,000 (3 months expenses)\n• Consider flexi deposits for better returns\n\n🎯 If you save ₹15k/month, you'll have ₹1.8L in 1 year!"
          : i18n.language === 'hi'
          ? "💡 स्मार्ट बचत टिप्स:\n\n✅ आप ₹13,000/माह (29%) बचा रहे हैं - बढ़िया काम!\n\n📌 सिफारिशें:\n• ₹3,000/माह के लिए ऑटो-डेबिट SIP सेट करें\n• आपातकालीन फंड लक्ष्य: ₹1,35,000 (3 महीने के खर्च)\n• बेहतर रिटर्न के लिए फ्लेक्सी डिपॉजिट पर विचार करें\n\n🎯 यदि आप ₹15k/माह बचाते हैं, तो 1 साल में आपके पास ₹1.8L होंगे!"
          : "💡 ಬುದ್ಧಿವಂತ ಉಳಿತಾಯ ಸಲಹೆಗಳು:\n\n✅ ನೀವು ₹13,000/ತಿಂಗಳು (29%) ಉಳಿಸುತ್ತಿದ್ದೀರಿ - ಅದ್ಭುತ!\n\n📌 ಶಿಫಾರಸುಗಳು:\n• ₹3,000/ತಿಂಗಳಿಗೆ ಆಟೋ-ಡೆಬಿಟ್ SIP ಹೊಂದಿಸಿ\n• ತುರ್ತು ನಿಧಿ ಗುರಿ: ₹1,35,000 (3 ತಿಂಗಳ ವೆಚ್ಚಗಳು)\n• ಉತ್ತಮ ಆದಾಯಕ್ಕಾಗಿ ಫ್ಲೆಕ್ಸಿ ಠೇವಣಿಗಳನ್ನು ಪರಿಗಣಿಸಿ\n\n🎯 ನೀವು ₹15k/ತಿಂಗಳು ಉಳಿಸಿದರೆ, 1 ವರ್ಷದಲ್ಲಿ ನೀವು ₹1.8L ಹೊಂದಿರುತ್ತೀರಿ!";
      } else {
        botResponse = i18n.language === 'en'
          ? "👋 Hello! I'm your AI financial advisor.\n\nI can help you with:\n✅ Loan eligibility & recommendations\n✅ Borrowing limits & EMI calculations\n✅ Credit score improvement tips\n✅ Savings & investment advice\n\n💬 Ask me anything in English, Hindi, or Kannada!"
          : i18n.language === 'hi'
          ? "👋 नमस्ते! मैं आपका AI वित्तीय सलाहकार हूं।\n\nमैं आपकी मदद कर सकता हूं:\n✅ ऋण पात्रता और सिफारिशें\n✅ उधार सीमा और EMI गणना\n✅ क्रेडिट स्कोर सुधार टिप्स\n✅ बचत और निवेश सलाह\n\n💬 मुझसे अंग्रेजी, हिंदी या कन्नड़ में कुछ भी पूछें!"
          : "👋 ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಹಣಕಾಸು ಸಲಹೆಗಾರ.\n\nನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:\n✅ ಸಾಲ ಅರ್ಹತೆ ಮತ್ತು ಶಿಫಾರಸುಗಳು\n✅ ಸಾಲದ ಮಿತಿಗಳು ಮತ್ತು EMI ಲೆಕ್ಕಾಚಾರಗಳು\n✅ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಣೆ ಸಲಹೆಗಳು\n✅ ಉಳಿತಾಯ ಮತ್ತು ಹೂಡಿಕೆ ಸಲಹೆ\n\n💬 ನನ್ನನ್ನು ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ!";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
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