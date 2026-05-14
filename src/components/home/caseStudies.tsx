import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { HiStar, HiArrowUpRight } from "react-icons/hi2";
import Button from "../common/Button";

const caseStudiesData = [
  {
    quote:
      '"They spent an hour on my consultation, showed me a digital preview, and let me decide on my own time. No pressure, just great results."',
    name: "Roberto, 34",
    procedure: "Porcelain Veneers",
    beforeImage: "/pateints/Roberto before.png",
    afterImage: "/pateints/Roberto after.png",
  },
  {
    quote:
      "\"I'd been putting off implants for years because I didn't trust the clinics I'd visited. Dentix walked me through every scan, every step, and every cost before anything started.\"",
    name: "Margaret, 61",
    procedure: "Dental implants",
    beforeImage: "/pateints/Margaret before.png",
    afterImage: "/pateints/Margaret after.png",
  },
  {
    quote:
      '"I\'d lost my front tooth in an accident and spent two years barely smiling. The implant looks so natural that even my wife forgets which one it is."',
    name: "Walter, 56",
    procedure: "Crowns",
    beforeImage: "/pateints/Walter before.png",
    afterImage: "/pateints/Walter after.png",
  },
];

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
}: {
  beforeImage: string;
  afterImage: string;
}) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-square rounded-[24px] overflow-hidden group select-none bg-[#F4F4F4]">
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Before Image with Clip Path */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      />

      {/* Labels */}
      <div
        className={`absolute top-4 left-4 bg-black/40 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none z-10 shadow-sm transition-opacity duration-300 ${sliderPos < 20 ? "opacity-0" : "opacity-100"}`}
      >
        Before
      </div>
      <div
        className={`absolute top-4 right-4 bg-[#5B7A12]/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none z-10 shadow-sm transition-opacity duration-300 ${sliderPos > 80 ? "opacity-0" : "opacity-100"}`}
      >
        After
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.15)] z-20"
        style={{ left: `calc(${sliderPos}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-[2px] h-3 bg-gray-300 rounded-full"></div>
            <div className="w-[2px] h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Range Input for Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
};

const CaseStudies = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, marginBottom: y }}
      className="relative w-full p-4 pt-4 z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-[80vh] bg-white rounded-[32px] flex flex-col pt-14 pb-12 px-6 md:px-12 lg:px-20 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center mb-16 w-full text-center">
          {/* Pill Label */}
          <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-100 px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5B7A12]"></div>
            <span className="text-[14px] font-medium text-gray-500 tracking-wide">
              Case Studies
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-medium text-brand-black tracking-tight">
            Real Results, Real Smiles
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-lg">
            See the transformative power of our modern dental techniques.
          </p>
        </div>

        {/* 3 Bottom Cards */}
        <div className="mt-auto pt-6 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {caseStudiesData.map((study, index) => (
            <div key={index} className="flex flex-col gap-6 group">
              <BeforeAfterSlider
                beforeImage={study.beforeImage}
                afterImage={study.afterImage}
              />

              {/* Card Content */}
              <div className="flex flex-col px-1">
                <p className="text-[16px] md:text-[17px] font-medium text-brand-black leading-[1.6] tracking-tight mb-5">
                  {study.quote}
                </p>
                <div className="border-l-2 border-gray-200 pl-3.5 flex flex-col justify-center">
                  <span className="text-[15px] font-medium text-brand-black">
                    {study.name}
                  </span>
                  <span className="text-[13px] font-medium text-[#94a3b8]">
                    {study.procedure}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* NEW: Bottom CTA Row (Image + Promo Card) */}
      <div className="w-full max-w-[1720px] mx-auto mt-6 flex flex-col lg:flex-row gap-4">
        {/* Left Card: Patient Image */}
        <div className="relative w-full lg:w-[32%] h-[350px] md:h-[400px] rounded-[32px] overflow-hidden group">
          <img
            src="/pateints/Roberto after.png"
            alt="Smiling Patient"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Right Card: Green Promo & Rating */}
        <div className="relative w-full lg:w-[68%] h-[350px] md:h-[400px] bg-[#5B7A12] rounded-[32px] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
          {/* Main Heading */}
          <h3 className="text-3xl md:text-5xl lg:text-[56px] font-medium text-white leading-[1.1] tracking-tight max-w-[700px]">
            We'll give you a reason to smile more. Sign up today.
          </h3>

          {/* Bottom Row: Rating & Button */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar Stack */}
              <div className="flex -space-x-3">
                {[
                  "/experts/Dr. David Kim.png",
                  "/experts/Dr. Sarah Jenkins.png",
                  "/experts/Dr. Michael Reynolds.png",
                  "/experts/Arabic.png",
                ].map((url, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#5B7A12] overflow-hidden bg-gray-100"
                  >
                    <img
                      src={url}
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Rating Details (User Snippet) */}
              <div className="flex flex-col pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-base md:text-lg">
                    4.8
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className="text-white text-base md:text-lg"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white/70 text-xs md:text-sm font-medium">
                  168 Reviews on
                  <span className="text-white font-bold flex items-center gap-0.5">
                    Google
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="secondary"
              className="!px-8 !py-4 rounded-full !font-bold shadow-xl shrink-0"
              icon={<HiArrowUpRight className="text-xl" />}
              showWave={true}
            >
              Book Online
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CaseStudies;
