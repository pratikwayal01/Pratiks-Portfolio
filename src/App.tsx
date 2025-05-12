import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode ? savedDarkMode === 'true' : false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#09090B]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App 