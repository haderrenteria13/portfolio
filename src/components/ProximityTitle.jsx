import { useRef } from 'react';
import VariableProximity from './VariableProximity.jsx';

const ProximityTitle = ({ 
  text, 
  className,
  fromFontVariationSettings = "'wght' 400, 'opsz' 9",
  toFontVariationSettings = "'wght' 1000, 'opsz' 40",
  radius = 100,
  falloff = 'linear'
}) => {
  const containerRef = useRef(null);

  return (
    <span
      ref={containerRef}
      style={{ position: 'relative', display: 'block', cursor: 'pointer' }}
      className={className}
    >
      <VariableProximity
        label={text}
        className={'variable-proximity-demo'}
        fromFontVariationSettings={fromFontVariationSettings}
        toFontVariationSettings={toFontVariationSettings}
        containerRef={containerRef}
        radius={radius}
        falloff={falloff}
      />
    </span>
  );
};

export default ProximityTitle;
