import React from 'react'
import { Menu } from 'lucide-react';
import { motion } from "motion/react";
import { Link } from 'react-router';

const Nav = () => {
  return (
    <div className='absolute top-10 items-center flex justify-between text-white px-10 py-5 bg-transparent  z-100 '>
      <div className='flex items-center w-4xl center gap-8'><Menu />
      <motion.h1 whileHover={{scale: 1.1, transition: {duration: 0.1}}} transition={{duration: 0.6}} className='font-bold text-2xl cursor-pointer'>Soul Sync</motion.h1></div>
      <div className='flex justify-between gap-5'>
        <h2 className=' cursor-pointer hover:text-gray-400'><Link to="/signin">Sign In</Link> </h2>
        <h2 className='cursor-pointer hover:text-gray-400'><Link to="/login">Login</Link></h2>
      </div>
    </div>
  )
}

export default Nav
