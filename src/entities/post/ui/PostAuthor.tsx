import { avatarFromId } from "@/shared/lib/initials";

export function Avatar({ id, size = 40 }: { id: string; size?: number }) {
  const a = avatarFromId(id);
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white ring-1 ring-white/10"
      style={{ width: size, height: size, background: a.gradient }}
      aria-hidden
    >
      {a.initials}
    </div>
  );
}

export function PostAuthor({ userId }: { userId: string }) {
  const a = avatarFromId(userId);
  return (
    <div className="flex items-center gap-3">
      <Avatar id={userId} />
      <div className="leading-tight">
        <p className="font-display text-sm font-semibold text-foreground">{a.name}</p>
        <p className="text-xs text-muted-foreground">{a.handle}</p>
      </div>
    </div>
  );
}
