import { useEffect, useRef, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';

type RiveNetworkAnimationProps = {
  className?: string;
  src?: string; // optional URL to a rive file
  width?: number;
  height?: number;
};

/**
 * Rive-based network animation component with static blue nodes and animated green connecting lines.
 * Falls back to a programmatically generated animation if no src is provided.
 */
export default function RiveNetworkAnimation(props: RiveNetworkAnimationProps) {
  const { className, src, width = 1440, height = 900 } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback: Create a simple network animation programmatically
  useEffect(() => {
    if (src || isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctxRaw = canvas.getContext('2d');
    if (!ctxRaw) return;
    const ctx = ctxRaw; // non-null context

    canvas.width = width;
    canvas.height = height;

    // Drawing configuration
    const baseLineColor = 'rgba(0, 255, 136, 0.28)';
    const baseLineWidth = 2;
    const runnerColor = '#00ff88';
    const runnerWidth = 4;
    const runnerGlowBlur = 10;
    const runnerLengthFraction = 0.22; // length of the bright segment relative to the whole line
    const runnerSpeed = 1.4; // higher = faster oscillation
    const runnerStagger = 0.5; // phase offset between lines

    // Node positions (static blue circles) - arranged in a star pattern
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 200; // Distance from center to outer nodes

    const nodes = [
      { x: centerX, y: centerY, label: 'LOGO', isCenter: true },
      { x: centerX, y: centerY - radius, label: 'Last Mile Delivery' },
      {
        x: centerX - radius * 0.7,
        y: centerY - radius * 0.7,
        label: 'Inventory Management',
      },
      { x: centerX - radius, y: centerY, label: 'Freight Forwarding' },
      {
        x: centerX - radius * 0.7,
        y: centerY + radius * 0.7,
        label: 'Customs Clearance',
      },
      { x: centerX, y: centerY + radius, label: 'Tracking & Visibility' },
      {
        x: centerX + radius * 0.7,
        y: centerY + radius * 0.7,
        label: 'Supply Chain Optimization',
      },
      { x: centerX + radius, y: centerY, label: 'Warehousing' },
      {
        x: centerX + radius * 0.7,
        y: centerY - radius * 0.7,
        label: 'Transportation',
      },
    ];

    // Save current outer node count before adding children
    const baseOuterEnd = nodes.length;

    // Add child nodes for Freight Forwarding (index 3) - to the left
    const ffIndex = 3;
    const ffChildrenIdx: number[] = [];
    const ffOffsets = [
      { dx: -160, dy: -60, label: 'FF 1' },
      { dx: -210, dy: 0, label: 'FF 2' },
      { dx: -260, dy: 60, label: 'FF 3' },
    ];
    ffOffsets.forEach((o) => {
      nodes.push({
        x: nodes[ffIndex].x + o.dx,
        y: nodes[ffIndex].y + o.dy,
        label: o.label,
      });
      ffChildrenIdx.push(nodes.length - 1);
    });

    // Add child nodes for Warehousing (index 7) - to the right
    const whIndex = 7;
    const whChildrenIdx: number[] = [];
    const whOffsets = [
      { dx: 160, dy: -60, label: 'WH 1' },
      { dx: 210, dy: 0, label: 'WH 2' },
      { dx: 260, dy: 60, label: 'WH 3' },
    ];
    whOffsets.forEach((o) => {
      nodes.push({
        x: nodes[whIndex].x + o.dx,
        y: nodes[whIndex].y + o.dy,
        label: o.label,
      });
      whChildrenIdx.push(nodes.length - 1);
    });

    // Create connections from center to only the original outer nodes
    const connections: [number, number][] = [];
    for (let i = 1; i < baseOuterEnd; i++) {
      connections.push([0, i]); // Connect center (0) to each original outer node
    }

    // Connect Freight Forwarding -> its children
    ffChildrenIdx.forEach((childIdx) => connections.push([ffIndex, childIdx]));

    // Connect Warehousing -> its children
    whChildrenIdx.forEach((childIdx) => connections.push([whIndex, childIdx]));

    // Extra cross-connections
    if (whChildrenIdx.length >= 3 && ffChildrenIdx.length >= 3) {
      connections.push([whChildrenIdx[2], ffChildrenIdx[2]]); // WH3 -> FF3
    }
    if (ffChildrenIdx.length >= 2) {
      connections.push([6, ffChildrenIdx[1]]); // Supply Chain Optimization -> FF2
    }
    connections.push([2, 8]); // Inventory Management -> Transportation

    let animationTime = 0;

    function drawBaseLine(
      a: { x: number; y: number },
      b: { x: number; y: number }
    ) {
      ctx.strokeStyle = baseLineColor;
      ctx.lineWidth = baseLineWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    function drawRunner(
      a: { x: number; y: number },
      b: { x: number; y: number },
      phase: number
    ) {
      // Oscillate t in [0, 1]
      const t = (Math.sin(phase) + 1) / 2;
      const half = Math.max(0.02, runnerLengthFraction / 2);
      const t0 = Math.max(0, Math.min(1, t - half));
      const t1 = Math.max(0, Math.min(1, t + half));

      const lerp = (p0: number, p1: number, tt: number) => p0 + (p1 - p0) * tt;
      const x0 = lerp(a.x, b.x, t0);
      const y0 = lerp(a.y, b.y, t0);
      const x1 = lerp(a.x, b.x, t1);
      const y1 = lerp(a.y, b.y, t1);

      ctx.strokeStyle = runnerColor;
      ctx.lineWidth = runnerWidth;
      ctx.lineCap = 'round';
      ctx.shadowColor = runnerColor;
      ctx.shadowBlur = runnerGlowBlur;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw all base lines first
      connections.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        drawBaseLine(from, to);
      });

      // Then draw animated runners on top
      connections.forEach(([fromIdx, toIdx], index) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        const phase = animationTime * runnerSpeed + index * runnerStagger;
        drawRunner(from, to, phase);
      });

      // Draw nodes (static blue circles)
      nodes.forEach((node) => {
        // Central node (LOGO) - brighter blue
        if (node.isCenter) {
          ctx.fillStyle = '#2E5BBA';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3;
        } else {
          ctx.fillStyle = '#2E5BBA';
          ctx.strokeStyle = '#5BA3F5';
          ctx.lineWidth = 2;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.isCenter ? 30 : 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = node.isCenter ? 'bold 14px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + (node.isCenter ? 40 : 35));
      });

      animationTime += 0.02;
      requestAnimationFrame(animate);
    }

    animate();
    setIsLoaded(true);
  }, [src, isLoaded, width, height]);

  if (src) {
    // Use Rive file if provided
    const { RiveComponent } = useRive({
      src: src,
      autoplay: true,
    });

    return (
      <div className={className} style={{ width: '100%', height: '100%' }}>
        <RiveComponent style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }

  // Fallback: Canvas-based animation
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      />
    </div>
  );
}
