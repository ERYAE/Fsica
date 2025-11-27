/* * ARQUIVO: app.js * */
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowRight, ArrowLeft, Zap, Magnet, Globe, Menu, X, 
  CheckCircle, AlertCircle, RefreshCw, Layers, RotateCw, BookOpen, 
  ChevronRight, ThumbsUp, Activity, Wind, MousePointer2, Lightbulb, Image as ImageIcon,
  Play, Pause, HelpCircle
} from 'lucide-react';

// --- ENGINE TÁTIL ---
const vibrate = (pattern = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

// --- COMPONENTES UI MASTER ---

const Glass = ({ children, className = "", onClick, hover = false }) => (
  <div 
    onClick={onClick}
    className={`
      glass-panel rounded-3xl transition-all duration-300 relative z-10
      ${hover ? 'hover:bg-slate-800/60 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

const NeoButton = ({ children, onClick, active = false, disabled = false, color = "cyan", className = "" }) => {
  const base = "relative px-6 py-4 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group";
  
  const themes = {
    cyan: active 
      ? "bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.4)]" 
      : "bg-slate-800 text-slate-300 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    red: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white",
    green: "bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.4)]"
  };

  const handleClick = (e) => {
    if(!disabled) vibrate(5); // Feedback tátil no clique
    if(onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={`${base} ${themes[color] || themes.cyan} ${className}`}>
      {children}
    </button>
  );
};

const ImageFrame = ({ src, alt, caption, className = "" }) => (
  <div className={`relative group rounded-2xl overflow-hidden bg-black/50 border border-white/10 ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
        <ImageIcon size={32} className="mb-2 opacity-50" />
        <span className="text-[10px] uppercase tracking-widest">Sem Imagem</span>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity p-4 flex items-end">
      <p className="text-white text-xs font-medium translate-y-2 group-hover:translate-y-0 transition-transform">{caption}</p>
    </div>
  </div>
);

// --- SLIDES REFEITOS ---

const CoverSlide = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-enter">
    <div className="relative w-72 h-72 mb-10 group perspective-1000 cursor-pointer" onClick={() => vibrate(50)}>
      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse"></div>
      <div className="relative z-10 animate-float transform-style-3d group-hover:rotate-y-180 transition-transform duration-700">
        <Magnet size={200} className="text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)] mx-auto" strokeWidth={1} />
        <div className="absolute top-0 right-4 animate-bounce bg-black/50 p-3 rounded-full backdrop-blur-md border border-amber-500/30">
           <Zap size={40} className="text-amber-400 fill-amber-400" />
        </div>
      </div>
    </div>
    
    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
      FÍSICA <span className="text-cyan-400 text-glow">M2C</span>
    </h1>
    <p className="text-slate-400 text-xl mb-12 max-w-md mx-auto leading-relaxed">
      Apresentando a <strong className="text-white">Indução Eletromagnética</strong> como você nunca viu.
    </p>
    
    <NeoButton onClick={onNext} active className="text-lg px-12 py-5 w-full md:w-auto">
      INICIAR EXPERIÊNCIA <ArrowRight size={24} />
    </NeoButton>
  </div>
);

const FluxSlide = () => {
  const [angle, setAngle] = useState(0);
  const flux = Math.abs(Math.cos(angle * (Math.PI / 180)));
  const percent = Math.round(flux * 100);

  const handleSlider = (e) => {
    const val = Number(e.target.value);
    setAngle(val);
    if (val % 10 === 0) vibrate(5); // Vibra a cada 10 graus
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full max-w-6xl mx-auto items-center justify-center gap-12 animate-enter">
      {/* Visualizador 3D */}
      <div className="relative w-80 h-80 lg:w-96 lg:h-96 shrink-0 perspective-1000">
         <div className="absolute inset-0 rounded-full border-2 border-slate-700 bg-slate-900/50 shadow-[inset_0_0_60px_black] flex items-center justify-center overflow-hidden">
             {/* Linhas de Fluxo */}
             <div className="absolute inset-0 flex flex-col justify-evenly opacity-30 pointer-events-none">
               {[...Array(7)].map((_,i) => (
                 <div key={i} className="w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_cyan]"></div>
               ))}
             </div>
             {/* Espira Giratória */}
             <div 
               className="w-64 h-64 rounded-full border-[12px] border-amber-500 bg-amber-500/10 shadow-[0_0_60px_rgba(245,158,11,0.4)] transition-transform duration-100 ease-out flex items-center justify-center"
               style={{ transform: `rotateY(${angle}deg)` }}
             >
               <div className="w-1 h-full bg-red-500/50 absolute top-0 left-1/2 -translate-x-1/2"></div>
             </div>
         </div>
         <div className="absolute bottom-6 w-full text-center font-mono text-xs text-slate-500 uppercase">Visualização de Corte</div>
      </div>

      {/* Controles */}
      <Glass className="p-8 w-full max-w-md space-y-10">
          <div className="text-center space-y-2">
             <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">Fluxo Magnético</div>
             <div className={`text-8xl font-black font-mono transition-colors drop-shadow-2xl ${percent > 80 ? 'text-green-400' : percent < 10 ? 'text-red-500' : 'text-amber-400'}`}>
               {percent}<span className="text-4xl text-white/20">%</span>
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold text-slate-300">
              <span>Rotação da Espira</span>
              <span className="text-cyan-400">{angle}°</span>
            </div>
            <input 
              type="range" min="0" max="180" value={angle} onChange={handleSlider}
              className="w-full"
            />
            <p className="text-xs text-slate-500 text-center pt-2">
              Arraste para girar a espira contra as linhas de campo.
            </p>
          </div>
      </Glass>
    </div>
  );
};

const SimulationSlide = () => {
    const [loops, setLoops] = useState(2);
    const [sliderVal, setSliderVal] = useState(50);
    const [volts, setVolts] = useState(0);
    const lastPos = useRef(50);
    
    // Physics Loop
    useEffect(() => {
        const interval = setInterval(() => {
            const delta = sliderVal - lastPos.current;
            const inZone = sliderVal > 30 && sliderVal < 70;
            let targetV = 0;
            
            if (inZone && Math.abs(delta) > 0.5) {
                targetV = delta * 5 * loops;
                if (Math.abs(delta) > 2) vibrate(15); // Vibra se mover rápido
            }
            
            setVolts(v => v + (targetV - v) * 0.2);
            lastPos.current = sliderVal;
        }, 16);
        return () => clearInterval(interval);
    }, [sliderVal, loops]);

    return (
      <div className="flex flex-col h-full items-center justify-center gap-10 w-full max-w-5xl mx-auto animate-enter">
        <div className="flex flex-col md:flex-row gap-12 w-full items-center justify-center">
          
          {/* GALVANÔMETRO (MEDIDOR) */}
          <div className="relative w-64 h-64 bg-slate-900 rounded-full border-8 border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.6)] flex items-center justify-center">
             <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_black]"></div>
             <Lightbulb size={40} className="absolute top-16 text-slate-700 transition-all duration-100" style={{ 
                 color: Math.abs(volts) > 5 ? (volts > 0 ? '#22d3ee' : '#ef4444') : '#334155',
                 filter: `drop-shadow(0 0 ${Math.abs(volts)}px currentColor)` 
             }}/>
             
             {/* Ponteiro */}
             <div className="absolute w-1.5 h-28 bg-red-500 origin-bottom bottom-1/2 left-1/2 rounded-full transition-transform duration-75 ease-out z-10 shadow-lg" 
                  style={{ transform: `translateX(-50%) rotate(${Math.max(-80, Math.min(80, volts * 2))}deg)` }}>
             </div>
             <div className="absolute w-6 h-6 bg-slate-200 rounded-full z-20 border-2 border-slate-500 bottom-[calc(50%-12px)] left-[calc(50%-12px)]"></div>
             
             <div className="absolute bottom-14 font-mono text-xl font-bold text-slate-500 bg-black/50 px-4 py-1 rounded-lg border border-white/5">
                {Math.abs(volts).toFixed(0)} mV
             </div>
          </div>

          {/* ÁREA DA BOBINA E ÍMÃ */}
          <div className="relative w-full max-w-lg h-56 bg-slate-800/30 rounded-3xl border border-white/10 flex items-center overflow-hidden backdrop-blur-sm">
             {/* Bobinas */}
             <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-80">
               {[...Array(loops)].map((_, i) => (
                  <div key={i} className="w-20 h-40 border-[6px] border-amber-600 rounded-[2rem] bg-amber-900/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]"></div>
               ))}
             </div>
             
             {/* Ímã Controlável */}
             <div className="absolute top-1/2 -translate-y-1/2 h-20 w-44 flex shadow-2xl transition-all duration-75 pointer-events-none z-20" style={{ left: `${sliderVal}%`, transform: 'translate(-50%, -50%)' }}>
               <div className="flex-1 bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-black text-2xl rounded-l-xl border-r border-black/20">N</div>
               <div className="flex-1 bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 flex items-center justify-center font-black text-2xl rounded-r-xl">S</div>
             </div>
          </div>
        </div>

        {/* CONTROLES TÁTEIS */}
        <Glass className="w-full max-w-3xl p-8 border-t border-cyan-500/20 bg-slate-900/80">
          <div className="flex flex-col gap-6">
             <div className="w-full">
                 <div className="flex justify-between text-xs font-bold uppercase mb-4 text-slate-400">
                    <span>Posição do Ímã</span>
                    <span className="text-cyan-400 animate-pulse">Mexa Rápido!</span>
                 </div>
                 <input 
                     type="range" min="0" max="100" defaultValue="50"
                     onChange={(e) => setSliderVal(Number(e.target.value))}
                     className="w-full"
                 />
             </div>
             
             <div className="flex justify-center gap-4 border-t border-white/5 pt-6">
                {[1, 2, 3].map(n => (
                   <button 
                     key={n} onClick={() => { setLoops(n); vibrate(10); }}
                     className={`px-6 py-2 rounded-lg font-bold transition-all ${loops === n ? 'bg-amber-500 text-black scale-110 shadow-lg' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                   >
                     {n} Bobinas
                   </button>
                ))}
             </div>
          </div>
        </Glass>
      </div>
    );
};

const QuizSlide = () => {
  // CONFIGURAÇÃO DO QUIZ MASTER
  const QUESTIONS = [
    { q: "Para gerar corrente elétrica usando um ímã e uma bobina, é OBRIGATÓRIO haver:", opts: ["Campo magnético muito forte", "Movimento relativo (Variação de Fluxo)", "Fios de ouro", "Alta temperatura"], corr: "Movimento relativo (Variação de Fluxo)" },
    { q: "A Lei de Lenz (o sinal negativo da fórmula) representa qual princípio da física?", opts: ["Conservação da Energia", "Relatividade", "Gravidade Universal", "Ação e Reação Mecânica"], corr: "Conservação da Energia" },
    { q: "Se eu aumentar o número de espiras (voltas) da bobina, a voltagem gerada:", opts: ["Diminui", "Fica igual", "Aumenta", "Desaparece"], corr: "Aumenta" },
    { q: "Qual destes dispositivos NÃO usa indução eletromagnética?", opts: ["Carregador de Celular Wireless", "Transformador de Poste", "Usina Hidrelétrica", "Lâmpada LED Comum (DC)"], corr: "Lâmpada LED Comum (DC)" } // Nova Pergunta!
  ];

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledOpts, setShuffledOpts] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong, end

  // Embaralhar opções ao carregar a pergunta
  useEffect(() => {
    if (step < QUESTIONS.length) {
      setShuffledOpts([...QUESTIONS[step].opts].sort(() => Math.random() - 0.5));
    }
  }, [step]);

  const handleAnswer = (opt) => {
    const isCorrect = opt === QUESTIONS[step].corr;
    if (isCorrect) {
       setScore(s => s + 1);
       setStatus('correct');
       vibrate([50, 50, 50]); // Vibração de sucesso
    } else {
       setStatus('wrong');
       vibrate(300); // Vibração longa de erro
    }
    
    setTimeout(() => {
       if (step < QUESTIONS.length - 1) {
         setStep(s => s + 1);
         setStatus('idle');
       } else {
         setStatus('end');
       }
    }, 1500);
  };

  if (status === 'end') return (
    <div className="text-center animate-enter">
       <div className="inline-flex p-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_60px_rgba(6,182,212,0.6)] mb-8">
          <GraduationCap size={64} className="text-white" />
       </div>
       <h2 className="text-5xl font-black text-white mb-4">Resultado Final</h2>
       <p className="text-2xl text-slate-300 mb-8">
         Você acertou <strong className="text-cyan-400 text-4xl">{score}</strong> de {QUESTIONS.length}
       </p>
       <NeoButton onClick={() => { setStep(0); setScore(0); setStatus('idle'); }} color="ghost">
          <RefreshCw size={20} /> Tentar Novamente
       </NeoButton>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto animate-enter">
       <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-widest">Desafio Final</span>
          <span className="text-xl font-bold text-cyan-400">{step + 1} <span className="text-slate-600 text-sm">/ {QUESTIONS.length}</span></span>
       </div>
       
       <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 leading-snug min-h-[100px] flex items-center">
         {QUESTIONS[step].q}
       </h3>

       <div className="grid gap-4">
         {shuffledOpts.map((opt, i) => {
            let stateClass = "border-white/10 bg-slate-800/50 hover:bg-slate-700 hover:border-cyan-500/50";
            if (status !== 'idle') {
               if (opt === QUESTIONS[step].corr) stateClass = "bg-green-500/20 border-green-500 text-green-300";
               else if (status === 'wrong') stateClass = "opacity-50";
            }
            
            return (
              <button 
                key={i} 
                onClick={() => status === 'idle' && handleAnswer(opt)}
                disabled={status !== 'idle'}
                className={`text-left p-6 rounded-xl border font-semibold text-lg transition-all duration-300 transform ${stateClass}`}
              >
                {opt}
              </button>
            )
         })}
       </div>
       
       {status !== 'idle' && (
         <div className="mt-6 text-center animate-pulse font-bold tracking-widest uppercase text-sm">
            {status === 'correct' ? <span className="text-green-400">Resposta Correta!</span> : <span className="text-red-400">Resposta Errada...</span>}
         </div>
       )}
    </div>
  );
};

// --- APP PRINCIPAL ---

const App = () => {
    const [slide, setSlide] = useState(0);
    const [menu, setMenu] = useState(false);
  
    const SLIDES = [
      { id: 'cover', title: 'Início' },
      { id: 'flux', title: 'O Que é Fluxo?' },
      { id: 'sim', title: 'Simulador' }, // Movi o simulador para ser mais cedo, engaja mais
      { id: 'quiz', title: 'Desafio' },
      { id: 'end', title: 'Fim' }
    ];

    const goto = (i) => { setSlide(i); setMenu(false); vibrate(10); };
    const next = () => { if(slide < SLIDES.length-1) goto(slide+1); };
    const prev = () => { if(slide > 0) goto(slide-1); };

    const renderContent = () => {
       const id = SLIDES[slide].id;
       if(id === 'cover') return <CoverSlide onNext={next} />;
       if(id === 'flux') return <FluxSlide />;
       if(id === 'sim') return <SimulationSlide />;
       if(id === 'quiz') return <QuizSlide />;
       return (
         <div className="text-center animate-enter">
            <h2 className="text-5xl font-black mb-6">Obrigado!</h2>
            <NeoButton onClick={() => goto(0)} color="ghost">Reiniciar</NeoButton>
         </div>
       );
    };

    return (
      <div className="fixed inset-0 flex flex-col bg-[#020617] text-white">
          {/* Background Dinâmico */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
          </div>

          {/* Header */}
          <header className="h-20 shrink-0 flex items-center justify-between px-6 z-50">
             <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => goto(0)}>
               FÍSICA<span className="text-cyan-400">.APP</span>
             </div>
             <button onClick={() => setMenu(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Menu/></button>
          </header>

          {/* Conteúdo Centralizado */}
          <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-7xl mx-auto">
             {renderContent()}
          </main>

          {/* Navegação Inferior */}
          <footer className="h-24 shrink-0 flex items-center justify-center gap-8 z-50">
             <button onClick={prev} disabled={slide === 0} className="p-4 rounded-full bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-0 transition-all shadow-lg"><ArrowLeft/></button>
             
             <div className="flex gap-2">
               {SLIDES.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? 'w-8 bg-cyan-400 shadow-[0_0_10px_cyan]' : 'w-1.5 bg-slate-700'}`}></div>
               ))}
             </div>

             <button onClick={next} disabled={slide === SLIDES.length - 1} className="p-4 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-0 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]"><ArrowRight/></button>
          </footer>

          {/* Menu Overlay */}
          <div className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] transition-opacity duration-300 ${menu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <div className="flex justify-end p-8"><button onClick={() => setMenu(false)}><X size={32}/></button></div>
             <div className="flex flex-col items-center gap-4">
                {SLIDES.map((s, i) => (
                   <button key={i} onClick={() => goto(i)} className="text-2xl font-bold hover:text-cyan-400 transition-colors py-2">{s.title}</button>
                ))}
             </div>
          </div>
      </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);