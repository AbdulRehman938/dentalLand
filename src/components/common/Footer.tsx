import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import {
  PiAt,
  PiPhone,
  PiMapPin,
  PiClock,
} from "react-icons/pi";
import { HiArrowUpRight } from "react-icons/hi2";

const FooterLink = ({
  children,
  href = "#",
  centered = false,
}: {
  children: React.ReactNode;
  href?: string;
  centered?: boolean;
}) => (
  <motion.a
    href={href}
    initial="initial"
    whileHover="hover"
    className={`flex items-center gap-2 text-brand-black font-medium text-[15px] group cursor-pointer w-fit ${centered ? "mx-auto md:mx-0" : ""}`}
  >
    <motion.span
      variants={{
        initial: { color: "#000000" },
        hover: { color: "#5B7A12" },
      }}
      className="transition-colors"
    >
      {children}
    </motion.span>
    <motion.div
      variants={{
        initial: { opacity: 0, x: -4, y: 4 },
        hover: { opacity: 1, x: 0, y: 0 },
      }}
      className="text-[#5B7A12]"
    >
      <HiArrowUpRight />
    </motion.div>
  </motion.a>
);

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
  ];

  const services = [
    "Dental Implants",
    "Dental Veneers",
    "Dental Prosthetics",
    "Dental Treatment",
    "Teeth Whitening",
    "Dental Hygiene",
  ];

  const quickLinks = [
    "Home",
    "Services",
    "Our Clinic",
    "Dentists",
    "Dental News",
    "Contact Us",
    "Privacy Policy",
  ];

  const contactInfo = [
    {
      icon: PiAt,
      text: "hello@dentalland.com",
      link: "mailto:hello@dentalland.com",
    },
    {
      icon: PiPhone,
      text: "+92 308 7448630",
      link: "tel:+923087448630",
    },
    {
      icon: PiMapPin,
      text: "Building 15, Dubai Internet City",
      subtext: "Sheikh Zayed Road, Dubai, UAE",
    },
    {
      icon: PiClock,
      text: "Mon. to Fri. - 9:00 to 18:00 (UTC)",
    },
  ];

  return (
    <footer className="relative w-full px-2 pb-2 pt-4 z-10 bg-brand-bg">
      <div className="relative w-full max-w-[1720px] mx-auto rounded-[32px] bg-white p-8 md:p-12 lg:p-14 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-start text-left min-h-[160px] md:min-h-[200px]">
            {/* Logo */}
            <div className="flex items-center gap-1 cursor-pointer">
              <div className="relative w-8 h-8">
                <img
                  src="/logo-default.png"
                  alt="Dental Land Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[22px] font-logo font-extrabold text-brand-black leading-none uppercase tracking-tight">
                Dental <span style={{ color: "#5B7A12" }}>Land</span>
              </span>
            </div>

            {/* Social Icons with Water Wave */}
            <div className="flex gap-3 mt-8 lg:mt-auto">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    initial="initial"
                    whileHover="hover"
                    className="relative w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 overflow-hidden transition-colors cursor-pointer group"
                  >
                    {/* Water Wave Effect */}
                    <motion.div
                      variants={{
                        initial: { y: "100%" },
                        hover: { y: "0%" },
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 z-0 bg-[#5B7A12]"
                    >
                      <svg
                        className="absolute top-0 left-0 w-[200%] h-6 -translate-y-[80%] animate-wave"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z"
                          fill="#5B7A12"
                        />
                      </svg>
                    </motion.div>

                    <motion.div
                      variants={{
                        initial: { color: "#9ca3af" },
                        hover: { color: "#FFFFFF" },
                      }}
                      className="relative z-10"
                    >
                      <Icon className="text-lg" />
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Grid Wrapper (Services & Quick Links) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-8">
            {/* Column 2: Services */}
            <div>
              <h4 className="text-gray-400 font-bold uppercase tracking-widest text-[11px] md:text-[13px] mb-8">
                Services
              </h4>
              <ul className="flex flex-col gap-4">
                {services.map((item, i) => (
                  <li key={i}>
                    <FooterLink href="#">{item}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="text-gray-400 font-bold uppercase tracking-widest text-[11px] md:text-[13px] mb-8">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-4">
                {quickLinks.map((item, i) => (
                  <li key={i}>
                    <FooterLink href="#">{item}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col items-start mt-10 md:mt-0">
            <h4 className="text-gray-400 font-bold uppercase tracking-widest text-[13px] mb-8 w-full text-left">
              Contact Info
            </h4>
            <div className="flex flex-col gap-6 w-full">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="flex flex-row items-center gap-3.5 group text-left">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 transition-colors group-hover:border-brand-secondary/20 group-hover:text-brand-secondary">
                      <Icon className="text-[18px]" />
                    </div>
                    <div className="flex flex-col">
                      {info.link ? (
                        <FooterLink href={info.link}>{info.text}</FooterLink>
                      ) : (
                        <span className="text-brand-black font-medium text-[15px] leading-tight">
                          {info.text}
                        </span>
                      )}
                      {info.subtext && (
                        <span className="text-gray-400 text-sm mt-1">
                          {info.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-24 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4">
          <p className="text-gray-400 text-sm order-2 md:order-1">
            © 2026 Dental Land Clinic. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-start md:justify-center gap-6 md:gap-8 order-1 md:order-2">
            <FooterLink href="#">Terms & Conditions</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>

      {/* Shared Animation Style for Wave */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wave {
          0% { transform: translate(-50%, -80%); }
          100% { transform: translate(0%, -80%); }
        }
        .animate-wave {
          animation: wave 3s linear infinite;
        }
      `,
        }}
      />
    </footer>
  );
};

export default Footer;