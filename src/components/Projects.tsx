import { motion } from 'framer-motion'
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const projects = [
  {
    title: 'Autonomous Robot for Robocon',
    description: 'Led the development of an autonomous robot for DD Robocon 2024, implementing computer vision and path planning algorithms.',
    stack: ['C++', 'OpenCV', 'ROS', 'Python'],
    github: 'https://github.com/pratikwayal01/robocon-2024',
    demo: 'https://youtube.com/watch?v=example'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark mode and smooth animations.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/pratikwayal01/portfolio',
    demo: 'https://pratikwayal.com'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Featured projects and personal works
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <CodeBracketIcon className="h-5 w-5 mr-1" />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-1" />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects 