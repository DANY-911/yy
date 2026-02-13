
import React, { useState } from 'react';
import { Prize, UserPreference } from '../types';

interface DataModalProps {
  prize: Prize;
  onSubmit: (data: Partial<UserPreference>) => void;
  onSkip: () => void;
}

const DataModal: React.FC<DataModalProps> = ({ prize, onSubmit, onSkip }) => {
  const [formData, setFormData] = useState<Partial<UserPreference>>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: 'Other',
    size: 'M',
    style: 'Regular Fit',
    dob: '',
    age: 25
  });
  const [isConsented, setIsConsented] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConsented) {
      alert("โปรดยอมรับเงื่อนไขการเก็บข้อมูลเพื่อดำเนินการต่อ");
      return;
    }
    onSubmit(formData);
  };

  const inputClass = "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] outline-none transition-all placeholder:text-zinc-300";
  const labelClass = "block text-[10px] font-syncopate font-bold text-zinc-400 uppercase tracking-widest mb-2 px-1";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl border border-zinc-100 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-500 my-auto">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-[10px] font-syncopate font-bold text-[#0088cc] tracking-widest uppercase mb-4">
            Step 02: Research Data
          </div>
          <h2 className="text-3xl md:text-5xl font-syncopate font-black tracking-tighter text-zinc-900 mb-4 uppercase">ยืนยันข้อมูล</h2>
          
          {/* Winning Prize Highlight */}
          <div className="mt-4 mb-8 p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0088cc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="text-[10px] font-syncopate font-bold text-zinc-500 mb-2 tracking-[0.2em] uppercase">Congratulations! You won:</p>
            <h3 className="text-2xl md:text-3xl font-syncopate font-black text-[#00f3ff] tracking-tight uppercase">
              {prize.label}
            </h3>
            <div className="absolute top-2 right-4 text-zinc-800 font-syncopate font-black text-6xl select-none opacity-20 pointer-events-none">WIN</div>
          </div>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            กรอกข้อมูลเพื่อช่วยเราพัฒนาไซส์ที่ใช่สำหรับคุณ <br/> 
            หรือ <button onClick={onSkip} className="text-[#0088cc] font-bold hover:underline">กดข้ามเพื่อรับรางวัล</button> ทันที
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className={labelClass}>Full Name</label>
            <input type="text" className={inputClass} placeholder="ชื่อ-นามสกุล" 
              onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Date of Birth</label>
            <input type="date" className={inputClass} 
              onChange={e => setFormData({...formData, dob: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Contact Number</label>
            <input type="tel" className={inputClass} placeholder="08x-xxx-xxxx"
              onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Email Address</label>
            <input type="email" className={inputClass} placeholder="example@mail.com"
              onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className={labelClass}>Current Address</label>
            <textarea className={`${inputClass} h-24 resize-none py-4`} placeholder="ที่อยู่สำหรับจัดส่งรางวัลพิเศษในอนาคต"
              onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Current Size</label>
            <select className={inputClass} onChange={e => setFormData({...formData, size: e.target.value})}>
              <option>S</option><option>M</option><option>L</option><option>XL</option><option>2XL</option>
              <option>3XL</option><option>4XL</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className={labelClass}>Style Preference</label>
            <select className={inputClass} onChange={e => setFormData({...formData, style: e.target.value as any})}>
              <option>Regular Fit</option><option>Oversize</option><option>Slim Fit</option>
            </select>
          </div>

          {/* PDPA Consent Checkbox */}
          <div className="md:col-span-2 mt-4 px-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input 
                  type="checkbox" 
                  checked={isConsented}
                  onChange={(e) => setIsConsented(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-300 bg-zinc-50 transition-all checked:border-[#0088cc] checked:bg-[#0088cc] focus:ring-2 focus:ring-[#0088cc]/20"
                />
                <svg className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-xs text-zinc-500 leading-tight group-hover:text-zinc-700 transition-colors">
                ฉันยินยอมให้ Yuedpao Labs จัดเก็บและใช้ข้อมูลส่วนบุคคลของฉันเพื่อวัตถุประสงค์ในการวิจัยและพัฒนาผลิตภัณฑ์ในโครงการ Ultra Flow 2026 ตามที่ระบุในนโยบายความเป็นส่วนตัว
              </span>
            </label>
          </div>

          <div className="md:col-span-2 pt-6 flex flex-col gap-4">
            <button 
              type="submit" 
              disabled={!isConsented}
              className={`w-full py-6 rounded-2xl font-syncopate font-bold text-sm tracking-[0.3em] uppercase shadow-xl transition-all ${isConsented ? 'btn-chrome hover:scale-[1.02] active:scale-95 text-white opacity-100' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50'}`}
            >
              Submit & Claim Reward
            </button>
            <button type="button" onClick={onSkip} className="w-full py-3 text-[10px] font-syncopate font-bold text-zinc-300 hover:text-zinc-500 uppercase tracking-[0.2em] transition-colors">
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataModal;
