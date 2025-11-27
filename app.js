/* * ARQUIVO: app.js
 * LÓGICA: React + Hooks
 * AUTOR: God Mode Dev (via Gemini)
 */

import React, { useState, useEffect, useRef, memo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowRight, ArrowLeft, Zap, Magnet, Globe, Menu, X, 
  CheckCircle, AlertCircle, RefreshCw, Layers, RotateCw, BookOpen, 
  ChevronRight, ThumbsUp, GraduationCap, Activity, Wind, MousePointer2, Lightbulb, Image as ImageIcon
} from 'lucide-react';

// ==========================================
// COMPONENTES UI REUTILIZÁVEIS
// ==========================================

const Glass = memo(({ children, className = "", onClick, hover = false, glow = false }) => (
  <div 
    onClick={onClick}
    className={`
      glass-panel relative overflow-hidden rounded-2xl transition-all duration-300
      ${hover ? 'hover:bg-slate-800/60 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)] cursor-pointer' : ''}
      ${glow ? 'shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] border-cyan-500/30' : ''}
      ${className}
    `}
  >
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
    />
    <div className="relative z-10 h-full">{children}</div>
  </div>
));

const NeoButton = memo(({ children, onClick, active = false, disabled = false, color = "cyan", className = "" }) => {
  const styles = {
    cyan: active 
      ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] border-cyan-400" 
      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border-white/10 hover:border-cyan-500/30",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border-transparent",
  };
  return (
    <button 
      onClick={onClick} disabled={disabled}
      className={`px-6 py-3 rounded-xl font-bold border transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${styles[color] || styles.cyan} ${className}`}
    >
      {children}
    </button>
  );
});

