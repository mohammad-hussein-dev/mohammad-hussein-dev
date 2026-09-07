import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Cpu, CheckCircle2, ExternalLink, Dna, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Point {
  x: number;
  y: number;
  demand: number;
}

export const GeneticAlgorithmSim: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mutationRate, setMutationRate] = useState(0.05);
  const [populationSize, setPopulationSize] = useState(30);
  const [crossoverType, setCrossoverType] = useState<'uniform' | 'twopoint'>('uniform');
  const [fitnessHistory, setFitnessHistory] = useState<{ gen: number; best: number; avg: number; cost: number; coverage: number }[]>([]);
  const [bestGenome, setBestGenome] = useState<number[]>([]);

  // Fixed demand points (40 demographic population clusters)
  const demandPoints = useRef<Point[]>(
    Array.from({ length: 40 }, (_, i) => ({
      x: 25 + ((i * 37 + 19) % 350),
      y: 25 + ((i * 43 + 29) % 190),
      demand: 10 + (i % 5) * 15,
    }))
  ).current;

  // Candidate facility locations (16 possible spatial sites)
  const candidateSites = useRef<{ x: number; y: number; cost: number }[]>(
    Array.from({ length: 16 }, (_, i) => ({
      x: 35 + (i % 4) * 105,
      y: 35 + Math.floor(i / 4) * 55,
      cost: 50 + (i % 3) * 20,
    }))
  ).current;

  // Evaluate fitness of a binary chromosome (length 16)
  const evaluateFitness = (chromosome: number[]) => {
    const selectedSites = candidateSites.filter((_, idx) => chromosome[idx] === 1);
    if (selectedSites.length === 0) return { fitness: 0.001, totalCoverage: 0, totalCost: 0 };

    let totalCoverageScore = 0;
    demandPoints.forEach(p => {
      let minDistance = Infinity;
      selectedSites.forEach(site => {
        const d = Math.hypot(site.x - p.x, site.y - p.y);
        if (d < minDistance) minDistance = d;
      });
      // Exponential / inverse distance decay
      totalCoverageScore += p.demand / (1 + minDistance * 0.04);
    });

    const totalCost = selectedSites.reduce((sum, s) => sum + s.cost, 0);
    // Multi-objective Pareto Fitness = coverage / (1 + cost penalty)
    const fitness = totalCoverageScore / (1 + totalCost * 0.003);
    return {
      fitness: Math.round(fitness * 10) / 10,
      totalCoverage: Math.round(totalCoverageScore),
      totalCost
    };
  };

  const populationRef = useRef<number[][]>([]);

  // Initialize random population
  const resetSimulation = () => {
    setIsRunning(false);
    setGeneration(0);
    const initialPop: number[][] = [];
    for (let i = 0; i < populationSize; i++) {
      const chrom = Array.from({ length: 16 }, () => (Math.random() < 0.25 ? 1 : 0));
      initialPop.push(chrom);
    }
    populationRef.current = initialPop;

    const scored = initialPop.map(c => ({ chrom: c, ...evaluateFitness(c) }));
    scored.sort((a, b) => b.fitness - a.fitness);

    setBestGenome(scored[0].chrom);
    setFitnessHistory([
      {
        gen: 0,
        best: scored[0].fitness,
        avg: Math.round((scored.reduce((s, x) => s + x.fitness, 0) / scored.length) * 10) / 10,
        cost: scored[0].totalCost,
        coverage: scored[0].totalCoverage
      }
    ]);
  };

  useEffect(() => {
    resetSimulation();
  }, [populationSize]);

  // Evolutionary Step
  const stepEvolution = () => {
    const pop = populationRef.current;
    if (pop.length === 0) return;

    const scoredPop = pop.map(chrom => ({
      chrom,
      ...evaluateFitness(chrom),
    }));

    scoredPop.sort((a, b) => b.fitness - a.fitness);

    const best = scoredPop[0];
    const avgScore = scoredPop.reduce((sum, ind) => sum + ind.fitness, 0) / scoredPop.length;
    const newGen = generation + 1;

    setBestGenome(best.chrom);
    setFitnessHistory(prev => [
      ...prev.slice(-30),
      {
        gen: newGen,
        best: best.fitness,
        avg: Math.round(avgScore * 10) / 10,
        cost: best.totalCost,
        coverage: best.totalCoverage
      },
    ]);
    setGeneration(newGen);

    // Elitism: Preserve Top 2 Individuals
    const nextPopulation: number[][] = [scoredPop[0].chrom, scoredPop[1].chrom];

    // Selection & Reproduction
    while (nextPopulation.length < populationSize) {
      const p1 = scoredPop[Math.floor(Math.random() * Math.min(6, scoredPop.length))].chrom;
      const p2 = scoredPop[Math.floor(Math.random() * scoredPop.length)].chrom;

      let child: number[];
      if (crossoverType === 'uniform') {
        child = p1.map((gene, idx) => (Math.random() < 0.5 ? gene : p2[idx]));
      } else {
        const pt = Math.floor(Math.random() * 15) + 1;
        child = [...p1.slice(0, pt), ...p2.slice(pt)];
      }

      // Bit-Flip Mutation
      const mutatedChild = child.map(gene =>
        Math.random() < mutationRate ? (gene === 1 ? 0 : 1) : gene
      );

      nextPopulation.push(mutatedChild);
    }

    populationRef.current = nextPopulation;
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && generation < 50) {
      interval = setInterval(() => {
        stepEvolution();
      }, 140);
    } else if (generation >= 50) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, generation]);

  const currentStats = fitnessHistory[fitnessHistory.length - 1] || { best: 0, avg: 0, cost: 0, coverage: 0 };
  const selectedSitesCount = bestGenome.filter(g => g === 1).length;

  return (
    <div className="bg-[#090e17] border border-cyan-900/40 rounded-xl p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-950/80 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100">
              {isFa ? 'بهینه‌سازی چندهدفه مکان‌یابی با الگوریتم ژنتیک' : 'Multi-Objective Facility Site Selection (DEAP)'}
            </h3>
            <a
              href="https://github.com/mohammad-hussein-dev/site-selection-ga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-[11px] text-emerald-400 bg-emerald-950/80 hover:bg-emerald-900 px-2 py-0.5 rounded border border-emerald-800 transition"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isFa
              ? 'حل مسائل NP-Hard مکان‌یابی با تقاطع یکنواخت، جهش تصادفی و حفظ جبهه پارتو (پوشش جمعیت در برابر هزینه زیرساخت).'
              : 'Solving NP-Hard spatial combinatorial optimization with binary elitism and Pareto tradeoff frontiers.'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={generation >= 50}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition ${
              isRunning
                ? 'bg-amber-950/80 text-amber-300 border border-amber-600'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? (isFa ? 'توقف تکامل' : 'Pause GA') : (isFa ? 'اجرای تکامل' : 'Evolve Gen')}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
            title="Reset Population"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation View: Spatial Map & Convergence Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Spatial Demographic Map */}
        <div className="lg:col-span-7 bg-[#05070c] rounded-xl p-3 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-900">
            <span className="text-emerald-400 font-semibold">
              {isFa ? `نسل: ${generation}/50 · سایت‌های فعال: ${selectedSitesCount}/16` : `Gen ${generation}/50 · Active Sites: ${selectedSitesCount}/16`}
            </span>
            <span className="text-slate-500 text-[10px]">
              {isFa ? 'نقاط فیروزه‌ای: تقاضا | دایره‌های سبز: تسهیلات' : 'Cyan: Demand | Green Circles: Sites'}
            </span>
          </div>

          <div className="mt-2 flex justify-center items-center">
            <svg viewBox="0 0 400 240" className="w-full h-auto max-w-lg rounded-lg border border-slate-900 bg-[#030408]">
              {/* Coverage radius circles for selected facilities */}
              {candidateSites.map((site, idx) => {
                const isSelected = bestGenome[idx] === 1;
                if (!isSelected) return null;
                return (
                  <circle
                    key={`cov-${idx}`}
                    cx={site.x}
                    cy={site.y}
                    r="48"
                    fill="#10b98115"
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}

              {/* Demand points */}
              {demandPoints.map((p, idx) => (
                <circle
                  key={`dp-${idx}`}
                  cx={p.x}
                  cy={p.y}
                  r={Math.max(1.8, p.demand * 0.08)}
                  fill="#38bdf8"
                  opacity="0.8"
                />
              ))}

              {/* Candidate sites */}
              {candidateSites.map((site, idx) => {
                const isSelected = bestGenome[idx] === 1;
                return (
                  <g key={`site-${idx}`}>
                    <rect
                      x={site.x - 7}
                      y={site.y - 7}
                      width="14"
                      height="14"
                      rx="3"
                      fill={isSelected ? '#10b981' : '#1e293b'}
                      stroke={isSelected ? '#34d399' : '#475569'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={site.x}
                      y={site.y + 3}
                      fill={isSelected ? '#022c22' : '#94a3b8'}
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {idx + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Chromosome Bitstring Inspector */}
          <div className="mt-3 pt-2 border-t border-slate-900 font-mono text-[11px]">
            <div className="text-slate-400 text-[10px] mb-1 flex items-center justify-between">
              <span>{isFa ? 'ژنوم کروموزوم برتر (۱۶ بیتی):' : 'Best Chromosome Bitstring (16-bit):'}</span>
              <span className="text-emerald-400">{selectedSitesCount} Genes Active</span>
            </div>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1">
              {bestGenome.map((gene, gIdx) => (
                <span
                  key={gIdx}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    gene === 1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {gene}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hyperparameters & Pareto Convergence */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3 font-mono text-xs">
          {/* Fitness Metrics */}
          <div className="p-3.5 bg-[#05070c] rounded-xl border border-emerald-950/80 space-y-2">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              {isFa ? 'شاخص‌های شایستگی پارتو' : 'Pareto Fitness Telemetry'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500">{isFa ? 'امتیاز شایستگی' : 'Max Fitness'}</div>
                <div className="text-emerald-400 font-bold text-base">{currentStats.best}</div>
              </div>
              <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500">{isFa ? 'پوشش جمعیت' : 'Coverage Score'}</div>
                <div className="text-cyan-300 font-bold text-base">{currentStats.coverage}</div>
              </div>
              <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500">{isFa ? 'هزینه سرمایه‌ای' : 'Capital Cost'}</div>
                <div className="text-amber-400 font-bold text-base">${currentStats.cost}k</div>
              </div>
              <div className="p-2 bg-[#090e1a] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-500">{isFa ? 'میانگین جمعیت' : 'Avg Fitness'}</div>
                <div className="text-purple-300 font-bold text-base">{currentStats.avg}</div>
              </div>
            </div>
          </div>

          {/* Genetic Hyperparameters Slider */}
          <div className="p-3.5 bg-[#05070c] rounded-xl border border-slate-800 space-y-3">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{isFa ? 'نرخ جهش ژنتیکی (pₘ):' : 'Mutation Rate (pₘ):'}</span>
                <span className="text-emerald-400 font-bold">{(mutationRate * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.25"
                step="0.01"
                value={mutationRate}
                onChange={(e) => setMutationRate(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>{isFa ? 'اندازه جمعیت اولیه (N):' : 'Population Size (N):'}</span>
                <span className="text-cyan-400 font-bold">{populationSize}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={populationSize}
                onChange={(e) => setPopulationSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
