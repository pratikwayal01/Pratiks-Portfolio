import { motion } from 'framer-motion'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold font-mono mb-4 dark:text-white">
            Pratik Wayal
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
            DevOps Enthusiast | Robotics Programmer | Problem Solver
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Engineering isn't just about code, it's about impact.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            <a href="https://drive.google.com/file/d/1FympfGyzprgnOhcsv5kXNQkfWYSjYP4d/view?usp=sharing" target="_blank" rel="noopener noreferrer">Download Resume</a>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 