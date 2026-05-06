// Generate a unique, deterministic gradient + initials poster for any movie title.
// Returns a data: URL — no network required, never fails.
export function makeFallbackPoster(title) {
  const palettes = [
    ["#7c3aed", "#ec4899"], // purple → pink
    ["#0ea5e9", "#1e40af"], // sky → blue
    ["#dc2626", "#7c2d12"], // red → brown
    ["#f59e0b", "#dc2626"], // amber → red
    ["#10b981", "#0f766e"], // emerald → teal
    ["#f43f5e", "#7c3aed"], // rose → purple
    ["#0891b2", "#0e7490"], // cyan → cyan-dark
    ["#ea580c", "#9a3412"], // orange → dark orange
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  const [c1, c2] = palettes[Math.abs(hash) % palettes.length];

  const initials = title
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const safe = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${c1}'/>
        <stop offset='1' stop-color='${c2}'/>
      </linearGradient>
      <radialGradient id='shine' cx='30%' cy='20%' r='60%'>
        <stop offset='0' stop-color='white' stop-opacity='0.25'/>
        <stop offset='1' stop-color='white' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect width='400' height='600' fill='url(#g)'/>
    <rect width='400' height='600' fill='url(#shine)'/>
    <text x='200' y='280' font-family='Poppins, Arial, sans-serif' font-size='160' font-weight='800' fill='white' fill-opacity='0.95' text-anchor='middle' dominant-baseline='middle'>${initials}</text>
    <text x='200' y='480' font-family='Inter, Arial, sans-serif' font-size='28' font-weight='700' fill='white' fill-opacity='0.95' text-anchor='middle'>${safe}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
