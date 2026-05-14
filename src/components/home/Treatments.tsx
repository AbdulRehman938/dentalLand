import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiStar, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import Button from "../common/Button";

const treatmentData = [
  {
    title: "Dental implants",
    description:
      "Single tooth implants, full-arch restoration, All-on-4, immediate-load implants, and implant-supported bridges.",
    image: "/treatment-asstes/image 1.png",
  },
  {
    title: "Dental veneers",
    description:
      "Porcelain veneers, composite veneers, smile makeovers, shade matching, and digital smile previews.",
    image: "/treatment-asstes/image 2.png",
  },
  {
    title: "Dental prosthetics",
    description:
      "Crowns, bridges, full and partial dentures, overdentures, and implant-supported prosthetics.",
    image: "/treatment-asstes/image 3.png",
  },
  {
    title: "Teeth whitening",
    description:
      "Professional in-office whitening, take-home kits, internal bleaching, and stain removal treatments.",
    image: "/treatment-asstes/image 4.png",
  },
  {
    title: "Orthodontics",
    description:
      "Clear aligners, traditional braces, ceramic braces, and specialized orthodontic care for all ages.",
    image: "/treatment-asstes/image 5.png",
  },
  {
    title: "Root canal therapy",
    description:
      "Microscopic endodontics, pain management, and tooth preservation with advanced sealing techniques.",
    image: "/treatment-asstes/image 6.png",
  },
];

const TreatmentCard = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0 0.75"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        zIndex: index + 1,
        opacity,
        x,
        y,
      }}
      className="relative md:sticky md:top-[90px] w-full bg-white rounded-[24px] md:rounded-[32px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-row items-start md:items-center gap-4 md:gap-6 group hover:border-brand-secondary/20 transition-all duration-300 cursor-pointer"
    >
      {/* Icon */}
      <div className="w-14 h-14 md:w-24 md:h-24 shrink-0 flex items-center justify-center rounded-2xl">
        <img
          src={item.image}
          alt={item.title}
          className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0 mt-1 md:mt-0">
        <div className="flex justify-between items-start w-full gap-2">
          <h3 className="text-[17px] md:text-xl font-black text-brand-black tracking-tight leading-tight">
            {item.title}
          </h3>
          {/* Mobile Arrow */}
          <HiArrowUpRight className="md:hidden text-gray-400 text-lg shrink-0" />
        </div>
        <p className="text-gray-500 md:text-gray-400 font-medium text-[13px] md:text-sm leading-relaxed mt-1 md:mt-1.5">
          {item.description}
        </p>
      </div>

      {/* Desktop Hover Arrow */}
      <div className="hidden md:flex ml-auto shrink-0 w-12 h-12 bg-brand-secondary rounded-full items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
        <HiArrowUpRight className="text-white text-xl" />
      </div>
    </motion.div>
  );
};

const Treatments = () => {
  return (
    <section className="relative w-full p-4">
      {/* Outer Container */}
      <div className="relative w-full max-w-[1720px] mx-auto rounded-[32px] bg-white flex flex-col lg:flex-row lg:gap-12 md:gap-5 p-8 md:p-10 lg:p-24">
        {/* Left Side: CSS sticky (works now that overflow-x:clip is set on root) */}
        <div className="hidden lg:block w-1/3 shrink-0">
          <div className="flex flex-col items-start sticky top-10">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-brand-secondary gap-1">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="text-[18px]" />
                ))}
              </div>
              <p className="text-[16px] font-bold text-brand-black/40 tracking-tight">
                4.8 (68 Reviews)
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-[46px] font-black text-brand-black leading-[1.1] tracking-tight">
                {"Expert Dental Treatments".split(" ").map((word, i) => (
                  <span key={i} className="inline-block whitespace-nowrap mr-3">
                    {word.split("").map((char, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1 + j * 0.03,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h2>
            </div>

            <Button
              variant="secondary"
              className="!px-8 !py-4 rounded-full text-sm font-bold shadow-sm"
              icon={<HiArrowRight className="text-xl" />}
            >
              All Services
            </Button>
          </div>
        </div>

        {/* Mobile: Left content inline */}
        <div className="lg:hidden w-full flex flex-col items-start">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-brand-secondary gap-1">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className="text-[18px]" />
              ))}
            </div>
            <p className="text-sm font-bold text-brand-black/40">
              4.8 (68 Reviews)
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-black leading-[1.1] tracking-tight mb-8">
            Expert Dental Treatments
          </h2>
          <Button
            variant="secondary"
            className="!px-8 !py-4 rounded-full text-sm font-bold mb-10"
            icon={<HiArrowRight className="text-xl" />}
          >
            All Services
          </Button>
        </div>

        <div className="w-full flex flex-col gap-4">
          {treatmentData.map((item, index) => (
            <TreatmentCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments;
