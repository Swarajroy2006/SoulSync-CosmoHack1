import React from 'react'
import { Menu } from 'lucide-react';
import { motion } from "motion/react";

const Nav = () => {
  return (
    <div className='fixed top-10 items-center flex justify-between text-white px-10 py-5 bg-blend-saturation  z-10 rounded-3xl'>
      <div className='flex items-center w-4xl center gap-8'><Menu />
      <motion.h1 whileHover={{scale: 1.1, transition: {duration: 0.1}}} transition={{duration: 0.6}} className='font-bold text-2xl cursor-pointer'>Soul Sync</motion.h1></div>
      <div className='flex justify-between gap-5'>
        <h2 className=' cursor-pointer hover:text-gray-400'>Team</h2>
        <h2 className='cursor-pointer hover:text-gray-400'>About</h2>
        <h2 className='cursor-pointer hover:text-gray-400'>FAQ</h2>
      </div>
    </div>
  )
}

export default Nav
