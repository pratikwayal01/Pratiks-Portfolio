import { motion } from 'framer-motion'
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline'

const educationData = [
  {
    institution: 'Government College of Engineering, Aurangabad',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    score: 'CGPA: 7.18',
    location: 'Aurangabad, Maharashtra',
    period: 'Aug. 2021 – May 2025'
  },
  {
    institution: 'Vasant Art & Science High Secondary Ashram School',
    degree: 'HSC',
    score: 'Percentage: 83.66%',
    location: 'Lonar, Maharashtra',
    period: 'June 2019 – May 2021'
  },
  {
    institution: 'Vivekanand Vidya Mandir',
    degree: 'SSC',
    score: 'Percentage: 88.20%',
    location: 'Vivekanand Nagar, Maharashtra',
    period: 'June 2017 – May 2019'
  }
]

const Education = () => {
  return (
    <section id="education" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-4 dark:text-white">
          Education
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          My academic background and qualifications
        </p>
        
        <div className="space-y-8">
          {educationData.map((edu, index) => (
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
                  <h3 className="text-xl font-bold dark:text-white">{edu.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{edu.degree}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">{edu.score}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Education 