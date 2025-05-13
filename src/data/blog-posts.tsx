
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React and Tailwind CSS",
    slug: "react-tailwind-getting-started",
    excerpt: "Learn how to set up a new React project with Tailwind CSS for beautiful, responsive interfaces.",
    date: "May 2, 2025",
    category: "Web Development",
    coverImage: "/images/blog/Twlwind.jpg",
    content: "/posts/best-devops-practices.md",
    tags: ["React", "Tailwind CSS", "Frontend"]
  },
  {
    id: 2,
    title: "Computer Vision in Robotics: My Experience with Robocon",
    slug: "computer-vision-robotics",
    excerpt: "Exploring how computer vision technologies are revolutionizing robotics competitions.",
    date: "April 18, 2025",
    category: "Robotics",
    coverImage: "/images/blog/Robocon.png",
    content: "/posts/intro-to-kubernetes.md",
    tags: ["Computer Vision", "Robotics", "OpenCV"]
  },
  {
    id: 3,
    title: "Containerizing Applications with Docker",
    slug: "containerizing-with-docker",
    excerpt: "A step-by-step guide to containerizing your applications using Docker for consistent deployment.",
    date: "April 5, 2025",
    category: "DevOps",
    coverImage: "/images/blog/docker.jpeg",
    content: "/posts/ha-postgresql-cluster.md",
    tags: ["Docker", "DevOps", "Containers"]
  },
  {
    id: 4,
    title: "Understanding CI/CD Pipelines with GitHub Actions",
    slug: "understanding-ci-cd-github-actions",
    excerpt: "How to set up continuous integration and deployment using GitHub Actions.",
    date: "March 22, 2025",
    category: "DevOps",
    coverImage: "/images/blog/github-actions.png",
    content: "/posts/ha-postgresql-cluster.md",
    tags: ["GitHub Actions", "CI/CD", "DevOps"]
  }
]