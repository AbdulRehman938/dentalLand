import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { PiHandshakeLight, PiLeafLight, PiWavesLight } from "react-icons/pi";
import Button from "../common/Button";

const promiseCards = [
  {
    title: "Clear Plans, Clear Costs",
    description:
      "Clear recommendations, transparent pricing, and options you can choose with confidence.",
    icon: PiHandshakeLight,
  },
  {
    title: "Gentle, Anxiety-Free Care",
    description:
      "Calm appointments, patient pacing, and comfort-first techniques from start to finish.",
    icon: PiLeafLight,
  },
  {
    title: "Premium Safe Materials",
    description:
      "Top tier ceramics and composites chosen for biocompatibility, comfort, and natural results.",
    icon: PiWavesLight,
  },
];

const teamData = [
  {
    name: "Dr. Zara Ahmed",
    role: "Oral Surgeon | Clinic Founder",
    image: "/experts/Arabic.png",
  },
  {
    name: "Dr. Emily Carter",
    role: "Prosthodontist | Aesthetic Lead",
    image: "/experts/Dr. Emily Carter.png",
  },
  {
    name: "Dr. James Wilson",
    role: "Orthodontist",
    image: "/experts/Dr. James Wilson.png",
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Pediatric Dentist",
    image: "/experts/Dr. Sarah Jenkins.png",
  },
  {
    name: "Dr. David Kim",
    role: "Endodontist",
    image: "/experts/Dr. David Kim.png",
  },
  {
    name: "Dr. Michael Reynolds",
    role: "Implantologist",
    image: "/experts/Dr. Michael Reynolds.png",
  },
];

const Team = () => {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.1"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // 1px threshold
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

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
        className="w-full min-h-[80vh] bg-white rounded-[32px] flex flex-col items-center pt-14 pb-12 px-6 md:px-12 lg:px-20 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16 w-full text-center">
          {/* Pill Label */}
          <div className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-100 px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5B7A12]"></div>
            <span className="text-[20px] font-semibold md:text-[14px] text-gray-500 tracking-wide">
              Our Team
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-brand-black tracking-tight">
            Meet Our Dental Experts
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Carousel Grid */}
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {teamData.map((member, i) => (
              <div
                key={i}
                className="w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start group cursor-pointer flex flex-col"
              >
                {/* Image Box */}
                <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-5 bg-[#F4F4F4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Text & Arrow */}
                <div className="flex justify-between items-start px-2">
                  <div className="text-left flex-1 min-w-0 pr-4">
                    <h3 className="text-[19px] font-bold text-brand-black mb-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 font-medium text-[12px] uppercase tracking-wide truncate">
                      {member.role}
                    </p>
                  </div>
                  {/* Arrow Button */}
                  <div className="relative w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-all duration-300 shrink-0 group-hover:shadow-[0_4px_12px_rgba(91,122,18,0.3)] group-hover:-translate-y-1 overflow-hidden">
                    {/* Arrow that shoots out */}
                    <HiArrowUpRight className="absolute text-[15px] transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" />
                    {/* Arrow that shoots in */}
                    <HiArrowUpRight className="absolute text-[15px] -translate-x-6 translate-y-6 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-[35%] left-4 w-10 h-10 bg-black/15 hover:bg-black/30 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-10 hidden md:flex"
            >
              <HiArrowLeft className="text-lg" />
            </button>
          )}

          {/* Floating Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-[35%] right-4 w-10 h-10 bg-black/15 hover:bg-black/30 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-10 hidden md:flex"
            >
              <HiArrowRight className="text-lg" />
            </button>
          )}
        </div>

        {/* Bottom Promise Section */}
        <div className="mt-20 max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-xl md:text-[26px] text-brand-black leading-snug font-medium mb-8">
            <span className="text-[#5B7A12]">Our promise:</span> You'll never
            feel rushed here. We explain options clearly, plan carefully, and
            deliver treatment with steady hands and modern tools.
          </p>
          <Button
            icon={<HiArrowUpRight className="text-lg" />}
            variant="primary"
            showWave={true}
            className="py-4 md:py-0"
          >
            Our Specialists
          </Button>
        </div>
      </motion.div>

      {/* Promise Cards (Outside the section container) */}
      <div className="w-full max-w-[1720px] mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
        {promiseCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-row lg:flex-col items-start gap-6">
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #F0F5E4 0%, rgba(255, 255, 255, 0.1) 100%)",
                    borderRadius: "32px",
                    boxShadow: "rgba(91, 122, 18, 0.1) 0px 1px 2px 0px inset",
                  }}
                  className="w-16 h-16 md:w-16 md:h-16 shrink-0 flex items-center justify-center p-2"
                >
                  <div
                    style={{
                      backgroundColor: "#F0F5E4",
                      boxShadow: "rgba(91, 122, 18, 0.15) 0px 2px 2px 0px",
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-[20px] border-[3px] border-white flex items-center justify-center"
                  >
                    <Icon className="text-[24px] md:text-[28px] text-[#5B7A12]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[21px] font-bold text-brand-black leading-tight pt-1 md:pt-0">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-[15px] leading-relaxed max-w-[280px]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Team;
