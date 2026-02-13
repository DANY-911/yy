
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SpinWheel from './components/SpinWheel';
import DataModal from './components/DataModal';
import { GameState, Prize, UserPreference } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showFullPrivacy, setShowFullPrivacy] = useState(false);

  // Fetch configuration from JSON
  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Error loading config:", err));

    const consent = localStorage.getItem('yuedpao-cookie-consent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleSpinStart = () => {
    if (gameState !== GameState.IDLE || !config) return;
    setGameState(GameState.SPINNING);
    
    const prizes = config.prizes;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];
    const sliceAngle = 360 / prizes.length;
    const extraSpins = 10; 
    const targetRotation = (extraSpins * 360) + (360 - (randomIndex * sliceAngle)) - (sliceAngle / 2);
    
    setRotation(targetRotation);

    setTimeout(() => {
      setWinningPrize(prize);
      setGameState(GameState.WON);
      setTimeout(() => {
        setGameState(GameState.COLLECTING_DATA);
      }, 1800);
    }, 6000);
  };

  const handleFormSubmit = (data: UserPreference) => {
    console.log("Form Submitted:", data);
    setGameState(GameState.SUCCESS);
  };

  const copyToClipboard = () => {
    if (config) {
      navigator.clipboard.writeText(config.rewardCode);
      alert(`คัดลอกรหัส ${config.rewardCode} แล้ว!`);
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('yuedpao-cookie-consent', 'true');
    setShowCookieConsent(false);
  };

  if (!config) return <div className="min-h-screen bg-white flex items-center justify-center font-syncopate text-xs tracking-widest animate-pulse">LOADING_LABS...</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#00f3ff] selection:text-white overflow-x-hidden scroll-smooth">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,136,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,136,204,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center backdrop-blur-xl bg-white/70 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center font-syncopate font-bold text-white rounded-xl shadow-lg">Y</div>
          <h1 className="font-syncopate text-xl md:text-2xl font-bold tracking-[0.3em] text-zinc-900">
            YU<span className="text-[#0088cc]">ED</span>PAO
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-syncopate font-bold tracking-widest text-zinc-400">
           <a href="#mission" className="hover:text-black transition-colors">THE_MISSION</a>
           <a href="#game" className="hover:text-black transition-colors">LUCKY_SPIN</a>
           <div className="text-[#0088cc] px-4 py-2 bg-blue-50 rounded-full border border-blue-100 animate-pulse">EST_2026</div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 md:pt-52 pb-24 px-4 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="text-center mb-32 md:mb-52">
          <div className="mb-8 inline-flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-full shadow-xl border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping"></span>
              <span className="text-[9px] md:text-[11px] font-syncopate font-bold tracking-[0.4em] text-white">FUTURE_RESEARCH_CAMPAIGN</span>
          </div>
          
          <h2 className="text-6xl md:text-[12rem] font-syncopate font-bold uppercase leading-[0.9] tracking-tighter mb-12">
            หมุนสุ่ม <br/>
            <span className="neon-blue italic">สไตล์</span>
          </h2>
          
          <p className="text-zinc-400 max-w-3xl mx-auto mb-16 text-base md:text-2xl font-light leading-relaxed px-4">
            ร่วมออกแบบมาตรฐาน <span className="text-zinc-900 font-bold">"ความพอดี"</span> สำหรับคนไทยในคอลเลกชันปี 2026 พร้อมลุ้นรับรางวัลสุดพิเศษทันทีที่ร่วมรายการ
          </p>

          <a href="#game" className="inline-block btn-chrome px-12 py-6 rounded-full font-syncopate font-bold text-sm tracking-[0.4em] uppercase shadow-2xl">
            เริ่มร่วมสนุก
          </a>
        </section>

        {/* Brand Mission Section */}
        <section id="mission" className="w-full py-24 md:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-zinc-100">
            <div className="space-y-10 order-2 lg:order-1">
              <h4 className="text-[10px] font-syncopate font-bold text-[#0088cc] tracking-[0.5em] uppercase">01 / THE_VISION</h4>
              <h3 className="text-4xl md:text-7xl font-syncopate font-bold tracking-tighter leading-none">BEYOND <br/> SIZING</h3>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-light">
                เพราะเสื้อผ้าไม่ใช่แค่เครื่องนุ่งห่ม แต่คือความมั่นใจ เราจึงทุ่มเทวิจัยสรีระเพื่อสร้างเสื้อยืดที่ใส่สบายที่สุด 
                ข้อมูลของคุณจะช่วยขับเคลื่อนนวัตกรรม <span className="text-zinc-900 font-bold italic">Ultra Flow 2026</span> ให้เป็นจริง
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-100 pt-10">
                <div>
                  <p className="text-3xl font-syncopate font-bold text-zinc-900">100%</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Data Driven</p>
                </div>
                <div>
                  <p className="text-3xl font-syncopate font-bold text-zinc-900">FUTURE</p>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Ready Design</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-zinc-200 shadow-2xl order-1 lg:order-2">
               <img 
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90" 
                className="w-full h-full object-cover grayscale brightness-110 hover:scale-110 transition-transform duration-1000" 
                alt="Yuedpao Streetwear"
               />
               <div className="absolute inset-0 bg-[#0088cc]/10 mix-blend-multiply"></div>
            </div>
        </section>

        {/* Spin Wheel Section - Simplified & Professional */}
        <section id="game" className="w-full flex flex-col items-center py-24 md:py-40 mb-32 relative bg-white rounded-[4rem] md:rounded-[8rem] border border-zinc-100 shadow-[0_40px_120px_rgba(0,0,0,0.03)] overflow-hidden">
          
          <div className="mb-16 md:mb-24 text-center max-w-2xl px-6">
            <h4 className="text-[10px] font-syncopate font-bold text-[#0088cc] tracking-[0.5em] uppercase mb-6">02 / LUCKY_SPIN</h4>
            <h3 className="text-3xl md:text-6xl font-syncopate font-bold mb-6 tracking-tighter text-zinc-900">วงล้อแห่งอนาคต</h3>
            <p className="text-zinc-400 text-base md:text-xl font-medium">สุ่มรับของรางวัลและรับสิทธิ์ร่วมโครงการวิจัยสรีระ</p>
          </div>

          <div className="scale-75 sm:scale-90 md:scale-100">
            <SpinWheel rotation={rotation} />
          </div>

          <div className="mt-16 md:mt-32 w-full max-w-md px-6">
             <button 
                onClick={handleSpinStart}
                disabled={gameState !== GameState.IDLE}
                className="w-full btn-chrome py-7 md:py-9 rounded-2xl md:rounded-full font-syncopate font-bold text-white uppercase tracking-[0.4em] shadow-2xl active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-xs md:text-base"
             >
                {gameState === GameState.SPINNING ? 'กำลังประมวลผล...' : 'เริ่มหมุนวงล้อ'}
             </button>
          </div>
        </section>

      </main>

      {/* Cookie / PDPA Consent Banner */}
      {showCookieConsent && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-full duration-700">
          <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-2xl border border-zinc-200 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-grow space-y-4 text-center lg:text-left">
              <h4 className="text-[#0088cc] font-syncopate font-black text-[10px] tracking-widest uppercase">Privacy First</h4>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">เราดูแลข้อมูลของคุณเหมือนเพื่อนสนิท</h2>
              <p className="text-zinc-500 text-sm md:text-lg leading-relaxed">
                Yuedpao Labs จัดเก็บข้อมูลเพื่อใช้ใน <span className="font-bold text-zinc-900">การวิจัยโปรเจกต์ Ultra Flow 2026</span> เท่านั้น ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน PDPA
              </p>
              <button onClick={() => setShowFullPrivacy(!showFullPrivacy)} className="text-[10px] font-bold text-[#0088cc] hover:underline uppercase tracking-widest">
                ดูรายละเอียดนโยบาย
              </button>
              {showFullPrivacy && (
                <div className="mt-4 p-4 bg-zinc-50 rounded-2xl text-[10px] text-zinc-400 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
                  ข้อมูลที่จัดเก็บ: ชื่อ-นามสกุล, ข้อมูลติดต่อ, สัดส่วนร่างกาย และความชอบส่วนบุคคล เพื่อวัตถุประสงค์ในการวิจัยและส่งมอบของรางวัลเท่านั้น เราจะไม่เปิดเผยข้อมูลให้บุคคลที่สามโดยไม่ได้รับอนุญาต
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-[320px]">
              <button onClick={acceptCookies} className="w-full bg-zinc-900 text-white font-syncopate font-bold py-6 rounded-2xl hover:bg-black transition-all shadow-xl text-xs tracking-[0.2em] uppercase">
                ยอมรับและไปต่อ
              </button>
              <button onClick={() => setShowCookieConsent(false)} className="w-full border border-zinc-100 text-zinc-400 py-4 rounded-2xl hover:bg-zinc-50 transition-all text-[10px] font-bold uppercase tracking-widest">
                ไม่สะดวกให้ข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {gameState === GameState.COLLECTING_DATA && winningPrize && (
        <DataModal prize={winningPrize} onSubmit={handleFormSubmit} />
      )}

      {/* Success View */}
      {gameState === GameState.SUCCESS && winningPrize && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-white/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-500">
          <div className="w-full max-w-2xl text-center bg-white p-10 md:p-24 rounded-[4rem] md:rounded-[6rem] shadow-[0_60px_150px_rgba(0,0,0,0.1)] border border-zinc-100 relative overflow-hidden group">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent animate-scanline-fast"></div>

            <div className="relative z-10">
              <div className="w-28 h-28 md:w-44 md:h-44 bg-gradient-to-br from-[#00f3ff] to-[#0088cc] rounded-[2.5rem] md:rounded-[4rem] mx-auto flex items-center justify-center mb-10 shadow-[0_30px_70px_rgba(0,136,204,0.3)] animate-bounce-slow">
                  <svg className="w-14 h-14 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
              </div>

              <h4 className="text-[#0088cc] font-syncopate font-black text-[10px] tracking-[0.5em] mb-4 uppercase">Registration Complete</h4>
              <h2 className="text-4xl md:text-7xl font-syncopate font-bold mb-8 tracking-tighter text-zinc-900 uppercase leading-[0.9]">ยินดีด้วย! <br/> รับรางวัล</h2>
              
              <p className="text-zinc-500 mb-12 text-sm md:text-2xl leading-relaxed font-light">
                  คุณได้รับ <span className="text-[#0088cc] font-black italic underline decoration-2 decoration-offset-4">{winningPrize.label}</span> <br/>
                  ขอบคุณที่ร่วมเป็นส่วนหนึ่งของการวิจัยสรีระกับเรา
              </p>
              
              {/* Reward Code - Optimized size according to user request */}
              <div 
                  onClick={copyToClipboard}
                  className="bg-slate-50 border-2 border-dashed border-zinc-200 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] mb-12 relative cursor-pointer hover:border-[#0088cc] transition-all group/code"
              >
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 px-8 py-2 rounded-full text-[8px] md:text-[10px] text-[#00f3ff] font-syncopate font-black tracking-widest shadow-xl">
                      REWARD_CODE
                  </span>
                  <p className="text-xl md:text-3xl font-mono font-bold tracking-[0.5em] text-zinc-900 group-hover/code:text-[#0088cc] transition-colors uppercase">
                    {config.rewardCode}
                  </p>
                  <p className="mt-3 text-[9px] text-zinc-400 font-syncopate tracking-widest uppercase">Click to copy code</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                 <button onClick={() => window.open('https://yuedpao.com', '_blank')} className="btn-chrome text-white font-syncopate font-bold py-6 rounded-2xl md:rounded-full uppercase tracking-widest text-[10px] md:text-xs shadow-xl">
                    ไปที่ร้านค้าออนไลน์
                 </button>
                 <button onClick={() => setGameState(GameState.IDLE)} className="bg-zinc-50 text-zinc-400 font-syncopate font-bold py-6 rounded-2xl md:rounded-full uppercase tracking-widest text-[10px] hover:text-zinc-900 transition-colors">
                    กลับสู่หน้าหลัก
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative border-t border-zinc-100 py-32 md:py-52 px-6 bg-white text-center">
          <h4 className="font-syncopate text-3xl md:text-7xl font-bold mb-6 tracking-[0.5em] text-zinc-900">YU<span className="text-[#0088cc]">ED</span>PAO</h4>
          <p className="text-zinc-400 text-xs md:text-xl max-w-xl mx-auto font-medium mb-20 leading-relaxed uppercase tracking-[0.2em]">
            นวัตกรรมเสื้อยืดไทยที่ออกแบบมาเพื่อคุณโดยเฉพาะ <br/> ขับเคลื่อนด้วยข้อมูลจาก Yuedpao Labs
          </p>
          <div className="flex justify-center gap-10 mb-20 text-[10px] font-syncopate font-bold tracking-widest text-zinc-400 uppercase">
             <a href="#" className="hover:text-black transition-colors">Instagram</a>
             <a href="#" className="hover:text-black transition-colors">TikTok</a>
             <a href="#" className="hover:text-black transition-colors">Facebook</a>
          </div>
          <div className="pt-10 border-t border-zinc-50">
              <p className="text-[8px] md:text-[10px] text-zinc-300 font-syncopate uppercase tracking-[0.6em]">© 2026 YUEDPAO STREETWEAR LABS | ALL RIGHTS RESERVED</p>
          </div>
      </footer>
    </div>
  );
};

export default App;
