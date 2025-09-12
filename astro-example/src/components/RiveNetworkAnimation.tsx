import { useEffect, useRef, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

type RiveNetworkAnimationProps = {
  className?: string;
  src?: string;
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

    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx = ctxRaw; // non-null context

    canvas.width = width;
    canvas.height = height;

    // Drawing configuration (match design)
    const backgroundColor = "#0C2C3A";
    const baseLineColor = "rgba(255, 255, 255, 0.22)";
    const baseLineWidth = 2.5;
    const runnerColor = "rgba(255,255,255,0.95)";
    const runnerWidth = 5;
    const runnerGlowBlur = 12;
    const showIndices = true; // debug: show node index numbers for easier adjustments
    const enableEditor = false; // editor disabled
    const runnerLengthFraction = 0.22; // length of the bright segment relative to the whole line
    const runnerSpeed = 1.4; // higher = faster oscillation
    const runnerStagger = 0.5; // phase offset between lines

    // Coordinates provided by user (absolute canvas pixels)
    const nodes = [
      {
        x: 753.5449020931803,
        y: 479.35178933153276,
        label: "LOGO",
        isCenter: true,
        type: "center",
      }, // 0 center
      {
        x: 521.1613774476705,
        y: 463.7947332883187,
        label: "truck",
        type: "truck",
      }, // 1
      { x: 567.8325455773127, y: 322.8089128966914, label: "doc", type: "doc" }, // 2
      {
        x: 609.6421336934504,
        y: 561.9986495611074,
        label: "truck",
        type: "truck",
      }, // 3
      {
        x: 537.6907494935855,
        y: 697.1505739365294,
        label: "truck",
        type: "truck",
      }, // 4
      {
        x: 455.04388926401083,
        y: 596.029709655638,
        label: "truck",
        type: "truck",
      }, // 5
      {
        x: 395.73261309925726,
        y: 493.9365293720459,
        label: "doc",
        type: "doc",
      }, // 6
      { x: 293.6394328156651, y: 705.9014179608373, label: "doc", type: "doc" }, // 7
      {
        x: 455.04388926401083,
        y: 347.11681296421335,
        label: "truck",
        type: "truck",
      }, // 8
      {
        x: 258.6360567184335,
        y: 419.06819716407836,
        label: "truck",
        type: "truck",
      }, // 9
      {
        x: 220.71573261309928,
        y: 271.2761647535449,
        label: "doc",
        type: "doc",
      }, // 10
      {
        x: 148.7643484132343,
        y: 499.77042538825117,
        label: "doc",
        type: "doc",
      }, // 11
      {
        x: 106.95476029709656,
        y: 369.48008102633355,
        label: "truck",
        type: "truck",
      }, // 12
      {
        x: 894.5307224848076,
        y: 473.5178933153275,
        label: "bank",
        type: "bank",
      }, // 13
      {
        x: 885.7798784604997,
        y: 303.3625928426739,
        label: "badge",
        type: "badge",
      }, // 14
      {
        x: 909.1154625253207,
        y: 652.424037812289,
        label: "bank",
        type: "bank",
      }, // 15
      {
        x: 1030.6549628629305,
        y: 326.69817690749494,
        label: "bank",
        type: "bank",
      }, // 16
      {
        x: 1123.0249831195138,
        y: 462.82241728561786,
        label: "bank",
        type: "bank",
      }, // 17
      {
        x: 1023.8487508440244,
        y: 579.5003376097231,
        label: "badge",
        type: "badge",
      }, // 18
      {
        x: 1081.2153950033762,
        y: 709.7906819716408,
        label: "doc",
        type: "doc",
      }, // 19
      {
        x: 1183.3085752869683,
        y: 282.94395678595544,
        label: "badge",
        type: "badge",
      }, // 20
      {
        x: 1256.2322754895342,
        y: 422.95746117488187,
        label: "badge",
        type: "badge",
      }, // 21
      {
        x: 1224.1458474004053,
        y: 656.3133018230925,
        label: "bank",
        type: "bank",
      }, // 22
      {
        x: 1277.6232275489535,
        y: 534.7738014854827,
        label: "badge",
        type: "badge",
      }, // 23
    ];

    // Separate connections: base (faint) vs runner (bright moving segments)
    // Base default faint lines per user's mapping
    const connectionsBase: [number, number][] = [
      [0, 2], // logo -> 2
      [0, 3], // logo -> 3
      [3, 4],
      [3, 5],
      [2, 1],
      [2, 8],
      [1, 6],
      [1, 5],
      [6, 7],
      [6, 9],
      [9, 10],
      [9, 11],
      [10, 12],
      // right side
      [0, 14],
      [0, 15],
      [14, 13],
      [14, 16],
      [13, 17],
      [16, 20],
      [17, 20],
      [17, 22],
      [17, 18],
      [18, 19],
      [21, 23],
      [23, 22],
    ];
    // Animated bright segments: propagate from logo (0) outwards across all base edges
    const connectionsRunner: [number, number][] = connectionsBase.slice();

    // Compute graph depths from logo for wave-like staggering
    const adjacency = new Map<number, number[]>();
    connectionsBase.forEach(([a, b]) => {
      if (!adjacency.has(a)) adjacency.set(a, []);
      if (!adjacency.has(b)) adjacency.set(b, []);
      adjacency.get(a)!.push(b);
      adjacency.get(b)!.push(a);
    });
    const nodeDepth: Record<number, number> = {};
    const queue: number[] = [0];
    nodeDepth[0] = 0;
    while (queue.length) {
      const n = queue.shift()!;
      const nexts = adjacency.get(n) || [];
      nexts.forEach((m) => {
        if (nodeDepth[m] === undefined) {
          nodeDepth[m] = nodeDepth[n] + 1;
          queue.push(m);
        }
      });
    }
    const edgeDepth: number[] = connectionsRunner.map(([a, b]) =>
      Math.min(nodeDepth[a] ?? 0, nodeDepth[b] ?? 0)
    );

    let animationTime = 0;

    // Lightweight positioning editor
    let selectedIndex: number | null = null;
    if (enableEditor) {
      const getCanvasPoint = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      };

      const onMouseDown = (e: MouseEvent) => {
        const p = getCanvasPoint(e);
        let best = -1;
        let bestD2 = Number.POSITIVE_INFINITY;
        nodes.forEach((n, i) => {
          const dx = n.x - p.x;
          const dy = n.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD2) {
            bestD2 = d2;
            best = i;
          }
        });
        selectedIndex = best;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (selectedIndex === null) return;
        const p = getCanvasPoint(e);
        nodes[selectedIndex].x = p.x;
        nodes[selectedIndex].y = p.y;
      };

      const onMouseUp = () => {
        selectedIndex = null;
      };

      const onKeyDown = (e: KeyboardEvent) => {
        const step = e.shiftKey ? 10 : 2;
        if (selectedIndex !== null) {
          if (e.key === "ArrowLeft") nodes[selectedIndex].x -= step;
          if (e.key === "ArrowRight") nodes[selectedIndex].x += step;
          if (e.key === "ArrowUp") nodes[selectedIndex].y -= step;
          if (e.key === "ArrowDown") nodes[selectedIndex].y += step;
        }
        if (e.key.toLowerCase() === "s") {
          // eslint-disable-next-line no-console
          console.log(
            "NODE_COORDS",
            nodes.map((n) => ({ x: n.x, y: n.y, type: n.type }))
          );
        }
      };

      canvas.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("keydown", onKeyDown);

      // Ensure cleanup on unmount when editor enabled
      const cleanup = () => {
        canvas.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("keydown", onKeyDown);
      };
      // @ts-ignore - store for manual debugging if ever re-enabled
      (window as any).__riveEditorCleanup = cleanup;
    }

    // Icon drawing helpers
    const strokeIcon = "#E8F3FF";
    function drawDocIcon(x: number, y: number, r: number) {
      const s = r * 0.95;
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = strokeIcon;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-s * 0.42, -s * 0.46, s * 0.84, s * 0.92);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.28, -s * 0.18);
      ctx.lineTo(s * 0.28, -s * 0.18);
      ctx.moveTo(-s * 0.28, 0);
      ctx.lineTo(s * 0.28, 0);
      ctx.moveTo(-s * 0.28, s * 0.18);
      ctx.lineTo(s * 0.05, s * 0.18);
      ctx.stroke();
      ctx.restore();
    }

    function drawTruckIcon(x: number, y: number, r: number) {
      const s = r * 0.95;
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = strokeIcon;
      ctx.lineWidth = 2;
      // body
      ctx.beginPath();
      ctx.rect(-s * 0.55, -s * 0.2, s * 0.6, s * 0.35);
      ctx.stroke();
      // cab
      ctx.beginPath();
      ctx.moveTo(s * 0.05, -s * 0.2);
      ctx.lineTo(s * 0.35, -s * 0.2);
      ctx.lineTo(s * 0.45, 0);
      ctx.lineTo(s * 0.05, 0);
      ctx.closePath();
      ctx.stroke();
      // wheels
      ctx.beginPath();
      ctx.arc(-s * 0.35, s * 0.25, s * 0.12, 0, Math.PI * 2);
      ctx.arc(s * 0.15, s * 0.25, s * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawBadgeIcon(x: number, y: number, r: number) {
      const s = r * 0.95;
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = strokeIcon;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-s * 0.48, -s * 0.28);
      ctx.quadraticCurveTo(0, -s * 0.52, s * 0.48, -s * 0.28);
      ctx.lineTo(s * 0.48, s * 0.32);
      ctx.lineTo(-s * 0.48, s * 0.32);
      ctx.closePath();
      ctx.stroke();
      // avatar + lines
      ctx.beginPath();
      ctx.arc(-s * 0.18, s * 0.02, s * 0.12, 0, Math.PI * 2);
      ctx.moveTo(-s * 0.32, s * 0.18);
      ctx.lineTo(0, s * 0.18);
      ctx.moveTo(s * 0.12, -s * 0.04);
      ctx.lineTo(s * 0.32, -s * 0.04);
      ctx.moveTo(s * 0.12, s * 0.1);
      ctx.lineTo(s * 0.32, s * 0.1);
      ctx.stroke();
      ctx.restore();
    }

    function drawBankIcon(x: number, y: number, r: number) {
      const s = r * 1.05;
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = strokeIcon;
      ctx.lineWidth = 2;
      // roof
      ctx.beginPath();
      ctx.moveTo(-s * 0.55, -s * 0.1);
      ctx.lineTo(0, -s * 0.45);
      ctx.lineTo(s * 0.55, -s * 0.1);
      ctx.stroke();
      // base
      ctx.beginPath();
      ctx.moveTo(-s * 0.6, s * 0.35);
      ctx.lineTo(s * 0.6, s * 0.35);
      ctx.stroke();
      // columns
      for (let i = -2; i <= 2; i++) {
        const xCol = (i / 2.5) * s * 0.5;
        ctx.beginPath();
        ctx.moveTo(xCol, s * 0.3);
        ctx.lineTo(xCol, -s * 0.05);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawBaseLine(
      a: { x: number; y: number },
      b: { x: number; y: number }
    ) {
      ctx.strokeStyle = baseLineColor;
      ctx.lineWidth = baseLineWidth;
      ctx.lineCap = "round";
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
      ctx.lineCap = "round";
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
      // background
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw all base lines first (faint)
      connectionsBase.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        drawBaseLine(from, to);
      });

      // Then draw animated runners on top
      connectionsRunner.forEach(([fromIdx, toIdx], index) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        const depthOffset = (edgeDepth[index] || 0) * 0.6; // stagger by graph depth
        const phase =
          animationTime * runnerSpeed + index * runnerStagger + depthOffset;
        drawRunner(from, to, phase);
      });

      // Draw nodes (glowing circles with icons). Center is a rotating diamond
      nodes.forEach((node, idx) => {
        if (node.isCenter) {
          const size = 28 + 2 * Math.sin(animationTime * 0.8);
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = "#2E92DB";
          ctx.strokeStyle = "#9BD1FF";
          ctx.lineWidth = 3;
          ctx.shadowColor = "#6FC4FF";
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.rect(-size, -size, size * 2, size * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        } else {
          const baseRadius = (nodes[idx] as any).size ?? 18;
          const r = baseRadius; // keep static to make positioning easier
          ctx.fillStyle = "#2E92DB";
          ctx.strokeStyle = "#9BD1FF";
          ctx.lineWidth = 2;
          ctx.shadowColor = "#5BA3F5";
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;

          // icon
          const rr = r * 0.85;
          if ((node as any).type === "doc") drawDocIcon(node.x, node.y, rr);
          else if ((node as any).type === "truck")
            drawTruckIcon(node.x, node.y, rr);
          else if ((node as any).type === "badge")
            drawBadgeIcon(node.x, node.y, rr);
          else if ((node as any).type === "bank")
            drawBankIcon(node.x, node.y, rr);

          // optional index number for easier manual adjustments
          if (showIndices) {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(String(idx), node.x, node.y - rr - 8);
          }
        }
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
      <div className={className} style={{ width: "100%", height: "100%" }}>
        <RiveComponent style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }

  // Fallback: Canvas-based animation
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
}
