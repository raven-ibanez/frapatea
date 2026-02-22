import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 px-4">
      {/* Decorative pink orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-frapatea-pink/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-frapatea-pink/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Logo mark */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-frapatea-pink shadow-pink-lg">
            <img src="/logo.jpg" alt="Frapatea" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-outfit font-bold mb-4 animate-fade-in leading-tight">
          <span className="text-white">Welcome to </span>
          <span className="text-gradient-pink">Frapatea</span>
        </h1>

        <p className="text-lg md:text-xl text-frapatea-muted mb-10 max-w-2xl mx-auto animate-slide-up font-inter leading-relaxed">
          Handcrafted frappes, signature milkshakes & refreshing teas — made with love, served with style.
        </p>

        <div className="flex items-center justify-center gap-4 animate-slide-up">
          <a
            href="#menu"
            className="btn-pink px-8 py-3.5 rounded-full font-outfit font-semibold text-base tracking-wide shadow-pink hover:shadow-pink-lg"
          >
            🧋 Order Now
          </a>
          <span className="text-frapatea-subtle text-sm font-inter">
            100+ menu items
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-10 mt-14 animate-fade-in">
          {[
            { label: 'Menu Items', value: '100+' },
            { label: 'Happy Cups', value: '10K+' },
            { label: 'Flavors', value: '50+' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-outfit font-bold text-gradient-pink">{value}</div>
              <div className="text-xs text-frapatea-muted font-inter mt-0.5 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;