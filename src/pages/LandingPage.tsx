import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Lock, Menu, X, Heart, Mic, Image as ImageIcon, CalendarHeart, Mail } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onShowLegal: (type: 'tos' | 'privacy') => void;
  onGoToAbout: () => void;
}

const EntryCard = ({ who, time, text, tone }: { who: string; time: string; text: string; tone: 'pink' | 'blue' }) => (
  <div className={`flex-1 rounded-[2.5rem] p-8 border border-black/5 flex flex-col justify-between gap-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all duration-500 ${tone === 'pink' ? 'bg-[#f7d8ee]' : 'bg-[#CDE9F2]'}`}>
    <span className="text-5xl opacity-50 text-white font-serif leading-none">❝</span>
    <p className={`font-serif text-lg leading-relaxed ${tone === 'pink' ? 'text-[#5e1c43]' : 'text-cyan-950'}`}>{text}</p>
    <div className="flex items-center gap-2 pt-4 border-t border-black/5">
      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
      <div className={`text-[10px] font-bold uppercase tracking-widest ${tone === 'pink' ? 'text-[#831843]' : 'text-cyan-900'}`}>{who} · {time}</div>
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onShowLegal, onGoToAbout }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsNavVisible(!(y > lastScrollY.current && y > 50));
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', onKey); };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    { label: 'How it works', action: () => scrollToSection('how') },
    { label: 'Features', action: () => scrollToSection('features') },
    { label: 'Privacy', action: () => scrollToSection('privacy') },
    { label: 'Our Why', action: () => { setIsMenuOpen(false); onGoToAbout(); } },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans selection:bg-[#f0addd] selection:text-white overflow-x-hidden relative">

      {/* Ambient cloud background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#CDE9F2]/30 rounded-full blur-[120px] animate-float opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#f0addd]/20 rounded-full blur-[130px] animate-pulse-slow opacity-50"></div>
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-white rounded-full blur-[80px] animate-breathing opacity-80 mix-blend-overlay"></div>
      </div>

      {/* Floating pill navbar */}
      <div className={`fixed top-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50 transition-all duration-500 transform ${isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'}`}>
        <nav className="bg-white/80 backdrop-blur-xl rounded-full shadow-lg shadow-slate-200/50 border border-white pl-6 pr-2 py-2 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bl-focus rounded-full">
            <span className="font-serif text-xl font-bold tracking-tight text-[#9bbecb] drop-shadow-sm" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>Belluh</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onLogin} className="bl-focus hidden sm:block px-4 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Sign in</button>
            <button onClick={onGetStarted} className="bl-focus px-5 h-10 bg-[#f0addd] text-white rounded-full font-bold text-sm hover:bg-[#e57ec3] transition-all active:scale-95 shadow-md shadow-[#f0addd]/30">Start free</button>
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className="bl-focus bg-[#CDE9F2] text-cyan-900 w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg">
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
        </nav>
      </div>

      {/* Full screen menu */}
      <div className={`fixed inset-0 z-[100] bg-white transition-all duration-700 ease-[cubic-bezier(0.32,0.725,0,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} role="dialog" aria-modal="true" aria-hidden={!isMenuOpen}>
        <div className="flex flex-col h-full p-6 md:p-12 relative max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#9bbecb]">Belluh</span>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="bl-focus bg-slate-50 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-100">
              <X size={24} strokeWidth={2} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start gap-4 md:gap-8 pl-2">
            {menuItems.map((item, idx) => (
              <button key={item.label} onClick={item.action} className="bl-focus group relative flex items-start gap-6 text-left w-full md:w-auto rounded-xl">
                <span className="text-xs font-bold text-slate-200 group-hover:text-[#9bbecb] mt-2 md:mt-4 transition-colors duration-300">0{idx + 1}</span>
                <span className="text-5xl md:text-8xl font-serif font-medium text-slate-300 group-hover:text-[#9bbecb] tracking-tighter transition-all duration-300 leading-[0.9] group-hover:translate-x-2">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-auto pt-8 w-full max-w-md">
            <button onClick={() => { setIsMenuOpen(false); onLogin(); }} className="bl-focus w-full py-4 rounded-full bg-slate-50 font-bold text-slate-900 hover:bg-slate-100 transition-colors text-lg border border-slate-100">Sign In</button>
            <button onClick={() => { setIsMenuOpen(false); onGetStarted(); }} className="bl-focus w-full py-4 rounded-full bg-[#9bbecb] text-white font-bold hover:bg-[#8aaab7] transition-colors shadow-xl text-lg flex items-center justify-center gap-2">Join Belluh <ArrowRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-44 pb-20 md:pt-56 md:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-slate-900 tracking-tight drop-shadow-sm">
            <span className="text-[#9bbecb]">The AI journal</span> <br /> <span className="text-[#f0addd] italic">for couples.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            You each write a few lines a day. Every Sunday, Belluh reads both sides and gives you one thing to understand and one thing to try.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onGetStarted} className="bl-focus w-full sm:w-auto px-10 py-4 bg-[#f0addd] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e57ec3] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#f0addd]/30">
              <span>Start Your Journey</span><ArrowRight size={16} />
            </button>
            <button onClick={onLogin} className="bl-focus w-full sm:w-auto px-10 py-4 bg-white/80 backdrop-blur-sm text-slate-600 border border-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-[#f0addd] hover:shadow-lg transition-all">
              I have an account
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-400">Free to start. Invite your partner with one link.</p>
        </div>
      </section>

      {/* Demo: two sides of one evening, then Sunday's insight */}
      <section className="relative z-10 px-6 pb-24 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tighter">Two sides of the same day.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
              Maya and Dan each wrote about Tuesday's dinner. Neither saw the other's entry. Belluh saw both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 flex flex-col gap-6">
              <EntryCard tone="pink" who="Maya" time="Tue 10:42 pm" text="He was quiet at dinner again. I asked if he was okay and he said “fine.” I can't tell if it's work or me." />
              <EntryCard tone="blue" who="Dan" time="Tue 11:15 pm" text="Brutal day. Didn't want to bring it home, so I said nothing. I could tell Maya was hurt." />
            </div>

            <div className="md:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-between relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#CDE9F2]/30 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm text-[#f0addd]">
                    <Sparkles size={18} className="fill-[#f0addd]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sunday Insight</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-[1.15] mb-6 tracking-tight">
                  “Dan went quiet to protect you. Maya read the quiet as distance.”
                </h3>
                <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-light">
                  You both wrote about the same dinner, and it happened twice this week.
                </p>
              </div>
              <div className="relative z-10 mt-10 bg-[#fcfcfc] border border-slate-100 rounded-3xl p-6 flex gap-4 items-start">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#f0addd] flex items-center justify-center text-white"><Heart size={14} className="fill-white" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Try this week</div>
                  <p className="font-serif text-lg leading-relaxed text-slate-800">Before going quiet, Dan says “Rough day, I need ten minutes.” That's all.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">An example week. Your insights come from your own entries.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-semibold text-slate-900 mb-16 tracking-tighter text-center">Two minutes a day.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Invite your partner', d: 'Send one link. Your entries live in a space only the two of you share.' },
              { t: 'Write, say or snap it', d: 'A few lines, a voice note Belluh transcribes, or a photo. Each entry is shared or private.' },
              { t: 'Read Sunday’s insight', d: 'One pattern Belluh noticed across both your weeks, and one small thing to try.' },
            ].map((s, i) => (
              <div key={s.t} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)]">
                <span className="text-xs font-bold text-[#9bbecb]">0{i + 1}</span>
                <h3 className="mt-4 text-2xl md:text-3xl font-serif font-semibold text-slate-900 tracking-tight">{s.t}</h3>
                <p className="mt-4 text-lg text-slate-500 leading-relaxed font-light">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-32 px-6 bg-slate-50/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-32">

          {/* The future letter */}
          <div className="group relative bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-slate-200/50 border border-white overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#f0addd]/20 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10 md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-8">
                <Mail size={14} className="text-[#f0addd]" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Future Letter</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-semibold tracking-tighter text-slate-900 mb-6">
                A letter from <br /> <span className="text-[#9bbecb]">five years on.</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light max-w-lg">
                Belluh reads where you are now and writes back from where it leads. Honestly, in your own voice.
              </p>
            </div>
            <div className="mt-16 md:absolute md:top-1/2 md:right-20 md:-translate-y-1/2 md:w-[26rem]">
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-apple transform rotate-3 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105">
                <p className="font-serif italic text-lg leading-relaxed text-slate-800">
                  Dear us. Remember the year Dan learned to say “I need ten minutes” instead of disappearing? It sounds small. It was the year we stopped guessing at each other.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div id="privacy" className="group relative bg-[#CDE9F2] rounded-[3rem] p-8 md:p-20 shadow-2xl overflow-hidden text-slate-900 transition-transform duration-700 hover:scale-[1.01] scroll-mt-24">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/40 rounded-full blur-[80px] pointer-events-none animate-float"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] bg-white/30 rounded-full blur-[60px] pointer-events-none animate-pulse-slow"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-8 border border-white/40 shadow-sm">
                  <Lock size={14} className="text-cyan-700" />
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-900">Private Vault</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-semibold tracking-tighter text-cyan-950 mb-6">
                  Your safe <br /> <span className="text-cyan-700">haven.</span>
                </h2>
                <p className="text-xl md:text-2xl text-cyan-900/80 leading-relaxed font-light">
                  Every entry is shared or private, your call. Encrypted in storage and in transit, and never sold.
                </p>
                <p className="mt-6 text-base text-cyan-900/70 leading-relaxed">
                  Insights are written by Google's Gemini models, which process your entries to write them.{' '}
                  <button onClick={() => onShowLegal('privacy')} className="bl-focus inline rounded font-bold underline decoration-cyan-900/30 underline-offset-4 hover:text-cyan-950">Privacy policy</button>
                </p>
              </div>
              <div className="relative w-80 h-80 flex items-center justify-center shrink-0" aria-hidden="true">
                <div className="relative animate-float">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/50 blur-[70px] rounded-full"></div>
                  <div className="relative z-10 filter drop-shadow-[0_15px_35px_rgba(50,120,160,0.15)]">
                    <div className="relative w-72 h-56">
                      <div className="absolute bottom-0 left-4 w-32 h-32 bg-white rounded-full"></div>
                      <div className="absolute bottom-2 right-4 w-36 h-36 bg-white rounded-full"></div>
                      <div className="absolute bottom-12 left-16 w-40 h-40 bg-white rounded-full"></div>
                      <div className="absolute bottom-8 right-24 w-28 h-28 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-10 w-52 h-20 bg-white blur-lg rounded-full"></div>
                    </div>
                  </div>
                  <Sparkles className="absolute -top-4 right-10 text-white w-8 h-8 animate-pulse fill-white/60 drop-shadow-sm" />
                  <Sparkles className="absolute bottom-10 -left-6 text-white w-5 h-5 animate-pulse delay-700 fill-white/60 drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Dates + capture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#fcfcfc] rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
                <CalendarHeart size={24} className="text-slate-900" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4 tracking-tight">Every date that matters.</h3>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">Anniversaries, birthdays, the night you met. Belluh keeps them and brings them back.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-bold text-slate-500 shadow-sm">Anniversary in 12 days</span>
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-bold text-slate-500 shadow-sm">First date, 3 years ago today</span>
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
                <Mic size={24} className="text-slate-900" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4 tracking-tight">Say it out loud.</h3>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">Too tired to type? Record a voice note and Belluh writes it down. Add a photo while you're at it.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-bold text-slate-500 shadow-sm inline-flex items-center gap-1.5"><Mic size={12} /> Voice notes</span>
                <span className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-bold text-slate-500 shadow-sm inline-flex items-center gap-1.5"><ImageIcon size={12} /> Photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-[#f0addd]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
            <Heart size={24} className="text-[#f0addd] fill-[#f0addd]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 leading-tight mb-6 tracking-tight drop-shadow-sm">
            <span className="text-[#9bbecb]">Start tonight.</span> <span className="text-[#f0addd] italic">Together.</span>
          </h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed mb-10">Write one line about today. Send your partner the link. Your first insight arrives on Sunday.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onGetStarted} className="bl-focus w-full sm:w-auto px-10 py-4 bg-[#f0addd] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#e57ec3] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#f0addd]/30">
              <span>Start Your Journey</span><ArrowRight size={16} />
            </button>
            <button onClick={onLogin} className="bl-focus w-full sm:w-auto px-10 py-4 bg-white/80 backdrop-blur-sm text-slate-600 border border-white rounded-full font-bold text-sm hover:bg-white hover:text-[#f0addd] hover:shadow-lg transition-all">
              I have an account
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-10 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bl-focus flex items-center gap-2 group rounded-full transition-all duration-300 hover:opacity-80">
            <Sparkles size={18} className="text-[#f0addd] fill-[#f0addd]/20 transition-transform group-hover:rotate-12" />
            <span className="font-serif font-bold text-slate-600 tracking-tight group-hover:text-slate-900 transition-colors">Belluh AI</span>
          </button>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={onGoToAbout} className="bl-focus rounded hover:text-slate-600 transition-colors">About</button>
            <button onClick={() => onShowLegal('tos')} className="bl-focus rounded hover:text-slate-600 transition-colors">Terms</button>
            <button onClick={() => onShowLegal('privacy')} className="bl-focus rounded hover:text-slate-600 transition-colors">Privacy</button>
          </div>
          <div className="text-xs text-slate-400 font-bold tracking-wide">© 2026 Belluh Inc.</div>
        </div>
      </footer>

      <style>{`
        .bl-focus:focus-visible { outline: 2px solid #9bbecb; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-pulse-slow, .animate-breathing, .animate-slide-up, .animate-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
