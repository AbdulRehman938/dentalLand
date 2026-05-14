import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

import { Analytics } from "@vercel/analytics/react"
import Home from './screens/Home'

function App() {
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

  return (
    <div className="selection:bg-brand-secondary selection:text-brand-white bg-brand-bg min-h-screen">
      <div className="max-w-[1720px] mx-auto relative bg-transparent">
        <Home />
      </div>
      <Analytics />
    </div>
  )
}

export default App

