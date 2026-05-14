import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { HiPlus, HiArrowRight, HiXMark } from "react-icons/hi2";
import Button from "./Button";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (latest > 250 && direction === "down" && !isHidden && !isMenuOpen) {
      setIsHidden(true);
    } else if (direction === "up" && isHidden) {
      setIsHidden(false);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#" },
    { name: "Our Clinic", href: "#" },
    { name: "Dentists", href: "#" },
    { name: "News", href: "#" },
  ];

  // Disable scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 mx-auto w-full max-w-[1720px] z-[999] px-2 py-4"
      >
        <nav className="flex items-center justify-between bg-white rounded-2xl lg:px-0 pl-3 lg:px-5 md:pl-10 md:pr-2.5 py-3 shadow-[0_10px_20px_rgb(0,0,0,0.09)] border border-gray-100">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer py-1">
            <div className="relative w-8 h-8">
              <img
                src="/logo-default.png"
                alt="Dental Land Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[22px] font-logo font-extrabold text-brand-black leading-none uppercase">
              Dental <span style={{ color: "#5B7A12" }}>Land</span>
            </span>
          </div>

          {/* Desktop Right Side Group (Links + Button) */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-[16px] font-medium text-brand-black transition-colors duration-300 py-1"
                >
                  <span
                    style={{
                      color: hoveredLink === link.name ? "#5B7A12" : "#000000",
                    }}
                    className="transition-colors duration-300"
                  >
                    {link.name}
                  </span>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-slider"
                      style={{ backgroundColor: "#5B7A12" }}
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            <Button>Book Online</Button>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-[10px] p-4"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              style={{ backgroundColor: "#000000" }}
              className="w-8 h-[3px] rounded-full"
            />
            <motion.div
              animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
              style={{ backgroundColor: "#000000" }}
              className="w-8 h-[3px] rounded-full"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay (Curtain) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: "#5B7A12" }}
              className="fixed inset-x-2 top-4 z-[60] lg:hidden rounded-2xl overflow-y-auto max-h-[calc(100vh-32px)] shadow-2xl flex flex-col no-scrollbar"
            >
              {/* Top Row: Logo & Close Button */}
              <div className="flex items-center justify-between px-4 py-6">
                <div className="flex items-center gap-1 cursor-pointer">
                  <div className="relative w-8 h-8">
                    <img
                      src="/logo-transparent.png"
                      alt="Dental Land Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[24px] font-logo font-extrabold text-white tracking-[-0.03em] leading-none uppercase">
                    Dental Land
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white p-2"
                >
                  <HiXMark className="text-3xl" />
                </button>
              </div>

              {/* Book Online Row (White Block) */}
              <div className="bg-white flex items-center justify-between px-4 py-6">
                <span className="text-[22px] font-bold text-[#5B7A12]">
                  Book Online
                </span>
                <HiPlus className="text-3xl text-[#5B7A12]" />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-6 border-b border-white/10 hover:bg-white/5 transition-colors group`}
                  >
                    <span className="text-[20px] font-bold text-white">
                      {link.name}
                    </span>
                    <HiArrowRight className="text-2xl text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
