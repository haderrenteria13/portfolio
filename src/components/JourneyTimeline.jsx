import { motion } from "motion/react";

const JOURNEY_ITEMS = [
  {
    id: 1,
    year: "2020",
    name: "Colegio",
    // Add your school logo path here: logo: "/path/to/colegio-logo.png"
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    borderColor: "border-blue-400"
  },
  {
    id: 2,
    year: "2021",
    name: "SENA",
    // Add SENA logo path here: logo: "/path/to/sena-logo.png"
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-700",
    borderColor: "border-orange-300"
  },
  {
    id: 3,
    year: "2022",
    name: "Universidad",
    // Add university logo path here: logo: "/path/to/uni-logo.png"
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    borderColor: "border-gray-400"
  },
  {
    id: 4,
    year: "2023",
    name: "Freelance",
    // Add freelance icon/logo here: logo: "/path/to/freelance-logo.png"
    bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    borderColor: "border-yellow-300"
  },
  {
    id: 5,
    year: "now",
    name: "Building",
    // Add current work logo here: logo: "/path/to/current-logo.png"
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
    borderColor: "border-purple-300"
  }
];

export default function JourneyTimeline() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      
      {/* Quote - Hand-written style */}
      <p className="text-center text-gray-400 italic font-light text-base md:text-lg mb-20 font-cursive opacity-70">
        Every experience in my life is<br className="md:hidden" /> important and has taught me a lot
      </p>

      {/* Timeline Container */}
      <div className="relative px-4 md:px-8">
        
        {/* Hand-drawn style wavy line using SVG */}
        <svg 
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-8 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 40"
        >
          <path
            d="M 0 20 Q 50 18 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            className="text-white/20"
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow at the end - hand-drawn style */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-white/20">
            <path
              d="M 5 20 L 30 20 M 25 13 L 32 20 L 25 27"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Journey Items */}
        <div className="relative grid grid-cols-5 gap-2 md:gap-4">
          {JOURNEY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center group"
            >
              {/* Logo Circle */}
              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full ${item.bgColor} flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] border-[3px] ${item.borderColor} cursor-pointer group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300`}
              >
                {/* Placeholder for logo - replace with actual images */}
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                ) : (
                  <span className="text-white text-xl md:text-3xl font-bold opacity-80">
                    {item.name.charAt(0)}
                  </span>
                )}
                
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-white/10"></div>
              </motion.div>

              {/* Connection dot on line */}
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/30 border-2 border-white/50 -mt-3 mb-4 group-hover:bg-white group-hover:scale-125 transition-all duration-300 shadow-md relative z-10"></div>

              {/* Name */}
              <span className="text-white/70 font-medium text-xs md:text-sm mb-2 text-center group-hover:text-white transition-colors duration-300">
                {item.name}
              </span>

              {/* Year - hand-written style for "now" */}
              <span className={`font-bold text-base md:text-xl ${
                item.year === 'now' 
                  ? 'font-cursive text-white italic' 
                  : 'text-white/50'
              }`}>
                {item.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
