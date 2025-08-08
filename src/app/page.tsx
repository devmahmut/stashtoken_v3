'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export default function Home() {
  const tokenomicsRef = useRef<HTMLHeadingElement>(null);
  const roadMapRef = useRef<HTMLHeadingElement>(null);
  const faqRef = useRef<HTMLHeadingElement>(null);

  // FAQ state management
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // About section state management
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
  };

  // Tokenomics section state management
  const [selectedTokenomics, setSelectedTokenomics] = useState<number>(0);

  const handleTokenomicsClick = (index: number) => {
    setSelectedTokenomics(index);
  };

  // Tokenomics data
  const tokenomicsData = [
    {
      id: 0,
      title: "LP Locked",
      percentage: "10%",
      color: "orange",
      description: "Liquidity tokens are locked for security purposes to ensure investor protection and prevent sudden exits, maintaining market stability.",
      features: [
        "12 month lock period",
        "Automatic burn mechanism", 
        "Transparent tracking"
      ],
      lottieUrl: "https://lottie.host/fdc620cd-e2b3-4400-ad96-21808383cad5/KMw0pZvIgP.lottie",
      lottiePosition: "top-right"
    },
    {
      id: 1,
      title: "Treasury",
      percentage: "25%",
      color: "blue",
      description: "Project treasury reserved for future development, marketing activities and unexpected situations with transparent community governance.",
      features: [
        "Community voting system",
        "Monthly spending reports",
        "Development funding"
      ],
      lottieUrl: "https://lottie.host/fe789609-cfdb-4992-916a-2ed382c40301/idn89VXhVz.lottie",
      lottiePosition: "center-right"
    },
    {
      id: 2,
      title: "Community & Charity",
      percentage: "50%",
      color: "green",
      description: "Half of the token supply dedicated to community activities and charitable causes, creating positive social impact and engagement.",
      features: [
        "Charity partnerships",
        "Community events",
        "Social impact initiatives"
      ],
      lottieUrl: "https://lottie.host/c886444b-660b-48f1-9f75-dc3c842307f0/w3WV283wra.lottie",
      lottiePosition: "bottom-right"
    },
    {
      id: 3,
      title: "CEX Listing",
      percentage: "15%",
      color: "purple",
      description: "Funds allocated for centralized exchange listings, covering fees and marketing activities required for major exchange placement.",
      features: [
        "Tier-1 exchange targets",
        "Listing fee coverage",
        "Market making support"
      ]
    }
  ];

  // Video data for features (şimdilik aynı video)
  const featureVideos = [
    "/banner-video.mp4", // Feature 1 video
    "/banner-video.mp4", // Feature 2 video  
    "/banner-video.mp4"  // Feature 3 video
  ];

  // Roadmap data
  const roadmapData = [
    {
      id: 1,
      title: "Stage 1: Conceptualization",
      color: "cyan",
      tasks: [
        "Market Research & Analysis",
        "Core Team Formation",
        "Whitepaper Development",
        "Legal & Compliance Setup",
        "Community Building"
      ]
    },
    {
      id: 2,
      title: "Stage 2: Development",
      color: "green",
      tasks: [
        "Smart Contract Development",
        "Platform Architecture",
        "Security Audit & Testing",
        "Beta Version Launch",
        "Bug Fixes & Optimization"
      ]
    },
    {
      id: 3,
      title: "Stage 3: Launch",
      color: "purple",
      tasks: [
        "Token Sale Event",
        "Exchange Listing",
        "Mainnet Deployment",
        "Marketing Campaign",
        "Public Release"
      ]
    },
    {
      id: 4,
      title: "Stage 4: Growth",
      color: "orange",
      tasks: [
        "Strategic Partnerships",
        "Ecosystem Expansion",
        "New Feature Development",
        "Global Market Adoption",
        "Sustainability Initiatives"
      ]
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "Stashtoken nedir?",
      answer: "Stashtoken, Ethereum blockchain'i üzerinde çalışan yenilikçi bir kripto para cüzdanı ve ekosistemidir. Kullanıcıların dijital varlıklarını güvenli bir şekilde saklayıp yönetmelerini sağlar."
    },
    {
      question: "Stashtoken nasıl çalışır?",
      answer: "Stashtoken, akıllı kontratlar kullanarak güvenli ve şeffaf işlemler sunar. Platform, DeFi protokolleri ile entegre çalışarak kullanıcılara çoklu finansal hizmetler sağlar."
    },
    {
      question: "Nasıl başlarım?",
      answer: "Başlamak için web sitemizden ücretsiz bir hesap oluşturabilirsiniz. Cüzdanınızı kurduktan sonra, token satın alabilir ve platformumuzun tüm özelliklerinden yararlanabilirsiniz."
    },
    {
      question: "Stashtoken'ı farklı kılan nedir?",
      answer: "Gelişmiş güvenlik özellikleri, kullanıcı dostu arayüz, düşük işlem ücretleri ve kapsamlı DeFi entegrasyonu ile Stashtoken, piyasadaki en avantajlı çözümlerden biridir."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Boyut ayarlama fonksiyonları
    const adjustTokenomicsSize = () => {
      if (tokenomicsRef.current) {
        const container = tokenomicsRef.current.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const textWidth = tokenomicsRef.current.scrollWidth;
          const scale = containerWidth / textWidth;
          tokenomicsRef.current.style.transform = `scaleX(${scale})`;
        }
      }
    };

    const adjustRoadMapSize = () => {
      if (roadMapRef.current) {
        const container = roadMapRef.current.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const textWidth = roadMapRef.current.scrollWidth;
          const scale = containerWidth / textWidth;
          roadMapRef.current.style.transform = `scaleX(${scale})`;
        }
      }
    };

    const adjustFaqSize = () => {
      if (faqRef.current) {
        const container = faqRef.current.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const textWidth = faqRef.current.scrollWidth;
          const scale = containerWidth / textWidth;
          faqRef.current.style.transform = `scaleX(${scale})`;
        }
      }
    };

    // Tokenomics başlık animasyonu ve boyut ayarlama
    if (tokenomicsRef.current) {
      const text = tokenomicsRef.current.textContent || '';
      tokenomicsRef.current.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100px)';
        tokenomicsRef.current?.appendChild(span);
      });

      // İlk ayarlama
      setTimeout(adjustTokenomicsSize, 100);
      
      // Resize olayında tekrar ayarla
      window.addEventListener('resize', adjustTokenomicsSize);
      window.addEventListener('resize', adjustRoadMapSize);
      window.addEventListener('resize', adjustFaqSize);

      gsap.to(tokenomicsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: tokenomicsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Cleanup fonksiyonu - tüm event listener'ları temizle
      return () => {
        window.removeEventListener('resize', adjustTokenomicsSize);
        window.removeEventListener('resize', adjustRoadMapSize);
        window.removeEventListener('resize', adjustFaqSize);
      };
    }

    // Road Map ScrambleText animasyonu ve boyut ayarlama
    if (roadMapRef.current) {
      // Başlangıçta scrambled text ile başla
      const roadElement = roadMapRef.current.querySelector('.road-text');
      const mapElement = roadMapRef.current.querySelector('.map-text');
      
      if (roadElement && mapElement) {
        roadElement.textContent = 'XZQRMBTKLWPFGHYUJNM';
        mapElement.textContent = 'YBPWKLZXCVBNMASDFGH';
        
        // İlk ayarlama
        setTimeout(adjustRoadMapSize, 100);
        
        gsap.timeline({
          scrollTrigger: {
            trigger: roadMapRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        })
        .to(roadElement, {
          duration: 4,
          text: "ROAD",
          ease: "none",
          onComplete: adjustRoadMapSize
        })
        .to(mapElement, {
          duration: 4,
          text: "MAP", 
          ease: "none",
          onComplete: adjustRoadMapSize
        }, "-=3");
      }
    }

    // FAQ ScrambleText animasyonu ve boyut ayarlama
    if (faqRef.current) {
      // Başlangıçta scrambled text ile başla
      faqRef.current.textContent = 'XQZMWBFGH';
      
      // İlk ayarlama
      setTimeout(adjustFaqSize, 100);
      
      gsap.timeline({
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
      .to(faqRef.current, {
        duration: 3,
        text: "FAQ",
        ease: "none",
        onComplete: adjustFaqSize
      });
    }


  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Sol Lottie Animasyonu */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-64 h-64 lg:w-80 lg:h-80">
              <DotLottieReact
                src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* Orta İçerik */}
          <div className="text-center order-1 lg:order-2 flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your favorite crypto wallet.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Explore Ethereum with the best wallet for iOS. 
              Interacting with crypto has never been so simple.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors text-lg">
              Get Started
            </button>
          </div>

          {/* Sağ Lottie Animasyonu */}
          <div className="flex justify-center order-3">
            <div className="w-64 h-64 lg:w-80 lg:h-80">
              <DotLottieReact
                src="https://lottie.host/8cf549cb-0515-4ad7-a147-9cb5a1ffb170/GhdwQxyWKJ.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-20 w-full">
          <video 
            className="w-full h-auto rounded-lg shadow-lg aspect-video object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/banner-video.mp4" type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </div>

      {/* About StashToken Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Sol - Başlıklar */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">About StashToken</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                How StashToken Works.
              </h2>
            </div>
            
            {/* Sağ - Açıklama */}
            <div className="flex items-end">
              <p className="text-xl text-gray-600">
                Create powerful AI workflows that solve real problems in minutes, not days.
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-4 gap-16 items-stretch min-h-[600px]">
            {/* Sol taraf - Video */}
            <div className="order-2 lg:order-1 lg:col-span-3 flex items-center">
              <video 
                key={selectedFeature} // Key ile video'yu yeniden render et
                className="w-full h-auto rounded-lg shadow-xl aspect-video object-cover transition-all duration-500" 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src={featureVideos[selectedFeature]} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            </div>

            {/* Sağ taraf - Features */}
            <div className="order-1 lg:order-2 lg:col-span-1 flex flex-col justify-center space-y-4">
              {/* Feature 1 */}
              <div 
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedFeature === 0 ? 'border-2 border-orange-400' : 'border-2 border-transparent'
                }`}
                onClick={() => handleFeatureClick(0)}
              >
                {/* Kısa çizgi */}
                <div className="w-16 h-px bg-gray-200 mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Start With Your Knowledge
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Import your existing notes and start fresh. Every idea becomes a node on your infinite canvas. Write in markdown, add images, organize visually.
                </p>
              </div>

              {/* Feature 2 */}
              <div 
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedFeature === 1 ? 'border-2 border-orange-400' : 'border-2 border-transparent'
                }`}
                onClick={() => handleFeatureClick(1)}
              >
                {/* Kısa çizgi */}
                <div className="w-16 h-px bg-gray-200 mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Connect Your Thoughts
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Draw connections between related ideas. Each link preserves context, building a knowledge graph that mirrors how you actually think.
                </p>
              </div>

              {/* Feature 3 */}
              <div 
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedFeature === 2 ? 'border-2 border-orange-400' : 'border-2 border-transparent'
                }`}
                onClick={() => handleFeatureClick(2)}
              >
                {/* Kısa çizgi */}
                <div className="w-16 h-px bg-gray-200 mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Amplify with AI
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Every node is AI-powered. Generate new insights, expand concepts, or synthesize connected ideas. The AI understands your entire context chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="w-full flex items-center justify-center py-8 overflow-hidden">
            <h2 
              ref={tokenomicsRef}
              className="text-gray-900 text-center leading-none uppercase whitespace-nowrap"
              style={{ 
                fontSize: '8rem',
                transform: 'scaleX(1)',
                transformOrigin: 'center',
                letterSpacing: '-0.02em',
                width: 'fit-content'
              }}
            >
              Tokenomics
            </h2>
          </div>

          {/* Interactive Tokenomics Content */}
          <div className="mt-16">
            <div className="grid lg:grid-cols-4 gap-8 items-stretch">
              {/* Sol taraf - Navigation Tabs */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-2 h-full">
                  {tokenomicsData.map((item, index) => {
                    const colorClasses = {
                      orange: {
                        active: 'border-orange-500 bg-orange-50 shadow-lg',
                        inactive: 'border-gray-200 hover:border-orange-500 hover:bg-orange-50',
                        dot: 'bg-orange-500',
                        text: 'text-orange-600'
                      },
                      blue: {
                        active: 'border-blue-500 bg-blue-50 shadow-lg',
                        inactive: 'border-gray-200 hover:border-blue-500 hover:bg-blue-50',
                        dot: 'bg-blue-500',
                        text: 'text-blue-600'
                      },
                      green: {
                        active: 'border-green-500 bg-green-50 shadow-lg',
                        inactive: 'border-gray-200 hover:border-green-500 hover:bg-green-50',
                        dot: 'bg-green-500',
                        text: 'text-green-600'
                      },
                      purple: {
                        active: 'border-purple-500 bg-purple-50 shadow-lg',
                        inactive: 'border-gray-200 hover:border-purple-500 hover:bg-purple-50',
                        dot: 'bg-purple-500',
                        text: 'text-purple-600'
                      }
                    };
                    
                    const classes = colorClasses[item.color as keyof typeof colorClasses];
                    
                    return (
                      <div 
                        key={item.id}
                        className={`group cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedTokenomics === index ? classes.active : classes.inactive
                        }`}
                        onClick={() => handleTokenomicsClick(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 ${classes.dot} rounded-full`}></div>
                          <div>
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <p className={`text-2xl font-bold ${classes.text}`}>{item.percentage}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sağ taraf - Content Area */}
              <div className="lg:col-span-3">
                {(() => {
                  const currentData = tokenomicsData[selectedTokenomics];
                  const contentClasses = {
                    orange: {
                      background: 'bg-gradient-to-br from-orange-50 to-orange-100',
                      border: 'border-orange-200',
                      iconBg: 'bg-orange-500',
                      text: 'text-orange-600',
                      dotBg: 'bg-orange-500'
                    },
                    blue: {
                      background: 'bg-gradient-to-br from-blue-50 to-blue-100',
                      border: 'border-blue-200',
                      iconBg: 'bg-blue-500',
                      text: 'text-blue-600',
                      dotBg: 'bg-blue-500'
                    },
                    green: {
                      background: 'bg-gradient-to-br from-green-50 to-green-100',
                      border: 'border-green-200',
                      iconBg: 'bg-green-500',
                      text: 'text-green-600',
                      dotBg: 'bg-green-500'
                    },
                    purple: {
                      background: 'bg-gradient-to-br from-purple-50 to-purple-100',
                      border: 'border-purple-200',
                      iconBg: 'bg-purple-500',
                      text: 'text-purple-600',
                      dotBg: 'bg-purple-500'
                    }
                  };
                  
                                     const classes = contentClasses[currentData.color as keyof typeof contentClasses];
                   
                   // Lottie positioning function
                   const getLottiePositionStyles = (position: string) => {
                     switch (position) {
                       case 'top-right':
                         return { top: '-208px', right: '0', zIndex: 1 };
                       case 'center-right':
                         return { bottom: '-78px', right: '0', zIndex: 1 };
                       case 'bottom-right':
                         return { bottom: '-99px', right: '0', zIndex: 1 };
                       case 'center':
                         return { display: 'none' }; // 4. lottie olmayacak
                       default:
                         return { top: '50%', right: '32px', transform: 'translateY(-50%)', zIndex: 1 };
                     }
                   };
                   
                   return (
                     <div className={`${classes.background} rounded-2xl p-8 border ${classes.border} transition-all duration-500 relative min-h-[400px]`}>
                       <div className="flex items-center space-x-4 mb-6">
                         <div className={`w-8 h-8 ${classes.iconBg} rounded-full flex items-center justify-center`}>
                           <div className="w-4 h-4 bg-white rounded-full"></div>
                         </div>
                         <div>
                           <h3 className="text-2xl font-bold text-gray-900">{currentData.title}</h3>
                           <p className={`${classes.text} font-semibold`}>{currentData.percentage} of Total Supply</p>
                         </div>
                       </div>
                      
                                             <div className="grid md:grid-cols-2 gap-6">
                         <div>
                           <h4 className="font-bold text-gray-900 mb-3">Description</h4>
                           <p className="text-gray-700 leading-relaxed">
                             {currentData.description}
                           </p>
                         </div>
                         
                         <div>
                           <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
                          <div className="space-y-2">
                            {currentData.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 ${classes.dotBg} rounded-full`}></div>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                                               </div>
                         
                                                  {/* Lottie Animation */}
                         {currentData.lottieUrl && currentData.lottiePosition && (
                           <div 
                             className="absolute pointer-events-none"
                             style={getLottiePositionStyles(currentData.lottiePosition)}
                           >
                             <div className="w-48 h-48 lg:w-64 lg:h-64">
                               <DotLottieReact
                                 src={currentData.lottieUrl}
                                 loop
                                 autoplay
                               />
                             </div>
                           </div>
                         )}

                       </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Road Map Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Sol taraf - Road Map başlığı */}
            <div className="text-left overflow-hidden">
              <h2 
                ref={roadMapRef}
                className="text-gray-900 leading-none uppercase whitespace-nowrap"
                style={{ 
                  fontSize: '8rem',
                  transform: 'scaleX(1)',
                  transformOrigin: 'left',
                  letterSpacing: '-0.02em',
                  width: 'fit-content'
                }}
              >
                <div className="road-text">Road</div>
                <div className="map-text">Map</div>
              </h2>
            </div>

            {/* Sağ taraf - Lottie Animasyonu */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 lg:w-96 lg:h-96">
                <DotLottieReact
                  src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>

          {/* Modern Road Map Cards */}
          <div className="mt-20">
            {/* Desktop 2x2 Grid */}
            <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8">
              {roadmapData.map((stage, index) => {
                const colorConfig = {
                  cyan: { bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-200', text: 'text-cyan-600', icon: 'bg-cyan-500' },
                  green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-600', icon: 'bg-green-500' },
                  purple: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'bg-purple-500' },
                  orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'bg-orange-500' }
                };
                
                const config = colorConfig[stage.color as keyof typeof colorConfig];
                
                return (
                  <div 
                    key={stage.id}
                    className={`bg-gradient-to-br ${config.bg} border ${config.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group opacity-0 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 ${config.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{stage.id}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {stage.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 ${config.icon} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipeable Carousel */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide">
                {roadmapData.map((stage, index) => {
                  const colorConfig = {
                    cyan: { bg: 'from-cyan-50 to-blue-50', border: 'border-cyan-200', text: 'text-cyan-600', icon: 'bg-cyan-500' },
                    green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-600', icon: 'bg-green-500' },
                    purple: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'bg-purple-500' },
                    orange: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'bg-orange-500' }
                  };
                  
                  const config = colorConfig[stage.color as keyof typeof colorConfig];
                  
                  return (
                    <div 
                      key={stage.id}
                      className={`bg-gradient-to-br ${config.bg} border ${config.border} rounded-2xl p-6 min-w-[300px] snap-center flex-shrink-0`}
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-12 h-12 ${config.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white font-bold text-lg">{stage.id}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {stage.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 ${config.icon} rounded-full mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-700 text-sm font-medium leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              
              {/* Mobile scroll indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {roadmapData.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

             {/* FAQ Section */}
       <div className="bg-white py-20">
         <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Sol taraf - FAQ Başlık */}
            <div className="space-y-6 overflow-hidden">
              <p className="text-gray-600 text-lg font-medium">Curious mind asks</p>
              <h2 
                ref={faqRef}
                className="text-gray-900 uppercase leading-none whitespace-nowrap"
                style={{ 
                  fontSize: '8rem',
                  transform: 'scaleX(1)',
                  transformOrigin: 'left',
                  letterSpacing: '-0.02em',
                  width: 'fit-content'
                }}
              >
                FAQ
              </h2>
            </div>

            {/* Sağ taraf - FAQ Öğeleri */}
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-500 transition-colors">
                        <span className="text-gray-600 text-xl transition-transform duration-200">
                          {openFaq === index ? '−' : '+'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Açılır İçerik */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                     </div>
         </div>
       </div>

                       {/* Footer Section */}
        <footer className="bg-white py-20">
          {/* Ana Footer İçerik - Main genişliğinde */}
          <div className="text-center mb-16 px-6">
            <h1 className="text-[8vw] lg:text-[10vw] xl:text-[12vw] font-bold text-gray-900 leading-tight">
              We connect.
            </h1>
          </div>

          {/* Alt Kısım - Logo ve Sosyal Medya */}
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-300 pt-12">
              {/* Sol taraf - Logo (navbar ile aynı) */}
              <div className="mb-8 lg:mb-0">
                <span className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-dela-gothic-one)', fontWeight: '400' }}>Stashtoken</span>
              </div>

              {/* Sağ taraf - Sosyal Medya İkonları */}
              <div className="flex items-center space-x-6">
                {/* LinkedIn */}
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                </a>

                {/* Twitter/X */}
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
     </div>
   );
 }
