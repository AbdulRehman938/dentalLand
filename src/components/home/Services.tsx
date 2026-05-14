import { motion } from 'framer-motion'

const services = [
  {
    title: 'Dental Implants',
    description: 'Restore your smile with permanent, natural-looking tooth replacements.',
    icon: '🦷'
  },
  {
    title: 'Teeth Whitening',
    description: 'Brighten your smile in just one session with our advanced laser technology.',
    icon: '✨'
  },
  {
    title: 'Orthodontics',
    description: 'Get perfectly aligned teeth with clear aligners or traditional braces.',
    icon: '📏'
  },
  {
    title: 'Periodontics',
    description: 'Specialized care for gum health and periodontal disease prevention.',
    icon: '🛡️'
  },
  {
    title: 'Oral Surgery',
    description: 'Expert surgical procedures performed with maximum precision and care.',
    icon: '🔪'
  },
  {
    title: 'Pediatric Care',
    description: 'Gentle and fun dental experiences for the little ones in your family.',
    icon: '🎈'
  }
]

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 bg-brand-bg">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-brand-secondary font-bold mb-4">OUR SERVICES</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-black leading-tight">
              Comprehensive Dental Solutions <br /> for Every Patient.
            </h3>
          </div>
          <p className="text-brand-black/60 max-w-sm mb-2">
            We offer a wide range of specialized services designed to meet your unique dental needs with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-[2.5rem] bg-brand-white border border-white shadow-sm hover:shadow-2xl hover:shadow-brand-secondary/10 transition-all duration-500"
            >
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
              <h4 className="text-2xl font-bold text-brand-black mb-4">{service.title}</h4>
              <p className="text-brand-black/60 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-10 flex items-center gap-2 text-brand-secondary font-bold cursor-pointer group/link">
                Learn More 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
