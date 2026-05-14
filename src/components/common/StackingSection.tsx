import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StackingSectionProps {
  children: React.ReactNode;
  index: number;
}

const StackingSection: React.FC<StackingSectionProps> = ({ children, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // Creates a smooth upward slide that overlaps the previous section
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ zIndex: index * 10 }}
    >
      <motion.div 
        style={{ y: index > 1 ? y : 0 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default StackingSection
