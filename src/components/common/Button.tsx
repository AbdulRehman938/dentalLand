import React from 'react'
import { motion } from 'framer-motion'
import { HiOutlineClock } from 'react-icons/hi2'

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  showWave?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  icon = <HiOutlineClock className="text-lg" />,
  showWave = true
}) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      style={{ backgroundColor: variant === 'primary' ? '#5B7A12' : 'transparent' }}
      className={`relative overflow-hidden px-6 py-2.5 rounded-full flex items-center gap-3 font-bold text-base transition-all duration-500 border border-transparent group ${className}`}
      variants={{
        initial: { borderColor: "transparent" },
        hover: { borderColor: variant === 'primary' ? "#5B7A12" : "transparent" }
      }}
    >
      {/* Water Wave Effect */}
      {showWave && variant === 'primary' && (
        <motion.div
          variants={{
            initial: { y: "150%" },
            hover: { y: "0%" }
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: '#FFFFFF' }}
          className="absolute inset-0 z-0"
        >
          <svg 
            className="absolute top-0 left-0 w-[200%] h-12 -translate-y-[80%] animate-wave" 
            viewBox="0 0 1000 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" 
              fill="#FFFFFF"
            />
          </svg>
        </motion.div>
      )}

      {/* Content */}
      <motion.span
        variants={{
          initial: { color: variant === 'primary' ? "#FFFFFF" : "inherit" },
          hover: { color: variant === 'primary' ? "#5B7A12" : "inherit" }
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
      
      {icon && (
        <motion.div 
          variants={{
            initial: { 
              backgroundColor: variant === 'primary' ? "rgba(255, 255, 255, 0.2)" : "transparent",
              color: variant === 'primary' ? "#FFFFFF" : "inherit" 
            },
            hover: { 
              backgroundColor: variant === 'primary' ? "rgba(91, 122, 18, 0.1)" : "transparent",
              color: variant === 'primary' ? "#5B7A12" : "inherit" 
            }
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 p-1.5 rounded-full flex items-center justify-center"
        >
          {icon}
        </motion.div>
      )}

      {/* Shared Animation Style for Wave */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave {
          0% { transform: translate(-50%, -80%); }
          100% { transform: translate(0%, -80%); }
        }
        .animate-wave {
          animation: wave 3s linear infinite;
        }
      `}} />
    </motion.button>
  )
}

export default Button
