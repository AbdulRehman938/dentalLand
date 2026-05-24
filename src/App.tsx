import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { Analytics } from "@vercel/analytics/react"
import AppRoutes from './routes'

gsap.registerPlugin(ScrollTrigger)

function AppContent() {
  const location = useLocation();

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

  // Clean up and refresh scroll triggers whenever the route changes
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="selection:bg-brand-secondary selection:text-brand-white bg-brand-bg min-h-screen">
      <div className="max-w-[1720px] mx-auto relative bg-transparent">
        <AppRoutes />
      </div>
      <Analytics />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
