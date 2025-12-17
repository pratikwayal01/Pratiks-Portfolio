import { motion } from 'framer-motion' 
import {
  FaDocker,
  FaAws,
  FaLinux,
  FaGit,
} from 'react-icons/fa'
import {
  SiKubernetes,
  SiCplusplus,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTerraform,
  SiJenkins,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNginx,
  SiGithubactions,
  SiGo
} from 'react-icons/si'

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'C++', icon: <SiCplusplus /> },
      { name: 'Go', icon: <SiGo/> }
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'ECS', icon: <FaAws /> },             // ECS & EKS are AWS services
      { name: 'EKS', icon: <SiKubernetes /> },      // Strong with EKS; using K8s icon is fine
      { name: 'Linux', icon: <FaLinux /> },
      { name: 'CI/CD', icon: <SiGithubactions /> },
      { name: 'Terraform', icon: <SiTerraform /> },
      { name: 'Jenkins', icon: <SiJenkins /> },
      // Add a placeholder icon or emoji for tools you don't have in react-icons
      { name: 'ArgoCD', icon: <span>🎯</span> },
      { name: 'OpenTelemetry', icon: <span>🛰️</span> },
      { name: 'Grafana', icon: <span>📊</span> },
      { name: 'Prometheus', icon: <span>🌡️</span> }
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Redis', icon: <SiRedis /> },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: <FaGit /> },
      { name: 'NGINX', icon: <SiNginx /> },
      { name: 'Jenkins', icon: <SiJenkins /> },
      { name: 'Terraform', icon: <SiTerraform /> },
    ],
  },
]

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">
          About Me
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Get to know more about my journey and expertise
        </p>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I'm a passionate developer with a unique blend of expertise in DevOps, robotics, and full-stack development.
            just completed my internship at Zoho, I specialize in building robust infrastructure solutions and managing high-availability
            PostgreSQL systems. My experience extends to leading development teams and mentoring junior developers.
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Beyond my professional work, I'm deeply involved in robotics, having participated in Robocon 2024 and
            built autonomous systems. I love solving real-world problems with code and am always eager to take on
            new challenges that push the boundaries of what's possible.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Skills</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold mb-4 dark:text-white">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
  {skillGroup.items.map(({ name, icon }) => (
    <span
      key={name}
      className="group flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
    >
      <span className="text-base transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {icon}
      </span>
      {name}
    </span>
  ))}
</div>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About
