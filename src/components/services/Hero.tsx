
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUpRight, HiChevronDown } from 'react-icons/hi2'
import Button from '../common/Button'

const CARDS_PER_PAGE = 10

const services = [
  {
    title: 'Dental Implants',
    description: 'Single tooth implants, full-arch restoration, All-on-4, immediate-load implants, and implant-supported bridges.',
    image: '/services/service1.png',
  },
  {
    title: 'Porcelain Veneers',
    description: 'Ultra-thin hand-crafted ceramic shells precisely bonded to correct shape, color, and overall smile symmetry.',
    image: '/services/service2.png',
  },
  {
    title: 'Teeth Whitening',
    description: 'Zoom laser whitening and custom take-home trays to deliver up to 8 shades lighter in a single clinical session.',
    image: '/services/service3.png',
  },
  {
    title: 'Orthodontics',
    description: 'Invisalign clear aligners and self-ligating ceramic braces for precise, virtually invisible tooth movement.',
    image: '/services/service4.png',
  },
  {
    title: 'Guided Biofilm Therapy',
    description: 'Warm-water Airflow® technology eliminating bacterial biofilm completely, painlessly, and without steel scalers.',
    image: '/services/service5.png',
  },
  {
    title: 'Restorative Dentistry',
    description: 'Same-day CAD/CAM ceramic crowns, inlays, and complex root canal treatments using digital precision planning.',
    image: '/services/service6.png',
  },
]

const ServiceCard = ({ title, description, image }: { title: string; description: string; image: string }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative rounded-[22px] overflow-hidden cursor-pointer"
      style={{ height: '420px' }}
    >
      {/* Image — fixed fill, zoom on hover */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.06 },
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Top-right button: arrow icon → expands to "Learn More" on hover */}
      <div className="absolute top-4 right-4 z-10 flex justify-end">
        <motion.div
          variants={{
            rest: { 
              width: '44px',
              backgroundColor: 'rgba(255, 255, 255, 0)',
              color: 'rgba(255, 255, 255, 1)'
            },
            hover: { 
              width: '144px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: 'rgba(0, 0, 0, 1)'
            },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative border border-white/70 rounded-full overflow-hidden"
          style={{ height: '44px' }}
        >
          {/* Label */}
          <motion.div
            variants={{
              rest: { opacity: 0, x: 12 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.02 }}
            className="absolute right-[42px] top-0 bottom-0 flex items-center whitespace-nowrap font-bold text-sm pr-1"
          >
            Learn More
          </motion.div>

          {/* Arrow */}
          <div className="absolute right-0 top-0 w-[44px] h-[44px] flex items-center justify-center">
            <HiArrowUpRight className="text-lg" />
          </div>
        </motion.div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
        <h3 className="text-3xl md:text-[32px] font-bold text-white leading-tight tracking-[-0.02em] mb-3">
          {title}
        </h3>
        <p className="text-white/80 text-sm md:text-[15px] font-medium leading-relaxed w-[85%] sm:w-[60%] md:w-[50%]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const Hero = () => {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE)

  const visibleCards = services.slice(0, visibleCount)
  const hasMore = visibleCount < services.length

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + CARDS_PER_PAGE, services.length))
  }

  return (
    <section className="relative w-full pt-28 pb-4 px-2">
      {/* Main Hero Container — height is auto/dynamic */}
      <div className="relative w-full max-w-[1720px] mx-auto rounded-[22px] bg-brand-white drop-shadow-lg p-4 py-10 md:p-16 lg:p-20 flex flex-col justify-start">

        {/* Top header */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 w-full pb-12">
          {/* Left: Tag & Title */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B7A12]" />
              <span className="text-gray-500 text-sm font-semibold tracking-wide">
                Our Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-brand-black leading-none tracking-[-0.03em]">
              Premium Dental Treatment
            </h1>
          </div>

          {/* Right: Book Online */}
          <div className="shrink-0 w-full md:w-auto mt-2 lg:mt-0 flex justify-center">
            <Button
              variant="secondary"
              className="!px-6 !py-3.5 font-bold border border-gray-200 hover:border-[#5B7A12]"
              icon={<HiArrowUpRight className="text-lg" />}
            >
              Book Online
            </Button>
          </div>
        </div>

        {/* 2-column cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence initial={false}>
            {visibleCards.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: i % CARDS_PER_PAGE * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More button — only visible when more cards exist */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={showMore}
              className="group flex items-center gap-2.5 px-8 py-4 rounded-full border border-gray-200 bg-white text-brand-black font-bold text-base shadow-sm hover:border-[#5B7A12] hover:shadow-md transition-all duration-300"
            >
              Show More
              <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-[#5B7A12]/10 flex items-center justify-center transition-colors duration-300">
                <HiChevronDown className="text-sm group-hover:text-[#5B7A12] transition-colors duration-300" />
              </span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  )
}

export default Hero