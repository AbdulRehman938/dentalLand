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
      style={{ backgroundColor: variant === 'primary' ? '#5B7A12' : (variant === 'secondary' ? '#FFFFFF' : 'transparent') }}
      className={`relative overflow-hidden px-6 py-1.5 rounded-full flex items-center justify-between gap-3 font-bold text-base transition-all duration-500 border group shadow-md shadow-black/10 ${className}`}
      variants={{
        initial: { borderColor: variant === 'secondary' ? "#E5E7EB" : "transparent" },
        hover: { borderColor: variant === 'primary' ? "#5B7A12" : (variant === 'secondary' ? "#5B7A12" : "transparent") }
      }}
    >
      {/* Water Wave Effect */}
      {showWave && (variant === 'primary' || variant === 'secondary') && (
        <motion.div
          variants={{
            initial: { y: "170%" },
            hover: { y: "0%" }
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: variant === 'primary' ? '#FFFFFF' : '#5B7A12' }}
          className="absolute inset-0 z-0"
        >
          <svg 
            className="absolute top-0 left-0 w-[200%] h-12 -translate-y-[80%] animate-wave" 
            viewBox="0 0 1000 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z" 
              fill={variant === 'primary' ? '#FFFFFF' : '#5B7A12'}
            />
          </svg>
        </motion.div>
      )}

      {/* Content */}
      <motion.span
        variants={{
          initial: { color: variant === 'primary' ? "#FFFFFF" : "#000000" },
          hover: { color: variant === 'primary' ? "#5B7A12" : "#FFFFFF" }
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
              color: variant === 'primary' ? "#FFFFFF" : "#000000" 
            },
            hover: { 
              color: variant === 'primary' ? "#5B7A12" : "#FFFFFF" 
            }
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex items-center justify-center"
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
