import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/categories';

/**
 * CategoryGrid Component
 * 
 * Displays all categories in a responsive grid layout
 * Optimized for:
 * - Core Web Vitals (LCP, CLS, FID, INP)
 * - W3C Validation
 * - WCAG 2.1 AA Accessibility
 * - Technical SEO
 * - Fully Responsive Design
 */
export default function CategoryGrid() {
  const categories = getAllCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="categories-heading"
      className="w-full bg-gray-50 pb-12 sm:pb-16 lg:pb-20 pt-1"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="categories-heading"
          className="sr-only"
        >
          კატეგორიები
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="
                group
                flex flex-col items-center justify-center
                p-4 bg-white rounded-[16px]
                shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] hover:shadow-[0px_2px_4px_rgba(46,41,51,0.08),0px_5px_10px_rgba(71,63,79,0.16)]
                transition-all duration-300 ease-in-out
                transform hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                min-h-[100px] sm:min-h-[120px]
              "
              aria-label={`${category.name} - კატეგორიაზე გადასვლა`}
            >
              {/* Category Icon */}
              {category.icon && (
                <div className="mb-3 sm:mb-4 flex-shrink-0">
                  <div
                    className="
                      relative
                      w-10 h-10 
                      flex items-center justify-center
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                    style={category.color ? { color: category.color } : undefined}
                  >
                    <Image
                      src={`/assets/images/categories/${category.icon}`}
                      alt={category.name}
                      width={56}
                      height={56}
                      className="
                        w-full h-full
                        object-contain
                        transition-opacity duration-300
                        group-hover:opacity-90
                      "
                    />
                  </div>
                </div>
              )}

              {/* Category Name */}
              <h3 className="
                 text-base font-bold text-[#718096]                
                text-center
                transition-colors duration-300
                group-hover:text-amber-600
                line-clamp-2
              ">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
