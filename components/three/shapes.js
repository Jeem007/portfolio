/**
 * Point-cloud formations for the hero. Every function returns `count` xyz
 * positions so the same particle can travel between shapes.
 * Story: Code (</>) → Interface (browser layout) → Intelligence (neural net).
 */

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

/** Sample points along polylines given as segments [x1, y1, x2, y2, z]. */
function sampleSegments(segments, count, { thickness = 0.05, depth = 0.12 } = {}) {
  const lengths = segments.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1));
  const total = lengths.reduce((a, b) => a + b, 0);
  const cumulative = [];
  lengths.reduce((acc, l, i) => (cumulative[i] = acc + l), 0);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * total;
    let s = cumulative.findIndex((c) => c >= r);
    if (s < 0) s = segments.length - 1;
    const [x1, y1, x2, y2, z = 0] = segments[s];
    const t = Math.random();
    out[i * 3] = x1 + (x2 - x1) * t + gauss() * thickness;
    out[i * 3 + 1] = y1 + (y2 - y1) * t + gauss() * thickness;
    out[i * 3 + 2] = z + gauss() * depth;
  }
  return out;
}

function rect(x, y, w, h, z = 0) {
  return [
    [x, y, x + w, y, z],
    [x + w, y, x + w, y - h, z],
    [x + w, y - h, x, y - h, z],
    [x, y - h, x, y, z],
  ];
}

function circle(cx, cy, r, z = 0, steps = 10) {
  const segs = [];
  for (let i = 0; i < steps; i++) {
    const a1 = (i / steps) * Math.PI * 2;
    const a2 = ((i + 1) / steps) * Math.PI * 2;
    segs.push([cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, cx + Math.cos(a2) * r, cy + Math.sin(a2) * r, z]);
  }
  return segs;
}

export function codeShape(count) {
  const segs = [
    // <
    [-1.55, 1.0, -2.45, 0, 0],
    [-2.45, 0, -1.55, -1.0, 0],
    // /
    [0.5, 1.2, -0.5, -1.2, 0],
    // >
    [1.55, 1.0, 2.45, 0, 0],
    [2.45, 0, 1.55, -1.0, 0],
  ];
  return sampleSegments(segs, count, { thickness: 0.07, depth: 0.22 });
}

export function interfaceShape(count) {
  const segs = [
    ...rect(-2.4, 1.5, 4.8, 3.0, 0), // window
    [-2.4, 1.1, 2.4, 1.1, 0], // title bar
    ...circle(-2.15, 1.3, 0.06, 0, 6),
    ...circle(-1.95, 1.3, 0.06, 0, 6),
    ...circle(-1.75, 1.3, 0.06, 0, 6),
    [-1.0, 1.3, 0.9, 1.3, 0], // address bar
    ...rect(-2.2, 0.9, 0.9, 2.2, 0.15), // sidebar
    [-2.05, 0.65, -1.5, 0.65, 0.15],
    [-2.05, 0.4, -1.6, 0.4, 0.15],
    [-2.05, 0.15, -1.45, 0.15, 0.15],
    ...rect(-1.1, 0.9, 3.3, 1.0, 0.35), // hero block
    [-0.9, 0.6, 0.6, 0.6, 0.35],
    [-0.9, 0.35, 0.2, 0.35, 0.35],
    ...rect(1.35, 0.75, 0.65, 0.3, 0.45), // CTA pill
    ...rect(-1.1, -0.3, 1.0, 1.0, 0.55), // cards
    ...rect(0.05, -0.3, 1.0, 1.0, 0.55),
    ...rect(1.2, -0.3, 1.0, 1.0, 0.55),
  ];
  return sampleSegments(segs, count, { thickness: 0.03, depth: 0.05 });
}

export function neuralShape(count) {
  const layers = [3, 5, 5, 2];
  const nodes = layers.map((n, li) => {
    const x = -2.1 + (li / (layers.length - 1)) * 4.2;
    return Array.from({ length: n }, (_, i) => [x, (i - (n - 1) / 2) * 0.62, Math.sin(li * 1.7 + i) * 0.35]);
  });
  const edges = [];
  for (let l = 0; l < nodes.length - 1; l++) {
    for (const a of nodes[l]) for (const b of nodes[l + 1]) edges.push([a, b]);
  }
  const flat = nodes.flat();
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    if (Math.random() < 0.38) {
      const [nx, ny, nz] = flat[Math.floor(Math.random() * flat.length)];
      x = nx + gauss() * 0.09;
      y = ny + gauss() * 0.09;
      z = nz + gauss() * 0.09;
    } else {
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      const t = Math.random();
      x = a[0] + (b[0] - a[0]) * t + gauss() * 0.012;
      y = a[1] + (b[1] - a[1]) * t + gauss() * 0.012;
      z = a[2] + (b[2] - a[2]) * t + gauss() * 0.012;
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

/** Wide random cloud the particles assemble from on load. */
export function scatterShape(count) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = rand(4, 9);
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(rand(-1, 1));
    out[i * 3] = r * Math.sin(ph) * Math.cos(th);
    out[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
    out[i * 3 + 2] = r * Math.cos(ph) * 0.5;
  }
  return out;
}

export const PHASES = [
  { id: "code", label: "Code", caption: "Clean, component-driven code" },
  { id: "interface", label: "Interface", caption: "Interfaces people enjoy using" },
  { id: "intelligence", label: "Intelligence", caption: "AI wired into the product" },
];
