import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Calendar, MapPin, GraduationCap, Code, Sparkles } from "lucide-react";

const EXPERIENCE_DATA = [
  {
    id: 1,
    date: "2024 - Present",
    company: "Freelance & Projects",
    location: "Remote",
    role: "Full Stack Developer",
    description: "Applying knowledge in real-world scenarios. Building high-performance web applications, experimenting with new technologies like Astro and Next.js, and refining UI/UX skills.",
    tags: ["React", "Astro", "TailwindCSS", "Node.js"],
    type: "code"
  },
  {
    id: 2,
    date: "2021 - Present",
    company: "University",
    location: "Colombia",
    role: "Systems Engineering Student",
    description: "Building a strong foundation in computer science principles, algorithms, and software architecture. Leading study groups and participating in coding hackathons.",
    tags: ["Algorithms", "Java", "Database Design", "Architecture"],
    type: "education"
  },
  {
    id: 3,
    date: "2020 - 2021",
    company: "Self-Taught",
    location: "Home",
    role: "Web Development",
    description: "Started the journey into the world of code. Mastered HTML, CSS, and JavaScript basics through intensive self-study and building numerous clone projects.",
    tags: ["HTML5", "CSS3", "JavaScript", "Git"],
    type: "sparkle"
  }
];

function ExperienceCard({ data, index }) {
  const isEven = index % 2 === 0;
  
  // Select icon based on type
  const Icon = data.type === 'education' ? GraduationCap : data.type === 'code' ? Code : Sparkles;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start relative group"
    >
      
      {/* Left Column: Company/School Info */}
      <div className={`flex flex-col space-y-2 ${isEven ? "md:items-end md:text-right md:order-1" : "md:items-start md:text-left md:order-3"}`}>
        <span className="text-amber-300/90 font-medium text-sm tracking-widest uppercase mb-1">
          {data.date}
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 font-playfair tracking-tight group-hover:from-yellow-200 group-hover:via-yellow-400 group-hover:to-yellow-200 transition-all duration-500">
          {data.company}
        </h3>
        <div className={`flex items-center gap-2 text-white/40 text-sm font-medium ${isEven ? "md:justify-end" : "md:justify-start"}`}>
          <MapPin className="w-3.5 h-3.5" />
          <span>{data.location}</span>
        </div>
      </div>

      {/* Center Column: Timeline Node */}
      <div className="hidden md:flex flex-col items-center justify-start h-full md:order-2 relative">
        {/* Static Node with Pulse */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 z-10 relative flex items-center justify-center group-hover:scale-110 group-hover:border-yellow-400/50 transition-all duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
            <Icon className="w-4 h-4 text-white/50 group-hover:text-yellow-400 transition-colors duration-300" />
          </div>
          <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125"></div>
        </div>
      </div>

      {/* Right Column: Role & Details */}
      <div className={`flex flex-col space-y-4 relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)] ${isEven ? "md:order-3" : "md:order-1"}`}>
        {/* Shine Effect on Card */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        </div>

        <h4 className="text-xl font-semibold text-yellow-100/90 group-hover:text-yellow-400 transition-colors duration-300">{data.role}</h4>
        <p className="text-neutral-400 leading-relaxed text-sm md:text-base font-light">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2 justify-start">
          {data.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/5 text-white/60 border border-white/5 hover:bg-yellow-400/10 hover:text-yellow-300 hover:border-yellow-400/30 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-6 py-24">
      
      {/* Vertical Line Background */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)"></div>
      
      {/* Animated Glowing Line */}
      <motion.div 
        style={{ height }}
        className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-yellow-400 via-yellow-200 to-transparent -translate-x-1/2 hidden md:block shadow-[0_0_20px_rgba(250,204,21,0.5)] z-0"
      />

      {/* Moving Avatar Node - Enhanced */}
      <motion.div
        style={{ top: height }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
           {/* Outer Ring */}
           <div className="absolute inset-0 rounded-full border border-yellow-500/30 shadow-[0_0_20px_rgba(250,204,21,0.2)] animate-[spin_10s_linear_infinite]"></div>
           {/* Inner Ring */}
           <div className="absolute inset-2 rounded-full border border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]"></div>
           {/* Core */}
           <div className="w-3 h-3 bg-yellow-100 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] z-10 relative"></div>
           {/* Glow */}
           <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
        </div>
      </motion.div>

      <div className="space-y-32 relative z-10">
        {EXPERIENCE_DATA.map((item, index) => (
          <ExperienceCard key={item.id} data={item} index={index} />
        ))}
      </div>

    </div>
  );
}
