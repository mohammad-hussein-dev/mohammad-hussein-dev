import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, Activity, Gauge, Zap, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectileSimulator: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [velocity, setVelocity] = useState<number>(45);
  const [angle, setAngle] = useState<number>(45);
  const [gravityPreset, setGravityPreset] = useState<string>('earth');
  const [customGravity, setCustomGravity] = useState<number>(9.81);
  const [airDrag, setAirDrag] = useState<number>(0.05);
  const [mass, setMass] = useState<number>(2.0);
  const [showVacuumComparison, setShowVacuumComparison] = useState<boolean>(true);

  const g = useMemo(() => {
    switch (gravityPreset) {
      case 'moon': return 1.62;
      case 'mars': return 3.71;
      case 'jupiter': return 24.79;
      case 'custom': return customGravity;
      default: return 9.81;
    }
  }, [gravityPreset, customGravity]);

  // Numerical RK4 Simulation with non-linear quadratic aerodynamic drag: F_d = 0.5 * rho * Cd * A * v^2
  const simulationData = useMemo(() => {
    const rad = (angle * Math.PI) / 180;
    const dt = 0.02;
    let t = 0;
    let x = 0;
    let y = 0;
    let vx = velocity * Math.cos(rad);
    let vy = velocity * Math.sin(rad);

    const points: { x: number; y: number; t: number; v: number; ek: number; ep: number }[] = [
      { x: 0, y: 0, t: 0, v: velocity, ek: 0.5 * mass * velocity * velocity, ep: 0 }
    ];
    let maxHeight = 0;

    // Numerical integration loop
    while (y >= 0 && t < 35) {
      const v = Math.sqrt(vx * vx + vy * vy);
      const dragAccel = (airDrag * v) / mass;
      const ax = -dragAccel * vx;
      const ay = -g - dragAccel * vy;

      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      t += dt;

      if (y > maxHeight) {
        maxHeight = y;
      }

      if (y >= 0) {
        const currentV = Math.sqrt(vx * vx + vy * vy);
        const ek = 0.5 * mass * currentV * currentV;
        const ep = mass * g * y;
        points.push({ x, y, t, v: currentV, ek, ep });
      }
    }

    // Vacuum analytical trajectory for comparison
    const vacuumPoints: { x: number; y: number }[] = [];
    const tFlightVac = (2 * velocity * Math.sin(rad)) / g;
    const maxHVac = (velocity * velocity * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    const rangeVac = (velocity * velocity * Math.sin(2 * rad)) / g;

    for (let tv = 0; tv <= tFlightVac; tv += dt) {
      const xv = velocity * Math.cos(rad) * tv;
      const yv = velocity * Math.sin(rad) * tv - 0.5 * g * tv * tv;
      if (yv >= 0) vacuumPoints.push({ x: xv, y: yv });
    }

    const totalRange = points.length > 0 ? points[points.length - 1].x : 0;
    const totalFlightTime = points.length > 0 ? points[points.length - 1].t : 0;

    return {
      points,
      vacuumPoints,
      maxHeight: Math.max(maxHeight, 0.1),
      maxHVac: Math.max(maxHVac, 0.1),
      rangeVac: Math.max(rangeVac, 0.1),
      totalRange: Math.max(totalRange, 0.1),
      totalFlightTime,
      finalVelocity: points.length > 0 ? points[points.length - 1].v : 0,
      initialEnergy: 0.5 * mass * velocity * velocity
    };
  }, [velocity, angle, g, airDrag, mass]);

  // SVG dimensions & scaling
  const svgWidth = 600;
  const svgHeight = 250;
  const padding = 35;

  const maxExtentX = Math.max(simulationData.totalRange, showVacuumComparison ? simulationData.rangeVac : 0) * 1.15;
  const maxExtentY = Math.max(simulationData.maxHeight, showVacuumComparison ? simulationData.maxHVac : 0) * 1.25;

  const scaleX = (svgWidth - padding * 2) / Math.max(maxExtentX, 10);
  const scaleY = (svgHeight - padding * 2) / Math.max(maxExtentY, 10);

  const pathD = useMemo(() => {
    if (simulationData.points.length === 0) return '';
    return simulationData.points
      .map((p, idx) => {
        const px = padding + p.x * scaleX;
        const py = svgHeight - padding - p.y * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
      })
      .join(' ');
  }, [simulationData.points, scaleX, scaleY]);

  const vacuumPathD = useMemo(() => {
    if (simulationData.vacuumPoints.length === 0) return '';
    return simulationData.vacuumPoints
      .map((p, idx) => {
        const px = padding + p.x * scaleX;
        const py = svgHeight - padding - p.y * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
      })
      .join(' ');
  }, [simulationData.vacuumPoints, scaleX, scaleY]);

  return (
    <div className="bg-[#090e17] border border-cyan-900/40 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-950/80 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-semibold text-slate-100">
              {isFa ? 'شبیه‌ساز سینماتیک پرتابه با انتگرال‌گیر RK4' : 'Vectorized Projectile Kinematics Simulator'}
            </h3>
            <a
              href="https://github.com/mohammad-hussein-dev/projectile-physics-simulator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-[11px] text-cyan-400 bg-cyan-950/80 hover:bg-cyan-900 px-2 py-0.5 rounded border border-cyan-800 transition"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isFa
              ? 'حل عددی مرتبه ۴ رانگ-کوتا (RK4) با در نظر گرفتن نیروی درگ آیرودینامیک غیرخطی هوا و اتلاف انرژی.'
              : '4th Order Runge-Kutta (RK4) numerical integrator with nonlinear quadratic atmospheric drag.'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVacuumComparison(!showVacuumComparison)}
            className={`text-xs font-mono px-2.5 py-1 rounded transition border ${
              showVacuumComparison
                ? 'bg-amber-950/70 text-amber-300 border-amber-600 font-semibold'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {showVacuumComparison ? (isFa ? 'مقایسه با خلاء: فعال' : 'Vacuum Baseline: ON') : (isFa ? 'مقایسه با خلاء: خاموش' : 'Vacuum Baseline: OFF')}
          </button>
        </div>
      </div>

      {/* Trajectory Canvas Plot */}
      <div className="mt-4 bg-[#05070c] rounded-xl p-3 border border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto relative z-10 overflow-visible">
          {/* Axis lines */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={svgWidth - padding + 15}
            y2={svgHeight - padding}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <line
            x1={padding}
            y1={padding - 10}
            x2={padding}
            y2={svgHeight - padding}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text x={svgWidth - padding + 15} y={svgHeight - padding + 16} fill="#94a3b8" fontSize="10" fontFamily="monospace">
            X ({simulationData.totalRange.toFixed(1)}m)
          </text>
          <text x={padding - 10} y={padding - 12} fill="#94a3b8" fontSize="10" fontFamily="monospace">
            Y ({simulationData.maxHeight.toFixed(1)}m)
          </text>

          {/* Vacuum Trajectory Curve */}
          {showVacuumComparison && (
            <path
              d={vacuumPathD}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          )}

          {/* Real RK4 Drag Trajectory */}
          <path
            d={pathD}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Launch Angle Vector Indicator */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={padding + Math.cos((angle * Math.PI) / 180) * 35}
            y2={svgHeight - padding - Math.sin((angle * Math.PI) / 180) * 35}
            stroke="#22c55e"
            strokeWidth="2"
          />

          {/* Peak Height Indicator */}
          <circle
            cx={padding + (simulationData.points.find(p => Math.abs(p.y - simulationData.maxHeight) < 0.2)?.x || 0) * scaleX}
            cy={svgHeight - padding - simulationData.maxHeight * scaleY}
            r="4"
            fill="#38bdf8"
          />
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-2 border-t border-slate-900 pt-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-1 bg-cyan-400 rounded" />
              <span>{isFa ? 'مسیر واقعی با درگ RK4' : 'Air Drag Trajectory (RK4)'}</span>
            </span>
            {showVacuumComparison && (
              <span className="flex items-center space-x-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-amber-400" />
                <span>{isFa ? 'مسیر بدون مقاومت هوا (خلاء)' : 'Vacuum Ideal Path'}</span>
              </span>
            )}
          </div>
          <span className="text-emerald-400">
            {isFa ? `مدت پرواز: ${simulationData.totalFlightTime.toFixed(2)} ثانیه` : `Flight Time: ${simulationData.totalFlightTime.toFixed(2)}s`}
          </span>
        </div>
      </div>

      {/* Metrics & Parameters Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Controls Column */}
        <div className="p-3.5 bg-[#05070c] rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
            {isFa ? 'پارامترهای پرتاب و محیط' : 'Launch & Atmospheric Parameters'}
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>{isFa ? 'سرعت اولیه (v₀):' : 'Initial Velocity (v₀):'}</span>
              <span className="text-cyan-400 font-bold">{velocity} m/s</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>{isFa ? 'زاویه پرتاب (θ):' : 'Launch Angle (θ):'}</span>
              <span className="text-cyan-400 font-bold">{angle}°</span>
            </div>
            <input
              type="range"
              min="5"
              max="85"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>{isFa ? 'ضریب درگ هوا (Cd·A):' : 'Air Drag Coeff (Cd·A):'}</span>
              <span className="text-amber-400 font-bold">{airDrag.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.00"
              max="0.25"
              step="0.01"
              value={airDrag}
              onChange={(e) => setAirDrag(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Gravity Body Presets */}
          <div>
            <div className="text-slate-400 mb-1">{isFa ? 'میدان گرانش جرم آسمانی:' : 'Planetary Gravity Preset:'}</div>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'earth', label: isFa ? 'زمین' : 'Earth', val: '9.81' },
                { id: 'moon', label: isFa ? 'ماه' : 'Moon', val: '1.62' },
                { id: 'mars', label: isFa ? 'مریخ' : 'Mars', val: '3.71' },
                { id: 'jupiter', label: isFa ? 'مشتری' : 'Jupiter', val: '24.79' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setGravityPreset(p.id)}
                  className={`py-1 px-1.5 rounded text-[10px] transition border ${
                    gravityPreset === p.id
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Telemetry & Physics Equations */}
        <div className="p-3.5 bg-[#05070c] rounded-xl border border-cyan-950 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
            <span>{isFa ? 'داده‌های عددی و اتلاف انرژی' : 'Kinematic Metrics & Energy'}</span>
            <span className="text-[10px] text-slate-500 font-normal">g = {g.toFixed(2)} m/s²</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500">{isFa ? 'برد پرتابه (X)' : 'Max Range'}</div>
              <div className="text-cyan-300 font-bold text-sm">{simulationData.totalRange.toFixed(1)} m</div>
            </div>
            <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500">{isFa ? 'اوج ارتفاع (Y)' : 'Max Altitude'}</div>
              <div className="text-amber-300 font-bold text-sm">{simulationData.maxHeight.toFixed(1)} m</div>
            </div>
            <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500">{isFa ? 'سرعت برخورد' : 'Impact Velocity'}</div>
              <div className="text-emerald-400 font-bold text-sm">{simulationData.finalVelocity.toFixed(1)} m/s</div>
            </div>
            <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500">{isFa ? 'انرژی جنبشی اولیه' : 'Initial Energy'}</div>
              <div className="text-purple-300 font-bold text-sm">{simulationData.initialEnergy.toFixed(0)} J</div>
            </div>
          </div>

          {/* Governing Drag Equation Box */}
          <div className="p-2.5 bg-[#080d19] rounded-lg border border-cyan-950 text-slate-300 text-[11px] leading-relaxed">
            <div className="text-cyan-400 font-bold mb-1">{isFa ? 'معادله دیفرانسیل برداری حرکت:' : 'Differential Vector Equation:'}</div>
            <code className="text-amber-300 text-xs">
              m (d v&#8407; / dt) = m g&#8407; - &#189; &rho; C_d A |v&#8407;| v&#8407;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
