
export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
  coverImage: string
  content: string   // path to markdown file in /public/Posts/
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Robocon Journey 2024',
    slug: 'robocon-journey-2024',
    excerpt: 'How we built an AI-powered autonomous agricultural robot that secured AIR 5 at DD Robocon 2024.',
    date: 'May 2, 2025',
    category: 'Robotics',
    coverImage: '/images/blog/Robocon-2024.jpeg',
    content: '/Posts/robocon-journey.md',
    tags: ['Robotics', 'Robocon', 'ROS', 'OpenCV', 'C++'],
  },
  {
    id: 2,
    title: 'Getting Started with React and Tailwind CSS',
    slug: 'react-tailwind-getting-started',
    excerpt: 'Learn how to set up a new React project with Tailwind CSS for beautiful, responsive interfaces.',
    date: 'May 2, 2025',
    category: 'Web Development',
    coverImage: '/images/blog/Twlwind.jpg',
    content: '/Posts/react-tailwind-getting-started.md',
    tags: ['React', 'Tailwind CSS', 'Frontend'],
  },
  {
    id: 3,
    title: 'Introduction to Kubernetes',
    slug: 'intro-to-kubernetes',
    excerpt: 'Exploring how Kubernetes manages containerised applications at scale — core concepts and getting started.',
    date: 'April 18, 2025',
    category: 'DevOps',
    coverImage: '/images/blog/k8s.png',
    content: '/Posts/intro-to-kubernetes.md',
    tags: ['Kubernetes', 'DevOps', 'Containers'],
  },
  {
    id: 4,
    title: 'Containerising Applications with Docker',
    slug: 'containerizing-with-docker',
    excerpt: 'A step-by-step guide to containerising your applications using Docker — from Dockerfile to multi-stage builds.',
    date: 'April 5, 2025',
    category: 'DevOps',
    coverImage: '/images/blog/docker.jpeg',
    content: '/Posts/containerizing-with-docker.md',
    tags: ['Docker', 'DevOps', 'Containers'],
  },
  {
    id: 5,
    title: 'Understanding CI/CD Pipelines with GitHub Actions',
    slug: 'understanding-ci-cd-github-actions',
    excerpt: 'How to set up continuous integration and deployment using GitHub Actions with real-world examples.',
    date: 'March 22, 2025',
    category: 'DevOps',
    coverImage: '/images/blog/github-actions.png',
    content: '/Posts/ci-cd-pipeline.md',
    tags: ['GitHub Actions', 'CI/CD', 'DevOps'],
  },
  {
    id: 6,
    title: 'Setting Up a High-Availability PostgreSQL Cluster',
    slug: 'ha-postgresql-cluster',
    excerpt: 'How I built a production-grade HA PostgreSQL cluster with Patroni, ZFS, and NVMe-oF during my Zoho internship.',
    date: 'March 10, 2025',
    category: 'DevOps',
    coverImage: '/images/blog/k8s.png',
    content: '/Posts/ha-postgresql-cluster.md',
    tags: ['PostgreSQL', 'High Availability', 'Linux', 'Databases'],
  },
]
