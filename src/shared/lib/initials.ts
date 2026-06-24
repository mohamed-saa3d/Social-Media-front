const PALETTE = [
  ["#c8a8cd", "#7a4f86"],
  ["#b696bb", "#4b2a55"],
  ["#e9c7f0", "#6b3a78"],
  ["#a47ab1", "#2f1736"],
  ["#d8b4e2", "#5a2f6a"],
  ["#9e7aa8", "#3a1d44"],
];

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function avatarFromId(id: string) {
  const h = hash(id);
  const [from, to] = PALETTE[h % PALETTE.length];
  const initials = id.slice(-2).toUpperCase();
  const handle = `@user_${id.slice(-6)}`;
  const name = `User ${id.slice(-4).toUpperCase()}`;
  return { from, to, initials, handle, name, gradient: `linear-gradient(135deg, ${from}, ${to})` };
}
