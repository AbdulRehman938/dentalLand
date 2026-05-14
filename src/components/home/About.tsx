import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { PiSparkle, PiSmiley, PiHandshake, PiMapPinPlus } from "react-icons/pi";
import Button from "../common/Button";

const FeatureItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-row lg:flex-col items-start gap-6">
    <div
      style={{
        background:
          "linear-gradient(180deg, #F0F5E4 0%, rgba(255, 255, 255, 0.1) 100%)",
        borderRadius: "32px",
        boxShadow: "rgba(91, 122, 18, 0.1) 0px 1px 2px 0px inset",
      }}
      className="w-20 h-20 md:w-24 md:h-24 shrink-0 flex items-center justify-center p-2"
    >
      <div
        style={{
          backgroundColor: "#F0F5E4",
          boxShadow: "rgba(91, 122, 18, 0.15) 0px 2px 2px 0px",
        }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-[20px] border-[3px] border-white flex items-center justify-center"
      >
        <Icon
          weight="light"
          className="text-[28px] md:text-[32px] text-brand-secondary"
        />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold text-brand-black leading-tight pt-1 md:pt-0">
        {title}
      </h3>
      <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-[260px]">
        {description}
      </p>
    </div>
  </div>
);

const About = () => {
  const doctors = [
    "/experts/Dr. David Kim.png",
    "/experts/Dr. Sarah Jenkins.png",
    "/experts/Dr. Michael Reynolds.png",
    "/experts/Arabic.png",
  ];

  // We use scrollY to get the absolute scroll position of the window
  const { scrollY } = useScroll();
  // We increase the movement to -250px so it closes the gap and overrides the hero section significantly
  const y = useTransform(scrollY, [0, 1000], [0, -180]);

  return (
    <motion.section
      style={{ y, marginBottom: y }}
      className="relative w-full px-2 pb-4 pt-4 z-10"
    >
      {/* Outer Black Container */}
      <div className="relative w-full max-w-[1720px] mx-auto rounded-[32px] bg-brand-white overflow-hidden flex flex-col gap-1 md:gap-4 p-4">
        {/* Child Section: TOP (White Card) */}
        <div className="w-full bg-white rounded-[24px] pt-8 pb-0 md:py-14 px-1 md:px-2 lg:px-20 flex flex-col lg:flex-row items-start gap-4 md:gap-7 lg:gap-32">
          {/* Left Side: Experience & Avatars */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 md:gap-8 lg:gap-4 shrink-0 w-full lg:w-auto mb-0 lg:mb-0">
            {/* Overlapping Avatars (Vertical Pill Boxes) */}
            <div className="flex -space-x-3 md:-space-x-4">
              {doctors.map((url, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-14 h-16 md:w-16 md:h-26 rounded-full border-[3px] border-white overflow-hidden shadow-lg bg-gray-100 cursor-default"
                >
                  <img
                    src={url}
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Experience Text */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl font-bold text-brand-black tracking-tight leading-none mb-1">
                20+
              </span>
              <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] md:text-xs leading-tight">
                Years of
                <br className="hidden lg:block" /> experience
              </span>
            </div>
          </div>

          {/* Right Side: Main Text */}
          <div className="flex-grow pt-0 lg:pt-2">
            <h2 className="text-2xl md:text-3xl lg:text-[33px] font-bold text-brand-black leading-[1.2] lg:leading-[1.25] tracking-[-0.01em]">
              <span className="text-brand-secondary">
                Dental Land is a restorative dental practice
              </span>{" "}
              built around implants, prosthetics, and full smile reconstruction
              for cases that demand specialization and surgical precision.
            </h2>
          </div>
        </div>

        {/* Child Section: BOTTOM (Features Grid) */}
        <div className="w-full bg-white rounded-[24px] py-12 pt-0 md:py-10 px-1 md:px-2 lg:px-20 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 items-end">
          {/* Column 1: About Button */}
          <div className="flex flex-col items-start pb-2 mt-8 md:mt-0">
            <Button
              variant="secondary"
              className="w-fit !px-6 !py-4 md:!px-8 md:!py-5"
              icon={<HiArrowUpRight className="text-xl" />}
            >
              About Us
            </Button>
          </div>

          {/* Features */}
          <FeatureItem
            icon={PiHandshake}
            title="Specialist-led precision"
            description="Planned and performed by dedicated experts in implantology, surgery, and prosthetics."
          />
          <FeatureItem
            icon={PiSparkle}
            title="Unhurried consultations"
            description="Your case is studied thoroughly before any treatment is recommended."
          />
          <FeatureItem
            icon={PiSmiley}
            title="Full transparency"
            description="Clear pricing, honest timelines, and no surprises from first scan to final restoration."
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 my-5">
        {/* Left Container: Clinic Exterior & Visit Info */}
        <div className="relative w-full lg:w-[55%] h-[45vh] md:h-[70vh] lg:h-[60vh] rounded-[32px] overflow-hidden group">
          {/* Background Image */}
          <img
            src="/clinic-exterior.png"
            alt="Dental Land Clinic Exterior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Bottom Overlay Info */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl md:text-3xl font-bold text-white tracking-tight">
                Visit Our Clinic
              </h3>
              <p className="text-white/80 text-base md:text-base font-medium">
                Building 15, Dubai Internet City, Sheikh Zayed Road, Dubai,
                United Arab Emirates
              </p>
            </div>

            {/* Map Pin Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-colors hover:bg-brand-bg shrink-0"
            >
              <PiMapPinPlus className="w-6 h-6 md:w-8 md:h-8 text-brand-secondary" />
            </motion.button>
          </div>
        </div>
        <div className="relative w-full lg:w-[45%] h-[45vh] md:h-[70vh] lg:h-[60vh] bg-brand-secondary rounded-[32px] overflow-hidden p-8 md:p-10 flex flex-col justify-between">
          {/* Top Row: Gift Icon & CTA */}
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 mt-[-.5rem] md:w-16 md:h-16 flex items-center justify-center">
              <img
                src="/gift.png"
                alt="Free Gift"
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ rotate: 45, scale: 1.1 }}
              className="w-12 h-12 md:w-14 md:h-14 left-3 md:left-0 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-colors hover:bg-white/20"
            >
              <HiArrowUpRight className="text-xl md:text-2xl text-white" />
            </motion.button>
          </div>

          {/* Bottom Content: Promo Text */}
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-[30px] font-bold text-white leading-[1.1] tracking-tight max-w-[320px]">
              Your first consultation is free of charge
            </h3>
            <p className="text-white/80 text-base md:text-[17px] font-medium max-w-[340px] leading-relaxed">
              Book a consultation today. We'd love to give you a reason to smile
              more ;)
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
