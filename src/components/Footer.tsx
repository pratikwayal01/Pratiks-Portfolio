import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 dark:text-gray-400 mb-4 italic"
        >
          "Engineering isn't just about code, it's about impact."
        </motion.p>
        
        <p className="text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Pratik Wayal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer 