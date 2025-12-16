import React from 'react'
import { motion } from "motion/react";


const Hero = () => {

  const item = {
    hidden:{opacity: 0, y: 20},
    show:{
      opacity: 1,
      y: 0,
      transition:{
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2, 
      }
    }
  };
  return (
    <motion.div variants={container} 
      initial="hidden" 
      animate="show" className='mt-10  px-20'>
      <div className='text-center text-white'>Make Your Soul Sync</div>
      <motion.h1  variants={item} className='text-center mb-10'><span className='font-bold text-gray-300  text-7xl '>Find Your Voice</span></motion.h1>
      <motion.h1 variants={item} className=' mb-2'><span className='text-gray-500 font-semibold text-4xl opacity-90'>A Safe Space to Talk Reflect, and Heal</span></motion.h1>
      <motion.h1 variants={item} className='text-center'><span className='text-gray-500 font-semibold text-4xl opacity-90'>Talk Reflect, and Heal</span></motion.h1>
    </motion.div>
  )
}

export default Hero
