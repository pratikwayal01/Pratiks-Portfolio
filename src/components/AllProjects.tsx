import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ProjectCard } from './Projects' // Import the ProjectCard component from Projects.tsx

// All projects page
const AllProjects: React.FC = () => {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          All Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Explore all my projects and works
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default AllProjects