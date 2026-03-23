import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';
import { getCategoryBySlug } from '@/lib/categories';
import { CategoryPostCardFull, CategoryPostCardCompact } from '@/components/common/CategoryPostCard';

/**
 * TouristCategory Component
 * 
 * Displays tourist posts in a 3-column layout:
 * - Left: 1 large featured article with image
 * - Middle: 3 smaller articles
 * - Right: 2 smaller articles
 * 
 * Optimized for:
 * - Core Web Vitals (LCP, CLS, FID, INP)
 * - W3C Validation
 * - WCAG 2.1 AA Accessibility
 * - Technical SEO
 * - Fully Responsive Design (Mobile First)
 */
export default function TouristCategory() {
  // Get Tourist category
  const category = getCategoryBySlug('turistuli');
  if (!category) {
    return null;
  }

  // Get posts from Tourist category
  const allPosts = getPostsByCategory(category.name, category.slug);
  const posts = allPosts.slice(0, 6); // Get first 6 posts

  const featuredPost = posts[0] || null; // First post - large card
  const middlePosts = posts.slice(1, 4); // Next 3 posts - middle column
  const rightPosts = posts.slice(4, 6); // Next 2 posts - right column

  return (
    <section
      aria-labelledby="tourist-heading"
      className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
          <h2
            id="tourist-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 px-4 py-2 rounded-lg inline-block"
          >
            {category.name}
          </h2>
          <Link
            href={`/category/${category.slug}`}
            className="
              inline-flex items-center justify-center
              px-6 py-3
              bg-gray-200 hover:bg-gray-300
              text-gray-700 hover:text-gray-900
              rounded-lg
              font-medium text-sm sm:text-base
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              self-start sm:self-auto
            "
          >
            მეტის ნახვა
          </Link>
        </div>

        {/* Posts Grid - 3 Column Layout */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Column - Featured Post (Large Card) */}
            {featuredPost && (
              <div className="lg:col-span-4">
                <CategoryPostCardFull
                  post={featuredPost}
                  categoryName={category.name}
                  categoryColor={category.color}
                  imageHeight="h-64 sm:h-80"
                  titleSize="text-xl sm:text-2xl"
                  excerptLines="line-clamp-4"
                  wrapperClassName="h-full"
                  showExcerpt={true}
                />
              </div>
            )}

            {/* Middle Column - 3 Posts */}
            <div className="lg:col-span-4 space-y-6">
              {middlePosts.map((post) => (
                <CategoryPostCardCompact
                  key={post.slug}
                  post={post}
                  categoryName={category.name}
                  categoryColor={category.color}
                  titleSize="text-lg sm:text-xl"
                  showBorder={false}
                />
              ))}
            </div>

            {/* Right Column - 2 Posts */}
            <div className="lg:col-span-4 space-y-6">
              {rightPosts.map((post) => (
                <CategoryPostCardCompact
                  key={post.slug}
                  post={post}
                  categoryName={category.name}
                  categoryColor={category.color}
                  titleSize="text-lg sm:text-xl"
                  showBorder={false}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              ამ კატეგორიაში პოსტები ჯერ არ არის
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
