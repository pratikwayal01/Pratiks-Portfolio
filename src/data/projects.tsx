// projects.ts - Store your projects data with TypeScript types
export interface Project {
  title: string;
  description: string;
  image?: string; // URL/path to the project image
  stack: string[];
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    title: 'Pico — Distributed URL Shortener',
    description: 'A production-shaped URL shortener built on a 100% free hosting stack. Cache-aside Redis, async click recording via a message queue, ordered ID generation, real-time analytics (clicks, devices, countries, referrers), QR generation, key-based API auth, and a pip-installable CLI (picoctl).',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'RabbitMQ', 'Vercel', 'Render'],
    github: 'https://github.com/pratikwayal01/pico',
    demo: 'https://picolink.vercel.app/'
  },
  {
    title: 'ResumePilot — JD-Tailored Resumes',
    description: 'Paste a job description and Gemini AI extracts requirements, scores your project pool by relevance, picks the best-fit projects, rewrites bullet points to match the JD, and compiles a ready-to-send PDF via pdflatex. Web UI to manage your project pool and skills; modular AI provider interface.',
    stack: ['Node.js', 'Express', 'Gemini AI', 'LaTeX'],
    github: 'https://github.com/pratikwayal01/resumepilot',
    demo: ''
  },
  {
    title: '9XM TV — Morning Nostalgia',
    description: 'Retro CRT-TV music player streaming the classic 2000s Bollywood playlist that aired on 9XM every school morning. SONY TRINITRON frame, scanlines, theater letterbox FX, live clock with a time-based school-period schedule, Bade & Chote jokes, and a bottom glass music player.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'YouTube IFrame API'],
    github: 'https://github.com/pratikwayal01/9xm-tv',
    demo: 'https://9xm-morning-nostalgia.vercel.app/'
  },
  {
    title: 'motionmind — Script to Animated Video',
    description: 'Write a structured script, get a 1080×1920 narrated explainer MP4 — fully client-side: DOM preview plus canvas renderer, MediaRecorder capture and ffmpeg.wasm export in the browser. No video editing, no backend rendering.',
    stack: ['TypeScript', 'Canvas 2D', 'ffmpeg.wasm', 'MediaRecorder'],
    github: 'https://github.com/pratikwayal01/motionmind',
    demo: ''
  },
  {
    title: 'Bore Interactive Inputs — CI/CD Runtime Inputs',
    description: 'GitHub Marketplace Action that enables dynamic runtime user inputs inside CI/CD pipelines via self-hosted bore tunnels. Supports 8 field types with input validation, Slack and Discord notifications, and zero infrastructure overhead.',
    stack: ['Python', 'Flask', 'GitHub Actions'],
    github: 'https://github.com/pratikwayal01/bore-interactive-inputs',
    demo: ''
  }
]