import React from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

const blogPosts = [
  {
    title: 'Building High-Availability PostgreSQL Clusters',
    excerpt: 'A deep dive into setting up and maintaining HA PostgreSQL clusters in production environments.',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'DevOps',
    slug: 'ha-postgresql-clusters'
  },
  {
    title: 'Robotics in Modern Industry',
    excerpt: 'Exploring the role of robotics in modern manufacturing and automation.',
    date: '2024-03-10',
    readTime: '6 min read',
    category: 'Robotics',
    slug: 'robotics-modern-industry'
  },
  {
    title: 'CI/CD Best Practices',
    excerpt: 'Essential practices for implementing effective CI/CD pipelines in your development workflow.',
    date: '2024-03-05',
    readTime: '5 min read',
    category: 'DevOps',
    slug: 'cicd-best-practices'
  }
]

const Blog = () => {
  return (
    <section id="blog" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-12 dark:text-white">Blog</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Blog 