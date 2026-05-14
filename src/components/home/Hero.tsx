import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-secondary/5 rounded-full blur-[120px] -z-0" />
      
      <div className="text-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-brand-secondary/10 text-brand-secondary px-4 py-1.5 rounded-full text-sm font-bold mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
          </span>
          Award Winning Clinic
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-8xl font-black text-brand-black mb-8 leading-[1.1] tracking-tight"
        >
          Where Technology <br /> 
          <span className="text-brand-secondary italic font-serif">Meets Care.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-brand-black/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Experience dental excellence with our state-of-the-art facilities and a team 
          dedicated to your perfect smile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto"
        >
          <button className="w-full sm:w-auto bg-brand-secondary text-brand-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-brand-secondary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Book Appointment
          </button>
          <button className="w-full sm:w-auto bg-brand-white text-brand-black border border-gray-200 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all">
            View Our Cases
          </button>
        </motion.div>
      </div>

      <div className="mt-20 w-full h-[400px] md:h-[600px] bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl relative px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="w-full h-full bg-brand-secondary/5 flex items-center justify-center text-brand-secondary/20 font-black text-9xl">
            PREMIUM CARE
          </div>
      </div>
    </section>
  )
}

export default Hero
