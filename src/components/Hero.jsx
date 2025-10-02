import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <header className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs font-medium ring-1 ring-inset ring-emerald-400/20 mb-4">
            Modern academic tracking
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Manage classes, teachers, and students with ease
          </h1>
          <p className="mt-4 text-slate-200/80 text-base sm:text-lg">
            A lightweight dashboard to add people, create classes, and make assignments. Built with React and Tailwind.
          </p>
          <div className="mt-8">
            <a href="#app-start" className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-md font-medium transition">
              Get started
            </a>
          </div>
        </div>
      </div>

      <div id="app-start" className="absolute bottom-0" />
    </header>
  );
}
