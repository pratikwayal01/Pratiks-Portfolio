import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { blogPosts } from '../data/blog-posts'
import { BlogCard } from '../components/BlogCard'

const AllBlogs: React.FC = () => {
  const location = useLocation()
  const isV1 = location.pathname.startsWith('/v1')

  return (
    <section className={`py-20 ${isV1 ? '' : 'min-h-screen bg-[var(--bg-main,#1e1e2e)] text-[var(--text-main,#cdd6f4)]'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h1 className={`text-4xl font-bold text-center mb-4 ${isV1 ? 'dark:text-white' : 'text-[var(--text-main)]'}`}>
          All Articles
        </h1>
        <p className={`text-center mb-12 ${isV1 ? 'text-gray-600 dark:text-gray-400' : 'text-[var(--text-dim)]'}`}>
          Thoughts and insights on DevOps, Robotics, and Software Engineering
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default AllBlogs
