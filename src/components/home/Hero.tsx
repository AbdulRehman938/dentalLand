import { motion } from "framer-motion";
import { HiArrowUpRight, HiStar } from "react-icons/hi2";
import Button from "../common/Button";

const Hero = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
  ];

  return (
    <section className="relative w-full h-[100dvh] lg:h-screen pt-28 pb-4 px-2">
      {/* Main Image/Hero Container */}
      <div className="relative w-full h-full max-w-[1720px] mx-auto rounded-[32px] overflow-hidden bg-black shadow-2xl">
        <img
          src="/hero-image.png"
          alt="Premium Dental Clinic"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Container - Left Aligned */}
        <div className="absolute inset-0 flex flex-col justify-between lg:justify-center items-start lg:gap-12 py-5 lg:py-0 px-6 md:px-6 lg:px-20 z-10 max-w-4xl h-full">
          <div className="flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[42px] md:text-[52px] lg:text-[85px] font-black md:font-bold text-white leading-[0.95] md:leading-[1] lg:leading-[0.95] tracking-[-0.05em] md:tracking-[-0.04em] mb-4 md:mb-4"
            >
              Premium Implant <br />
              Dentistry Clinic
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base lg:text-[18px] text-white/90 max-w-md lg:max-w-xl leading-relaxed font-semibold md:font-medium"
            >
              From subtle enhancements to full reconstructions, we{" "}
              <br className="hidden lg:block" />
              specialize in restoring healthy smiles with care that fits you.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-3 md:gap-4 w-full"
          >
            <Button
              className="w-full lg:w-fit origin-left !py-3 lg:!py-1.5"
              icon={
                <HiArrowUpRight className="text-xl lg:text-base bg-transparent" />
              }
            >
              Book Online
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 md:gap-6 lg:bg-black/30 lg:backdrop-blur-md lg:border lg:border-white/10 p-0 lg:p-3 lg:pl-4 rounded-2xl lg:rounded-[40px] w-full lg:w-fit mt-2 md:mt-2 lg:mt-4"
            >
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3 shrink-0">
                {avatars.map((url, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden shadow-lg"
                  >
                    <img
                      src={url}
                      alt="Patient"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Rating Details */}
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
