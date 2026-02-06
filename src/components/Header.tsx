type HeaderProps = {
  count: number;
};

export default function Header({ count }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-800 bg-zinc-900/60">
            <span className="text-sm font-semibold text-zinc-100">MB</span>
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-semibold tracking-tight text-zinc-100">
              MyBooks
            </h1>
            <p className="text-xs text-zinc-500">Catálogo pessoal</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          {count} livro{count === 1 ? "" : "s"}
        </span>
      </div>
    </header>
  );
}
