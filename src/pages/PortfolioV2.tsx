import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { blogPosts } from '../data/blog-posts'
import { projects } from '../data/projects'
import { THEMES, DEFAULT_THEME_KEY, getDefaultTheme, applyTheme, type Theme } from '../lib/themes'

// ─── Types ──────────────────────────────────────────────────────────────────

type EntryKind = 'prompt' | 'output' | 'error' | 'blank' | 'ls-dir' | 'ls-file'

interface TermEntry {
  kind: EntryKind
  text: string
}

interface SkillMetric {
  name: string
  level: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const RESUME_URL =
  'https://drive.google.com/file/d/1FympfGyzprgnOhcsv5kXNQkfWYSjYP4d/view?usp=sharing'
const GITHUB_URL = 'https://github.com/pratikwayal01'

const SECTIONS = ['hero', 'about', 'skills', 'experience', 'projects', 'blog', 'education', 'contact']

const ALL_COMMANDS = [
  'help',
  'whoami',
  'pwd',
  'ls',
  'ls ..',
  'clear',
  'uname',
  'uname -a',
  'echo',
  'theme',
  'cat resume',
  'cat about.md',
  'cat /proc/pratik',
  'cat /etc/pratik',
  'ssh github',
  'open github',
  'cd ..',
  'cd about',
  'cd skills',
  'cd experience',
  'cd education',
  'cd projects',
  'cd blog',
  'cd contact',
  'cd hero',
]

const HELP_LINES = [
  '┌─ available commands ──────────────────────────────────┐',
  '│  help                  show this message               │',
  '│  whoami                print identity                  │',
  '│  pwd                   print working directory         │',
  '│  ls [path]             list directory contents         │',
  '│  cd <section|..>       change directory / go up        │',
  '│  clear                 clear terminal history          │',
  '│  uname -a              system info                     │',
  '│  theme                 open theme picker               │',
  '│  cat resume            open resume in new tab          │',
  '│  cat about.md          print bio                       │',
  '│  ssh github            open GitHub profile             │',
  '│  open github           alias for ssh github            │',
  '│  exit                  exit fullscreen mode            │',
  '│    sections: about skills experience education         │',
  '│             projects blog contact hero                 │',
  '└───────────────────────────────────────────────────────┘',
]

const PROC_LINES = [
  '',
  '  Name:        Pratik Wayal',
  '  State:       R (running)',
  '  Pid:         2520',
  '  Threads:     4 (DevOps, Robotics, Debugging, Coffee)',
  '  VmRSS:       ∞ kb',
  '  VmPeak:      still growing',
  '  Interests:   Linux, AWS, autonomous systems, breaking things in staging',
  '  Bug count:   0 (unconfirmed)',
  '  Last seen:   Pune, Maharashtra',
  '',
]

const ABOUT_LINES = [
  '# about.md',
  '',
  'DevOps Engineer with hands-on production experience in AWS,',
  'Kubernetes, and CI/CD automation.',
  '',
  'I enjoy turning messy infrastructure into repeatable systems',
  'that teams can actually trust at 3am.',
  '',
  'Robotics keeps me curious. DevOps keeps me sharp.',
  'Debugging keeps me honest.',
]

const SKILLS: Record<string, SkillMetric[]> = {
  Languages: [
    { name: 'Python', level: 88 },
    { name: 'Go', level: 74 },
    { name: 'C++', level: 79 },
  ],
  DevOps: [
    { name: 'Docker', level: 92 },
    { name: 'Kubernetes', level: 84 },
    { name: 'AWS', level: 86 },
    { name: 'Terraform', level: 78 },
    { name: 'ArgoCD', level: 76 },
    { name: 'OpenTelemetry', level: 73 },
  ],
  Databases: [
    { name: 'PostgreSQL', level: 83 },
    { name: 'MongoDB', level: 72 },
    { name: 'Redis', level: 69 },
  ],
  Tools: [
    { name: 'Linux', level: 90 },
    { name: 'Git', level: 87 },
    { name: 'Jenkins', level: 71 },
    { name: 'NGINX', level: 76 },
  ],
}

const EXPERIENCES = [
  {
    id: 'abc1234',
    role: 'DevOps Engineer @ Dpdzero',
    period: '[Jul 2024 → Present]',
    points: [
      'Migrated container workloads from ECS to EKS with zero-downtime rollout plans.',
      'Implemented full observability stack: OpenTelemetry → Grafana with actionable alerts.',
      'Managed AWS infrastructure and automated GitOps-based delivery with ArgoCD.',
      'Maintained and tested robust CI/CD pipelines ensuring seamless deployments.',
    ],
  },
  {
    id: 'f3a9c12',
    role: 'Project Trainee @ Zoho Business',
    period: '[Jan 2025 → May 2025]',
    points: [
      'Worked extensively on Linux storage and database systems focused on high availability.',
      'Set up HA PostgreSQL clusters with Pacemaker, ZFS, and NVMe-over-Fabrics (TCP).',
      'Benchmarked database workloads for reliability under controlled failure conditions.',
    ],
  },
  {
    id: 'd02ef89',
    role: 'Programming Lead @ Team Cybrotics GEC',
    period: '[Apr 2022 → Jul 2024]',
    points: [
      'Led autonomous robot development for DD Robocon 2024 using ROS, OpenCV, C++.',
      'Mentored junior members in robotics programming, debugging, and systems thinking.',
    ],
  },
]

const CONTACT_INIT = { name: '', email: '', message: '' }

// ─── Virtual filesystem contents (cat <file>) ────────────────────────────────
// Key format: "<cwd>/<filename>" or absolute "<filename>" for root-level files.
// Values are arrays of lines printed by `cat`.

const FILE_CONTENTS: Record<string, string[]> = {
  // about/
  'about/about.md': ABOUT_LINES,
  'about/neofetch.txt': [
    '',
    '         pratik@portfolio',
    '         ───────────────',
    '  OS:    Human v2.0',
    '  Shell: DevOps/bash',
    '  Editor:Neovim (probably)',
    '  Uptime:22 years',
    '  WM:    tmux 3.3a',
    '  Loc:   Pune, Maharashtra',
    '',
  ],

  // skills/
  'skills/languages.txt': [
    'Python   ████████████████████░░░  88%',
    'C++      ████████████████░░░░░░░  79%',
    'Go       ███████████████░░░░░░░░  74%',
  ],
  'skills/devops.txt': [
    'Docker         ██████████████████████░░  92%',
    'AWS            █████████████████████░░░  86%',
    'Kubernetes     █████████████████░░░░░░░  84%',
    'Terraform      ████████████████░░░░░░░░  78%',
    'ArgoCD         ███████████████░░░░░░░░░  76%',
    'OpenTelemetry  ██████████████░░░░░░░░░░  73%',
  ],
  'skills/databases.txt': [
    'PostgreSQL  █████████████████░░░░░░░  83%',
    'MongoDB     ██████████████░░░░░░░░░░  72%',
    'Redis       █████████████░░░░░░░░░░░  69%',
  ],
  'skills/tools.txt': [
    'Linux   ██████████████████░░░░░░  90%',
    'Git     █████████████████░░░░░░░  87%',
    'NGINX   ███████████████░░░░░░░░░  76%',
    'Jenkins ██████████████░░░░░░░░░░  71%',
  ],

  // experience/
  'experience/dpdzero-devops.patch': [
    '--- a/career  +++ b/career',
    '@@ DevOps Engineer @ Dpdzero  [Jul 2024 → Present]',
    '+  Migrated container workloads from ECS to EKS (zero-downtime).',
    '+  Full observability: OpenTelemetry → Grafana with actionable alerts.',
    '+  AWS infrastructure management + GitOps delivery via ArgoCD.',
    '+  Robust CI/CD pipelines ensuring seamless deployments.',
  ],
  'experience/zoho-trainee.patch': [
    '--- a/career  +++ b/career',
    '@@ Project Trainee @ Zoho Business  [Jan 2025 → May 2025]',
    '+  Linux storage & database systems focused on high availability.',
    '+  HA PostgreSQL clusters: Pacemaker + ZFS + NVMe-over-Fabrics (TCP).',
    '+  Benchmarked DB workloads under controlled failure conditions.',
  ],
  'experience/cybrotics-lead.patch': [
    '--- a/career  +++ b/career',
    '@@ Programming Lead @ Team Cybrotics GEC  [Apr 2022 → Jul 2024]',
    '+  Autonomous robot for DD Robocon 2024: ROS, OpenCV, C++.',
    '+  Mentored juniors in robotics programming & systems thinking.',
  ],

  // education/
  'education/gcoe-aurangabad.conf': [
    '[institution]',
    '  name    = Government College of Engineering, Aurangabad',
    '  degree  = B.Tech Computer Science & Engineering',
    '  grade   = CGPA 7.58',
    '  period  = Aug 2021 – May 2025',
  ],
  'education/vasant-arts-science.conf': [
    '[institution]',
    '  name    = Vasant Art & Science College',
    '  degree  = HSC (Higher Secondary Certificate)',
    '  grade   = 83.66%',
    '  period  = Jun 2019 – May 2021',
  ],
  'education/vivekanand-vm.conf': [
    '[institution]',
    '  name    = Vivekanand Vidyamandir',
    '  degree  = SSC (Secondary School Certificate)',
    '  grade   = 88.20%',
    '  period  = Jun 2017 – May 2019',
  ],

  // contact/
  'contact/message.yaml': [
    'name:    <fill and send via the contact form below>',
    'email:   <your email>',
    'message: |',
    '  <your message>',
    '',
    '# tip: scroll to contact section or type: cd contact',
  ],
  'contact/contact.txt': [
    'email:     pratikswayal123@gmail.com',
    'github:    github.com/pratikwayal01',
    'linkedin:  linkedin.com/in/pratikwayal',
    'twitter:   x.com/pratik_2520',
    'location:  Pune, Maharashtra, India',
  ],

  // hero/
  'hero/whoami.txt': [
    'pratik — DevOps Engineer · Robotics Enthusiast · Problem Solver',
  ],
  'hero/terminal.sh': [
    '#!/bin/bash',
    '# interactive portfolio terminal',
    '# type help for available commands',
    'echo "Welcome to pratik@portfolio"',
  ],

  // absolute paths (work from any cwd)
  '/proc/pratik': PROC_LINES,
  '/etc/pratik':  PROC_LINES,
  'resume.pdf':   ['[opening resume in new tab...]'],  // handled specially
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getActiveSection = () => {
  const threshold = window.innerHeight * 0.4
  let current = 'hero'
  SECTIONS.forEach((id) => {
    const node = document.getElementById(id)
    if (!node) return
    if (node.getBoundingClientRect().top <= threshold) current = id
  })
  return current
}

const formatClock = (d: Date) => d.toLocaleTimeString('en-GB', { hour12: false })

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const lineMotion = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, delay: i * 0.04 },
  }),
}

// ─── Root ────────────────────────────────────────────────────────────────────

// ─── SidebarContent (shared by desktop + mobile drawer) ──────────────────────

interface SidebarContentProps {
  activeSection: string
  navItems: string[]
  uptime: string
  clock: string
  theme: Theme
  setTheme: (t: Theme) => void
  onClose: () => void
  onNav: (id: string) => void
}

const SidebarContent = ({
  activeSection, navItems, uptime, clock, theme, setTheme, onClose, onNav,
}: SidebarContentProps) => (
  <div className="flex h-full w-60 flex-col px-3 py-5">
    <div className="mb-4 flex items-center justify-between">
      <span className="text-[10px] text-[var(--text-dim)]">[0] tmux:portfolio</span>
      <button
        onClick={onClose}
        className="text-[var(--text-dim)] hover:text-[var(--accent-amber)]"
        title="collapse"
      >
        ◀
      </button>
    </div>

    <p className="mb-3 text-[11px] text-[var(--accent-teal)]">~/{activeSection}</p>

    <nav className="space-y-1">
      {navItems.map((id) => (
        <button
          key={id}
          onClick={() => onNav(id)}
          className={`block w-full border-l-2 px-3 py-1.5 text-left text-xs uppercase tracking-widest transition-colors ${
            activeSection === id
              ? 'border-[var(--accent-amber)] bg-[#232326] text-[var(--text-main)]'
              : 'border-transparent text-[var(--text-dim)] hover:border-[var(--accent-teal)] hover:text-[var(--text-main)]'
          }`}
        >
          {id}
        </button>
      ))}
    </nav>

    <div className="mt-auto space-y-3 border-t border-[var(--border-main)] pt-4 text-[11px] text-[var(--text-dim)]">
      <p>uptime: {uptime}</p>
      <p>{clock}</p>
      <p className="text-[var(--status-ok)]">● online</p>
      <ThemePicker theme={theme} setTheme={setTheme} />
    </div>
  </div>
)

const PortfolioV2 = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [clock, setClock] = useState(() => formatClock(new Date()))
  const [uptimeSeed] = useState(() => Date.now() - 2011200000)
  const [uptime, setUptime] = useState('23d 4h 12m')
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // on mobile default closed; on desktop restore saved preference
    if (typeof window !== 'undefined' && window.innerWidth < 768) return false
    const saved = localStorage.getItem('pratik-sidebar')
    return saved === null ? true : saved === 'true'
  })
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => getDefaultTheme())
  const v2Ref = useRef<HTMLDivElement>(null)

  // Apply theme CSS vars to the v2 root element
  useEffect(() => {
    if (v2Ref.current) applyTheme(theme, v2Ref.current)
  }, [theme])

  // persist sidebar state
  useEffect(() => {
    localStorage.setItem('pratik-sidebar', sidebarOpen.toString())
  }, [sidebarOpen])

  // keep a CSS variable in sync so TmuxFooter can read sidebar width (desktop only)
  useEffect(() => {
    const isMd = window.innerWidth >= 768
    document.documentElement.style.setProperty('--sidebar-w', (isMd && sidebarOpen) ? '240px' : '0px')
  }, [sidebarOpen])

  useEffect(() => {
    const t = window.setInterval(() => setClock(formatClock(new Date())), 1000)
    return () => window.clearInterval(t)
  }, [])

  useEffect(() => {
    const t = window.setInterval(() => {
      const ms = Date.now() - uptimeSeed
      const totalSec = Math.floor(ms / 1000)
      const d = Math.floor(totalSec / 86400)
      const h = Math.floor((totalSec % 86400) / 3600)
      const m = Math.floor((totalSec % 3600) / 60)
      setUptime(`${d}d ${h}h ${m}m`)
    }, 1000)
    return () => window.clearInterval(t)
  }, [uptimeSeed])

  useEffect(() => {
    const onScroll = () => setActiveSection(getActiveSection())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = useMemo(() => SECTIONS, [])

  return (
    <div ref={v2Ref} className="v2-root relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* mobile sidebar toggle button */}
      <button
        onClick={() => setMobileSidebarOpen((p) => !p)}
        className="fixed left-3 top-2 z-[95] flex h-7 w-7 items-center justify-center rounded border border-[var(--border-main)] bg-[#0D0D0D] text-[var(--text-dim)] hover:text-[var(--accent-amber)] md:hidden"
        title="toggle menu"
      >
        ☰
      </button>

      {/* mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[65] bg-black/60 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* drawer */}
            <motion.aside
              key="mobile-sidebar"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.22 }}
              className="fixed left-0 top-0 z-[70] h-screen w-60 overflow-y-auto border-r border-[var(--border-main)] bg-[var(--bg-main)] md:hidden"
            >
              <SidebarContent
                activeSection={activeSection}
                navItems={navItems}
                uptime={uptime}
                clock={clock}
                theme={theme}
                setTheme={setTheme}
                onClose={() => setMobileSidebarOpen(false)}
                onNav={(id) => { scrollTo(id); setMobileSidebarOpen(false) }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* ── Desktop Sidebar ───────────────────────────────────── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 z-[60] hidden h-screen shrink-0 overflow-hidden border-r border-[var(--border-main)] bg-[var(--bg-main)] md:block"
            >
              <SidebarContent
                activeSection={activeSection}
                navItems={navItems}
                uptime={uptime}
                clock={clock}
                theme={theme}
                setTheme={setTheme}
                onClose={() => setSidebarOpen(false)}
                onNav={(id) => scrollTo(id)}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* desktop sidebar reopen handle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-0 top-1/2 z-[60] hidden h-10 w-5 -translate-y-1/2 items-center justify-center border border-l-0 border-[var(--border-main)] bg-[#0D0D0D] text-[var(--text-dim)] hover:text-[var(--accent-amber)] md:flex"
            title="expand sidebar"
          >
            ▶
          </button>
        )}

        {/* ── Main content ─────────────────────────────────────── */}
        <main
          className="min-h-screen w-full px-4 pb-16 pt-10 transition-[margin] duration-200 sm:px-6 md:px-8 lg:px-10"
          style={{ marginLeft: sidebarOpen ? 240 : 0 }}
        >
          <HeroTerminal />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <BlogSection />
          <EducationSection />
          <ContactSection />

          {/* v1 link — bottom of page */}
          <div className="mt-12 border-t border-[var(--border-main)] pt-6 pb-2 text-center">
            <a
              href="/v1"
              className="inline-flex items-center gap-2 rounded border border-[var(--border-main)] px-4 py-2 text-xs text-[var(--text-dim)] transition-colors hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
            >
              ← view v1 portfolio
            </a>
            <p className="mt-2 text-[10px] text-[var(--text-dim)]">classic design, same content</p>
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── ThemePicker ─────────────────────────────────────────────────────────────

interface ThemePickerProps {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemePicker = ({ theme, setTheme }: ThemePickerProps) => {
  const [open, setOpen] = useState(false)
  const [savedId, setSavedId] = useState(
    () => localStorage.getItem(DEFAULT_THEME_KEY) ?? 'catppuccin',
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const select = (t: Theme) => {
    setTheme(t)
  }

  const saveDefault = (t: Theme) => {
    localStorage.setItem(DEFAULT_THEME_KEY, t.id)
    setSavedId(t.id)
  }

  // close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // listen for 'open-theme-picker' custom event fired by terminal `theme` command
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-theme-picker', handler)
    return () => window.removeEventListener('open-theme-picker', handler)
  }, [])

  return (
    <div ref={containerRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center gap-2 rounded-sm border border-[var(--border-main)] px-2 py-1 text-[11px] text-[var(--text-dim)] transition-colors hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--border-main)]"
          style={{ background: theme.accentAmber }}
        />
        <span className="flex-1 text-left truncate">{theme.label}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-0.5 rounded-sm border border-[var(--border-main)] bg-[var(--bg-main)] p-1">
              {THEMES.map((t) => {
                const isActive = t.id === theme.id
                const isDefault = t.id === savedId
                return (
                  <div
                    key={t.id}
                    className={`group flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-[11px] transition-colors ${
                      isActive
                        ? 'bg-[var(--border-main)] text-[var(--text-main)]'
                        : 'text-[var(--text-dim)] hover:bg-[var(--border-main)] hover:text-[var(--text-main)]'
                    }`}
                    onClick={() => select(t)}
                  >
                    {/* colour swatch */}
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: t.accentAmber }}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block truncate">{t.label}</span>
                      <span className="block truncate text-[9px] text-[var(--text-dim)] opacity-70">{t.font.label}</span>
                    </span>

                     {/* set-as-default star */}
                    <button
                      title={isDefault ? 'current default' : 'set as default'}
                      onClick={(e) => {
                        e.stopPropagation()
                        saveDefault(t)
                      }}
                      className={`shrink-0 text-[10px] transition-colors ${
                        isDefault
                          ? 'text-[var(--accent-amber)]'
                          : 'text-[var(--border-main)] hover:text-[var(--accent-amber)]'
                      }`}
                    >
                      {isDefault ? '★' : '☆'}
                    </button>
                  </div>
                )
              })}

              <p className="mt-1 border-t border-[var(--border-main)] px-2 pt-1 text-[10px] text-[var(--text-dim)]">
                ★ = loads on next visit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Directory contents per section ──────────────────────────────────────────

interface FsEntry { name: string; isDir: boolean }

const buildDir = (entries: Array<{ name: string; isDir: boolean }>): FsEntry[] => entries

const DIR_TREE: Record<string, FsEntry[]> = {
  '~': [
    { name: 'about', isDir: true },
    { name: 'skills', isDir: true },
    { name: 'experience', isDir: true },
    { name: 'education', isDir: true },
    { name: 'projects', isDir: true },
    { name: 'blog', isDir: true },
    { name: 'contact', isDir: true },
    { name: 'resume.pdf', isDir: false },
  ],
  about: buildDir([
    { name: 'about.md', isDir: false },
    { name: 'neofetch.txt', isDir: false },
  ]),
  // skills: each category is a file listing the skills inside it
  skills: buildDir([
    { name: 'languages.txt', isDir: false },
    { name: 'devops.txt', isDir: false },
    { name: 'databases.txt', isDir: false },
    { name: 'tools.txt', isDir: false },
  ]),
  // experience: patch files per role
  experience: buildDir([
    { name: 'dpdzero-devops.patch', isDir: false },
    { name: 'zoho-trainee.patch', isDir: false },
    { name: 'cybrotics-lead.patch', isDir: false },
  ]),
  // education: config files per institution
  education: buildDir([
    { name: 'gcoe-aurangabad.conf', isDir: false },
    { name: 'vasant-arts-science.conf', isDir: false },
    { name: 'vivekanand-vm.conf', isDir: false },
  ]),
  projects: projects.map((p) => ({
    name: p.title.toLowerCase().replace(/\s+/g, '-') + '.yaml',
    isDir: false,
  })),
  blog: blogPosts.map((p) => ({ name: `${p.slug}.md`, isDir: false })),
  contact: buildDir([
    { name: 'message.yaml', isDir: false },
    { name: 'contact.txt', isDir: false },
  ]),
  hero: buildDir([
    { name: 'terminal.sh', isDir: false },
    { name: 'whoami.txt', isDir: false },
  ]),
}

/** Render a FsEntry[] as ls lines; caller renders these with kind 'ls-dir' or 'ls-file' */
interface LsLine { text: string; isDir: boolean }
const formatLs = (entries: FsEntry[]): LsLine[] =>
  entries.map((e) => ({ text: e.isDir ? `${e.name}/` : e.name, isDir: e.isDir }))

// ─── Terminal ─────────────────────────────────────────────────────────────────

