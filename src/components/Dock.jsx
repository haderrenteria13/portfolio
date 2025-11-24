import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

function DockIcon({ mouseX, src, href, label }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base width 64px (w-16), scaling up to 110px
  const widthSync = useTransform(distance, [-150, 0, 150], [64, 110, 64]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square flex items-end justify-center relative group cursor-pointer z-10"
    >
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center transition-transform active:scale-90"
      >
        <img 
          src={src} 
          alt={label} 
          className="w-full h-full object-cover rounded-[18px] shadow-lg" 
          style={{ willChange: 'transform, width' }}
        />
      </a>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-gray-900/90 border border-white/10 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-md shadow-xl">
        {label}
        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-900/90"></div>
      </div>
    </motion.div>
  );
}

export default function Dock({ items }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div 
      className="flex h-20 items-end gap-4 px-4 pb-3"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* Dock Background Pill */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/10 border border-white/5 backdrop-blur-2xl rounded-[24px] -z-10 mx-auto w-fit min-w-full shadow-2xl"></div>

      {items.map((item, i) => (
        <DockIcon key={i} mouseX={mouseX} {...item} />
      ))}
    </div>
  );
}
