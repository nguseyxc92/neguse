import React, { useState, useRef, useEffect } from 'react';

export const HeroBridgeCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setMousePos({ x, y });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Bridge geometry parameters for span 4 (Zijlweg Viaduct inspired)
  const numNodes = 17;
  const nodes = Array.from({ length: numNodes }, (_, i) => {
    const frac = i / (numNodes - 1);
    const x = 50 + frac * 700;
    // Interactive deflection based on pointer x distance
    const dist = Math.abs(frac - mousePos.x);
    const loadInfluence = Math.exp(-dist * dist * 18) * (18 + mousePos.y * 12);
    const yBaseline = 150;
    const yDeflected = yBaseline + loadInfluence;
    return { id: i, x, y: yDeflected, baseElevation: yBaseline, loadInfluence };
  });

  // Calculate prior vs posterior distribution path based on load state
  const priorMean = 360;
  const priorStd = 70;
  const posteriorMean = 420;
  const posteriorStd = 35; // Sharper posterior, reduced variance

  const generateGaussianPoints = (mean: number, std: number, baselineY: number, height: number) => {
    const points: string[] = [];
    for (let x = 200; x <= 580; x += 4) {
      const z = (x - mean) / std;
      const pdf = Math.exp(-0.5 * z * z);
      const y = baselineY - pdf * height;
      points.push(`${x},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const priorPoints = generateGaussianPoints(priorMean, priorStd, 90, 48);
  const posteriorPoints = generateGaussianPoints(posteriorMean, posteriorStd, 90, 68);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden opacity-35 dark:opacity-40 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 240"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full text-[#56C7D8]"
      >
        <defs>
          <linearGradient id="bridgeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#29475A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#56C7D8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#29475A" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="posteriorFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#56C7D8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#56C7D8" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="priorFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D6B675" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D6B675" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Coordinate Grid Lines */}
        <g stroke="#29475A" strokeOpacity="0.2" strokeWidth="0.75" strokeDasharray="3 3">
          <line x1="50" y1="30" x2="750" y2="30" />
          <line x1="50" y1="90" x2="750" y2="90" />
          <line x1="50" y1="150" x2="750" y2="150" />
          <line x1="50" y1="210" x2="750" y2="210" />
          {[100, 200, 300, 400, 500, 600, 700].map((gx) => (
            <line key={gx} x1={gx} y1="20" x2={gx} y2="220" />
          ))}
        </g>

        {/* Bridge Supports (Abutment Support 5 & Pier Support 4) */}
        {/* Left Abutment */}
        <path d="M 40 150 L 50 150 L 50 200 L 35 210 L 35 150 Z" fill="#102A3D" stroke="#29475A" strokeWidth="1" />
        <line x1="30" y1="210" x2="60" y2="210" stroke="#29475A" strokeWidth="2" />
        {/* Right Intermediate Pier */}
        <path d="M 740 150 L 760 150 L 765 210 L 735 210 Z" fill="#102A3D" stroke="#29475A" strokeWidth="1" />
        <line x1="725" y1="210" x2="775" y2="210" stroke="#29475A" strokeWidth="2" />

        {/* Bridge Deck Lower & Upper Flange (Wireframe Finite Elements) */}
        <path
          d={`M 50 142 ${nodes.map((n) => `L ${n.x} ${n.y - 8}`).join(' ')} L 750 142`}
          fill="none"
          stroke="url(#bridgeLineGrad)"
          strokeWidth="1.5"
        />
        <path
          d={`M 50 150 ${nodes.map((n) => `L ${n.x} ${n.y}`).join(' ')} L 750 150`}
          fill="none"
          stroke="#56C7D8"
          strokeWidth="2"
        />

        {/* Finite Element Web Bracing / Transverse Division */}
        {nodes.map((node, i) => (
          <g key={i}>
            <line
              x1={node.x}
              y1={node.y - 8}
              x2={node.x}
              y2={node.y}
              stroke="#56C7D8"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
            {i < nodes.length - 1 && (
              <line
                x1={node.x}
                y1={node.y - 8}
                x2={nodes[i + 1].x}
                y2={nodes[i + 1].y}
                stroke="#29475A"
                strokeWidth="0.75"
                strokeOpacity="0.5"
              />
            )}
            {/* Interactive FE Node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={activeNode === i ? 4 : 2.2}
              fill={activeNode === i ? '#F4F8FC' : '#56C7D8'}
              stroke="#03121E"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setActiveNode(i)}
              onMouseLeave={() => setActiveNode(null)}
            />
          </g>
        ))}

        {/* Interactive Applied Tandem Load Indicator */}
        <g
          transform={`translate(${50 + mousePos.x * 700}, 125)`}
          className="transition-transform duration-75 ease-out"
        >
          <line x1="0" y1="-28" x2="0" y2="-4" stroke="#D6B675" strokeWidth="2" />
          <polygon points="0,0 -4,-8 4,-8" fill="#D6B675" />
          <text
            x="8"
            y="-16"
            className="text-[9px] font-mono fill-[#D6B675] font-semibold"
          >
            F_test: {(1000 + mousePos.y * 342).toFixed(0)} kN
          </text>
        </g>

        {/* Overlaid Prior vs Posterior Probability Distributions (Upper Right) */}
        <g transform="translate(180, 0)">
          {/* Prior Distribution */}
          <polygon
            points={`200,90 ${priorPoints} 580,90`}
            fill="url(#priorFill)"
          />
          <polyline
            points={priorPoints}
            fill="none"
            stroke="#D6B675"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />

          {/* Posterior Distribution (Updated via Bayesian MCMC) */}
          <polygon
            points={`200,90 ${posteriorPoints} 580,90`}
            fill="url(#posteriorFill)"
          />
          <polyline
            points={posteriorPoints}
            fill="none"
            stroke="#56C7D8"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          <line x1="200" y1="90" x2="580" y2="90" stroke="#29475A" strokeWidth="1" />
          <text x="210" y="84" className="text-[9px] font-mono fill-[#D6B675]">
            Prior f_R(r)
          </text>
          <text x="430" y="32" className="text-[9px] font-mono fill-[#56C7D8] font-bold">
            Posterior f_R|D(r) &middot; &beta;=5.33
          </text>
        </g>
      </svg>
    </div>
  );
};
