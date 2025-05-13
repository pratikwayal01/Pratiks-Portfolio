import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { blogPosts, BlogPost } from '../data/blog-posts';

// Added function to find related posts
const findRelatedPosts = (currentPost: BlogPost, count: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => 
      post.slug !== currentPost.slug && // Not the current post
      (post.category === currentPost.category || // Same category
       post.tags.some(tag => currentPost.tags.includes(tag))) // Or shares tags
    )
    .slice(0, count);
};

const BlogPostComponent: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch markdown content from file if needed
  const fetchMarkdownContent = async (contentPath: string) => {
    try {
      // Check if the content is a file path (starts with / or src/)
      if (contentPath.startsWith('/') || contentPath.startsWith('src/')) {
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status}`);
        }
        return await response.text();
      }
      // If not a path, return the content directly
      return contentPath;
    } catch (err) {
      console.error('Error fetching markdown:', err);
      setError('Error loading post content');
      return 'Failed to load content. Please try again later.';
    }
  };

  // Find the blog post with the matching slug
  useEffect(() => {
    setLoading(true);
    
    try {
      const foundPost = blogPosts.find(post => post.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(findRelatedPosts(foundPost));
        
        // Fetch content if it's a file path
        fetchMarkdownContent(foundPost.content)
          .then(content => {
            setPostContent(content);
            setLoading(false);
          });
          
        setError(null);
        // Set page title
        document.title = `${foundPost.title} | Your Name`;
      } else {
        setError('Post not found');
        setLoading(false);
      }
    } catch (err) {
      setError('Error loading post');
      console.error('Error loading post:', err);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite" role="status">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        <span className="sr-only">Loading post...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error === 'Post not found' 
            ? "The blog post you're looking for doesn't exist or has been removed."
            : "We encountered an error while loading this post. Please try again later."}
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return null; // TypeScript safety check
  }

  return (
    <>
      {/* SEO Meta Tags */}
      
        <title>{`${post.title} | Your Name`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta name="keywords" content={post.tags.join(', ')} />
      
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4"
      >
        <div className="max-w-3xl mx-auto">
          {/* Back to blog link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
            aria-label="Back to blog posts"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Blog header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <time dateTime={new Date(post.date).toISOString()} className="text-gray-500 dark:text-gray-400">
                {post.date}
              </time>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Cover image */}
            {post.coverImage && (
              <div className="rounded-lg overflow-hidden mb-8 shadow-md">
                <img
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  className="w-full h-auto"
                />
              </div>
            )}
          </header>

          {/* Blog content */}
          <div className="prose dark:prose-invert max-w-none">
            {/* Render the markdown content */}
            <ReactMarkdown>{postContent}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Related Posts - Added Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">Related Posts</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    to={`/blog/${relatedPost.slug}`} 
                    key={relatedPost.slug}
                    className="group block"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105">
                      {relatedPost.coverImage && (
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover" 
                        />
                      )}
                      <div className="p-4">
                        <span className="text-xs text-blue-600 dark:text-blue-400">{relatedPost.category}</span>
                        <h4 className="font-medium text-lg mt-1 dark:text-white">{relatedPost.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Comment Section Placeholder */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">Comments</h3>
            <p className="text-gray-600 dark:text-gray-400">Comments functionality would be implemented here.</p>
          </div>
        </div>
      </motion.article>
    </>
  );
};

export default BlogPostComponent;