const HeroTerminal = () => {
  const [history, setHistory] = useState<TermEntry[]>([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const fullscreenRef = useRef(false)
  const setFullscreenSync = (val: boolean) => {
    fullscreenRef.current = val
    setFullscreen(val)
  }
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [suggestionList, setSuggestionList] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cwd, setCwd] = useState('~')
  // ref so runCommand always reads latest cwd without stale closure
  const cwdRef = useRef('~')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const updateCwd = (next: string) => {
    cwdRef.current = next
    setCwd(next)
  }

  // derive prompt string from cwd — used in the input row
  const promptLabel = cwd === '~' ? 'pratik@portfolio:~$' : `pratik@portfolio:~/${cwd}$`

  const push = useCallback((lines: string[], kind: EntryKind = 'output') => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((text) => ({ kind, text })),
    ])
  }, [])

  // auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [history])

  // Tab suggestion logic — context-aware based on cwd
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion(null)
      setSuggestionList([])
      return
    }

    const currentCwd = cwdRef.current

    // Build dynamic candidates from current directory entries
    const dirEntries = DIR_TREE[currentCwd] ?? []
    const cdCandidates = dirEntries
      .filter((e) => e.isDir)
      .map((e) => `cd ${e.name}`)
    const catCandidates = dirEntries
      .filter((e) => !e.isDir)
      .map((e) => `cat ${e.name}`)
    const lsCandidates = dirEntries.map((e) =>
      e.isDir ? `ls ${e.name}/` : `ls ${e.name}`
    )

    // Combine: cwd-specific first, then global fallbacks (excluding cd/cat/ls that are now dynamic)
    const globalFallbacks = ALL_COMMANDS.filter(
      (c) => !c.startsWith('cd ') && !c.startsWith('cat ') && !c.startsWith('ls ')
    )
    // Keep absolute cat paths and ls bare
    const absoluteCats = ['cat resume', 'cat about.md', 'cat /proc/pratik', 'cat /etc/pratik']
    const candidates = [
      ...new Set([
        ...globalFallbacks,
        ...absoluteCats,
        ...cdCandidates,
        ...catCandidates,
        ...lsCandidates,
        'cd ..',
        'ls',
      ]),
    ]

    const matches = candidates.filter((c) => c.startsWith(input) && c !== input)
    setSuggestionList(matches)
    setSuggestion(matches.length === 1 ? matches[0] : null)
  }, [input])

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim()
      if (!cmd) return

      // Always read from ref — never stale
      const currentCwd = cwdRef.current
      const currentPrompt =
        currentCwd === '~' ? 'pratik@portfolio:~$' : `pratik@portfolio:~/${currentCwd}$`

      setCmdHistory((prev) => [cmd, ...prev])
      setHistoryIdx(-1)
      push([`${currentPrompt} ${cmd}`], 'prompt')

      // ── command dispatch ────────────────────────────────────
      const c = cmd.toLowerCase().trim()

      if (c === 'clear') {
        setHistory([])
        return
      }

      if (c === 'exit' || c === 'logout' || c === 'quit') {
        if (fullscreenRef.current) {
          setFullscreenSync(false)
          push(['[exited fullscreen]'])
        } else {
          push(['[already in windowed mode — nothing to exit]'])
        }
        return
      }

      if (c === 'help') {
        push(HELP_LINES)
        return
      }

      if (c === 'whoami') {
        push(['pratik — DevOps Engineer · Robotics Enthusiast · Problem Solver'])
        return
      }

      if (c === 'pwd') {
        const path =
          currentCwd === '~'
            ? '/home/pratik/portfolio'
            : `/home/pratik/portfolio/${currentCwd}`
        push([path])
        return
      }

      if (c === 'uname' || c === 'uname -a') {
        push(['PratikOS 2.0.0 SMP x86_64 DevOps/Robotics GNU/Linux'])
        return
      }

      if (c === 'theme' || c === 'theme --list' || c === 'set-theme') {
        window.dispatchEvent(new CustomEvent('open-theme-picker'))
        push([
          '',
          '  available themes:',
          ...THEMES.map(
            (t) =>
              `    ${t.id.padEnd(14)} ${t.label.padEnd(22)} [${t.font.label}]`,
          ),
          '',
          '  → theme picker opened in sidebar',
          '',
        ])
        return
      }

      // ── ls / dir ────────────────────────────────────────────
      const resolveLsTarget = (arg?: string): FsEntry[] | null => {
        const key = !arg || arg === '.' ? currentCwd : arg.replace(/\/$/, '')
        return DIR_TREE[key] ?? null
      }

      if (c === 'ls' || c === 'ls .' || c === 'ls ./' || c === 'dir') {
        const entries = resolveLsTarget()
        const lines = formatLs(entries ?? [])
        setHistory((prev) => [
          ...prev,
          ...lines.map(({ text, isDir }) => ({ kind: (isDir ? 'ls-dir' : 'ls-file') as EntryKind, text })),
        ])
        return
      }

      const lsMatch = c.match(/^(?:ls|dir)\s+(.+)$/)
      if (lsMatch) {
        const target = lsMatch[1].trim()
        const entries = resolveLsTarget(target)
        if (entries !== null) {
          const lines = formatLs(entries)
          setHistory((prev) => [
            ...prev,
            ...lines.map(({ text, isDir }) => ({ kind: (isDir ? 'ls-dir' : 'ls-file') as EntryKind, text })),
          ])
        } else {
          push([`ls: cannot access '${target}': No such file or directory`], 'error')
        }
        return
      }

      if (c === 'cat resume' || c === 'open resume') {
        window.open(RESUME_URL, '_blank', 'noopener,noreferrer')
        push(['[opening resume in new tab...]'])
        return
      }

      if (c === 'ssh github' || c === 'open github') {
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
        push(['[establishing ssh session to github.com/pratikwayal01...]'])
        return
      }

      // ── generic cat ──────────────────────────────────────────
      if (c.startsWith('cat ')) {
        const arg = cmd.slice(4).trim()  // preserve original case for display
        const argLower = arg.toLowerCase()

        // absolute paths
        if (FILE_CONTENTS[argLower]) {
          push(FILE_CONTENTS[argLower])
          return
        }

        // relative to cwd: "cwd/file"
        const cwdKey = `${currentCwd}/${argLower}`
        if (FILE_CONTENTS[cwdKey]) {
          push(FILE_CONTENTS[cwdKey])
          return
        }

        // try just the filename bare (works when cwd matches)
        const bareKey = `${currentCwd}/${arg.replace(/^\.\//, '')}`
        if (FILE_CONTENTS[bareKey.toLowerCase()]) {
          push(FILE_CONTENTS[bareKey.toLowerCase()])
          return
        }

        push([`cat: ${arg}: No such file or directory`], 'error')
        return
      }

      if (c.startsWith('echo ')) {
        push([cmd.slice(5)])
        return
      }

      if (c.startsWith('cd ')) {
        const target = c.replace('cd ', '').trim().replace(/\/$/, '')
        if (target === '..' || target === '../') {
          // go up one level — any sub-dir goes back to ~
          if (cwdRef.current !== '~') {
            scrollTo('hero')
            updateCwd('~')
            push(['~'])
          } else {
            push(['already at ~'])
          }
          return
        }
        if (SECTIONS.includes(target)) {
          scrollTo(target)
          updateCwd(target)
          push([`~/${target}`])
        } else if (DIR_TREE[target]) {
          updateCwd(target)
          push([`~/${target}`])
        } else {
          push([`cd: ${target}: No such file or directory`], 'error')
        }
        return
      }

      if (c === 'cd' || c === 'cd ~' || c === 'cd /') {
        scrollTo('hero')
        updateCwd('~')
        push(['~'])
        return
      }

      // unknown
      push([`bash: ${cmd}: command not found. Type 'help' for available commands.`], 'error')
    },
    [push],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Tab → autocomplete
    if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) {
        setInput(suggestion)
        setSuggestion(null)
        setSuggestionList([])
      } else if (suggestionList.length > 0) {
        push([`suggestions: ${suggestionList.join('  ')}`], 'output')
      }
      return
    }

    // Arrow Up / Down → history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''))
      return
    }
  }

  const wrapperCls = fullscreen
    ? 'fixed inset-0 z-[130] flex flex-col bg-[#0F0F11] p-3 md:p-6'
    : 'terminal-panel rounded-md border border-[var(--border-main)] bg-[#171719] p-3 md:p-5 flex flex-col'

  const terminalHeight = fullscreen ? 'flex-1' : 'max-h-[300px] md:max-h-[420px]'

  return (
    <section id="hero" className="scroll-mt-10 py-6 md:py-10">
      <div className={wrapperCls}>
        {/* title bar */}
        <div className="mb-3 flex items-center justify-between border-b border-[var(--border-main)] pb-2">
          <span className="text-xs text-[var(--text-dim)]">
            pratik@portfolio — bash — 120×40
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFullscreenSync(!fullscreenRef.current)
                setTimeout(() => inputRef.current?.focus(), 50)
              }}
              className="text-xs text-[var(--text-dim)] hover:text-[var(--accent-amber)]"
              title={fullscreen ? 'exit fullscreen' : 'fullscreen'}
            >
              {fullscreen ? '⊠ exit fullscreen' : '⊡ fullscreen'}
            </button>
          </div>
        </div>

        {/* output area */}
        <div
          className={`${terminalHeight} overflow-y-auto font-mono text-xs leading-5 md:text-sm md:leading-6`}
          onClick={() => inputRef.current?.focus()}
        >
          {!ready ? (
            <div className="text-[var(--text-main)]">
              <Typewriter
                onInit={(tw) => {
                  tw.typeString('pratik@portfolio:~$ whoami')
                    .pauseFor(200)
                    .typeString('<br/>&gt; DevOps Engineer. Robotics Enthusiast. Problem Solver.')
                    .pauseFor(300)
                    .typeString('<br/>pratik@portfolio:~$ ls sections/')
                    .pauseFor(200)
                    .typeString(
                      '<br/>&gt; about/&nbsp; skills/&nbsp; experience/&nbsp; projects/&nbsp; blog/&nbsp; contact/',
                    )
                    .pauseFor(400)
                    .typeString('<br/>pratik@portfolio:~$ _')
                    .callFunction(() => setReady(true))
                    .start()
                }}
                options={{ delay: 22, cursor: '' }}
              />
            </div>
          ) : (
            <>
              <p>pratik@portfolio:~$ whoami</p>
              <p className="text-[var(--accent-amber)]">
                &gt; DevOps Engineer. Robotics Enthusiast. Problem Solver.
              </p>
              <p>pratik@portfolio:~$ ls sections/</p>
              <p className="text-[var(--accent-amber)]">
                &gt; about/ &nbsp;skills/ &nbsp;experience/ &nbsp;projects/ &nbsp;blog/ &nbsp;contact/
              </p>
              <p className="text-[var(--text-dim)] text-xs mb-2">
                [type 'help' to see available commands · Tab to autocomplete · ↑↓ history]
              </p>

              {history.map((entry, i) => (
                <p
                  key={i}
                  className={
                    entry.kind === 'error'
                      ? 'text-[var(--status-error)]'
                      : entry.kind === 'prompt'
                        ? 'text-[var(--text-main)]'
                        : entry.kind === 'ls-dir'
                          ? 'text-[var(--accent-teal)] font-semibold'
                          : entry.kind === 'ls-file'
                            ? 'text-[var(--text-main)]'
                            : 'text-[var(--accent-teal)]'
                  }
                >
                  {entry.kind === 'ls-dir'
                    ? `  ${entry.text}`
                    : entry.kind === 'ls-file'
                      ? `  ${entry.text}`
                      : entry.kind === 'output' && entry.text.length > 0
                        ? `  ${entry.text}`
                        : entry.kind === 'error'
                          ? `  ${entry.text}`
                          : entry.text}
                </p>
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* input row — only shown after typewriter */}
        {ready && (
          <div className="relative mt-2 border-t border-[var(--border-main)] pt-2">
            {/* suggestion dropdown */}
            <AnimatePresence>
              {suggestionList.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-full left-0 z-10 mb-1 max-h-40 w-full overflow-auto rounded border border-[var(--border-main)] bg-[#0F0F11] py-1 text-xs"
                >
                  {suggestionList.map((s) => (
                    <button
                      key={s}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setInput(s)
                        setSuggestionList([])
                        inputRef.current?.focus()
                      }}
                      className="block w-full px-3 py-0.5 text-left text-[var(--text-dim)] hover:bg-[#1E1E22] hover:text-[var(--accent-amber)]"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault()
                runCommand(input)
                setInput('')
              }}
              className="flex items-center gap-2 font-mono text-xs md:text-sm"
            >
              <span className="shrink-0 text-[var(--accent-amber)]">{promptLabel}</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    setHistoryIdx(-1)
                  }}
                  onKeyDown={onKeyDown}
                  className="w-full bg-transparent text-[var(--text-main)] outline-none"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  autoFocus={ready}
                  aria-label="Terminal command input"
                />
                {/* ghost autocomplete hint */}
                {suggestion && input && (
                  <span className="pointer-events-none absolute left-0 top-0 text-[var(--text-dim)] opacity-50">
                    {suggestion}
                  </span>
                )}
              </div>
              <span className="terminal-cursor shrink-0 text-[var(--accent-amber)]">▋</span>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

const AboutSection = () => {
  const age = new Date().getFullYear() - 2003
  return (
    <section id="about" className="scroll-mt-10 py-8 md:py-10">
      <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
        <span className="text-[var(--accent-amber)]">$</span> cat about.md
      </h2>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">        <div className="terminal-panel rounded-md border border-[var(--border-main)] bg-[#1A1A1C] p-4">
          {ABOUT_LINES.map((line, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={lineMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`text-sm leading-7 md:text-base ${
                line.startsWith('#')
                  ? 'text-[var(--accent-amber)] font-semibold'
                  : line === ''
                    ? 'h-3'
                    : 'text-[var(--text-main)]'
              }`}
            >
              {line || '\u00A0'}
            </motion.p>
          ))}
        </div>

        <div className="terminal-panel rounded-md border border-[var(--border-main)] bg-[#161618] p-4 text-sm">
          <p className="mb-3 text-[var(--accent-teal)]">$ neofetch</p>
          {[
            ['OS', 'Human v2.0'],
            ['Shell', 'DevOps/bash'],
            ['Editor', 'Neovim (probably)'],
            ['Uptime', `${age} years`],
            ['WM', 'tmux 3.3a'],
            ['Location', 'Pune, Maharashtra'],
          ].map(([k, v]) => (
            <p key={k} className="mb-1">
              <span className="text-[var(--accent-amber)]">{k}:</span>{' '}
              <span className="text-[var(--text-main)]">{v}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Skills ──────────────────────────────────────────────────────────────────

const SkillsSection = () => (
  <section id="skills" className="scroll-mt-10 py-8 md:py-10">
    <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
      <span className="text-[var(--accent-amber)]">$</span> grafana --panel skills --type bar
    </h2>
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.entries(SKILLS).map(([category, items], pi) => (
        <motion.article
          key={category}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: pi * 0.07 }}
          className="rounded-md border border-[var(--border-main)] bg-[#18181A] panel-scanline"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-main)] px-3 py-2">
            <span className="text-xs text-[var(--accent-teal)]">panel::{category.toLowerCase()}</span>
            <span className="text-[10px] text-[var(--text-dim)]">● live</span>
          </div>
          <div className="space-y-3 px-3 py-3">
            {items.map((m) => (
              <div key={m.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-main)]">{m.name}</span>
                  <span className="text-[var(--text-dim)]">{m.level}%</span>
                </div>
                <div className="h-[6px] w-full rounded-none bg-[#0E0E10]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full bg-[var(--accent-teal)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  </section>
)

// ─── Experience ───────────────────────────────────────────────────────────────

const ExperienceSection = () => {
  const [open, setOpen] = useState<string | null>(EXPERIENCES[0].id)

  return (
    <section id="experience" className="scroll-mt-10 py-8 md:py-10">
      <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
        <span className="text-[var(--accent-amber)]">$</span> git log --oneline --all
      </h2>
      <div className="terminal-panel rounded-md border border-[var(--border-main)] bg-[#171719] p-4">
        {EXPERIENCES.map((item, i) => (
          <div key={item.id} className={i < EXPERIENCES.length - 1 ? 'mb-4' : ''}>
            <button
              onClick={() => setOpen((p) => (p === item.id ? null : item.id))}
              className="group flex w-full items-start gap-2 text-left text-sm md:text-base"
            >
              <span className="shrink-0 text-[var(--accent-amber)]">{item.id}</span>
              <span className="flex-1">{item.role}</span>
              <span className="shrink-0 text-[var(--text-dim)]">{item.period}</span>
              <span className="shrink-0 text-[var(--text-dim)] group-hover:text-[var(--accent-amber)]">
                {open === item.id ? '▼' : '▶'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 mt-2 border-l-2 border-[var(--accent-amber)] pl-4">
                    <p className="mb-2 text-xs text-[var(--accent-teal)]">
                      $ git show {item.id}
                    </p>
                    {item.points.map((pt, j) => (
                      <motion.p
                        key={j}
                        custom={j}
                        variants={lineMotion}
                        initial="hidden"
                        animate="visible"
                        className="mb-1 text-sm text-[var(--text-main)]"
                      >
                        <span className="text-[var(--accent-teal)]">+</span> {pt}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const ProjectsSection = () => {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null)

  return (
    <section id="projects" className="scroll-mt-10 py-8 md:py-10">
      <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
        <span className="text-[var(--accent-amber)]">$</span> docker ps --format table
      </h2>
      <div className="overflow-x-auto rounded-md border border-[var(--border-main)] bg-[#161618] -mx-1">
        <table className="w-full min-w-[520px] text-left text-xs md:text-sm">
          <thead className="border-b border-[var(--border-main)] bg-[#111113]">
            <tr className="text-[var(--accent-amber)]">
              <th className="px-3 py-2">CONTAINER ID</th>
              <th className="px-3 py-2">NAME</th>
              <th className="px-3 py-2">STATUS</th>
              <th className="px-3 py-2">UPTIME</th>
              <th className="hidden px-3 py-2 md:table-cell">PORTS / STACK</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={p.title}
                onClick={() => setSelected(p)}
                className="cursor-pointer border-b border-[var(--border-main)] transition-colors last:border-0 hover:bg-[#202024]"
              >
                <td className="px-3 py-2 font-mono text-[var(--accent-amber)]">
                  {`a${(i + 7).toString(16)}9c${i}f2`}
                </td>
                <td className="px-3 py-2">{p.title}</td>
                <td className="px-3 py-2 text-[var(--status-ok)]">Up · healthy</td>
                <td className="px-3 py-2 text-[var(--text-dim)]">{12 + i}d {i + 4}h</td>
                <td className="hidden px-3 py-2 text-[var(--accent-teal)] md:table-cell">
                  {p.stack.slice(0, 3).join(' · ')}
                  {p.stack.length > 3 ? ` +${p.stack.length - 3}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-[var(--text-dim)]">
        click any row to inspect container logs
      </p>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/75 p-4 pt-16"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-md border border-[var(--border-main)] bg-[#0D0D0F] p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-[var(--accent-teal)]">
                  docker logs {selected.title.toLowerCase().replace(/\s+/g, '-')}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[var(--text-dim)] hover:text-[var(--status-error)]"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1 text-sm leading-6">
                <p className="text-[var(--text-dim)]">[INFO] container boot: OK</p>
                <p className="text-[var(--text-dim)]">[INFO] health check: PASS</p>
                <p className="text-[var(--text-main)]">[INFO] {selected.description}</p>
                <p>
                  <span className="text-[var(--text-dim)]">[STACK]</span>{' '}
                  <span className="text-[var(--accent-teal)]">{selected.stack.join(' | ')}</span>
                </p>
                <p className="text-[var(--status-ok)]">[OK] status: healthy</p>
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--border-main)] px-3 py-1 text-[var(--text-dim)] hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)]"
                  >
                    → source
                  </a>
                )}
                {selected.demo && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--border-main)] px-3 py-1 text-[var(--text-dim)] hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
                  >
                    → demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── Blog ────────────────────────────────────────────────────────────────────

const BlogSection = () => {
  const latest = blogPosts.slice(0, 4)

  return (
    <section id="blog" className="scroll-mt-10 py-8 md:py-10">
      <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
        <span className="text-[var(--accent-amber)]">$</span> ls -lh blog/
      </h2>
      <div className="rounded-md border border-[var(--border-main)] bg-[#161618]">
        {/* header row */}
        <div className="border-b border-[var(--border-main)] px-4 py-2 text-[10px] text-[var(--text-dim)]">
          total {latest.length} posts
        </div>

        {latest.map((post, i) => (
          <motion.div
            key={post.slug}
            custom={i}
            variants={lineMotion}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="group flex items-center gap-3 border-b border-[var(--border-main)] px-4 py-3 text-sm transition-colors last:border-0 hover:bg-[#1E1E22]"
            >
              <span className="shrink-0 text-[var(--text-dim)]">-rw-r--r--</span>
              <span className="shrink-0 w-5 text-center text-[var(--text-dim)]">{i + 1}</span>
              <span className="flex-1 text-[var(--text-main)] group-hover:text-[var(--accent-amber)]">
                {post.slug}.md
              </span>
              <span className="hidden shrink-0 text-[var(--accent-teal)] md:inline">
                {post.category}
              </span>
              <span className="shrink-0 text-[var(--text-dim)]">{post.date}</span>
            </Link>
          </motion.div>
        ))}

        <div className="px-4 py-2">
          <Link
            to="/blog"
            className="text-xs text-[var(--text-dim)] hover:text-[var(--accent-amber)]"
          >
            → cd blog/ &nbsp;(see all posts)
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Education ───────────────────────────────────────────────────────────────

const EducationSection = () => (
  <section id="education" className="scroll-mt-10 py-8 md:py-10">
    <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
      <span className="text-[var(--accent-amber)]">$</span> tree ~/education
    </h2>
    <div className="rounded-md border border-[var(--border-main)] bg-[#161618] p-5 text-sm leading-8 md:text-base">
      <p className="text-[var(--accent-amber)]">~/education/</p>
      {[
        ['├──', 'GCOE_Aurangabad/', 'B.Tech CSE · CGPA 7.58', 'Aug 2021 – May 2025'],
        ['├──', 'Vasant_Art_Science/', 'HSC · 83.66%', 'Jun 2019 – May 2021'],
        ['└──', 'Vivekanand_VM/', 'SSC · 88.20%', 'Jun 2017 – May 2019'],
      ].map(([tree, dir, grade, period]) => (
        <p key={dir}>
          <span className="text-[var(--text-dim)]">{tree}</span>{' '}
          <span className="text-[var(--accent-teal)]">{dir}</span>{' '}
          <span className="text-[var(--text-dim)]">[{grade}]</span>{' '}
          <span className="text-[11px] text-[var(--text-dim)]">{period}</span>
        </p>
      ))}
    </div>
  </section>
)

// ─── Contact ─────────────────────────────────────────────────────────────────

const ContactSection = () => {
  const [form, setForm] = useState(CONTACT_INIT)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/manopjnq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setForm(CONTACT_INIT)
    } catch {
      setStatus('error')
    }
  }

  const field = (
    key: keyof typeof CONTACT_INIT,
    label: string,
    type: string = 'text',
  ) => (
    <label className="mb-4 block">
      <span className="mb-1 block text-[var(--accent-amber)]">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        required
        className="w-full border-b border-[var(--border-main)] bg-transparent py-1 text-[var(--text-main)] outline-none placeholder-[var(--text-dim)] focus:border-[var(--accent-teal)]"
        placeholder="█"
      />
    </label>
  )

  return (
    <section id="contact" className="scroll-mt-10 py-8 md:py-10">
      <h2 className="mb-4 font-mono text-base text-[var(--accent-teal)]">
        <span className="text-[var(--accent-amber)]">$</span> vi message.yaml
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="rounded-md border border-[var(--border-main)] bg-[#161618] p-5 text-sm md:text-base"
        >
          <p className="mb-4 text-xs text-[var(--text-dim)]">
            # fill in fields, then run send-message
          </p>
          {field('name', 'name: |')}
          {field('email', 'email: |', 'email')}
          <label className="mb-4 block">
            <span className="mb-1 block text-[var(--accent-amber)]">message: |</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              required
              className="w-full border border-[var(--border-main)] bg-transparent px-2 py-1 text-[var(--text-main)] outline-none placeholder-[var(--text-dim)] focus:border-[var(--accent-teal)]"
              placeholder="your message here..."
            />
          </label>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="border border-[var(--accent-amber)] px-4 py-1.5 text-[var(--accent-amber)] transition-colors hover:bg-[var(--accent-amber)] hover:text-[#1C1C1E] disabled:opacity-40"
          >
            {status === 'loading'
              ? '$ send-message --pending...'
              : '$ send-message --to pratik'}
          </button>

          {status === 'success' && (
            <p className="mt-3 text-[var(--status-ok)]">[OK] message delivered successfully</p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-[var(--status-error)]">[ERR] delivery failed. try again.</p>
          )}
        </form>

        <div className="space-y-4 rounded-md border border-[var(--border-main)] bg-[#161618] p-5 text-sm">
          <p className="text-xs text-[var(--text-dim)]">$ cat /etc/contact</p>
          {(
            [
              ['email',     'pratikswayal123@gmail.com',      'mailto:pratikswayal123@gmail.com'],
              ['github',    'github.com/pratikwayal01',        'https://github.com/pratikwayal01'],
              ['linkedin',  'linkedin.com/in/pratikwayal',     'https://linkedin.com/in/pratikwayal'],
              ['x/twitter', 'x.com/pratik_2520',              'https://x.com/pratik_2520'],
              ['location',  'Pune, Maharashtra, India',        null],
            ] as [string, string, string | null][]
          ).map(([k, v, href]) => (
            <p key={k}>
              <span className="text-[var(--accent-amber)]">{k}:</span>{' '}
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[var(--accent-teal)] underline-offset-2 hover:underline"
                >
                  {v}
                </a>
              ) : (
                <span className="text-[var(--accent-teal)]">{v}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioV2
