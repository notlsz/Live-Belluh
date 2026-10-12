import React, { useEffect, useState } from 'react';
import { Menu, X, Mic, Image as ImageIcon, Lock, Globe } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onShowLegal: (type: 'tos' | 'privacy') => void;
  onGoToAbout: () => void;
}

// Brand tokens. Pink and sky are also the two partners: pink is always Maya, sky is always Dan.
const C = {
  pink: '#f0addd',
  pinkInk: '#b4508f',
  pinkWash: '#fdf1f9',
  sky: '#CDE9F2',
  skyInk: '#3f7a8f',
  skyWash: '#f1f9fc',
  slate: '#9bbecb',
  paper: '#fcfcfc',
  ink: '#0f172a',
};

const Avatar = ({ who }: { who: 'maya' | 'dan' }) => (
  <span
    aria-hidden="true"
    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
    style={who === 'maya'
      ? { background: C.pink, color: '#5e1c43' }
      : { background: C.sky, color: '#164e63' }}
  >
    {who === 'maya' ? 'M' : 'D'}
  </span>
);

const Entry = ({ who, time, text, className = '', style }: { who: 'maya' | 'dan'; time: string; text: string; className?: string; style?: React.CSSProperties }) => (
  <figure
    className={`bl-rise rounded-[28px] bg-white p-6 md:p-7 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.04] ${className}`}
    style={style}
  >
    <figcaption className="mb-4 flex items-center gap-3">
      <Avatar who={who} />
      <span className="text-sm font-semibold text-slate-800">{who === 'maya' ? 'Maya' : 'Dan'}</span>
      <span className="text-sm text-slate-400">{time}</span>
    </figcaption>
    <blockquote className="font-serif text-[17px] leading-[1.75] text-slate-700">{text}</blockquote>
  </figure>
);

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onShowLegal, onGoToAbout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<'shared' | 'private'>('shared');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'How it works', onClick: () => go('how') },
    { label: 'Privacy', onClick: () => go('privacy') },
    { label: 'About', onClick: () => { setMenuOpen(false); onGoToAbout(); } },
  ];

  const primary = 'bl-focus inline-flex items-center justify-center rounded-full font-semibold text-white transition-colors';
  const primaryStyle = { background: C.pinkInk };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-slate-900 antialiased" style={{ background: C.paper }}>
      {/* Two soft clouds, one per partner color */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full blur-[120px]" style={{ background: C.pink, opacity: 0.22 }} />
        <div className="absolute -right-40 top-20 h-[620px] w-[620px] rounded-full blur-[120px]" style={{ background: C.sky, opacity: 0.55 }} />
      </div>

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300 ${scrolled ? 'bg-white/85 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl' : ''}`}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8" aria-label="Main">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bl-focus rounded-md font-serif text-[22px] font-bold tracking-tight" style={{ color: C.slate }}>
            Belluh
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(l => (
              <button key={l.label} onClick={l.onClick} className="bl-focus rounded-md text-[15px] text-slate-600 transition-colors hover:text-slate-900">{l.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={onLogin} className="bl-focus hidden rounded-full px-4 py-2 text-[15px] font-medium text-slate-700 hover:text-slate-900 md:inline-flex">Sign in</button>
            <button onClick={onGetStarted} className={`${primary} h-10 px-5 text-[15px] hover:brightness-110`} style={primaryStyle}>Start free</button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="bl-focus inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 md:hidden" style={{ background: C.skyWash }}>
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] bg-white transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <div className="flex h-16 items-center justify-between px-4">
          <span className="font-serif text-[22px] font-bold tracking-tight" style={{ color: C.slate }}>Belluh</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="bl-focus inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700"><X size={20} /></button>
        </div>
        <div className="flex flex-col gap-2 px-6 pt-8">
          {navLinks.map(l => (
            <button key={l.label} onClick={l.onClick} className="bl-focus rounded-md py-3 text-left font-serif text-3xl text-slate-800">{l.label}</button>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
          <button onClick={() => { setMenuOpen(false); onGetStarted(); }} className={`${primary} h-14 text-base`} style={primaryStyle}>Start free</button>
          <button onClick={() => { setMenuOpen(false); onLogin(); }} className="bl-focus h-14 rounded-full bg-slate-100 text-base font-semibold text-slate-800">Sign in</button>
        </div>
      </div>

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-32 md:px-8 md:pt-44 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-32">
          <div className="max-w-xl">
            <h1 className="font-serif text-[44px] font-bold leading-[1.08] tracking-[-0.02em] text-slate-900 md:text-[64px]">
              The journal you keep together.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
              You each write a few lines a day. Every Sunday, Belluh reads both sides and gives you one thing to understand and one thing to try.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={onGetStarted} className={`${primary} h-14 px-8 text-base hover:brightness-110`} style={primaryStyle}>Start free</button>
              <button onClick={onLogin} className="bl-focus h-14 rounded-full px-6 text-base font-medium text-slate-600 hover:text-slate-900">I have an account</button>
            </div>
            <p className="mt-5 text-sm text-slate-500">Free to start. Invite your partner in one link.</p>
          </div>

          {/* The product, shown: two sides of one Tuesday, then Sunday's insight */}
          <div className="relative" aria-label="Example: two entries about the same evening, and the weekly insight Belluh writes from them">
            <div className="grid gap-4 sm:grid-cols-2">
              <Entry who="maya" time="Tue, 10:42 pm" text="He was quiet at dinner again. I asked if he was okay and he said “fine.” I can’t tell if it’s work or me." style={{ animationDelay: '0.1s' }} />
              <Entry who="dan" time="Tue, 11:15 pm" text="Brutal day. Didn’t want to bring it home, so I said nothing. I could tell Maya was hurt." className="sm:mt-10" style={{ animationDelay: '0.45s' }} />
            </div>
            <div
              className="bl-rise relative mt-4 overflow-hidden rounded-[28px] p-6 md:p-8 text-slate-800"
              style={{ animationDelay: '0.9s', background: `linear-gradient(120deg, ${C.pinkWash} 0%, #ffffff 50%, ${C.skyWash} 100%)`, boxShadow: '0 30px 70px -30px rgba(15,23,42,0.25), inset 0 0 0 1px rgba(15,23,42,0.05)' }}
            >
              <p className="text-sm font-semibold" style={{ color: C.slate }}>Sunday, from Belluh</p>
              <p className="mt-3 font-serif text-xl leading-snug md:text-[22px]">
                You both wrote about the same dinner. Dan went quiet to protect you; Maya read the quiet as distance. It happened twice this week.
              </p>
              <div className="mt-5 flex gap-3 border-t border-slate-900/[0.06] pt-5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: C.pinkInk }} aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-slate-600"><span className="font-semibold text-slate-800">Try this week:</span> before going quiet, Dan says “Rough day, I need ten minutes.” That’s all.</p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-400 lg:text-left">An example week. Your insights come from your own entries.</p>
          </div>
        </section>

        {/* How it works: a real sequence, so it's numbered */}
        <section id="how" className="scroll-mt-24 border-t border-slate-900/[0.05] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
            <h2 className="max-w-2xl font-serif text-[34px] font-bold leading-tight tracking-[-0.015em] md:text-5xl">Two minutes a day. One honest read a week.</h2>
            <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {[
                { n: '1', t: 'Invite your partner', d: 'Send one link. Your entries stay in a space only the two of you share.' },
                { n: '2', t: 'Write, talk or snap', d: 'Type a few lines, record a voice note that Belluh transcribes, or add a photo. Each entry is shared or private, your call.' },
                { n: '3', t: 'Read Sunday’s insight', d: 'Belluh reads both sides of the week and gives you one pattern it noticed and one small thing to try.' },
              ].map(s => (
                <li key={s.n} className="relative">
                  <span className="font-serif text-6xl font-light leading-none" style={{ color: C.pink }}>{s.n}</span>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{s.t}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-slate-600">{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: C.skyWash }}><Mic size={15} style={{ color: C.skyInk }} /> Voice notes, transcribed</span>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: C.pinkWash }}><ImageIcon size={15} style={{ color: C.pinkInk }} /> Photos</span>
            </div>
          </div>
        </section>

        {/* Privacy, stated plainly */}
        <section id="privacy" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl px-4 md:px-8 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-serif text-[34px] font-bold leading-tight tracking-[-0.015em] md:text-5xl">Some things are just for you.</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                Before you save an entry, choose who sees it. Shared entries go to your partner. Private ones stay with you.
              </p>
              <ul className="mt-8 max-w-lg space-y-4 text-[16px] leading-relaxed text-slate-600">
                <li className="flex gap-3"><Lock size={18} className="mt-1 shrink-0" style={{ color: C.skyInk }} />Encrypted in storage and in transit. Your entries are never sold.</li>
                <li className="flex gap-3"><Globe size={18} className="mt-1 shrink-0" style={{ color: C.skyInk }} /><span>Insights are written by Google’s Gemini models, which process your entries to write them. <button onClick={() => onShowLegal('privacy')} className="bl-focus inline rounded p-0 text-left underline decoration-slate-300 underline-offset-4 hover:text-slate-900">Read the privacy policy</button></span></li>
              </ul>
            </div>

            {/* Interactive: the real share/private switch from the composer */}
            <div className="rounded-[32px] bg-white p-6 shadow-[0_30px_70px_-34px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/[0.04] md:p-8">
              <div className="flex items-center gap-3">
                <Avatar who="maya" />
                <span className="text-sm font-semibold text-slate-800">Maya</span>
                <span className="text-sm text-slate-400">Thu, 8:05 am</span>
              </div>
              <p className="mt-4 font-serif text-[17px] leading-[1.75] text-slate-700">
                I’m nervous about meeting his parents next month. Haven’t told him yet.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1" role="radiogroup" aria-label="Who sees this entry">
                {(['shared', 'private'] as const).map(m => (
                  <button
                    key={m}
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => setMode(m)}
                    className={`bl-focus flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {m === 'shared' ? <Globe size={15} /> : <Lock size={15} />}
                    {m === 'shared' ? 'Share' : 'Private'}
                  </button>
                ))}
              </div>
              <p className="mt-4 min-h-[48px] text-[15px] leading-relaxed text-slate-500" aria-live="polite">
                {mode === 'shared' ? 'Dan will see this in your shared journal tonight.' : 'Only Maya will see this.'}
              </p>
            </div>
          </div>
        </section>

        {/* Two things people keep: the future letter and the dates */}
        <section className="border-t border-slate-900/[0.05] bg-white py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="max-w-2xl font-serif text-[34px] font-bold leading-tight tracking-[-0.015em] md:text-5xl">It remembers, so you can just live it.</h2>
            <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <article className="rounded-[32px] p-8 md:p-12" style={{ background: C.pinkWash }}>
                <h3 className="text-xl font-semibold text-slate-900">A letter from the two of you, five years on</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">Belluh reads where you are now and writes back from where it leads, honestly, in your own voice.</p>
                <div className="mt-8 rounded-[24px] bg-white p-6 md:p-8 shadow-[0_20px_50px_-30px_rgba(180,80,143,0.45)]">
                  <p className="font-serif text-[18px] italic leading-[1.8] text-slate-700">
                    Dear us. Remember the year Dan learned to say “I need ten minutes” instead of disappearing? It sounds small. It was the year we stopped guessing at each other.
                  </p>
                </div>
              </article>
              <article className="rounded-[32px] p-8 md:p-12" style={{ background: C.skyWash }}>
                <h3 className="text-xl font-semibold text-slate-900">Every date that matters</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">Anniversaries, birthdays, the night you met. Belluh keeps them and brings them back.</p>
                <dl className="mt-8 divide-y divide-slate-900/[0.06] rounded-[24px] bg-white px-6 shadow-[0_20px_50px_-30px_rgba(63,122,143,0.45)]">
                  {[
                    ['Anniversary', 'in 12 days'],
                    ['Maya’s birthday', 'May 12'],
                    ['The night you met', '3 years ago today'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 py-4">
                      <dt className="font-serif text-[16px] text-slate-800">{k}</dt>
                      <dd className="text-sm font-medium" style={{ color: C.skyInk }}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative overflow-hidden px-4 py-28 text-center md:px-8 md:py-36">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]" style={{ background: `linear-gradient(90deg, ${C.pink}, ${C.sky})`, opacity: 0.35 }} />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-[36px] font-bold leading-tight tracking-[-0.015em] md:text-[56px]">Start tonight.</h2>
            <p className="mt-5 text-lg text-slate-600">Write one line about today. Send your partner the link. Your first insight arrives on Sunday.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={onGetStarted} className={`${primary} h-14 w-full px-10 text-base hover:brightness-110 sm:w-auto`} style={primaryStyle}>Start free</button>
              <button onClick={onLogin} className="bl-focus h-14 rounded-full px-6 text-base font-medium text-slate-600 hover:text-slate-900">I have an account</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-slate-900/[0.05] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 text-sm text-slate-500 md:flex-row md:items-center md:px-8">
          <span className="font-serif text-lg font-bold" style={{ color: C.slate }}>Belluh</span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <button onClick={onGoToAbout} className="bl-focus rounded hover:text-slate-900">About</button>
            <button onClick={() => onShowLegal('privacy')} className="bl-focus rounded hover:text-slate-900">Privacy</button>
            <button onClick={() => onShowLegal('tos')} className="bl-focus rounded hover:text-slate-900">Terms</button>
          </div>
          <span>© 2026 Belluh Inc.</span>
        </div>
      </footer>

      <style>{`
        .bl-focus:focus-visible { outline: 2px solid ${C.pinkInk}; outline-offset: 3px; }
        @keyframes bl-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .bl-rise { animation: bl-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .bl-rise { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
