import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import BootSequence from './components/BootSequence'
import TmuxFooter from './components/TmuxFooter'
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
import AllProjects from './components/AllProjects'
import AllBlogs from './components/AllBlogs'
import BlogPost from './components/BlogPost'
import PortfolioV2 from './pages/PortfolioV2'
import KernelPanic from './pages/KernelPanic'

const BOOT_KEY = 'pratik-v2-boot-v2'  // versioned key — change suffix to force re-show
const V1_LOADED_KEY = 'pratik-v1-loaded'

// ── V1 layout — self-contained with its own sub-routes ───────────────────────

function V1Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode-v1')
    return saved ? saved === 'true' : true
  })
  // show the PW loader on first v1 visit per tab
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem(V1_LOADED_KEY))

  useEffect(() => {
    localStorage.setItem('darkMode-v1', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    if (showLoader) {
      const t = window.setTimeout(() => {
        sessionStorage.setItem(V1_LOADED_KEY, 'true')
        setShowLoader(false)
      }, 1800)
      return () => window.clearTimeout(t)
    }
  }, [showLoader])

  if (showLoader) return <Loader />

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? 'dark bg-[#09090B]' : 'bg-gray-50'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* badge to switch to v2 */}
      <a
        href="/"
        className="fixed right-3 top-3 z-[80] rounded border border-[#E5A445] bg-[#0D0D0D] px-2 py-1 font-mono text-xs text-[#E5A445] transition-colors hover:bg-[#E5A445] hover:text-[#0D0D0D]"
      >
        v2 →
      </a>

      <main className="w-full overflow-x-hidden pt-24">
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
          <Route path="projects" element={<AllProjects />} />
          <Route path="blog" element={<AllBlogs />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/v1" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

// ── V2 layout — boot sequence + v2 routes ────────────────────────────────────

function V2Layout() {
  const location = useLocation()
  // Boot shows on first tab open, only when landing on root /
  // Direct links to /blog/:slug or /projects skip the boot
  const landedOnRoot = location.pathname === '/'
  const [showBoot, setShowBoot] = useState(
    () => landedOnRoot && !sessionStorage.getItem(BOOT_KEY)
  )

  const isV2Route =
    location.pathname === '/' ||
    location.pathname === '/projects' ||
    location.pathname === '/blog' ||
    location.pathname.startsWith('/blog/')

  if (showBoot) {
    return (
      <BootSequence
        onComplete={() => {
          sessionStorage.setItem(BOOT_KEY, 'true')
          setShowBoot(false)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <main className="w-full overflow-x-hidden pb-7">
        <Routes>
          <Route path="/" element={<PortfolioV2 />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<KernelPanic />} />
        </Routes>
      </main>
      {isV2Route && <TmuxFooter />}
    </div>
  )
}

// ── Root router ───────────────────────────────────────────────────────────────

function App() {
  return (
    <Router>
      <Routes>
        {/* V1 subtree — /v1 prefix is stripped before V1Layout's inner <Routes> */}
        <Route path="/v1/*" element={<V1Layout />} />
        {/* Everything else goes to V2 */}
        <Route path="*" element={<V2Layout />} />
      </Routes>
    </Router>
  )
}

export default App
