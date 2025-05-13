import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import AllProjects from './components/AllProjects'
import Blog from './components/Blog'
import AllBlogs from './components/AllBlogs'
import BlogPost from './components/BlogPost'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode ? savedDarkMode === 'true' : false
  })
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Save dark mode preference
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // Reduced loading time

    return () => clearTimeout(timer)
  }, [location.pathname]) // Only show loader on route changes

  if (loading) {
    return <Loader />
  }

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? 'dark bg-[#09090B]' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Experience />
              <Education />
              <Projects />
              <Blog />
              <Contact />
            </>
          } />
          {/* Added Projects page route */}
          <Route path="/projects" element={<AllProjects />} />
          {/* Updated Blog routes */}
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App