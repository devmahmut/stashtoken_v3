'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

export default function Home() {
  const tokenomicsRef = useRef<HTMLHeadingElement>(null);
  const morphSvgRef = useRef<SVGPathElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
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

  // Video data for features (şimdilik aynı video)
  const featureVideos = [
    "/banner-video.mp4", // Feature 1 video
    "/banner-video.mp4", // Feature 2 video  
    "/banner-video.mp4"  // Feature 3 video
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

    // Tokenomics başlık animasyonu
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
    }

    // Road Map ScrambleText animasyonu
    if (roadMapRef.current) {
      // Başlangıçta scrambled text ile başla
      const roadElement = roadMapRef.current.querySelector('.road-text');
      const mapElement = roadMapRef.current.querySelector('.map-text');
      
      if (roadElement && mapElement) {
        roadElement.textContent = 'XZQRMBTKLWPFGHYUJNM';
        mapElement.textContent = 'YBPWKLZXCVBNMASDFGH';
        
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
          ease: "none"
        })
        .to(mapElement, {
          duration: 4,
          text: "MAP", 
          ease: "none"
        }, "-=3");
      }
    }

    // FAQ ScrambleText animasyonu
    if (faqRef.current) {
      // Başlangıçta scrambled text ile başla
      faqRef.current.textContent = 'XQZMWBFGH';
      
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
        ease: "none"
      });
    }

    // SVG morph ve text animasyonu
    const data = [
      { left: 'LP Locked', right: '10%', svg: 'chair', layout: 'vertical' },
      { left: 'Treasury', right: '25%', svg: 'armchair', layout: 'vertical' },
      { left: 'MEME Charity', right: '50%', svg: 'wardrobe', layout: 'vertical' },
      { left: 'CEX Listing', right: '15%', svg: 'bed', layout: 'vertical' }
    ];

    let currentIndex = 0;

    const animateContent = () => {
      const next = data[currentIndex];

      // Text animasyonu (split text benzeri)
      const animateText = (element: HTMLElement, newText: string) => {
        if (!element) return;
        
        const currentChars = element.children;
        if (currentChars.length > 0) {
          gsap.to(currentChars, {
            opacity: 0,
            y: -50,
            duration: 0.2,
            stagger: 0.01,
            onComplete: () => {
              element.innerHTML = '';
              newText.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                element.appendChild(span);
              });

              gsap.to(element.children, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.01,
                ease: "back.out(1.7)"
              });
            }
          });
        } else {
          newText.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            element.appendChild(span);
          });

          gsap.to(element.children, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.01,
            ease: "back.out(1.7)"
          });
        }
      };

      // Layout değişikliği
      const container = document.getElementById('morphing-container');
      const leftText = leftTextRef.current;
      const rightText = rightTextRef.current;
      const svgContainer = document.getElementById('svg-container');

            // Sadece text'leri fade out (SVG sürekli görünür kalacak)
      gsap.to([leftText, rightText], {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          // Dikey layout: eşit aralıklandırma (20%, 50%, 80%)
          if (leftText) {
            leftText.style.position = 'absolute';
            leftText.style.left = '50%';
            leftText.style.top = '20%';
            leftText.style.transform = 'translate(-50%, -50%)';
            leftText.style.textAlign = 'center';
            leftText.style.right = 'auto';
            leftText.style.bottom = 'auto';
          }
          if (svgContainer) {
            svgContainer.style.position = 'absolute';
            svgContainer.style.left = '50%';
            svgContainer.style.top = '50%';
            svgContainer.style.transform = 'translate(-50%, -50%)';
          }
          if (rightText) {
            rightText.style.position = 'absolute';
            rightText.style.left = '50%';
            rightText.style.top = '80%';
            rightText.style.transform = 'translate(-50%, -50%)';
            rightText.style.textAlign = 'center';
            rightText.style.right = 'auto';
            rightText.style.bottom = 'auto';
          }

          // Text animasyonları
          animateText(leftTextRef.current!, next.left);
          animateText(rightTextRef.current!, next.right);

          // Sadece text'leri tekrar fade in yap
          gsap.to([leftText, rightText], {
            opacity: 1,
            duration: 0.3,
            delay: 0.1
          });
        }
      });

      // SVG paths - super simple morph-friendly shapes
      const chairPath = "M200 90 L400 90 L400 110 L380 110 L380 190 L370 200 L230 200 L220 190 L220 110 L200 110 Z M220 110 L220 190 M380 190 L380 110 M200 90 L200 70 M400 90 L400 70 M200 70 L400 70";
      const armchairPath = "M120 100 L480 100 L480 120 L460 120 L460 190 L450 200 L150 200 L140 190 L140 120 L120 120 Z M100 100 L100 140 M500 100 L500 140 M100 140 L140 140 M460 140 L500 140 M140 120 L140 190 M460 190 L460 120";
      const wardrobePath = "M180 70 L420 70 L420 90 L420 180 L410 190 L190 190 L180 180 L180 90 Z M300 70 L300 190 M200 110 L220 110 M380 110 L400 110 M180 60 L420 60 M180 200 L420 200 M180 70 L180 200 M420 70 L420 200";
      const bedPath = "M120 120 L480 120 L480 140 L480 160 L470 170 L130 170 L120 160 L120 140 Z M140 100 L460 100 M140 100 L140 120 M460 100 L460 120 M160 80 L200 80 M240 80 L280 80 M320 80 L360 80 M400 80 L440 80";

      const getTargetPath = (svgType: string) => {
        switch(svgType) {
          case 'chair': return chairPath;
          case 'armchair': return armchairPath;
          case 'wardrobe': return wardrobePath;
          case 'bed': return bedPath;
          default: return chairPath;
        }
      };

      const targetPath = getTargetPath(next.svg);

      // SVG morph animasyonu (text animasyonu ile paralel)
      if (morphSvgRef.current) {
        gsap.to(morphSvgRef.current, {
          attr: { d: targetPath },
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.1
        });
      }

      currentIndex = (currentIndex + 1) % data.length;
    };

    // İlk içeriği ayarla ve döngüyü başlat
    if (leftTextRef.current && rightTextRef.current) {
      const initialData = data[0];
      
      // İlk layout'u ayarla (horizontal)
      const leftText = leftTextRef.current;
      const rightText = rightTextRef.current;
      const svgContainer = document.getElementById('svg-container');
      
             // Hepsi dikey layout olduğu için özel ayar gerek yok
       // CSS'te zaten doğru dikey pozisyonlar ayarlı (20%, 50%, 80%)
      
      initialData.left.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        leftTextRef.current?.appendChild(span);
      });

      initialData.right.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        rightTextRef.current?.appendChild(span);
      });

      // İlk içerik animasyonu
      gsap.to(leftTextRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      gsap.to(rightTextRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "back.out(1.7)",
        delay: 0.4
      });

      // 1.5 saniye aralıklarla döngü
      const interval = setInterval(animateContent, 1500);
      
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Sol Lottie Animasyonu */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="w-64 h-64 lg:w-80 lg:h-80">
              <DotLottieReact
                src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* Orta İçerik */}
          <div className="text-center order-1 lg:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your favorite crypto wallet.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore Ethereum with the best wallet for iOS. 
              Interacting with crypto has never been so simple.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors text-lg">
              Get Started
            </button>
          </div>

          {/* Sağ Lottie Animasyonu */}
          <div className="flex justify-center lg:justify-start order-3">
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
          <div className="w-full flex items-center justify-center" style={{ height: '200px' }}>
            <h2 
              ref={tokenomicsRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-bold text-gray-900 text-center w-full leading-none uppercase"
            >
              Tokenomics
            </h2>
          </div>

          {/* Morphing SVG Section */}
          <div className="flex items-center justify-center mt-16 mb-20" style={{ height: '500px' }}>
            <div id="morphing-container" className="relative w-full max-w-4xl h-full">
              {/* Sol/Üst Text */}
              <div 
                ref={leftTextRef}
                className="absolute text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 inline-block"
                style={{
                  left: '50%',
                  top: '20%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}
              ></div>

              {/* Orta SVG */}
              <div 
                id="svg-container"
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <svg 
                  width="600" 
                  height="250" 
                  viewBox="0 0 600 250" 
                  className="overflow-visible"
                >
                  <path
                    ref={morphSvgRef}
                    d="M200 90 L400 90 L400 110 L380 110 L380 190 L370 200 L230 200 L220 190 L220 110 L200 110 Z M220 110 L220 190 M380 190 L380 110 M200 90 L200 70 M400 90 L400 70 M200 70 L400 70"
                    stroke="#f97316"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Sağ/Alt Text */}
              <div 
                ref={rightTextRef}
                className="absolute text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 inline-block"
                style={{
                  left: '50%',
                  top: '80%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Road Map Section */}
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Sol taraf - Road Map başlığı */}
            <div className="text-left">
              <h2 
                ref={roadMapRef}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-bold text-gray-900 leading-none uppercase"
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

          {/* Road Map Stages */}
          <div className="mt-20 space-y-20">
                        {/* Stage 1 - Conceptualization */}
            <div className="grid lg:grid-cols-12 gap-8 items-center relative bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl">
              {/* Sol taraf - Lottie Animasyonu (5/12) */}
              <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
                <div className="w-72 h-72 lg:w-80 lg:h-80">
                  <DotLottieReact
                    src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>

              {/* Sağ taraf - Stage İçerik (7/12) */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4 relative items-center lg:items-start">
                <p className="text-cyan-600 font-semibold text-lg">Stage 1:</p>

                <div className="flex flex-col gap-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase">
                    "CONCEPTUALIZATION"
                  </h1>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-cyan-600 mt-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1585 4.46495C1.25967 2.67771 2.67771 1.25967 4.46495 1.1585C5.92238 1.07599 7.63519 1 9 1C10.3648 1 12.0776 1.07599 13.535 1.1585C15.3223 1.25967 16.7403 2.67771 16.8415 4.46495C16.924 5.92238 17 7.63519 17 9C17 10.3648 16.924 12.0776 16.8415 13.535C16.7403 15.3223 15.3223 16.7403 13.535 16.8415C12.0776 16.924 10.3648 17 9 17C7.63519 17 5.92238 16.924 4.46495 16.8415C2.67771 16.7403 1.25967 15.3223 1.1585 13.535C1.07599 12.0776 1 10.3648 1 9C1 7.63519 1.07599 5.92238 1.1585 4.46495Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M1.19043 14.061L3.30558 10.8776C3.56865 10.4816 4.15665 10.3461 4.61466 10.5759L6.76377 11.8291C7.14206 12.0497 7.61986 11.9985 7.94282 11.7027L11.5057 8.44034C11.9445 8.06289 12.679 8.14065 12.9984 8.59838L16.7936 14.0384" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="font-medium">Research</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 2.90103C19 2.09585 18.097 1.62083 17.4335 2.07699L12.1986 5.67596C11.6206 6.07331 11.6206 6.92669 12.1986 7.32404L17.4335 10.923C18.097 11.3792 19 10.9041 19 10.099V2.90103Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 9V4C13 2.34315 11.6569 1 10 1H4C2.34315 1 1 2.34315 1 4V9C1 10.6569 2.34315 12 4 12H10C11.6569 12 13 10.6569 13 9Z" fill="white" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Team Building</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.23689 1.15803L15.2878 4.18351C15.5399 4.30875 15.752 4.50181 15.9003 4.74099C16.0486 4.98017 16.1273 5.25598 16.1274 5.53741V12.7456C16.1273 13.027 16.0486 13.3029 15.9003 13.542C15.752 13.7812 15.5399 13.9743 15.2878 14.0995L9.23689 17.125C9.02673 17.2301 8.79495 17.2849 8.55994 17.2849C8.32493 17.2849 8.09316 17.2301 7.88299 17.125L1.83204 14.0995C1.58027 13.9726 1.36896 13.778 1.22195 13.5374C1.07493 13.2968 0.998075 13.02 1.00004 12.738V5.53741C1.00019 5.25598 1.07884 4.98017 1.22716 4.74099C1.37548 4.50181 1.58757 4.30875 1.83961 4.18351L7.89056 1.15803C8.09974 1.05409 8.33014 1 8.56372 1C8.79731 1 9.02771 1.05409 9.23689 1.15803Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.2417 4.72046L8.56335 8.38128L15.885 4.72046" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.56396 17.276V8.3811" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Whitepaper</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.33333 13.4445H2.77778C2.30628 13.4445 1.8541 13.6318 1.5207 13.9652C1.1873 14.2986 1 14.7508 1 15.2223C1 15.6938 1.1873 16.146 1.5207 16.4794C1.8541 16.8128 2.30628 17.0001 2.77778 17.0001H4.55556C5.02705 17.0001 5.47924 16.8128 5.81263 16.4794C6.14603 16.146 6.33333 15.6938 6.33333 15.2223V13.4445ZM17 11.6667H13.4444C12.9729 11.6667 12.5208 11.854 12.1874 12.1874C11.854 12.5208 11.6667 12.973 11.6667 13.4445C11.6667 13.916 11.854 14.3682 12.1874 14.7016C12.5208 15.035 12.9729 15.2223 13.4444 15.2223H15.2222C15.6937 15.2223 16.1459 15.035 16.4793 14.7016C16.8127 14.3682 17 13.916 17 13.4445V11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.3335 13.4444V2.77778L17.0002 1V11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Compliance</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.78986 11.5262C15.8824 11.5262 21.632 5.77664 21.632 -1.31586C21.632 -8.40835 15.8824 -14.158 8.78986 -14.158C1.69736 -14.158 -4.05225 -8.40835 -4.05225 -1.31586C-4.05225 5.77664 1.69736 11.5262 8.78986 11.5262Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.4739 21.6317C25.5664 21.6317 31.316 15.8821 31.316 8.78961C31.316 1.69712 25.5664 -4.05249 18.4739 -4.05249C11.3814 -4.05249 5.63184 1.69712 5.63184 8.78961C5.63184 15.8821 11.3814 21.6317 18.4739 21.6317Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Community</span>
                  </li>
                </ul>

                                 {/* Arrow SVG */}
                 <svg 
                   width="209" 
                   height="90" 
                   viewBox="0 0 209 90" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg" 
                   className="-rotate-[35deg] absolute -bottom-32 left-0 w-52 h-22 z-50"
                 >
                                     <path d="M157.146 80.0717C171.941 76.603 184.747 69.0168 193.069 60.3144C196.848 56.429 200.08 52.075 202.629 47.4363C204.596 43.9316 206.114 40.2802 207.137 36.5896C207.787 34.2251 208.2 31.8577 208.369 29.5252C208.433 27.9189 208.401 27.1057 208.294 27.1067C208.187 27.1077 207.919 30.5032 205.973 36.4223C203.194 44.6498 198.188 52.4482 191.576 58.8488C183.495 66.93 171.118 73.8131 156.957 76.8382C149.47 78.4485 142.056 78.9207 134.975 78.2384C127.213 77.5275 120.051 75.2007 113.907 71.3931C107.472 67.3546 102.633 61.4114 99.8627 54.1431C98.3131 50.1607 97.5584 45.7595 97.6326 41.138C100.41 42.1643 103.296 43.2722 106.388 44.2367C110.05 45.4524 113.968 46.1488 118.05 46.3093C122.339 46.4385 126.835 45.5923 131.222 43.8301C135.692 42.0807 139.929 39.3592 143.58 35.8923C147.23 32.4255 150.189 28.3136 152.209 23.8995C154.409 18.9071 154.928 13.7079 153.676 9.20441C152.944 6.70316 151.509 4.59973 149.511 3.09991C147.572 1.70865 145.262 0.810908 142.725 0.461983C140.446 0.123088 138.08 0.0319156 135.665 0.189908C133.306 0.317748 130.917 0.630139 128.518 1.12431C126.155 1.5801 123.787 2.23062 121.439 3.06895C119.09 3.88431 116.772 4.91382 114.519 6.14292C112.264 7.36073 110.101 8.81456 108.075 10.4739C106.009 12.0888 104.103 13.9233 102.407 15.9308C98.9923 19.9592 96.4078 24.5274 94.8632 29.2639C94.4297 30.5668 94.066 31.8759 93.7738 33.1848C92.3592 32.7399 90.9282 32.3325 89.4885 31.9973C83.2579 30.5586 76.4487 30.6055 69.5307 32.1347C63.8422 33.4067 58.1737 35.5128 52.7189 38.3812C44.4677 42.7869 36.7477 48.5158 29.9424 55.2834C25.3882 59.7377 21.1046 64.4592 17.1287 69.4071C13.9726 73.2816 11.7266 76.2883 10.1041 78.5448C8.81165 80.3232 7.86463 81.6928 7.20918 82.7075L7.32453 81.5568C7.40603 80.0716 7.32729 78.6204 7.08964 77.2274C6.69755 74.9525 6.00647 72.8048 5.03199 70.8328C3.37073 67.5284 1.85329 65.8763 1.2234 66.1892C0.593515 66.5021 0.980908 68.8828 1.71727 72.3937C2.15991 74.3624 2.46072 76.391 2.6178 78.4663C2.70475 79.6072 2.6861 80.7784 2.56208 81.9663L2.27306 83.9669C2.2237 84.3755 2.17145 84.8081 2.15854 85.307C2.13946 85.8994 2.19744 86.4733 2.33112 87.015C2.50158 87.6819 2.82914 88.2666 3.29085 88.7284C3.75257 89.1901 4.33729 89.5176 5.00413 89.6881C5.32618 89.7651 5.66128 89.8117 6.00568 89.8276C6.36038 89.8321 6.73147 89.7991 6.91027 89.7894L8.04274 89.6289C9.45308 89.423 10.7942 89.2018 12.0796 88.9517C14.3601 88.5197 16.6452 87.963 18.9242 87.2841C22.7847 86.1073 25.1167 84.9375 25.0778 84.279C25.0389 83.6206 22.6252 83.6043 18.8136 83.8871C16.9025 84.0233 14.6491 84.2481 12.1448 84.4914L9.82224 84.7009C10.7112 83.812 11.8224 82.5528 13.3359 80.8069C15.1814 78.6656 17.6147 75.8731 20.8466 72.1552C24.8566 67.5412 29.0928 63.1144 33.5316 58.8996C39.9602 52.718 47.1824 47.4842 54.867 43.4385C59.7915 40.8995 64.8974 39.0336 70.0181 37.9018C76.0502 36.5761 81.9853 36.546 87.4123 37.8137C89.2701 38.2168 91.0941 38.8017 92.9844 39.426C92.6176 45.5003 93.5148 51.2834 95.6207 56.4199C98.7862 64.3559 104.222 70.8034 111.395 75.1306C118.056 79.1009 125.795 81.4636 134.156 82.0793C141.626 82.6355 149.427 81.9649 157.274 80.0918L157.146 80.0717ZM99.6564 30.0704C101.014 26.0517 103.249 22.187 106.182 18.7903C107.615 17.1158 109.225 15.5912 110.969 14.257C112.731 12.879 114.601 11.6756 116.541 10.6708C118.501 9.6231 120.514 8.74929 122.552 8.0618C124.632 7.34206 126.727 6.78794 128.815 6.40524C130.922 6.00675 133.017 5.76949 135.082 5.69554C137.126 5.57583 139.127 5.66341 141.055 5.95697C142.788 6.10825 144.354 6.70355 145.613 7.69084C146.873 8.67814 147.789 10.0274 148.281 11.6206C149.122 14.9424 148.688 18.7417 147.052 22.3791C146.289 24.1599 145.283 25.8781 144.068 27.4762C142.861 29.1083 141.484 30.6275 139.969 31.9975C136.985 34.7133 133.582 36.8653 130.003 38.3005C126.424 39.7358 122.757 40.4189 119.262 40.3014C115.703 40.1266 112.288 39.4972 109.091 38.4275C105.485 37.3 101.997 35.886 98.4838 34.5815C98.787 33.0631 99.1923 31.5423 99.6968 30.0299" fill="#9333EA"/>
                 </svg>
               </div>
             </div>

                         {/* Stage 2 - Development */}
             <div className="grid lg:grid-cols-12 gap-8 items-center relative bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl">
               {/* Sol taraf - Stage İçerik (7/12) */}
               <div className="lg:col-span-7 order-1 lg:order-1 flex flex-col gap-4 relative items-center lg:items-start">
                 <p className="text-green-600 font-semibold text-lg">Stage 2:</p>
                 
                 <div className="flex flex-col gap-6">
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase">
                     "DEVELOPMENT"
                   </h1>
                 </div>

                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-600 mt-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 2L9 1L17 2V11C17 14 14 17 9 17C4 17 1 14 1 11V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 8L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Smart Contract</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M13 5H7.5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10H10.5C11.8807 10 13 11.1193 13 12.5C13 13.8807 11.8807 15 10.5 15H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Platform</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7V3C15 2.44772 14.5523 2 14 2H4C3.44772 2 3 2.44772 3 3V7" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="1" y="7" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="9" cy="11.5" r="1.5" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="font-medium">Security Audit</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L11.09 6.26L17 7L12 11.74L13.18 17.26L9 15L4.82 17.26L6 11.74L1 7L6.91 6.26L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Beta Testing</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4L6 14L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Bug Fixes</span>
                  </li>
                </ul>

                                 {/* Arrow SVG */}
                 <svg 
                   width="209" 
                   height="90" 
                   viewBox="0 0 209 90" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg" 
                   className="-rotate-[35deg] absolute -bottom-32 right-0 w-52 h-22 z-50"
                 >
                  <path d="M157.146 80.0717C171.941 76.603 184.747 69.0168 193.069 60.3144C196.848 56.429 200.08 52.075 202.629 47.4363C204.596 43.9316 206.114 40.2802 207.137 36.5896C207.787 34.2251 208.2 31.8577 208.369 29.5252C208.433 27.9189 208.401 27.1057 208.294 27.1067C208.187 27.1077 207.919 30.5032 205.973 36.4223C203.194 44.6498 198.188 52.4482 191.576 58.8488C183.495 66.93 171.118 73.8131 156.957 76.8382C149.47 78.4485 142.056 78.9207 134.975 78.2384C127.213 77.5275 120.051 75.2007 113.907 71.3931C107.472 67.3546 102.633 61.4114 99.8627 54.1431C98.3131 50.1607 97.5584 45.7595 97.6326 41.138C100.41 42.1643 103.296 43.2722 106.388 44.2367C110.05 45.4524 113.968 46.1488 118.05 46.3093C122.339 46.4385 126.835 45.5923 131.222 43.8301C135.692 42.0807 139.929 39.3592 143.58 35.8923C147.23 32.4255 150.189 28.3136 152.209 23.8995C154.409 18.9071 154.928 13.7079 153.676 9.20441C152.944 6.70316 151.509 4.59973 149.511 3.09991C147.572 1.70865 145.262 0.810908 142.725 0.461983C140.446 0.123088 138.08 0.0319156 135.665 0.189908C133.306 0.317748 130.917 0.630139 128.518 1.12431C126.155 1.5801 123.787 2.23062 121.439 3.06895C119.09 3.88431 116.772 4.91382 114.519 6.14292C112.264 7.36073 110.101 8.81456 108.075 10.4739C106.009 12.0888 104.103 13.9233 102.407 15.9308C98.9923 19.9592 96.4078 24.5274 94.8632 29.2639C94.4297 30.5668 94.066 31.8759 93.7738 33.1848C92.3592 32.7399 90.9282 32.3325 89.4885 31.9973C83.2579 30.5586 76.4487 30.6055 69.5307 32.1347C63.8422 33.4067 58.1737 35.5128 52.7189 38.3812C44.4677 42.7869 36.7477 48.5158 29.9424 55.2834C25.3882 59.7377 21.1046 64.4592 17.1287 69.4071C13.9726 73.2816 11.7266 76.2883 10.1041 78.5448C8.81165 80.3232 7.86463 81.6928 7.20918 82.7075L7.32453 81.5568C7.40603 80.0716 7.32729 78.6204 7.08964 77.2274C6.69755 74.9525 6.00647 72.8048 5.03199 70.8328C3.37073 67.5284 1.85329 65.8763 1.2234 66.1892C0.593515 66.5021 0.980908 68.8828 1.71727 72.3937C2.15991 74.3624 2.46072 76.391 2.6178 78.4663C2.70475 79.6072 2.6861 80.7784 2.56208 81.9663L2.27306 83.9669C2.2237 84.3755 2.17145 84.8081 2.15854 85.307C2.13946 85.8994 2.19744 86.4733 2.33112 87.015C2.50158 87.6819 2.82914 88.2666 3.29085 88.7284C3.75257 89.1901 4.33729 89.5176 5.00413 89.6881C5.32618 89.7651 5.66128 89.8117 6.00568 89.8276C6.36038 89.8321 6.73147 89.7991 6.91027 89.7894L8.04274 89.6289C9.45308 89.423 10.7942 89.2018 12.0796 88.9517C14.3601 88.5197 16.6452 87.963 18.9242 87.2841C22.7847 86.1073 25.1167 84.9375 25.0778 84.279C25.0389 83.6206 22.6252 83.6043 18.8136 83.8871C16.9025 84.0233 14.6491 84.2481 12.1448 84.4914L9.82224 84.7009C10.7112 83.812 11.8224 82.5528 13.3359 80.8069C15.1814 78.6656 17.6147 75.8731 20.8466 72.1552C24.8566 67.5412 29.0928 63.1144 33.5316 58.8996C39.9602 52.718 47.1824 47.4842 54.867 43.4385C59.7915 40.8995 64.8974 39.0336 70.0181 37.9018C76.0502 36.5761 81.9853 36.546 87.4123 37.8137C89.2701 38.2168 91.0941 38.8017 92.9844 39.426C92.6176 45.5003 93.5148 51.2834 95.6207 56.4199C98.7862 64.3559 104.222 70.8034 111.395 75.1306C118.056 79.1009 125.795 81.4636 134.156 82.0793C141.626 82.6355 149.427 81.9649 157.274 80.0918L157.146 80.0717ZM99.6564 30.0704C101.014 26.0517 103.249 22.187 106.182 18.7903C107.615 17.1158 109.225 15.5912 110.969 14.257C112.731 12.879 114.601 11.6756 116.541 10.6708C118.501 9.6231 120.514 8.74929 122.552 8.0618C124.632 7.34206 126.727 6.78794 128.815 6.40524C130.922 6.00675 133.017 5.76949 135.082 5.69554C137.126 5.57583 139.127 5.66341 141.055 5.95697C142.788 6.10825 144.354 6.70355 145.613 7.69084C146.873 8.67814 147.789 10.0274 148.281 11.6206C149.122 14.9424 148.688 18.7417 147.052 22.3791C146.289 24.1599 145.283 25.8781 144.068 27.4762C142.861 29.1083 141.484 30.6275 139.969 31.9975C136.985 34.7133 133.582 36.8653 130.003 38.3005C126.424 39.7358 122.757 40.4189 119.262 40.3014C115.703 40.1266 112.288 39.4972 109.091 38.4275C105.485 37.3 101.997 35.886 98.4838 34.5815C98.787 33.0631 99.1923 31.5423 99.6968 30.0299" fill="#10B981"/>
                </svg>
              </div>

              {/* Sağ taraf - Lottie Animasyonu (5/12) */}
              <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-2">
                <div className="w-72 h-72 lg:w-80 lg:h-80">
                  <DotLottieReact
                    src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
            </div>

                         {/* Stage 3 - Launch */}
             <div className="grid lg:grid-cols-12 gap-8 items-center relative bg-gradient-to-r from-purple-50 to-violet-50 p-8 rounded-2xl">
               {/* Sol taraf - Lottie Animasyonu (5/12) */}
               <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
                 <div className="w-72 h-72 lg:w-80 lg:h-80">
                   <DotLottieReact
                     src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                     loop
                     autoplay
                   />
                 </div>
               </div>

               {/* Sağ taraf - Stage İçerik (7/12) */}
               <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4 relative items-center lg:items-start">
                 <p className="text-purple-600 font-semibold text-lg">Stage 3:</p>
                 
                 <div className="flex flex-col gap-6">
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase">
                     "LAUNCH"
                   </h1>
                 </div>

                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-600 mt-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L11 6L17 7L12 11L13 17L9 15L5 17L6 11L1 7L7 6L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Token Sale</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 6L8 10L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Exchange Listing</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 13V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 9L8 13L4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Mainnet Deploy</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3H16V15H2V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 6H16" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M6 9H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Marketing</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 6L9 11L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Public Release</span>
                  </li>
                </ul>

                                {/* Arrow SVG */}
                <svg
                  width="209"
                  height="90"
                  viewBox="0 0 209 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-rotate-[35deg] absolute -bottom-32 left-0 w-52 h-22 z-50"
                >
                                     <path d="M157.146 80.0717C171.941 76.603 184.747 69.0168 193.069 60.3144C196.848 56.429 200.08 52.075 202.629 47.4363C204.596 43.9316 206.114 40.2802 207.137 36.5896C207.787 34.2251 208.2 31.8577 208.369 29.5252C208.433 27.9189 208.401 27.1057 208.294 27.1067C208.187 27.1077 207.919 30.5032 205.973 36.4223C203.194 44.6498 198.188 52.4482 191.576 58.8488C183.495 66.93 171.118 73.8131 156.957 76.8382C149.47 78.4485 142.056 78.9207 134.975 78.2384C127.213 77.5275 120.051 75.2007 113.907 71.3931C107.472 67.3546 102.633 61.4114 99.8627 54.1431C98.3131 50.1607 97.5584 45.7595 97.6326 41.138C100.41 42.1643 103.296 43.2722 106.388 44.2367C110.05 45.4524 113.968 46.1488 118.05 46.3093C122.339 46.4385 126.835 45.5923 131.222 43.8301C135.692 42.0807 139.929 39.3592 143.58 35.8923C147.23 32.4255 150.189 28.3136 152.209 23.8995C154.409 18.9071 154.928 13.7079 153.676 9.20441C152.944 6.70316 151.509 4.59973 149.511 3.09991C147.572 1.70865 145.262 0.810908 142.725 0.461983C140.446 0.123088 138.08 0.0319156 135.665 0.189908C133.306 0.317748 130.917 0.630139 128.518 1.12431C126.155 1.5801 123.787 2.23062 121.439 3.06895C119.09 3.88431 116.772 4.91382 114.519 6.14292C112.264 7.36073 110.101 8.81456 108.075 10.4739C106.009 12.0888 104.103 13.9233 102.407 15.9308C98.9923 19.9592 96.4078 24.5274 94.8632 29.2639C94.4297 30.5668 94.066 31.8759 93.7738 33.1848C92.3592 32.7399 90.9282 32.3325 89.4885 31.9973C83.2579 30.5586 76.4487 30.6055 69.5307 32.1347C63.8422 33.4067 58.1737 35.5128 52.7189 38.3812C44.4677 42.7869 36.7477 48.5158 29.9424 55.2834C25.3882 59.7377 21.1046 64.4592 17.1287 69.4071C13.9726 73.2816 11.7266 76.2883 10.1041 78.5448C8.81165 80.3232 7.86463 81.6928 7.20918 82.7075L7.32453 81.5568C7.40603 80.0716 7.32729 78.6204 7.08964 77.2274C6.69755 74.9525 6.00647 72.8048 5.03199 70.8328C3.37073 67.5284 1.85329 65.8763 1.2234 66.1892C0.593515 66.5021 0.980908 68.8828 1.71727 72.3937C2.15991 74.3624 2.46072 76.391 2.6178 78.4663C2.70475 79.6072 2.6861 80.7784 2.56208 81.9663L2.27306 83.9669C2.2237 84.3755 2.17145 84.8081 2.15854 85.307C2.13946 85.8994 2.19744 86.4733 2.33112 87.015C2.50158 87.6819 2.82914 88.2666 3.29085 88.7284C3.75257 89.1901 4.33729 89.5176 5.00413 89.6881C5.32618 89.7651 5.66128 89.8117 6.00568 89.8276C6.36038 89.8321 6.73147 89.7991 6.91027 89.7894L8.04274 89.6289C9.45308 89.423 10.7942 89.2018 12.0796 88.9517C14.3601 88.5197 16.6452 87.963 18.9242 87.2841C22.7847 86.1073 25.1167 84.9375 25.0778 84.279C25.0389 83.6206 22.6252 83.6043 18.8136 83.8871C16.9025 84.0233 14.6491 84.2481 12.1448 84.4914L9.82224 84.7009C10.7112 83.812 11.8224 82.5528 13.3359 80.8069C15.1814 78.6656 17.6147 75.8731 20.8466 72.1552C24.8566 67.5412 29.0928 63.1144 33.5316 58.8996C39.9602 52.718 47.1824 47.4842 54.867 43.4385C59.7915 40.8995 64.8974 39.0336 70.0181 37.9018C76.0502 36.5761 81.9853 36.546 87.4123 37.8137C89.2701 38.2168 91.0941 38.8017 92.9844 39.426C92.6176 45.5003 93.5148 51.2834 95.6207 56.4199C98.7862 64.3559 104.222 70.8034 111.395 75.1306C118.056 79.1009 125.795 81.4636 134.156 82.0793C141.626 82.6355 149.427 81.9649 157.274 80.0918L157.146 80.0717ZM99.6564 30.0704C101.014 26.0517 103.249 22.187 106.182 18.7903C107.615 17.1158 109.225 15.5912 110.969 14.257C112.731 12.879 114.601 11.6756 116.541 10.6708C118.501 9.6231 120.514 8.74929 122.552 8.0618C124.632 7.34206 126.727 6.78794 128.815 6.40524C130.922 6.00675 133.017 5.76949 135.082 5.69554C137.126 5.57583 139.127 5.66341 141.055 5.95697C142.788 6.10825 144.354 6.70355 145.613 7.69084C146.873 8.67814 147.789 10.0274 148.281 11.6206C149.122 14.9424 148.688 18.7417 147.052 22.3791C146.289 24.1599 145.283 25.8781 144.068 27.4762C142.861 29.1083 141.484 30.6275 139.969 31.9975C136.985 34.7133 133.582 36.8653 130.003 38.3005C126.424 39.7358 122.757 40.4189 119.262 40.3014C115.703 40.1266 112.288 39.4972 109.091 38.4275C105.485 37.3 101.997 35.886 98.4838 34.5815C98.787 33.0631 99.1923 31.5423 99.6968 30.0299" fill="#0891B2"/>
                </svg>
              </div>
            </div>

                         {/* Stage 4 - Growth */}
             <div className="grid lg:grid-cols-12 gap-8 items-center relative bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl">
               {/* Sol taraf - Stage İçerik (7/12) */}
               <div className="lg:col-span-7 order-1 lg:order-1 flex flex-col gap-4 relative items-center lg:items-start">
                 <p className="text-orange-600 font-semibold text-lg">Stage 4:</p>
                 
                 <div className="flex flex-col gap-6">
                   <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase">
                     "GROWTH"
                   </h1>
                 </div>

                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-600 mt-3 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 17L16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M2 13L6 9L10 13L16 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 1H16V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Partnerships</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M9 5V9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Ecosystem</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 2L3 6V16C3 16.5523 3.44772 17 4 17H14C14.5523 17 15 16.5523 15 16V6L12 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 6H15" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 10C12 11.6569 10.6569 13 9 13C7.34315 13 6 11.6569 6 10" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="font-medium">New Features</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M9 5V9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">Global Adoption</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1V9L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="font-medium">Sustainability</span>
                  </li>
                </ul>

                                 {/* Arrow SVG */}
                 <svg 
                   width="209" 
                   height="90" 
                   viewBox="0 0 209 90" 
                   fill="none" 
                   xmlns="http://www.w3.org/2000/svg" 
                   className="-rotate-[35deg] absolute -bottom-32 right-0 w-52 h-22 z-50"
                 >
                   <path d="M157.146 80.0717C171.941 76.603 184.747 69.0168 193.069 60.3144C196.848 56.429 200.08 52.075 202.629 47.4363C204.596 43.9316 206.114 40.2802 207.137 36.5896C207.787 34.2251 208.2 31.8577 208.369 29.5252C208.433 27.9189 208.401 27.1057 208.294 27.1067C208.187 27.1077 207.919 30.5032 205.973 36.4223C203.194 44.6498 198.188 52.4482 191.576 58.8488C183.495 66.93 171.118 73.8131 156.957 76.8382C149.47 78.4485 142.056 78.9207 134.975 78.2384C127.213 77.5275 120.051 75.2007 113.907 71.3931C107.472 67.3546 102.633 61.4114 99.8627 54.1431C98.3131 50.1607 97.5584 45.7595 97.6326 41.138C100.41 42.1643 103.296 43.2722 106.388 44.2367C110.05 45.4524 113.968 46.1488 118.05 46.3093C122.339 46.4385 126.835 45.5923 131.222 43.8301C135.692 42.0807 139.929 39.3592 143.58 35.8923C147.23 32.4255 150.189 28.3136 152.209 23.8995C154.409 18.9071 154.928 13.7079 153.676 9.20441C152.944 6.70316 151.509 4.59973 149.511 3.09991C147.572 1.70865 145.262 0.810908 142.725 0.461983C140.446 0.123088 138.08 0.0319156 135.665 0.189908C133.306 0.317748 130.917 0.630139 128.518 1.12431C126.155 1.5801 123.787 2.23062 121.439 3.06895C119.09 3.88431 116.772 4.91382 114.519 6.14292C112.264 7.36073 110.101 8.81456 108.075 10.4739C106.009 12.0888 104.103 13.9233 102.407 15.9308C98.9923 19.9592 96.4078 24.5274 94.8632 29.2639C94.4297 30.5668 94.066 31.8759 93.7738 33.1848C92.3592 32.7399 90.9282 32.3325 89.4885 31.9973C83.2579 30.5586 76.4487 30.6055 69.5307 32.1347C63.8422 33.4067 58.1737 35.5128 52.7189 38.3812C44.4677 42.7869 36.7477 48.5158 29.9424 55.2834C25.3882 59.7377 21.1046 64.4592 17.1287 69.4071C13.9726 73.2816 11.7266 76.2883 10.1041 78.5448C8.81165 80.3232 7.86463 81.6928 7.20918 82.7075L7.32453 81.5568C7.40603 80.0716 7.32729 78.6204 7.08964 77.2274C6.69755 74.9525 6.00647 72.8048 5.03199 70.8328C3.37073 67.5284 1.85329 65.8763 1.2234 66.1892C0.593515 66.5021 0.980908 68.8828 1.71727 72.3937C2.15991 74.3624 2.46072 76.391 2.6178 78.4663C2.70475 79.6072 2.6861 80.7784 2.56208 81.9663L2.27306 83.9669C2.2237 84.3755 2.17145 84.8081 2.15854 85.307C2.13946 85.8994 2.19744 86.4733 2.33112 87.015C2.50158 87.6819 2.82914 88.2666 3.29085 88.7284C3.75257 89.1901 4.33729 89.5176 5.00413 89.6881C5.32618 89.7651 5.66128 89.8117 6.00568 89.8276C6.36038 89.8321 6.73147 89.7991 6.91027 89.7894L8.04274 89.6289C9.45308 89.423 10.7942 89.2018 12.0796 88.9517C14.3601 88.5197 16.6452 87.963 18.9242 87.2841C22.7847 86.1073 25.1167 84.9375 25.0778 84.279C25.0389 83.6206 22.6252 83.6043 18.8136 83.8871C16.9025 84.0233 14.6491 84.2481 12.1448 84.4914L9.82224 84.7009C10.7112 83.812 11.8224 82.5528 13.3359 80.8069C15.1814 78.6656 17.6147 75.8731 20.8466 72.1552C24.8566 67.5412 29.0928 63.1144 33.5316 58.8996C39.9602 52.718 47.1824 47.4842 54.867 43.4385C59.7915 40.8995 64.8974 39.0336 70.0181 37.9018C76.0502 36.5761 81.9853 36.546 87.4123 37.8137C89.2701 38.2168 91.0941 38.8017 92.9844 39.426C92.6176 45.5003 93.5148 51.2834 95.6207 56.4199C98.7862 64.3559 104.222 70.8034 111.395 75.1306C118.056 79.1009 125.795 81.4636 134.156 82.0793C141.626 82.6355 149.427 81.9649 157.274 80.0918L157.146 80.0717ZM99.6564 30.0704C101.014 26.0517 103.249 22.187 106.182 18.7903C107.615 17.1158 109.225 15.5912 110.969 14.257C112.731 12.879 114.601 11.6756 116.541 10.6708C118.501 9.6231 120.514 8.74929 122.552 8.0618C124.632 7.34206 126.727 6.78794 128.815 6.40524C130.922 6.00675 133.017 5.76949 135.082 5.69554C137.126 5.57583 139.127 5.66341 141.055 5.95697C142.788 6.10825 144.354 6.70355 145.613 7.69084C146.873 8.67814 147.789 10.0274 148.281 11.6206C149.122 14.9424 148.688 18.7417 147.052 22.3791C146.289 24.1599 145.283 25.8781 144.068 27.4762C142.861 29.1083 141.484 30.6275 139.969 31.9975C136.985 34.7133 133.582 36.8653 130.003 38.3005C126.424 39.7358 122.757 40.4189 119.262 40.3014C115.703 40.1266 112.288 39.4972 109.091 38.4275C105.485 37.3 101.997 35.886 98.4838 34.5815C98.787 33.0631 99.1923 31.5423 99.6968 30.0299" fill="#EA580C"/>
                 </svg>
              </div>

              {/* Sağ taraf - Lottie Animasyonu (5/12) */}
              <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-2">
                <div className="w-72 h-72 lg:w-80 lg:h-80">
                  <DotLottieReact
                    src="https://lottie.host/ebabcade-78b0-4d84-8e9a-f7de44854f79/Y2gmsxnjhJ.lottie"
                    loop
                    autoplay
                  />
                </div>
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
            <div className="space-y-6">
              <p className="text-gray-600 text-lg font-medium">Curious mind asks</p>
              <h2 
                ref={faqRef}
                className="text-7xl lg:text-9xl font-bold text-gray-900 uppercase tracking-wider"
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
                <span className="text-2xl font-bold text-gray-900">Stashtoken</span>
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
