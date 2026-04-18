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

  // detect if we're running inside the /v1 subtree
  const isV1 = location.pathname.startsWith('/v1')
  const homeBase = isV1 ? '/v1' : '/'

  const navItems = [
    { name: 'Home',       href: homeBase },
    { name: 'About',      href: `${homeBase}#about` },
    { name: 'Experience', href: `${homeBase}#experience` },
    { name: 'Education',  href: `${homeBase}#education` },
    { name: 'Projects',   href: isV1 ? '/v1/projects' : '/projects' },
    { name: 'Blog',       href: isV1 ? '/v1/blog' : '/blog' },
    { name: 'Contact',    href: `${homeBase}#contact` },
  ]

  // current "home" path for detecting active section links
  const homePath = homeBase

  const handleNavigation = (href: string) => {
    const hashIdx = href.indexOf('#')
    if (hashIdx !== -1) {
      const sectionId = href.substring(hashIdx + 1)
      const basePath = href.substring(0, hashIdx)

      if (location.pathname !== basePath) {
        // navigate to home first, then scroll
        navigate(basePath || homeBase)
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 120)
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  // close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const linkClass = (href: string) => {
    const isActive = location.pathname === href ||
      (href.includes('#') && location.pathname === href.split('#')[0])
    return `text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${
      isActive ? 'text-indigo-600 dark:text-indigo-400' : ''
    }`
  }

  const renderItem = (item: { name: string; href: string }, block = false) => {
    const isHash = item.href.includes('#')

    if (isHash) {
      return (
        <button
          key={item.name}
          onClick={() => handleNavigation(item.href)}
          className={`${block ? 'block w-full text-left' : ''} ${linkClass(item.href)}`}
        >
          {item.name}
        </button>
      )
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => setIsOpen(false)}
        className={`${block ? 'block' : ''} ${linkClass(item.href)}`}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <nav className="py-6 px-4 sm:px-6 lg:px-8 fixed w-full top-0 z-50 bg-white dark:bg-[#09090B] bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={homePath}
          className="text-2xl font-bold font-mono dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          PW
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => renderItem(item))}
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
          className="md:hidden mt-4 space-y-4 px-4 pb-4"
        >
          {navItems.map((item) => renderItem(item, true))}
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
