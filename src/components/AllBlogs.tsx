import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog-posts'
import { BlogCard } from '../components/BlogCard'

// All blogs page
const AllBlogs: React.FC = () => {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
          All Articles
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
          Explore all my thoughts and insights on technology and development
        </p>
        
        {/* Search and filter would go here in a more complex implementation */}
        
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