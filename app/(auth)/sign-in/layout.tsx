export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-200 to-yellow-400 z-[-1]"></div>

      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
