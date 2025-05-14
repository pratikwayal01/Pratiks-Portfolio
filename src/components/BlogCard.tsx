import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlogPost } from '../data/blog-posts'

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
      {post.coverImage ? (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover transition duration-300 ease-in-out filter grayscale group-hover:grayscale-0"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
      <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
        {post.category}
      </div>
    </div>
    
    <div className="p-6">
      <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">{post.date}</p>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Read More
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </motion.div>
)
