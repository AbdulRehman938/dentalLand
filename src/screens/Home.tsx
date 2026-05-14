import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-brand-bg overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Spacer / Stats Section */}
        <section className="py-24 bg-brand-secondary text-brand-white overflow-hidden relative">
          <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { label: 'Happy Patients', value: '15k+' },
              { label: 'Specialist Doctors', value: '42+' },
              { label: 'Clinic Awards', value: '18+' },
              { label: 'Years Experience', value: '25+' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black mb-2 text-brand-white">{stat.value}</div>
                <div className="text-brand-white/60 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black text-brand-white/5 whitespace-nowrap select-none pointer-events-none">
            DENTAL LAND CLINIC DENTAL LAND CLINIC
          </div>
        </section>

        <Services />

        {/* Call to Action Section */}
        <section className="py-32 px-6">
          <div className="rounded-[3rem] bg-brand-black p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-8">
                Ready to transform <br /> your smile?
              </h2>
              <p className="text-brand-white/60 text-lg mb-12">
                Join thousands of happy patients who trust Dental Land for their oral health. 
                Schedule your consultation today.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-brand-secondary text-brand-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all">
                  Book Appointment Now
                </button>
                <button className="bg-transparent text-brand-white border border-brand-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-white/5 transition-all">
                  Call: +1 (234) 567-890
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home