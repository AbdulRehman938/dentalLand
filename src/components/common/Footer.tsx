const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-24 pb-12 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-secondary rounded-lg flex items-center justify-center">
              <span className="text-brand-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-brand-black tracking-tight">Dentix</span>
          </div>
          <p className="text-brand-black/50 text-sm leading-relaxed">
            Leading the way in modern dentistry with a focus on patient comfort and advanced clinical excellence.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-brand-black mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-brand-black/60 hover:text-brand-secondary text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-brand-black mb-6">Services</h4>
          <ul className="space-y-4">
            {['General Dentistry', 'Cosmetic Surgery', 'Dental Implants', 'Orthodontics'].map((item) => (
              <li key={item}>
                <a href="#" className="text-brand-black/60 hover:text-brand-secondary text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-brand-black mb-6">Stay Connected</h4>
          <p className="text-brand-black/60 text-sm mb-6">Join our newsletter for dental tips and clinic updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-brand-bg border border-gray-200 rounded-xl px-4 py-2 text-sm flex-1 outline-none focus:border-brand-secondary transition-colors"
            />
            <button className="bg-brand-secondary text-brand-white p-2 rounded-xl px-4 text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-brand-black/40 text-xs">© 2026 Dental Land Clinic. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-brand-black/40 hover:text-brand-secondary text-xs transition-colors">Privacy Policy</a>
          <a href="#" className="text-brand-black/40 hover:text-brand-secondary text-xs transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer