// Terminal content for curl-friendly responses (mirrors ssh-portfolio/main.go).
// Keep in sync with ssh-portfolio when adding/changing content.

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const GRAY = '\x1b[90m'
const CYAN = '\x1b[36m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

const banner = GREEN + `
      ██████╗ ██████╗  █████╗ ████████╗██╗██╗  ██╗
      ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██║ ██╔╝
      ██████╔╝██████╔╝███████║   ██║   ██║█████╔╝
      ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██║██╔═██╗
      ██║     ██║  ██║██║  ██║   ██║   ██║██║  ██╗
      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝
` + RESET + `       pratik wayal — devops engineer
`

const about = `
${YELLOW}${BOLD}ABOUT${RESET}
  Hi, I'm Pratik Wayal — DevOps engineer from Pune, India.
  I build infrastructure, automation and robots.

  Interests: autonomous systems, breaking things in staging
`

const skills = `
${YELLOW}${BOLD}SKILLS${RESET}
  Python   ${GREEN}████████████████████░░░${RESET}  88%
  C++      ${GREEN}████████████████░░░░░░░${RESET}  79%
  Go       ${GREEN}███████████████░░░░░░░░${RESET}  74%

  Docker         ${GREEN}████████████████████████░░${RESET}  92%
  AWS            ${GREEN}█████████████████████░░░░${RESET}  86%
  Kubernetes     ${GREEN}█████████████████░░░░░░░░${RESET}  84%
  Terraform      ${GREEN}████████████████░░░░░░░░░${RESET}  78%
  ArgoCD         ${GREEN}███████████████░░░░░░░░░░${RESET}  76%
  OpenTelemetry  ${GREEN}██████████████░░░░░░░░░░░${RESET}  73%

  ROS/OpenCV  ${CYAN}██████████████████████░░${RESET}  90%
  Linux       ${CYAN}█████████████████████░░░${RESET}  87%
  Networking  ${CYAN}██████████████████░░░░░░${RESET}  82%
`

const projects = `
${YELLOW}${BOLD}PROJECTS${RESET}
  1. Autonomous Robot for Robocon 2024
     ROS + OpenCV + Python — vision & path planning for DD Robocon
     ${GRAY}github.com/pratikwayal01/robocon-2024${RESET}

  2. Image Forgery Detection (CNN)
     Flask + Docker + GH Actions + AWS EC2 + NGINX
     ${GRAY}github.com/pratikwayal01/Image-Forgery-Detection-CNN-Updated${RESET}

  3. ParkCircle — Smart Parking Detection
     TensorFlow + OpenCV, real-time occupancy from video
     ${GRAY}github.com/pratikwayal01/ParkCircle${RESET}

  4. This Portfolio (terminal v2)
     React + TypeScript + Tailwind + Framer Motion
     ${GRAY}github.com/pratikwayal01/Pratiks-Portfolio${RESET}

  5. Plant Health Monitoring
     Flask + IoT sensors + weather APIs + Chart.js
     ${GRAY}github.com/pratikwayal01/plant_health_monitoring_system${RESET}
`

const contact = `
${YELLOW}${BOLD}CONTACT${RESET}
  email:    pratikwayal01@gmail.com
  github:   github.com/pratikwayal01
  linkedin: linkedin.com/in/pratikwayal
  twitter:  x.com/pratik_2520
  site:     devpratik.vercel.app
`

const status = `
${YELLOW}${BOLD}SYSTEM STATUS${RESET}
  status:   ${GREEN}● online${RESET}
  role:     devops engineer
  location: pune, india
  coffee:   required
`

const footer = `
${GRAY}────────────────────────────────────────────────────${RESET}
${GRAY}tip: curl devpratik.vercel.app/projects  (per-section views)${RESET}
${GRAY}     curl devpratik.vercel.app/hire      (psst, try it)${RESET}
`

const help = `
${YELLOW}${BOLD}AVAILABLE ROUTES${RESET}
  ${BOLD}/${RESET}           full profile (default)
  ${BOLD}/about${RESET}      about me
  ${BOLD}/skills${RESET}     skill set
  ${BOLD}/projects${RESET}   project list
  ${BOLD}/contact${RESET}    contact info
  ${BOLD}/resume${RESET}     resume link
  ${BOLD}/hire${RESET}       easter egg

${GRAY}everything is one curl away: curl devpratik.vercel.app${RESET}
`

const hire = `
${YELLOW}${BOLD}HIRE ME${RESET}
  Yes, I'm available. Availability starts immediately.

  email:    pratikwayal01@gmail.com
  linkedin: linkedin.com/in/pratikwayal
`

const notFound = `
${YELLOW}${BOLD}404${RESET}
  No such route. Try: ${GRAY}curl devpratik.vercel.app/help${RESET}
`

const routes: Record<string, string> = {
  '/': banner + status + about + skills + projects + contact + footer,
  '/about': banner + about + footer,
  '/skills': banner + skills + footer,
  '/projects': banner + projects + footer,
  '/contact': banner + contact + footer,
  '/help': banner + help,
  '/resume': banner + `${YELLOW}${BOLD}RESUME${RESET}\n  https://drive.google.com/file/d/1FympfGyzprgnOhcsv5kXNQkfWYSjYP4d/view\n`,
  '/hire': banner + hire + footer,
}

export function terminalResponse(pathname: string): string {
  return routes[pathname] ?? banner + notFound
}

const TERMINAL_UA = /curl|wget|httpie|python-requests|powershell|aria2|python\/|node-fetch/i

export function isTerminalRequest(userAgent: string): boolean {
  return TERMINAL_UA.test(userAgent)
}