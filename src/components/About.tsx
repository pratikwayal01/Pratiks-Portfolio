import { motion } from 'framer-motion'

const skills = [
  { category: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'] },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { category: 'Tools', items: ['Git', 'NGINX', 'Jenkins', 'Terraform'] },
]

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-8 dark:text-white">About Me</h2>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I'm a passionate developer with a unique blend of expertise in DevOps, robotics, and full-stack development.
            Currently working at Zoho, I specialize in building robust infrastructure solutions and managing high-availability
            PostgreSQL systems. My experience extends to leading development teams and mentoring junior developers.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Beyond my professional work, I'm deeply involved in robotics, having participated in Robocon 2024 and
            built autonomous systems. I love solving real-world problems with code and am always eager to take on
            new challenges that push the boundaries of what's possible.
          </p>
        </div>

        <h3 className="text-2xl font-bold font-mono mt-12 mb-6 dark:text-white">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
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