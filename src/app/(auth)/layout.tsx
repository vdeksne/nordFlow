export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh bg-background">
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
