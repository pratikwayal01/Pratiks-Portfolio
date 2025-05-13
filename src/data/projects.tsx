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
    title: 'Autonomous Robot for Robocon',
    description: 'Led the development of an autonomous robot for DD Robocon 2024, integrating computer vision and path planning using ROS, OpenCV, and Python to navigate dynamic arenas with precision.',
    image: "/images/projects/robocon.jpeg",
    stack: ['C++', 'OpenCV', 'ROS', 'Python'],
    github: 'https://github.com/pratikwayal01/robocon-2024',
    demo: 'https://youtu.be/CjVqsJmcWDU'
  },
  {
    title: 'Image Forgery Detection – CNN Deployment',
    description: 'Built and deployed a CNN-powered Flask app to detect image forgeries. Containerized with Docker, integrated CI/CD via GitHub Actions, and deployed on AWS EC2 with NGINX as a reverse proxy.',
    image: "/images/projects/ImageCNN.jpeg",
    stack: ['Python', 'Flask', 'Docker', 'GitHub Actions', 'AWS EC2', 'NGINX'],
    github: 'https://github.com/pratikwayal01/Image-Forgery-Detection-CNN-Updated',
    demo:'https://forge-detect.me/'
  },  
  {
    title: 'ParkCircle – Smart Parking Space Detection',
    description: 'Created a real-time parking occupancy detection system using video streams. Leveraged TensorFlow and OpenCV to detect and visualize parking space availability dynamically.',
    image: "/images/projects/ParkCircle.jpeg",
    stack: ['Python', 'TensorFlow', 'OpenCV'],
    github: 'https://github.com/pratikwayal01/ParkCircle',
    demo: 'https://youtu.be/wh7HcrvCH6A?si=Filig7wNnJtQdAf5'
  },  
  {
    title: 'Portfolio Website',
    description: 'Designed and developed a sleek, responsive portfolio site with React and Tailwind CSS. Includes dark mode, smooth scroll animations, and mobile optimization.',
    image: "/images/projects/Portfolio.png",
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/pratikwayal01/Pratiks-Portfolio',
    demo: 'https://devpratik.vercel.app/'
  },
  {
    title: 'Plant Health Monitoring System',
    description: 'Engineered a Flask web app to assess plant health using IoT sensor data and weather APIs. Analyzed soil nutrients and environmental data, and visualized results using Chart.js for actionable insights.',
    image: "/images/projects/Plant-health.jpeg",
    stack: ['Python', 'Flask', 'Pandas', 'Chart.js', 'OpenWeather API'],
    github: 'https://github.com/pratikwayal01/plant_health_monitoring_system',
    demo: 'https://plant-health-monitoring-system-e9up.onrender.com'
  }
]