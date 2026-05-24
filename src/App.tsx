import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Analytics } from "@vercel/analytics/react"
import { NavigationProvider, useNavigation } from './hooks/useNavigation'
import Home from './screens/Home'
import Services from './screens/Services'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const { currentScreen } = useNavigation()

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Clean up and refresh scroll triggers whenever the active screen changes
  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();
  }, [currentScreen]);

  return (
    <div className="selection:bg-brand-secondary selection:text-brand-white bg-brand-bg min-h-screen">
      <div className="max-w-[1720px] mx-auto relative bg-transparent">
        {currentScreen === 'home' && <Home />}
        {currentScreen === 'services' && <Services />}
        {/* Placeholder for other pages to handle graceful fallback */}
        {currentScreen !== 'home' && currentScreen !== 'services' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-3xl p-10 m-4 shadow-lg text-center mt-28">
            <h2 className="text-3xl font-bold text-brand-black mb-4">Screen Under Construction</h2>
            <p className="text-gray-400 mb-6 max-w-md">Our team is currently polishing the {currentScreen} section to fit the premium aesthetic of Dental Land.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2.5 bg-brand-secondary text-white font-bold rounded-full shadow-md"
            >
              Reload Application
            </button>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  )
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}

export default App

