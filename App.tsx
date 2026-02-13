
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Error loading config:", err));

    const consent = localStorage.getItem('yuedpao-cookie-consent');
    if (!consent) {
      setTimeout(() => setShowCookieConsent(true), 1000);
    }
  }, []);

  const handleSpinStart = () => {
    if (gameState !== GameState.IDLE || !config) return;
    setGameState(GameState.SPINNING);
    
    const prizes = config.prizes;
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];
    
    const sliceAngle = 360 / prizes.length;
    const extraSpins = 10; // เพิ่มรอบหมุนให้ดูตื่นเต้นขึ้น
    
    // คำนวณให้เข็มชี้ (ที่อยู่ด้านบนสุด) ตรงกับกลางช่องรางวัลพอดี
    // วงล้อหมุนตามเข็มนาฬิกา ดังนั้นต้องหมุนกลับไปหา Index ที่ต้องการ
    const currentRotationBase = Math.floor(rotation / 360) * 360;
    const targetRotation = currentRotationBase + (extraSpins * 360) + (360 - (randomIndex * sliceAngle + sliceAngle / 2));
    
    setRotation(targetRotation);

    setTimeout(() => {
      setWinningPrize(prize);
      setGameState(GameState.WON);
      setTimeout(() => {
        setGameState(GameState.COLLECTING_DATA);
      }, 1500);
    }, 7000); // แมตช์กับ transition duration ใน SpinWheel
  };

  const handleFormSubmit = (data: Partial<UserPreference>) => {
    console.log("Research Data Collected:", data);
    setGameState(GameState.SUCCESS);
  };

  const handleSkip = () => {
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

  const resetGame = () => {
    setGameState(GameState.IDLE);
    setWinningPrize(null);
    setRotation(0);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  if (!config) return <div className="min-h-screen bg-white flex items-center justify-center font-syncopate text-[10px] tracking-[0.5em] animate-pulse">YU<span className="text-[#0088cc]">ED</span>PAO_LABS...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-[#00f3ff] selection:text-white flex flex-col font-inter">
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>

      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center bg-white/60 backdrop-blur-md border-b border-zinc-100">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-black flex items-center justify-center font-syncopate font-bold text-white rounded-xl shadow-lg text-lg">Y</div>
          <h1 className="font-syncopate text-xl font-bold tracking-[0.3em] text-zinc-900">
            YU<span className="text-[#0088cc]">ED</span>PAO
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-syncopate font-bold tracking-widest text-zinc-400">
           <a href="#mission" className="hover:text-black transition-colors uppercase">THE_MISSION</a>
           <div className="text-[#0088cc] px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 uppercase">Ultra Flow 2026</div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow">
        <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
          <div className="text-center mb-16 max-w-4xl animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full shadow-sm border border-zinc-100">
                <span className="w-2 h-2 rounded-full bg-[#0088cc] animate-pulse"></span>
                <span className="text-[9px] font-syncopate font-bold tracking-[0.4em] text-zinc-400 uppercase">Future Labs Campaign</span>
            </div>
            <h2 className="text-5xl md:text-9xl font-syncopate font-black uppercase leading-[0.85] tracking-tighter mb-8">
              หมุนสุ่ม <br/>
              <span className="text-[#0088cc] italic text-glow-blue">สไตล์</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed">
              ร่วมออกแบบมาตรฐาน <span className="text-zinc-900 font-bold">"ความพอดี"</span> สำหรับคนไทย <br/> พร้อมรับสิทธิ์ลุ้นรับรางวัลทันที
            </p>
          </div>

          <div className="relative group mb-12 animate-in fade-in zoom-in duration-1000 delay-200">
            <SpinWheel rotation={rotation} />
            
            <div className="mt-16 flex flex-col items-center">
              <button 
                onClick={handleSpinStart}
                disabled={gameState !== GameState.IDLE}
                className="btn-chrome px-16 py-7 rounded-full font-syncopate font-bold text-white uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(0,136,204,0.3)] active:scale-95 disabled:opacity-30 disabled:grayscale transition-all text-sm md:text-base group"
              >
                <span className="relative z-10">{gameState === GameState.SPINNING ? 'Processing...' : 'เริ่มหมุนวงล้อ'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </section>

        <section id="mission" className="w-full py-40 bg-white border-y border-zinc-100 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                  <h4 className="text-[10px] font-syncopate font-bold text-[#0088cc] tracking-[0.5em] uppercase">01 / The Vision</h4>
                  <h3 className="text-5xl md:text-7xl font-syncopate font-black tracking-tighter leading-[0.9]">BEYOND <br/> SIZING</h3>
                  <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
                    เสื้อยืดที่คุณใส่ต้องไม่ใช่แค่ขนาด แต่คือ <span className="text-black font-semibold">ความรู้สึก</span> เราทุ่มเทวิจัยสรีระเพื่อให้ได้ทรงที่ใช่ที่สุดสำหรับทุกคน
                  </p>
                </div>
                <div className="rounded-[4rem] overflow-hidden shadow-2xl aspect-video relative group">
                   <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200" 
                    className="w-full h-full object-cover grayscale brightness-110 group-hover:scale-105 transition-transform duration-1000" 
                    alt="Yuedpao"
                   />
                </div>
            </div>
        </section>
      </main>

      {showCookieConsent && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
          <div className="max-w-6xl mx-auto bg-white rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-zinc-50 p-10 md:p-14 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-grow space-y-5 text-center lg:text-left">
              <h4 className="text-[#0088cc] font-syncopate font-bold text-[10px] tracking-[0.2em] uppercase">Privacy First</h4>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">เราดูแลข้อมูลของคุณเหมือนเพื่อนสนิท</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Yuedpao Labs จัดเก็บข้อมูลเพื่อใช้ใน <span className="font-bold text-zinc-900">การวิจัยโปรเจกต์ Ultra Flow 2026</span> เท่านั้น ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุดตามมาตรฐาน PDPA
              </p>
              <button onClick={() => setShowFullPrivacy(!showFullPrivacy)} className="text-sm font-semibold text-[#0088cc] hover:underline transition-all">
                รายละเอียดนโยบาย
              </button>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-[280px]">
              <button 
                onClick={acceptCookies} 
                className="w-full bg-[#111111] text-white font-bold py-6 rounded-[1.5rem] hover:bg-black transition-all shadow-lg text-lg"
              >
                ยอมรับและไปต่อ
              </button>
              <button 
                onClick={() => setShowCookieConsent(false)} 
                className="w-full bg-zinc-50/50 text-zinc-400 font-medium py-4 rounded-[1.5rem] hover:bg-zinc-100 transition-all text-base"
              >
                ไม่สะดวกให้ข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === GameState.COLLECTING_DATA && winningPrize && (
        <DataModal 
          prize={winningPrize} 
          onSubmit={handleFormSubmit} 
          onSkip={handleSkip} 
        />
      )}

      {gameState === GameState.SUCCESS && winningPrize && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-white/95 backdrop-blur-2xl animate-in zoom-in duration-300">
          <div className="w-full max-w-xl text-center bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-zinc-100 relative">
              <div className="w-24 h-24 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-8">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-4xl font-syncopate font-black mb-6 tracking-tighter uppercase leading-none text-zinc-900">SUCCESS!</h2>
              <p className="text-zinc-500 mb-10 text-lg leading-relaxed">
                  คุณได้รับรางวัล <span className="text-[#0088cc] font-black italic">{winningPrize.label}</span> เรียบร้อยแล้ว
              </p>
              <div onClick={copyToClipboard} className="bg-slate-50 p-10 rounded-[2.5rem] mb-10 cursor-pointer border-2 border-dashed border-zinc-200 hover:border-[#0088cc] transition-all group">
                  <p className="text-[10px] font-syncopate font-bold text-zinc-400 mb-3 tracking-widest uppercase">Your Reward Code</p>
                  <p className="text-3xl font-mono font-bold tracking-[0.4em] text-zinc-900 uppercase group-hover:text-[#0088cc] transition-colors">
                    {config.rewardCode}
                  </p>
                  <p className="mt-4 text-[9px] text-zinc-300 font-syncopate tracking-widest uppercase">Click to copy</p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => window.open('https://yuedpao.com', '_blank')} className="btn-chrome text-white font-syncopate font-bold py-6 rounded-full uppercase tracking-widest text-xs shadow-xl">
                    ไปที่ร้านค้าออนไลน์
                </button>
                <button onClick={resetGame} className="text-zinc-400 font-syncopate font-bold py-4 rounded-full uppercase tracking-widest text-[10px] hover:text-black">
                    กลับสู่หน้าหลัก
                </button>
              </div>
          </div>
        </div>
      )}

      <footer className="py-20 px-6 bg-white border-t border-zinc-100 text-center">
          <h4 className="font-syncopate text-2xl font-bold mb-4 tracking-[0.4em]">YU<span className="text-[#0088cc]">ED</span>PAO</h4>
          <p className="text-zinc-300 text-[10px] font-syncopate uppercase tracking-[0.6em]">© 2026 YUEDPAO STREETWEAR LABS</p>
      </footer>
    </div>
  );
};

export default App;
