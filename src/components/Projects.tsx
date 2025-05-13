import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { projects, Project } from '../data/projects' // Import from the TypeScript data file

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Reusable ProjectCard component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <motion.div
    key={project.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
  >
    {/* Project Image */}
    {project.image && (
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={`${project.title} project screenshot`}
          className="w-full h-full object-cover" 
        />
        {/* Optional overlay with gradient for better text visibility on light images */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
    )}
    
    <div className="p-6">
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
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={`View ${project.title} code on GitHub`}
          >
            <CodeBracketIcon className="h-5 w-5 mr-1" />
            Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label={`View ${project.title} live demo`}
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-1" />
            Demo
          </a>
        )}
      </div>
    </div>
  </motion.div>
)

// For the home page - only show the two most recent projects
const Projects: React.FC = () => {
  // Get only the first two projects (most recent)
  const featuredProjects = projects.slice(0, 2);
  
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Featured projects and personal works
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        {/* "See All Works" Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            See All Works
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

// Full projects page component - displays all projects in a grid
const ProjectsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 dark:text-white">Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Explore my portfolio of projects across various technologies
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects
export { ProjectCard, ProjectsPage }