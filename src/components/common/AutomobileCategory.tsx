import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';
import { getCategoryBySlug } from '@/lib/categories';
import { CategoryPostCardFull, CategoryPostCardCompact } from '@/components/common/CategoryPostCard';

/**
 * AutomobileCategory Component
 * 
 * Displays 6 posts from Automobiles category
 * First 3: Full cards with image, category, title, description
 * Next 3: Minimal cards with category, title, and left border
 * 
 * Optimized for:
 * - Core Web Vitals (LCP, CLS, FID, INP)
 * - W3C Validation
 * - WCAG 2.1 AA Accessibility
 * - Technical SEO
 * - Fully Responsive Design (Mobile First)
 */
export default function AutomobileCategory() {
  // Get Automobiles category
  const category = getCategoryBySlug('auto');
  if (!category) {
    return null;
  }

  // Get posts from Automobiles category
  const allPosts = getPostsByCategory(category.name, category.slug);
  const posts = allPosts.slice(0, 6); // Get first 6 posts

  const featuredPosts = posts.slice(0, 3); // First 3 with images
  const minimalPosts = posts.slice(3, 6); // Next 3 minimal cards

  return (
    <section
      aria-labelledby="automobiles-heading"
      className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Always rendered */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
          <h2
            id="automobiles-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 px-4 py-2 rounded-lg inline-block"
           >
            {category.name}
          </h2>
          <Link
            href={`/category/${category.slug}`}
            className="
              inline-flex items-center justify-center
              px-6 py-3
              bg-blue-100 hover:bg-blue-200
              text-gray-700 hover:text-gray-900
              rounded-lg
              font-medium text-sm sm:text-base
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              self-start sm:self-auto
            "
          >
            მეტის ნახვა
          </Link>
        </div>

        {/* Featured Posts (First 3) - Full Cards */}
        {featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {featuredPosts.map((post) => (
              <CategoryPostCardFull
                key={post.slug}
                post={post}
                categoryName={category.name}
                categoryColor={category.color}
              />
            ))}
          </div>
        )}

        {/* Minimal Posts (Next 3) - Simple Cards */}
        {minimalPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {minimalPosts.map((post) => (
              <CategoryPostCardCompact
                key={post.slug}
                post={post}
                categoryName={category.name}
                categoryColor={category.color}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
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
