import { forwardRef } from 'react';

const DottedText = forwardRef(({ text, className = '', style = {} }, ref) => {
  // Function to replace 'i' with dotted version
  const renderText = () => {
    return text.split('').map((char, index) => {
      if (char.toLowerCase() === 'i') {
        return (
          <span key={index} className="relative inline-block">
            <span className="opacity-0">i</span>
            <span className="absolute inset-0 flex flex-col items-center justify-start">
              <span className="w-[0.15em] h-[0.15em] rounded-full bg-current mb-[0.05em] mt-[0.05em]"></span>
              <span className="block">ı</span>
            </span>
          </span>
        );
      }
      return <span key={index}>{char}</span>;
    });
  };

  return (
    <span ref={ref} className={className} style={style}>
      {renderText()}
    </span>
  );
});

export default DottedText;
