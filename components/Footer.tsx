import React from 'react'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };
  return (
      <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
          <div className="container pt-3">
              {/* Social media icons container */}
              <div className="mb-6 flex justify-center space-x-2">
                  <Link href="https://github.com/AdarshGzz" className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:scale-[120%] focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900" data-twe-ripple-init>
                      <FaGithub className='h-10 w-10'/>
                  </Link>
                  {/* Add the other social media icons similarly */}
              </div>
          </div>

          {/* Copyright section */}
          <div className="w-full bg-black/5 p-4 text-center">
              All rights reserved {getCurrentYear()} @AdarshGzz
          </div>
      </footer>
  )
}

export default Footer
