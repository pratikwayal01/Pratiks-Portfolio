// Terminal content for curl-friendly responses (mirrors ssh-portfolio/main.go).
// Keep in sync with ssh-portfolio when adding/changing content.

const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const GRAY = '\x1b[90m'
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
${YELLOW}ABOUT${RESET}
  Hi, I'm Pratik Wayal — DevOps engineer from Pune, India.
  I build infrastructure, automation and robots.

  Skills: Linux, AWS, Kubernetes, Docker, CI/CD, Python,
          ROS, OpenCV, Networking, GitOps (ArgoCD)
  Interests: autonomous systems, breaking things in staging
`

const skills = `
${YELLOW}SKILLS${RESET}
  DevOps/Cloud: AWS (EKS, ECS, Lambda, CloudFront), Kubernetes, Docker,
                 Terraform, GitHub Actions, ArgoCD, Helm, Nginx, Linux
  Languages:     Python, C++, Bash, JavaScript/TypeScript, Go
  Robotics:      ROS, OpenCV, SLAM, path planning
  Monitoring:    Prometheus, Grafana, OpenTelemetry
`

const projects = `
${YELLOW}PROJECTS${RESET}
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
${YELLOW}CONTACT${RESET}
  email:    pratikwayal01@gmail.com
  github:   github.com/pratikwayal01
  linkedin: linkedin.com/in/pratikwayal
  twitter:  x.com/pratik_2520
  site:     devpratik.vercel.app
`

const help = `
${YELLOW}AVAILABLE ROUTES${RESET}
  ${BOLD}/${RESET}           banner + this help
  ${BOLD}/about${RESET}      about me
  ${BOLD}/skills${RESET}     skill set
  ${BOLD}/projects${RESET}   project list
  ${BOLD}/contact${RESET}    contact info
  ${BOLD}/resume${RESET}     resume link
  ${BOLD}/hire${RESET}       easter egg

${GRAY}try: curl devpratik.vercel.app/projects${RESET}
`

const hire = `
${YELLOW}HIRE ME${RESET}
  Yes, I'm available.
  Email: pratikwayal01@gmail.com
  Link:  linkedin.com/in/pratikwayal
`

const notFound = `
${YELLOW}404${RESET}
  No such route.${GRAY}try: curl devpratik.vercel.app/help${RESET}
`

const routes: Record<string, string> = {
  '/': banner + help,
  '/about': banner + about,
  '/skills': banner + skills,
  '/projects': banner + projects,
  '/contact': banner + contact,
  '/help': banner + help,
  '/resume': banner + `${YELLOW}RESUME${RESET}\n  https://drive.google.com/file/d/1FympfGyzprgnOhcsv5kXNQkfWYSjYP4d/view\n`,
  '/hire': banner + hire,
}

export function terminalResponse(pathname: string): string {
  return routes[pathname] ?? banner + notFound
}

const TERMINAL_UA = /curl|wget|httpie|python-requests|powershell|aria2|python\/|node-fetch/i

export function isTerminalRequest(userAgent: string): boolean {
  return TERMINAL_UA.test(userAgent)
}
