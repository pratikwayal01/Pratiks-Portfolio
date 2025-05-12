import { motion } from 'framer-motion'
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'

const experiences = [
  {
    title: 'Project Trainee',
    company: 'Zoho Business Survives LLP',
    location: 'Nagpur, Maharashtra',
    period: 'January 2025 – May 2025',
    points: [
      'Worked extensively with Linux-based storage and database systems, focusing on high availability, performance benchmarking, and deep PostgreSQL internals.',
      'Gained hands-on experience with cloud infrastructure, server storage management, and Linux-based file systems (NFS, iSCSI, Lustre).',
      'Deployed high-availability PostgreSQL clusters with Pacemaker, ZFS, and NVMe-over-Fabrics (TCP).'
    ]
  },
  {
    title: 'Programming Lead',
    company: 'Team Cybrotics, GEC Aurangabad',
    location: 'Aurangabad, Maharashtra',
    period: 'April 2022 – July 2024',
    points: [
      'Led development of an autonomous robot for DD Robocon 2024; drove full-stack robotics integration and automation.',
      'Mentored juniors in robotics and software development, elevating team performance at Technoxian World Robotics Championship.'
    ]
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-12 dark:text-white">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{exp.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                {exp.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Experience 