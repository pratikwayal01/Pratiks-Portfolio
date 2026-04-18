import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MODE_BY_SECTION: Record<string, '[NORMAL]' | '[VISUAL]' | '[COMMAND]' | '[INSERT]'> = {
  hero: '[NORMAL]',
  about: '[VISUAL]',
  skills: '[VISUAL]',
  experience: '[VISUAL]',
  education: '[VISUAL]',
  projects: '[COMMAND]',
  blog: '[COMMAND]',
  contact: '[VISUAL]',
}

const SECTION_PATH: Record<string, string> = {
  hero: '~/hero',
  about: '~/about',
  skills: '~/skills',
  experience: '~/experience',
  education: '~/education',
  projects: '~/projects',
  blog: '~/blog',
  contact: '~/contact',
}

const BOOT_TIME_KEY = 'pratik-boot-time'

const formatClock = (date: Date) =>
  date.toLocaleTimeString('en-GB', {
    hour12: false,
  })

const getCurrentSection = () => {
  const ids = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'blog', 'contact']
  let current = 'hero'
  const threshold = window.innerHeight * 0.35

  ids.forEach((id) => {
    const node = document.getElementById(id)
    if (!node) {
      return
    }
    const rect = node.getBoundingClientRect()
    if (rect.top <= threshold) {
      current = id
    }
  })

  return current
}

const formatUptime = (startAt: number) => {
  const elapsedMs = Date.now() - startAt
  const totalMinutes = Math.max(1, Math.floor(elapsedMs / 60000))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60
  return `uptime: ${days}d ${hours}h ${minutes}m`
}

const TmuxFooter = () => {
  const location = useLocation()
  const [clock, setClock] = useState(() => formatClock(new Date()))
  const [section, setSection] = useState('hero')
  const [insertMode, setInsertMode] = useState(false)
  const [bootTime] = useState(() => {
    const saved = sessionStorage.getItem(BOOT_TIME_KEY)
    if (saved) {
      return Number(saved)
    }
    const now = Date.now() - 2011200000
    sessionStorage.setItem(BOOT_TIME_KEY, String(now))
    return now
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClock(formatClock(new Date()))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
      setSection(location.pathname === '/blog' ? 'blog' : location.pathname === '/projects' ? 'projects' : 'hero')
      return
    }

    const onScroll = () => {
      setSection(getCurrentSection())
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    const onFocusChange = () => {
      const active = document.activeElement
      const inContactForm = !!active?.closest('#contact form')
      setInsertMode(inContactForm)
    }

    window.addEventListener('focusin', onFocusChange)
    window.addEventListener('focusout', onFocusChange)
    return () => {
      window.removeEventListener('focusin', onFocusChange)
      window.removeEventListener('focusout', onFocusChange)
    }
  }, [])

  const mode = useMemo(() => {
    if (insertMode) {
      return '[INSERT]'
    }
    return MODE_BY_SECTION[section] ?? '[NORMAL]'
  }, [insertMode, section])

  if (location.pathname === '/v1' || location.pathname.startsWith('/blog/')) {
    return null
  }

  return (
    <footer
      className="fixed bottom-0 right-0 z-[70] h-7 bg-[#0D0D0D] font-mono text-[11px] text-[#6B6B6B] transition-[left] duration-200 md:text-xs"
      style={{ left: 'var(--sidebar-w, 0px)' }}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-3">
        <p className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
          <span className="inline-flex items-center rounded-sm bg-[#E5A445] px-1.5 py-0.5 text-[#1C1C1E]">{mode}</span>
          <span>pratik@portfolio</span>
          <span>{SECTION_PATH[section] ?? '~/hero'}</span>
          <span>⎇ main</span>
          <span>✓</span>
        </p>
        <p className="hidden items-center gap-2 md:flex">
          <span>|</span>
          <span>{formatUptime(bootTime)}</span>
          <span>|</span>
          <span>{clock}</span>
        </p>
      </div>
    </footer>
  )
}

export default TmuxFooter