// NOVO: Componente para Placeholder de Imagens
const ImageFrame = ({ src, alt, caption, className = "" }) => (
  <div className={`relative group rounded-xl overflow-hidden border border-white/10 bg-black/40 ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/50 min-h-[200px]">
        <ImageIcon size={48} className="mb-2 opacity-50" />
        <span className="text-xs uppercase tracking-widest font-bold">Inserir Imagem</span>
        <span className="text-[10px] opacity-50">{alt}</span>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <p className="text-white text-sm font-medium">{caption}</p>
    </div>
    {/* Efeito Holográfico nas bordas */}
    <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none"></div>
  </div>
);

// ==========================================
// SLIDES (LÓGICA)
// ==========================================

const CoverSlide = ({ onNext }) => (
  <div className="flex flex-col items-center justify-center h-full text-center animate-in zoom-in duration-1000 p-4 relative z-10">
    <div className="relative w-64 h-64 mb-8 group perspective-1000">
      <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="relative z-10 animate-float transform-style-3d group-hover:rotate-y-180 transition-transform duration-1000">
        <Magnet size={160} className="text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-auto" />
        <div className="absolute -top-4 -right-4 animate-bounce">
           <Zap size={56} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
        </div>
      </div>
    </div>
    <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
      FÍSICA
    </h1>
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500"></div>
      <span className="text-cyan-400 font-mono text-lg tracking-[0.5em] uppercase font-bold text-glow">Eletromagnetismo</span>
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-500"></div>
    </div>
    <NeoButton onClick={onNext} active className="text-xl px-12 py-5 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]">
      INICIAR SISTEMA <ArrowRight size={24} />
    </NeoButton>
  </div>
);

const FluxSlide = () => {
  const [angle, setAngle] = useState(0);
  const flux = Math.abs(Math.cos(angle * (Math.PI / 180)));
  const percent = Math.round(flux * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center h-full">
      {/* Coluna Visual */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 shrink-0 perspective-1000 z-10">
            <div className="absolute inset-0 rounded-full border border-slate-700 bg-slate-900/50 flex items-center justify-center overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
               {/* Linhas de Campo Animadas */}
               <div className="absolute inset-0 flex flex-col justify-evenly opacity-30">
                 {[...Array(9)].map((_,i) => (
                   <div key={i} className="w-full h-[1px] bg-cyan-400 shadow-[0_0_8px_cyan] relative overflow-hidden">
                     <div className="absolute inset-0 bg-white/50 w-1/2 animate-[shimmer_2s_linear_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                   </div>
                 ))}
               </div>
               
               {/* Loop Rotativo */}
               <div 
                 className="w-56 h-56 rounded-full border-[8px] border-amber-500 bg-amber-500/10 shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-transform duration-200 ease-out flex items-center justify-center"
                 style={{ transform: `rotateY(${angle}deg)` }}
               >
                 <div className="w-1 h-32 bg-red-500 origin-bottom absolute bottom-1/2 left-1/2 -ml-0.5" style={{ transform: 'rotateX(90deg)' }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NORMAL</div>
                 </div>
               </div>
            </div>
            <div className="absolute -bottom-10 w-full text-center text-xs text-slate-500 uppercase font-bold tracking-widest">
              Simulação de Corte de Fluxo
            </div>
        </div>
      </div>

      {/* Coluna Dados */}
      <div className="space-y-6">
        <Glass className="p-8 space-y-8" glow>
            <div className="text-center">
               <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Fluxo Magnético (Φ)</div>
               <div className={`text-8xl font-mono font-bold transition-colors drop-shadow-lg leading-none ${percent > 80 ? 'text-green-400' : percent < 10 ? 'text-red-500' : 'text-amber-400'}`}>
                 {percent}<span className="text-3xl text-white/30">%</span>
               </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
              <div className="flex justify-between text-xs text-slate-400 mb-4 font-bold uppercase">
                <span>Ângulo da Espira (θ)</span><span className="text-cyan-400">{angle}°</span>
              </div>
              <input 
                type="range" min="0" max="180" value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-ew-resize accent-cyan-500 hover:accent-cyan-400 transition-all"
              />
            </div>

            <div className="flex gap-4">
                {/* [EDITE AQUI] Coloque uma imagem real se quiser */}
                <ImageFrame 
                    src="" 
                    alt="Analogia Janela" 
                    caption="Janela aberta vs Vento" 
                    className="w-1/3 h-24 hidden md:block"
                />
                <p className="text-sm text-slate-400 italic leading-relaxed border-l-2 border-cyan-500/30 pl-4 py-1 flex-1">
                "O fluxo magnético é como o vento passando por uma janela. Se a janela está de frente (0°), o vento passa máximo. Se está de lado (90°), nada passa."
                </p>
            </div>
        </Glass>
      </div>
    </div>
  );
};

const FormulaSlide = () => {
    const [hover, setHover] = useState(null);
    const INFO = {
      e: { t: "Força Eletromotriz (FEM)", d: "A 'tensão' (Volts) induzida que empurra os elétrons.", c: "text-amber-400" },
      l: { t: "Lei de Lenz (-)", d: "O sinal negativo! A corrente criada sempre luta contra quem a criou.", c: "text-red-400" },
      n: { t: "Número de Espiras (N)", d: "Multiplicador. Mais voltas na bobina = Mais energia gerada.", c: "text-purple-400" },
      f: { t: "Variação de Fluxo (ΔΦ)", d: "A mudança no campo magnético. Sem mudança, sem energia.", c: "text-cyan-400" },
      t: { t: "Intervalo de Tempo (Δt)", d: "A rapidez. Movimentos bruscos geram voltagens enormes.", c: "text-green-400" }
    };
    const active = hover ? INFO[hover] : null;
  
    return (
      <div className="flex flex-col items-center justify-center h-full gap-12 w-full max-w-5xl mx-auto">
        <Glass className="p-16 w-full text-center relative overflow-hidden group border-cyan-500/20 shadow-[0_0_100px_-30px_rgba(6,182,212,0.2)]">
          <div className="holographic-overlay absolute inset-0 opacity-20 pointer-events-none"></div>
          
          <div className="text-6xl md:text-8xl font-mono font-bold flex flex-wrap items-center justify-center gap-6 select-none relative z-10">
            <span onMouseEnter={()=>setHover('e')} className="hover:text-amber-400 cursor-help transition-all hover:-translate-y-2 text-glow">ε</span>
            <span className="text-slate-600">=</span>
            <span onMouseEnter={()=>setHover('l')} className="hover:text-red-500 cursor-help transition-all hover:scale-125 text-red-500/80">-</span>
            <span onMouseEnter={()=>setHover('n')} className="hover:text-purple-400 cursor-help transition-all hover:-translate-y-2 hover:text-glow">N</span>
            <span className="text-slate-500 text-4xl">·</span>
            <div className="flex flex-col items-center leading-none scale-90 bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
               <span onMouseEnter={()=>setHover('f')} className="border-b-2 border-slate-600 hover:text-cyan-400 cursor-help transition-colors hover:border-cyan-400 mb-1">ΔΦ</span>
               <span onMouseEnter={()=>setHover('t')} className="hover:text-green-400 cursor-help transition-colors">Δt</span>
            </div>
          </div>
        </Glass>
  
        <div className="h-40 w-full max-w-2xl text-center relative">
          {active ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-in slide-in-from-bottom-4 fade-in duration-300 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                 <Activity className={active.c} size={24} />
                 <h3 className={`text-2xl font-bold ${active.c} tracking-wide`}>{active.t}</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">{active.d}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-30 animate-pulse">
              <MousePointer2 size={32} className="mb-2" />
              <p className="text-sm uppercase tracking-widest font-bold">Passe o mouse sobre a fórmula</p>
            </div>
          )}
        </div>
      </div>
    );
};

const SimulationSlide = () => {
    // Engine de Física
    const [loops, setLoops] = useState(2);
    const [sliderVal, setSliderVal] = useState(50);
    const canvasRef = useRef(null);
    const needleRef = useRef(null);
    const voltTextRef = useRef(null);
    const bulbRef = useRef(null);
    const state = useRef({ pos: 50, prevPos: 50, volts: 0, targetVolts: 0 });
  
    useEffect(() => {
        let animationFrameId;
        
        const loop = () => {
          const s = state.current;
          // Física simples de indução
          s.pos = sliderVal;
          const delta = s.pos - s.prevPos;
          
          // Detecta se o imã está entrando/saindo da área da bobina (entre 30 e 70%)
          const inZone = s.pos > 30 && s.pos < 70;
          
          if (inZone && Math.abs(delta) > 0.1) {
            // Lei de Faraday: E = -N * (dPhi/dt)
            // delta é a velocidade (dt), loops é N
            s.targetVolts = delta * 3 * loops; 
          } else {
            s.targetVolts = 0;
          }
          
          // Suavização (Lerp) para o ponteiro não tremer
          s.volts += (s.targetVolts - s.volts) * 0.15;
          s.prevPos = s.pos;
  
          // Renderização DOM Direta (High Performance)
          if (needleRef.current) {
            const angle = Math.max(-70, Math.min(70, s.volts * 3));
            needleRef.current.style.transform = `translateX(-50%) rotate(${angle}deg)`;
          }
          
          if (voltTextRef.current) {
             const v = s.volts;
             if (Math.abs(v) > 0.5) {
                voltTextRef.current.textContent = `${Math.abs(v).toFixed(0)} mV`;
                voltTextRef.current.style.color = v > 0 ? '#22d3ee' : '#f87171';
                // Ícone de Polaridade
                voltTextRef.current.innerHTML += v > 0 ? ' <span class="text-[10px] align-top">+</span>' : ' <span class="text-[10px] align-top">-</span>';
             } else {
                voltTextRef.current.textContent = "0 mV";
                voltTextRef.current.style.color = '#64748b';
             }
          }

          if (bulbRef.current) {
             const opacity = Math.min(Math.abs(s.volts) / 10, 1);
             const color = s.volts > 0 ? '0, 255, 255' : '255, 50, 50'; // Ciano ou Vermelho
             bulbRef.current.style.filter = `drop-shadow(0 0 ${opacity * 20}px rgba(${color}, ${opacity}))`;
             bulbRef.current.style.color = `rgba(${color}, ${0.2 + opacity})`;
          }

          animationFrameId = requestAnimationFrame(loop);
        };
        
        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [sliderVal, loops]);
  
    return (
      <div className="flex flex-col h-full items-center justify-center gap-8 w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center w-full">
          
          {/* O Galvômetro */}
          <div className="relative w-64 h-64 shrink-0 bg-slate-900 rounded-full border-4 border-slate-700 shadow-2xl flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-2 bg-slate-950 rounded-full shadow-[inset_0_0_20px_black]"></div>
             
             {/* Lâmpada Indicadora */}
             <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20">
                <Lightbulb ref={bulbRef} size={40} className="text-slate-800 transition-colors duration-75" />
             </div>
  
             {/* Escala */}
             <div className="absolute w-full text-center bottom-20 text-[10px] font-mono text-slate-500 flex justify-between px-14 font-bold">
                 <span>NEG</span><span>0</span><span>POS</span>
             </div>
             
             {/* Ponteiro */}
             <div ref={needleRef} className="absolute bottom-1/2 left-1/2 w-1 h-28 bg-red-500 origin-bottom rounded-full z-10 shadow-md will-change-transform transition-transform duration-75 ease-out" style={{ transform: 'translateX(-50%) rotate(0deg)' }}></div>
             <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-lg border-2 border-slate-400"></div>
             
             {/* Display Digital */}
             <div ref={voltTextRef} className="absolute bottom-12 font-mono text-2xl font-bold text-slate-500 tracking-widest bg-black/40 px-3 py-1 rounded border border-white/5">0 mV</div>
          </div>
  
          {/* A Bobina e o Ímã */}
          <div className="relative w-full max-w-lg h-64 bg-slate-800/40 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm group">
             {/* Grade de Fundo */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {/* Bobinas (Renderização Dinâmica) */}
             <div className="flex gap-2 z-0 opacity-90 transition-all duration-300">
               {[...Array(loops)].map((_, i) => (
                  <div key={i} className="w-16 h-40 border-[6px] border-amber-600 rounded-[2rem] bg-gradient-to-r from-amber-900/20 to-amber-600/10 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative">
                     {/* Fios de cobre */}
                     <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-60">
                         {[...Array(8)].map((_, j) => <div key={j} className="w-full h-[2px] bg-amber-500/40"></div>)}
                     </div>
                  </div>
               ))}
             </div>
             
             {/* Ímã Movido pelo Slider */}
             <div className="absolute z-10 top-1/2 -translate-y-1/2 w-40 h-14 flex shadow-[0_20px_40px_rgba(0,0,0,0.8)] will-change-transform pointer-events-none transition-all duration-75" style={{ left: `${sliderVal}%`, transform: 'translate(-50%, -50%)' }}>
               <div className="flex-1 bg-gradient-to-b from-red-500 to-red-700 text-white flex items-center justify-center font-black text-xl rounded-l-md border-r border-black/20">N</div>
               <div className="flex-1 bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900 flex items-center justify-center font-black text-xl rounded-r-md">S</div>
             </div>
          </div>
        </div>
  
        {/* Controles */}
        <Glass className="w-full max-w-3xl p-6 flex flex-col md:flex-row gap-8 items-end border-t border-cyan-500/30" glow>
          <div className="w-full">
             <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mb-3">
                 <span>Posição do Ímã</span>
                 <span className="text-cyan-400 animate-pulse flex items-center gap-1"><Wind size={12}/> Mexa rápido para gerar pico!</span>
             </div>
             <input 
                 type="range" min="0" max="100" 
                 value={sliderVal} 
                 onChange={(e) => setSliderVal(Number(e.target.value))}
                 className="w-full h-8 bg-slate-800 rounded-lg cursor-ew-resize accent-white hover:accent-cyan-400 transition-all appearance-none border border-white/10 p-1" 
             />
             <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-mono uppercase"><span>Esquerda</span><span>Centro</span><span>Direita</span></div>
          </div>
          <div className="w-full md:w-auto shrink-0">
             <div className="text-xs text-slate-400 font-bold uppercase mb-2 text-center">Nº de Espiras (N)</div>
             <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700 shadow-inner">
               {[1, 2, 3].map(n => (
                 <button key={n} onClick={() => setLoops(n)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${loops === n ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>{n}x</button>
               ))}
             </div>
          </div>
        </Glass>
      </div>
    );
};

// ==========================================
// APP PRINCIPAL & ROTEAMENTO
// ==========================================

const App = () => {
    const [slide, setSlide] = useState(0);
    const [menu, setMenu] = useState(false);
  
    const SLIDES_DATA = [
        { id: 'cover', title: 'Início' },
        { id: 'flux', title: 'Fluxo Magnético' },
        { id: 'faraday', title: 'Lei de Faraday' },
        { id: 'lenz', title: 'Lei de Lenz' },
        { id: 'sim', title: 'Laboratório Virtual' },
        { id: 'app', title: 'Aplicações Reais' },
        { id: 'quiz', title: 'Desafio' },
        { id: 'end', title: 'Conclusão' }
    ];

    const next = () => setSlide(s => Math.min(s + 1, SLIDES_DATA.length - 1));
    const prev = () => setSlide(s => Math.max(s - 1, 0));
    const goto = (i) => { setSlide(i); setMenu(false); };

    // Renderizador de Slides
    const renderContent = () => {
        switch(SLIDES_DATA[slide].id) {
            case 'cover': return <CoverSlide onNext={next} />;
            case 'flux': return <FluxSlide />;
            case 'faraday': return <FormulaSlide />;
            case 'lenz': return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
                    <div className="space-y-6">
                        <div className="border-l-4 border-red-500 pl-6 py-2">
                             <h2 className="text-4xl font-bold text-white mb-2">Lei de Lenz</h2>
                             <p className="text-red-400 text-xl font-mono">"A natureza odeia mudanças."</p>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            A corrente induzida cria um campo magnético que se <strong>opõe</strong> à variação do fluxo original. É como a inércia da eletricidade.
                        </p>
                        <Glass className="p-4 bg-red-500/10 border-red-500/20">
                            <p className="text-sm text-slate-400 flex gap-2">
                                <AlertCircle className="text-red-500 shrink-0" size={20} />
                                Sem isso, criaríamos energia infinita, o que é impossível.
                            </p>
                        </Glass>
                    </div>
                    <div className="grid gap-4">
                        {/* [EDITE AQUI] Diagramas da Lei de Lenz */}
                        <ImageFrame src="" caption="Aproximação: Repulsão" alt="Diagrama Polo Norte aproximando" className="h-40" />
                        <ImageFrame src="" caption="Afastamento: Atração" alt="Diagrama Polo Norte afastando" className="h-40" />
                    </div>
                </div>
            );
            case 'sim': return <SimulationSlide />;
            case 'app': return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    {[
                      { t: "Usinas Hidrelétricas", d: "Turbinas giram imãs gigantes.", i: Zap, color: "text-cyan-400", frame: true },
                      { t: "Carregadores Wireless", d: "Indução pura entre bobinas.", i: Activity, color: "text-green-400", frame: true },
                      { t: "Freios Magnéticos", d: "Correntes de Foucault param trens.", i: Magnet, color: "text-purple-400", frame: true }
                    ].map((item, idx) => (
                        <Glass key={idx} hover className="p-0 h-full flex flex-col group">
                            {/* Área de Imagem ou Ícone */}
                            <div className="h-40 bg-slate-900/50 border-b border-white/5 relative overflow-hidden">
                                {item.frame ? (
                                    <ImageFrame src="" alt={item.t} caption={item.t} className="h-full w-full rounded-none border-none" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <item.i size={48} className={item.color} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold text-white mb-2 group-hover:${item.color} transition-colors`}>{item.t}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
                            </div>
                        </Glass>
                    ))}
                </div>
            );
            case 'quiz': return (
                <div className="max-w-xl w-full mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Teste Rápido</h2>
                    <Glass className="p-8 space-y-4">
                        <p className="text-lg text-slate-300 mb-6">Qual princípio explica o sinal negativo na Lei de Faraday?</p>
                        <NeoButton className="w-full justify-between" color="ghost" onClick={() => alert('Errado! Tente de novo.')}>Conservação da Massa <X size={18}/></NeoButton>
                        <NeoButton className="w-full justify-between" color="cyan" onClick={() => alert('CORRETO! Lei de Lenz é sobre energia.')}>Conservação da Energia <CheckCircle size={18}/></NeoButton>
                        <NeoButton className="w-full justify-between" color="ghost" onClick={() => alert('Errado! Tente de novo.')}>Relatividade Geral <X size={18}/></NeoButton>
                    </Glass>
                </div>
            );
            case 'end': return (
                <div className="text-center animate-in zoom-in duration-700">
                   <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                       <ThumbsUp className="text-white" size={48} />
                   </div>
                   <h2 className="text-5xl font-black text-white mb-4">Obrigado!</h2>
                   <div className="flex gap-4 justify-center mt-8">
                       <NeoButton onClick={() => goto(0)} color="ghost"><RotateCw size={18}/> Reiniciar</NeoButton>
                   </div>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col">
            {/* Background Cyberpunk */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-slate-950">
                 <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-900/10 rounded-full blur-[120px]"></div>
                 <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Header */}
            <header className="h-16 shrink-0 z-50 flex justify-between items-center px-6 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="flex items-center gap-3" onClick={() => goto(0)}>
                   <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg"><Magnet size={18} className="text-white"/></div>
                   <span className="font-bold tracking-wide text-sm text-slate-200 hidden sm:block">FÍSICA<span className="text-cyan-500">M2C</span></span>
                </div>
                
                {/* Indicador de Progresso */}
                <div className="hidden md:flex gap-1">
                    {SLIDES_DATA.map((_, i) => (
                        <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i === slide ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : i < slide ? 'bg-slate-700' : 'bg-slate-800'}`}></div>
                    ))}
                </div>

                <button onClick={() => setMenu(true)} className="p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"><Menu size={24} /></button>
            </header>

            {/* Main Content */}
            <main className="flex-grow relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar p-6 flex flex-col items-center justify-center">
                 <div className="w-full max-w-7xl animate-in fade-in duration-500 min-h-[60vh] flex flex-col justify-center">
                     {renderContent()}
                 </div>
            </main>

            {/* Footer Navigation */}
            <footer className="h-20 shrink-0 z-50 border-t border-white/5 bg-slate-950/90 backdrop-blur-xl flex items-center justify-between px-6 md:justify-center md:gap-8">
                 <button onClick={prev} disabled={slide === 0} className="p-3 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all"><ArrowLeft size={24}/></button>
                 <span className="font-mono text-xs text-slate-500 md:hidden">{slide + 1} / {SLIDES_DATA.length}</span>
                 <button onClick={next} disabled={slide === SLIDES_DATA.length - 1} className="p-3 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg disabled:opacity-20 transition-all"><ArrowRight size={24}/></button>
            </footer>

            {/* Menu Lateral Overlay */}
            <div className={`fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 z-[60] p-6 ${menu ? 'translate-x-0' : 'translate-x-full'}`}>
                 <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Navegação</span>
                    <button onClick={() => setMenu(false)} className="hover:text-white text-slate-400"><X size={24}/></button>
                 </div>
                 <nav className="space-y-1">
                    {SLIDES_DATA.map((s, i) => (
                       <button key={i} onClick={() => goto(i)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex justify-between items-center transition-all ${slide === i ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                          <span>{s.title}</span>
                          {slide === i && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>}
                       </button>
                    ))}
                 </nav>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);