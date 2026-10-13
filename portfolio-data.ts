// Single source of truth for machine-queryable portfolio data.
// Mirrors terminal-content.ts + ssh-portfolio/main.go + src/data/projects.tsx.
// Keep in sync when adding/changing projects.
export interface PortfolioProject {
  name: string
  tagline: string
  stack: string[]
  github: string
  demo: string
  description: string
}

export const portfolio = {
  name: 'Pratik Wayal',
  role: 'DevOps engineer',
  location: 'Bangalore, India',
  site: 'https://devpratik.vercel.app',
  about:
    "Hi, I'm Pratik Wayal — DevOps engineer from Bangalore, India. I build infrastructure, automation and robots. Interests: autonomous systems, breaking things in staging.",
  contact: {
    email: 'pratikwayal01@gmail.com',
    github: 'https://github.com/pratikwayal01',
    linkedin: 'https://linkedin.com/in/pratikwayal',
    twitter: 'https://x.com/pratik_2520',
    site: 'https://devpratik.vercel.app',
  },
  skills: {
    languages: ['Python', 'C++', 'Go', 'TypeScript', 'Bash'],
    devops: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'ArgoCD', 'Helm', 'GitHub Actions', 'Linux', 'Nginx'],
    observability: ['Prometheus', 'Grafana', 'OpenTelemetry'],
    robotics: ['ROS', 'OpenCV', 'SLAM'],
  },
  projects: [
    {
      name: 'DataCloak',
      tagline: 'Local-first sensitive-data protection for AI prompts',
      stack: ['TypeScript', 'npm', 'esbuild', 'Browser Extension'],
      github: 'https://github.com/pratikwayal01/datacloak',
      demo: 'https://pratikwayal01.github.io/datacloak/',
      description:
        'Swaps secrets and PII for realistic synthetic fakes before they reach the model, then restores originals in the response. Detects API keys (OpenAI/Anthropic/AWS/GitHub/Stripe), JWT/PEM, env KEY=value, DSNs, cloud IDs, email/phone/IPv4 plus opt-in NER. One binary covering 11 coding-agent harnesses, browser extension for claude.ai/ChatGPT/Gemini, 82 tests with corpus recall gate.',
    },
    {
      name: 'Pico',
      tagline: 'Distributed URL Shortener',
      stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'RabbitMQ', 'Vercel', 'Render'],
      github: 'https://github.com/pratikwayal01/pico',
      demo: 'https://picolink.vercel.app/',
      description:
        'Production-shaped URL shortener on a 100% free hosting stack. Cache-aside Redis, async click recording via message queue, ordered ID generation, real-time analytics, QR generation, key-based API auth, pip-installable CLI (picoctl).',
    },
    {
      name: 'ResumePilot',
      tagline: 'JD-Tailored Resumes',
      stack: ['Node.js', 'Express', 'Gemini AI', 'LaTeX'],
      github: 'https://github.com/pratikwayal01/resumepilot',
      demo: '',
      description:
        'Paste a job description, Gemini extracts requirements, scores your project pool, rewrites bullets to match the JD, compiles a ready-to-send PDF via pdflatex.',
    },
    {
      name: '9XM TV',
      tagline: 'Morning Nostalgia',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'YouTube IFrame API'],
      github: 'https://github.com/pratikwayal01/9xm-tv',
      demo: 'https://9xm-morning-nostalgia.vercel.app/',
      description:
        'Retro CRT-TV music player streaming the classic 2000s Bollywood playlist. SONY TRINITRON frame, scanlines, live clock with school-period schedule, Bade & Chote jokes.',
    },
    {
      name: 'motionmind',
      tagline: 'Script to Animated Video',
      stack: ['TypeScript', 'Canvas 2D', 'ffmpeg.wasm', 'MediaRecorder'],
      github: 'https://github.com/pratikwayal01/motionmind',
      demo: '',
      description:
        'Write a structured script, get a 1080x1920 narrated explainer MP4 — fully client-side: DOM preview plus canvas renderer, MediaRecorder capture and ffmpeg.wasm export.',
    },
    {
      name: 'Bore Interactive Inputs',
      tagline: 'CI/CD Runtime Inputs',
      stack: ['Python', 'Flask', 'GitHub Actions'],
      github: 'https://github.com/pratikwayal01/bore-interactive-inputs',
      demo: '',
      description:
        'GitHub Marketplace Action enabling dynamic runtime user inputs inside CI/CD pipelines via self-hosted bore tunnels. 8 field types, Slack/Discord notifications.',
    },
  ] as PortfolioProject[],
}
