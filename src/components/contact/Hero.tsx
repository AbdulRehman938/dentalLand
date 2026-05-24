const Hero = () => {
  return (
    <section className="relative w-full pt-28 pb-4 px-2">
      {/* Main Container */}
      <div className="relative w-full h-[60vh] max-w-[1720px] mx-auto rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col justify-end">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/Contact.png" 
            alt="Contact Us" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Text Content at bottom left */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-semibold text-black leading-none tracking-[-0.03em]">
            Contact Us
          </h1>
        </div>
        
      </div>
    </section>
  )
}

export default Hero