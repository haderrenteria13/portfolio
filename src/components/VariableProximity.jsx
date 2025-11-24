import { forwardRef, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

function useMousePosition(ref) {
  const positionRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event) => {
      const rect = element.getBoundingClientRect();
      positionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      positionRef.current = { x: -9999, y: -9999 };
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return positionRef;
}

const VariableProximity = forwardRef(({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 50,
  falloff = 'linear',
  className = '',
  onClick,
  style,
}, ref) => {
  const letterRefs = useRef([]);
  const mousePositionRef = useMousePosition(containerRef);
  
  // Parse the variation settings strings into objects
  const parsedSettings = useMemo(() => {
    const parse = (str) => {
      const settings = {};
      const regex = /'([a-zA-Z]{4})'\s+(\d+(\.\d+)?)/g;
      let match;
      while ((match = regex.exec(str)) !== null) {
        settings[match[1]] = parseFloat(match[2]);
      }
      return settings;
    };
    return {
      from: parse(fromFontVariationSettings),
      to: parse(toFontVariationSettings)
    };
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useEffect(() => {
    if (letterRefs.current.length !== label.length) {
      letterRefs.current = letterRefs.current.slice(0, label.length);
    }

    let rafId;
    
    const updateLetters = () => {
      const mousePosition = mousePositionRef.current;
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (!containerRect) {
        rafId = requestAnimationFrame(updateLetters);
        return;
      }

      letterRefs.current.forEach((letterElement, index) => {
        if (!letterElement) return;

        const rect = letterElement.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const relativeLetterX = letterCenterX - containerRect.left;
        const relativeLetterY = letterCenterY - containerRect.top;

        const distance = Math.sqrt(
          Math.pow(mousePosition.x - relativeLetterX, 2) +
          Math.pow(mousePosition.y - relativeLetterY, 2)
        );

        let t = 0;
        if (distance <= radius) {
          t = 1 - distance / radius;
          if (t < 0) t = 0;
          
          // Apply falloff
          if (falloff === 'exponential') t = t * t;
        }
        
        // Interpolate values and apply directly to DOM
        const settingsArray = [];
        for (const key in parsedSettings.from) {
          const start = parsedSettings.from[key];
          const end = parsedSettings.to[key];
          const value = end !== undefined ? start + (end - start) * t : start;
          settingsArray.push(`'${key}' ${value}`);
        }
        
        letterElement.style.fontVariationSettings = settingsArray.join(', ');
      });

      rafId = requestAnimationFrame(updateLetters);
    };

    rafId = requestAnimationFrame(updateLetters);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [radius, falloff, parsedSettings, label, containerRef, mousePositionRef]);

  return (
    <span
      ref={ref}
      className={`${className} inline-block`}
      onClick={onClick}
      style={{ ...style, display: 'inline-block', cursor: 'pointer' }}
    >
      {label.split('').map((char, index) => {
        const settingsString = Object.entries(parsedSettings.from)
          .map(([key, value]) => `'${key}' ${value}`)
          .join(', ');

        return (
          <motion.span
            key={index}
            ref={(el) => (letterRefs.current[index] = el)}
            style={{
              fontVariationSettings: settingsString,
              display: 'inline-block',
              willChange: 'font-variation-settings'
            }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
      <span className="sr-only">{label}</span>
    </span>
  );
});

export default VariableProximity;
