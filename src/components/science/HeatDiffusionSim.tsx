import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Flame, Waves, Sparkles, Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeatDiffusionSim: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [mode, setMode] = useState<'heat' | 'wave'>('heat');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [diffusivity, setDiffusivity] = useState<number>(0.22); // alpha or wave speed c
  const [damping, setDamping] = useState<number>(0.02);
  const [selectedSource, setSelectedSource] = useState<'gaussian' | 'dipole' | 'sine'>('gaussian');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Grid dimensions
  const N = 40; // 40x40 spatial grid
  const uRef = useRef<Float32Array>(new Float32Array(N * N));
  const uPrevRef = useRef<Float32Array>(new Float32Array(N * N));
  const uNextRef = useRef<Float32Array>(new Float32Array(N * N));

  // Initialize field state
  const resetField = () => {
    const u = uRef.current;
    const uPrev = uPrevRef.current;
    const uNext = uNextRef.current;
    u.fill(0);
    uPrev.fill(0);
    uNext.fill(0);

    const center = Math.floor(N / 2);
    if (selectedSource === 'gaussian') {
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const dx = x - center;
          const dy = y - center;
          const distSq = dx * dx + dy * dy;
          const val = Math.exp(-distSq / 18) * 1.0;
          u[y * N + x] = val;
          uPrev[y * N + x] = val;
        }
      }
    } else if (selectedSource === 'dipole') {
      const offset = 8;
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const d1 = (x - (center - offset)) ** 2 + (y - center) ** 2;
          const d2 = (x - (center + offset)) ** 2 + (y - center) ** 2;
          const val = Math.exp(-d1 / 14) - Math.exp(-d2 / 14);
          u[y * N + x] = val;
          uPrev[y * N + x] = val;
        }
      }
    } else if (selectedSource === 'sine') {
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const val = Math.sin((x / N) * Math.PI * 2) * Math.sin((y / N) * Math.PI * 2);
          u[y * N + x] = val;
          uPrev[y * N + x] = val;
        }
      }
    }
  };

  useEffect(() => {
    resetField();
  }, [selectedSource, mode]);

  // Click & drag interaction to inject heat or waves
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const gridX = Math.floor((clientX / rect.width) * N);
    const gridY = Math.floor((clientY / rect.height) * N);

    if (gridX >= 1 && gridX < N - 1 && gridY >= 1 && gridY < N - 1) {
      const u = uRef.current;
      const radius = 3;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const gx = gridX + dx;
          const gy = gridY + dy;
          if (gx >= 0 && gx < N && gy >= 0 && gy < N) {
            const dist = Math.hypot(dx, dy);
            if (dist <= radius) {
              const boost = Math.exp(-dist) * 1.5;
              u[gy * N + gx] = Math.min(2.0, u[gy * N + gx] + boost);
            }
          }
        }
      }
    }
  };

  // Numerical PDE solver loop (Finite Difference FTCS for Heat, Verlet/Central difference for Wave)
  useEffect(() => {
    let animId: number;

    const stepSimulation = () => {
      if (isRunning) {
        const u = uRef.current;
        const uPrev = uPrevRef.current;
        const uNext = uNextRef.current;
        const dt = 0.15;
        const dx = 1.0;
        const idx2 = 1.0 / (dx * dx);

        if (mode === 'heat') {
          // Heat equation: du/dt = alpha * laplacian(u)
          // 5-point discrete Laplacian stencil
          const alpha = diffusivity;
          for (let y = 1; y < N - 1; y++) {
            for (let x = 1; x < N - 1; x++) {
              const idx = y * N + x;
              const laplacian =
                (u[idx + 1] + u[idx - 1] + u[idx + N] + u[idx - N] - 4 * u[idx]) * idx2;
              uNext[idx] = u[idx] + alpha * laplacian * dt;
            }
          }

          // Dirichlet zero boundary condition
          for (let i = 0; i < N; i++) {
            uNext[i] = 0;
            uNext[(N - 1) * N + i] = 0;
            uNext[i * N] = 0;
            uNext[i * N + (N - 1)] = 0;
          }

          // Copy uNext to u
          u.set(uNext);
        } else {
          // Wave equation: d2u/dt2 = c^2 * laplacian(u) - gamma * du/dt
          const c2 = diffusivity * diffusivity * 1.8;
          const gam = damping;

          for (let y = 1; y < N - 1; y++) {
            for (let x = 1; x < N - 1; x++) {
              const idx = y * N + x;
              const laplacian =
                (u[idx + 1] + u[idx - 1] + u[idx + N] + u[idx - N] - 4 * u[idx]) * idx2;

              // u_next = (2 - gamma*dt)*u - (1 - gamma*dt)*u_prev + c^2 * dt^2 * laplacian
              const val =
                2 * u[idx] -
                uPrev[idx] +
                c2 * laplacian * dt * dt -
                gam * (u[idx] - uPrev[idx]);
              uNext[idx] = val;
            }
          }

          // Boundaries
          for (let i = 0; i < N; i++) {
            uNext[i] = 0;
            uNext[(N - 1) * N + i] = 0;
            uNext[i * N] = 0;
            uNext[i * N + (N - 1)] = 0;
          }

          uPrev.set(u);
          u.set(uNext);
        }
      }

      // Render to 2D Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          const cellW = width / N;
          const cellH = height / N;
          const u = uRef.current;

          ctx.fillStyle = '#050811';
          ctx.fillRect(0, 0, width, height);

          for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
              const val = u[y * N + x];
              let r = 0, g = 0, b = 0;

              if (mode === 'heat') {
                // Color map: Dark Blue -> Cyan -> Orange -> Bright Yellow
                const clamped = Math.max(0, Math.min(1.5, val));
                const norm = clamped / 1.5;
                if (norm < 0.3) {
                  r = 6;
                  g = Math.floor(norm * 3.33 * 180);
                  b = Math.floor(norm * 3.33 * 255);
                } else if (norm < 0.7) {
                  const tNorm = (norm - 0.3) / 0.4;
                  r = Math.floor(tNorm * 245);
                  g = 180 + Math.floor(tNorm * 40);
                  b = Math.floor((1 - tNorm) * 200);
                } else {
                  const tNorm = (norm - 0.7) / 0.3;
                  r = 255;
                  g = 220 + Math.floor(tNorm * 35);
                  b = Math.floor(tNorm * 120);
                }
              } else {
                // Wave: Negative (Purple/Indigo) -> Zero (Dark) -> Positive (Cyan/Aqua)
                if (val >= 0) {
                  const norm = Math.min(1.0, val);
                  r = Math.floor(norm * 20);
                  g = Math.floor(norm * 229);
                  b = Math.floor(norm * 255);
                } else {
                  const norm = Math.min(1.0, -val);
                  r = Math.floor(norm * 217);
                  g = Math.floor(norm * 70);
                  b = Math.floor(norm * 239);
                }
              }

              ctx.fillStyle = `rgb(${r},${g},${b})`;
              ctx.fillRect(x * cellW, y * cellH, cellW + 0.5, cellH + 0.5);
            }
          }
        }
      }

      animId = requestAnimationFrame(stepSimulation);
    };

    animId = requestAnimationFrame(stepSimulation);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, mode, diffusivity, damping]);

  // Total thermal / field energy integration
  const energyMetric = useMemo(() => {
    let sum = 0;
    const u = uRef.current;
    for (let i = 0; i < u.length; i++) {
      sum += u[i] * u[i];
    }
    return sum / (N * N);
  }, [uRef.current]);

  return (
    <div className="bg-[#090e17] border border-cyan-900/40 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-950/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            {mode === 'heat' ? (
              <Flame className="w-5 h-5 text-amber-400" />
            ) : (
              <Waves className="w-5 h-5 text-cyan-400" />
            )}
            <h3 className="text-base font-semibold text-slate-100">
              {isFa ? 'شبیه‌ساز پیوسته معادلات دیفرانسیل جزئی (PDE)' : 'Continuous PDE Finite Difference Solver'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isFa
              ? 'حل عددی تفاضل متناهی معادلات دیفرانسیل انتقال حرارت فوریه و موج پیوسته دو بعدی.'
              : 'Real-time numerical 5-point discrete Laplacian stencil for 2D Fourier heat diffusion & wave propagation.'}
          </p>
        </div>

        {/* Mode Selector & Run Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-[#050811] p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('heat')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition flex items-center space-x-1 ${
                mode === 'heat'
                  ? 'bg-amber-950 text-amber-300 border border-amber-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isFa ? 'انتقال حرارت' : 'Heat PDE'}</span>
            </button>
            <button
              onClick={() => setMode('wave')}
              className={`px-2.5 py-1 text-xs font-mono rounded transition flex items-center space-x-1 ${
                mode === 'wave'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5" />
              <span>{isFa ? 'انتشار موج' : 'Wave PDE'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2 rounded text-xs font-mono font-semibold flex items-center space-x-1 transition ${
              isRunning
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-600'
            }`}
            title={isRunning ? 'Pause Simulation' : 'Run Simulation'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetField}
            className="p-2 rounded bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            title="Reset Grid Field"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Mathematical Formulation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Canvas Display */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#04060b] rounded-xl p-3.5 border border-slate-800/90 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-900">
            <span className="text-cyan-400 font-semibold">
              {isFa ? 'شبکه ۲ بعدی پیوسته (۴۰×۴۰ المان)' : '2D Discrete Spatial Field (40x40 Grid)'}
            </span>
            <span className="text-[11px] text-amber-400 font-mono">
              {isFa ? 'برای تزریق حرارت/موج روی صفحه کلیک و درگ کنید' : 'Click / Drag on canvas to inject energy'}
            </span>
          </div>

          <div className="mt-3 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onMouseDown={handleCanvasInteraction}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleCanvasInteraction(e);
              }}
              className="rounded-lg border border-cyan-950 shadow-2xl cursor-crosshair max-w-full h-auto aspect-square"
            />
          </div>

          {/* Color Scale Legend */}
          <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>{mode === 'heat' ? 'Cold (0 K)' : 'Valley (-1)'}</span>
            <div className={`h-2 flex-1 mx-3 rounded ${mode === 'heat' ? 'bg-gradient-to-r from-blue-900 via-cyan-500 via-amber-500 to-yellow-200' : 'bg-gradient-to-r from-fuchsia-500 via-slate-900 to-cyan-400'}`} />
            <span>{mode === 'heat' ? 'Peak Heat (T_max)' : 'Crest (+1)'}</span>
          </div>
        </div>

        {/* Physics Equations & Parameters */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Mathematical Formulation Card */}
          <div className="p-3.5 bg-[#05070d] rounded-xl border border-cyan-950/80 space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
              <span>{isFa ? 'معادله حاکم بر سیستم' : 'Governing PDE Formulation'}</span>
              <span className="text-emerald-400 font-mono">FTCS & Central Diff</span>
            </div>
            <div className="p-2.5 bg-[#090e1a] rounded-lg border border-slate-800 text-amber-300 font-mono text-xs overflow-x-auto">
              {mode === 'heat' ? (
                <code>
                  \frac{`{\\partial T}`}{`{\\partial t}`} = \alpha \nabla^2 T = \alpha \left(\frac{`{\\partial^2 T}`}{`{\\partial x^2}`} + \frac{`{\\partial^2 T}`}{`{\\partial y^2}`}\right)
                </code>
              ) : (
                <code>
                  \frac{`{\\partial^2 u}`}{`{\\partial t^2}`} = c^2 \nabla^2 u - \gamma \frac{`{\\partial u}`}{`{\\partial t}`}
                </code>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {mode === 'heat'
                ? isFa
                  ? 'قانون هدایت گرمایی فوریه: سرعت تغییر دما با لاپلاسین میدان دما و ضریب نفوذ حرارتی تناسب مستقیم دارد.'
                  : 'Fourier thermal conduction: Rate of temperature change proportional to second spatial derivatives (Laplacian).'
                : isFa
                  ? 'معادله موج هایپربولیک دو بعدی با اصطکاک و میرایی خطی، مدل‌کننده نوسانات امواج آکوستیک و الکترومغناطیسی.'
                  : 'Hyperbolic wave equation with linear damping, modeling acoustic membrane and electromagnetic ripple modes.'}
            </p>
          </div>

          {/* Source Geometry Presets */}
          <div className="p-3 bg-[#05070d] rounded-xl border border-slate-800 space-y-2">
            <div className="text-[11px] font-mono text-slate-400">
              {isFa ? 'الگوی چگالی اولیه منبع:' : 'Initial Impulse Source Geometry:'}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'gaussian', label: isFa ? 'گوسی متمرکز' : 'Gaussian Pulse' },
                { id: 'dipole', label: isFa ? 'دوقطبی پلار' : 'Dipole Source' },
                { id: 'sine', label: isFa ? 'هارمونیک سینوسی' : 'Fourier Harmonic' }
              ].map((src) => (
                <button
                  key={src.id}
                  onClick={() => setSelectedSource(src.id as any)}
                  className={`py-1.5 px-2 rounded text-[11px] font-mono transition border ${
                    selectedSource === src.id
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {src.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Parameters Sliders */}
          <div className="p-3.5 bg-[#05070d] rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{mode === 'heat' ? (isFa ? 'ضریب نفوذ حرارتی (α):' : 'Diffusivity (α):') : (isFa ? 'سرعت فاز موج (c):' : 'Wave Speed (c):')}</span>
                <span className="text-cyan-400 font-bold">{diffusivity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.01"
                value={diffusivity}
                onChange={(e) => setDiffusivity(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {mode === 'wave' && (
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{isFa ? 'ضریب میرایی محیط (γ):' : 'Damping Factor (γ):'}</span>
                  <span className="text-amber-400 font-bold">{damping.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.08"
                  step="0.002"
                  value={damping}
                  onChange={(e) => setDamping(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
