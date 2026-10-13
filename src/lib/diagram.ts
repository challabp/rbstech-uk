// Renders a pattern's node-and-edge definition as inline SVG.
// Colours come from CSS classes in global.css so diagrams follow the site palette.
import type { DEdge, DNode, Pattern } from '../data/patterns';

const W = 196;
const H = 66;
const GX = 48;
const GY = 50;
const PAD = 6;

interface Box {
  x: number;
  y: number;
  cx: number;
  cy: number;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text: string, max: number, lines: number): string[] {
  const words = text.split(' ');
  const out: string[] = [];
  let cur = '';
  for (const w of words) {
    if (cur && (cur + ' ' + w).length > max) {
      out.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    const kept = out.slice(0, lines);
    kept[lines - 1] = kept[lines - 1].replace(/[\s,]+\S*$/, '') + '…';
    return kept;
  }
  return out;
}

const box = (n: DNode): Box => {
  const x = PAD + n.c * (W + GX);
  const y = PAD + n.r * (H + GY);
  return { x, y, cx: x + W / 2, cy: y + H / 2 };
};

function node(n: DNode, slots: (s: string) => string): string {
  const b = box(n);
  const title = wrap(slots(n.t), 25, 2);
  const sub = n.s ? wrap(slots(n.s), 32, 1)[0] : '';
  const rows = title.length + (sub ? 1 : 0);
  let y = b.cy - (rows - 1) * 8.5 + 1;
  let text = '';
  for (const line of title) {
    text += `<text class="dg-t" x="${b.cx}" y="${y}">${esc(line)}</text>`;
    y += 17;
  }
  if (sub) text += `<text class="dg-s" x="${b.cx}" y="${y}">${esc(sub)}</text>`;
  return `<g class="dg-n dg-${n.kind}"><rect x="${b.x}" y="${b.y}" width="${W}" height="${H}" rx="6"/>${text}</g>`;
}

function edge(e: DEdge, nodes: Record<string, DNode>, paired: boolean): string {
  const a = nodes[e.from];
  const b = nodes[e.to];
  const A = box(a);
  const B = box(b);
  const off = paired ? (e.back ? 13 : -13) : 0;
  let pts: [number, number][];
  if (a.r === b.r) {
    const dir = b.c > a.c ? 1 : -1;
    pts = [
      [A.cx + (dir * W) / 2, A.cy + off],
      [B.cx - (dir * W) / 2, B.cy + off],
    ];
  } else if (a.c === b.c) {
    const dir = b.r > a.r ? 1 : -1;
    pts = [
      [A.cx + off, A.cy + (dir * H) / 2],
      [B.cx + off, B.cy - (dir * H) / 2],
    ];
  } else if (e.back) {
    // vertical first, then into the side of the target
    const dirY = b.r > a.r ? 1 : -1;
    const dirX = b.c > a.c ? 1 : -1;
    const sx = A.cx + dirX * 44;
    pts = [
      [sx, A.cy + (dirY * H) / 2],
      [sx, B.cy],
      [B.cx - (dirX * W) / 2, B.cy],
    ];
  } else if (Math.abs(b.c - a.c) === 1 && a.kind === 'agent' && b.kind === 'agent') {
    // fan-out: leave the side, turn in the gutter, enter the side
    const dir = b.c > a.c ? 1 : -1;
    const mx = A.cx + dir * (W / 2 + GX / 2);
    pts = [
      [A.cx + (dir * W) / 2, A.cy],
      [mx, A.cy],
      [mx, B.cy],
      [B.cx - (dir * W) / 2, B.cy],
    ];
  } else {
    // leave the bottom, turn in the gutter between rows, enter the top
    const dirY = b.r > a.r ? 1 : -1;
    const dirX = b.c > a.c ? 1 : -1;
    const sx = A.cx + dirX * 44;
    const my = A.cy + dirY * (H / 2 + GY / 2);
    pts = [
      [sx, A.cy + (dirY * H) / 2],
      [sx, my],
      [B.cx, my],
      [B.cx, B.cy - (dirY * H) / 2],
    ];
  }
  // pull the end back so the arrowhead sits outside the box
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  let out = `<path class="dg-e${e.back ? ' dg-back' : ''}" d="${d}" marker-end="url(#dg-arrow${e.back ? '-b' : ''})"/>`;
  if (e.label) {
    // label on the longest segment
    let best = 0;
    let len = -1;
    for (let i = 0; i < pts.length - 1; i++) {
      const l = Math.abs(pts[i + 1][0] - pts[i][0]) + Math.abs(pts[i + 1][1] - pts[i][1]);
      if (l > len) {
        len = l;
        best = i;
      }
    }
    const mx = (pts[best][0] + pts[best + 1][0]) / 2;
    const my = (pts[best][1] + pts[best + 1][1]) / 2;
    const w = e.label.length * 6.1 + 12;
    out += `<g class="dg-l"><rect x="${mx - w / 2}" y="${my - 10}" width="${w}" height="20" rx="3"/><text x="${mx}" y="${my + 4}">${esc(e.label)}</text></g>`;
  }
  return out;
}

export function renderDiagram(p: Pattern, slots: (s: string) => string = (s) => s, title?: string): string {
  const nodes = Object.fromEntries(p.nodes.map((n) => [n.id, n]));
  const cols = Math.max(...p.nodes.map((n) => n.c)) + 1;
  const rows = Math.max(...p.nodes.map((n) => n.r)) + 1;
  const width = PAD * 2 + cols * W + (cols - 1) * GX;
  const height = PAD * 2 + rows * H + (rows - 1) * GY;
  const key = (e: DEdge) => [e.from, e.to].sort().join('|');
  const pairCount: Record<string, number> = {};
  for (const e of p.edges) pairCount[key(e)] = (pairCount[key(e)] ?? 0) + 1;
  const edges = p.edges.map((e) => edge(e, nodes, pairCount[key(e)] > 1)).join('');
  const boxes = p.nodes.map((n) => node(n, slots)).join('');
  const label = esc(title ?? `${p.name} architecture`);
  return (
    `<svg class="dg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="dg-ah" d="M1 1L9 5L1 9z"/></marker>` +
    `<marker id="dg-arrow-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="dg-ah dg-ah-b" d="M1 1L9 5L1 9z"/></marker></defs>` +
    edges +
    boxes +
    `</svg>`
  );
}
