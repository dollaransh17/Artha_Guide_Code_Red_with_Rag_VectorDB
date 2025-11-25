import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { icon: '📱', title: t('feature_1_title'), desc: t('feature_1_desc'), color: 'bg-blue-100' },
    { icon: '🌐', title: t('feature_2_title'), desc: t('feature_2_desc'), color: 'bg-purple-100' },
    { icon: '🔮', title: t('feature_3_title'), desc: t('feature_3_desc'), color: 'bg-green-100' },
    { icon: '⭐', title: t('feature_4_title'), desc: t('feature_4_desc'), color: 'bg-yellow-100' }
  ];

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 fade-in-up overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-15 morphing-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-500 opacity-10 rotate-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t('features_title')}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
