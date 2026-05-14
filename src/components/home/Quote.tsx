import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi2'

const Quote = () => {
  return (
    <section className="relative w-full p-4 -mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full min-h-[100vh] bg-brand-secondary rounded-[32px] flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 lg:p-20 shadow-2xl gap-10 lg:gap-20"
      >
        {/* Left Side: Image Container */}
        <div className="w-full lg:w-1/2 relative h-[50vh] md:h-[60vh] lg:h-[75vh]">
          {/* Empty Space for Image */}
          <div className="w-full h-full bg-black/10 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10">
            <img src="/quotePerson.png" className='w-full h-full object-cover object-top' alt="quotePerson" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#3c5011] text-white px-6 py-3 rounded-full flex items-center gap-3 whitespace-nowrap shadow-xl border border-white/10">
            <span className="text-lg opacity-80">🌿</span>
            <span className="font-bold text-sm tracking-wide">2026 Top Implant Clinic</span>
            <span className="text-lg opacity-80">🌿</span>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col text-left text-white pt-8 lg:pt-0 lg:h-[75vh]">
          {/* Stars */}
          <div className="flex gap-1.5 mb-5 lg:mb-6">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="text-[20px] lg:text-[22px] text-white" />
            ))}
          </div>

          {/* Large Quote */}
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.3] tracking-tight mb-6 lg:mb-8">
            "Super clean clinic and a very friendly staff. The dentist took time to listen, offered options, and made sure I was comfortable the whole visit."
          </h2>

          <div className="flex flex-col gap-2 lg:gap-3 mb-6">
            {/* Small Quote */}
            <p className="text-white/90 text-[16px] md:text-[17px] leading-relaxed font-light max-w-[95%]">
              "They didn't rush anything. Every option was explained clearly, and the results speak for themselves."
            </p>
            {/* Author */}
            <p className="text-white font-medium text-[16px] mt-1 lg:mt-2">
              – Michael, 48
            </p>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2 lg:gap-3 mt-auto">
            {['Dental implants', 'Crowns', 'Whitening'].map((tag, i) => (
              <span key={i} className="bg-white/10 hover:bg-white/20 transition-colors cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Quote