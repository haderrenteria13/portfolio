import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { SendHorizontal as SendHorizontalIcon } from "lucide-react";

function DockIcon({ mouseX, src, href, label }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [55, 100, 55]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square relative group cursor-pointer z-10 flex items-center justify-center"
    >
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
      >
        <motion.img 
          src={src} 
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover rounded-[10px] shadow-lg"
          whileTap={{ scale: 0.85 }}
          style={{ willChange: 'width, transform' }}
        />
      </a>
      
      {/* Tooltip */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-md shadow-xl translate-y-1 group-hover:translate-y-0">
        {label}
      </div>
    </motion.div>
  );
}

export default function FooterDock({ items, email }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full max-w-[90rem] mx-auto px-6 pb-6"> {/* Much wider container */}
      
      {/* Wide Floating Bar (Base) */}
      <div className="relative w-full flex items-center justify-between px-4 py-3 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900/50 backdrop-blur-2xl rounded-[28px] shadow-[inset_0_1.5px_3px_0_rgba(255,255,255,0.1),inset_0_-1.5px_3px_0_rgba(0,0,0,0.25),0_0_0_0.5px_rgba(255,255,255,0.08),0_0_0_2.5px_rgba(0,0,0,0.35),0_20px_40px_-10px_rgba(0,0,0,0.5)]">
        
        {/* Top Shine */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70"></div>

        {/* Left: Email */}
        <a 
          href={`mailto:${email}`}
          className="flex items-center gap-4 px-5 py-3 rounded-[20px] bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.05)] min-w-fit"
        >
          <div className="p-2 rounded-full group-hover:text-white transition-all duration-300 text-white/80">
            <SendHorizontalIcon className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-white/70 font-medium text-lg group-hover:text-white transition-colors tracking-wide hidden sm:inline-block">
            {email}
          </span>
        </a>

        {/* Right: Dock Icons */}
        <div 
          className="flex items-center gap-3 h-[70px]"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {items.map((item, i) => (
            <DockIcon key={i} mouseX={mouseX} {...item} />
          ))}
        </div>

      </div>

      <div className="hidden mt-3 lg:flex items-center gap-2 text-white/20 text-[10px] font-medium tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
        <span>© {new Date().getFullYear()} Hader Renteria</span>
        <span>|</span>
        <span>Colombia</span>
      </div>
      
      {/* Mobile Copyright (Visible only on small screens) */}
      <div className="lg:hidden flex justify-center mt-4 text-white/20 text-[10px] font-medium tracking-widest uppercase">
        <span>© {new Date().getFullYear()} Hader Renteria</span>
      </div>
    </div>
  );
}
