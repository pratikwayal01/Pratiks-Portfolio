import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const projects = [
  {
    title: 'Image Forgery Detection',
    description: 'A robust system for detecting manipulated images using advanced computer vision techniques.',
    stack: ['Docker', 'AWS', 'NGINX', 'CI/CD'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Phishing Link Detection',
    description: 'Machine learning-powered Chrome extension for real-time phishing link detection.',
    stack: ['ML', 'Python', 'Chrome Extension'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Smart Parking System',
    description: 'IoT-based parking management system with real-time availability tracking.',
    stack: ['IoT', 'Python', 'Raspberry Pi'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Certificate Authenticator',
    description: 'Blockchain-based system for verifying and authenticating digital certificates.',
    stack: ['Blockchain', 'Smart Contracts', 'Web3'],
    github: '#',
    demo: '#',
  },
]

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-12 dark:text-white">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <CodeBracketIcon className="h-5 w-5 mr-1" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-1" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects 