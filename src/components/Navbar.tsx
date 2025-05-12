import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      // If we're not on the home page, first navigate to home
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const section = path.substring(2)
          const element = document.getElementById(section)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // If we're already on home page, just scroll to section
        const section = path.substring(2)
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Education', href: '/#education' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav className="py-6 px-4 sm:px-6 lg:px-8 fixed w-full top-0 z-50 bg-white dark:bg-[#09090B] bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-mono dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          PW
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.href.startsWith('/#') ? (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${
                  location.pathname === '/' && window.location.hash === item.href.substring(1) 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : ''
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${
                  location.pathname === item.href ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-gray-300" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 space-y-4 px-4"
        >
          {navItems.map((item) => (
            item.href.startsWith('/#') ? (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${
                  location.pathname === '/' && window.location.hash === item.href.substring(1)
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : ''
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${
                  location.pathname === item.href ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar 