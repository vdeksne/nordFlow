export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
      >
        <div
          className="absolute top-[-20%] left-1/2 size-[min(140vw,720px)] -translate-x-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent), transparent 65%)",
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
