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
    description: 'Led the development of an autonomous robot for DD Robocon 2024, implementing computer vision and path planning algorithms.',
    image: "/images/projects/robocon.jpeg",
    stack: ['C++', 'OpenCV', 'ROS', 'Python'],
    github: 'https://github.com/pratikwayal01/robocon-2024',
    demo: 'https://youtu.be/CjVqsJmcWDU'
  },
  {
    title: 'Image Forgery Detection – CNN Deployment',
    description: 'Led the deployment of a CNN-based Flask application for detecting image forgeries. Containerized the application using Docker, ensuring environment consistency. Implemented CI/CD pipelines with GitHub Actions to automate image building and deployment to Docker Hub upon each push. Deployed the Docker container on AWS EC2 and configured NGINX as a reverse proxy for efficient request handling.',
    image: "/images/projects/imageCNN.jpeg",
    stack: ['Python', 'Flask', 'Docker', 'GitHub Actions', 'AWS EC2', 'NGINX'],
    github: 'https://github.com/pratikwayal01/Image-Forgery-Detection-CNN-Updated',
    demo:'https://forge-detect.me/'
  },  
  {
    title: 'ParkCircle – Smart Parking Space Detection',
    description: 'Developed a computer vision system to detect and monitor parking space occupancy in real-time using video input. Implemented TensorFlow and OpenCV for image recognition and data processing.',
    image: "/images/projects/ParkCircle.jpeg",
    stack: ['Python', 'TensorFlow', 'OpenCV'],
    github: 'https://github.com/pratikwayal01/ParkCircle',
    demo: 'https://youtu.be/wh7HcrvCH6A?si=Filig7wNnJtQdAf5'
  },  
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark mode and smooth animations.',
    image: "/images/projects/Portfolio.png",
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/pratikwayal01/Pratiks-Portfolio',
    demo: 'https://devpratik.vercel.app/'
  },
  {
    title: 'Plant Health Monitoring System',
    description: 'Developed a Flask-based web application to monitor plant health by analyzing IoT sensor data and weather information. Features include CSV data upload, analysis of soil nutrients (N-P-K), temperature, humidity, pH, and rainfall, comparison with ideal values for specific crops and growth stages, health status reports, and data visualization using Chart.js. Integrated OpenWeather API for weather alerts.',
    image: "/images/projects/Plant-health.jpeg",
    stack: ['Python', 'Flask', 'Pandas', 'Chart.js', 'OpenWeather API'],
    github: 'https://github.com/pratikwayal01/plant_health_monitoring_system',
    demo: 'https://plant-health-monitoring-system-e9up.onrender.com'
  }
]