import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import { getPostImagePath, isLogoFallback } from '@/lib/posts';

interface BaseProps {
  post: Post;
  categoryName: string;
  categoryColor?: string;
}

/**
 * Full Post Card Component
 * 
 * Displays a post card with:
 * - Thumbnail image (if available)
 * - Category tag with custom color
 * - Post title
 * - Post excerpt
 * 
 * Used in:
 * - AutomobileCategory, EducationCategory, HealthCategory, RestaurantsCategory (first 3 posts)
 * - NewsCategory, VideoCategory, TouristCategory (featured post)
 */
export function CategoryPostCardFull({
  post,
  categoryName,
  categoryColor,
  imageHeight = 'h-48 sm:h-56',
  titleSize = 'text-lg sm:text-xl',
  excerptLines = 'line-clamp-3',
  wrapperClassName = '',
  showExcerpt = true,
}: BaseProps & {
  imageHeight?: string;
  titleSize?: string;
  excerptLines?: string;
  wrapperClassName?: string;
  showExcerpt?: boolean;
}) {
  return (
    <Link
      href={`/${post.slug}`}
      className={`
        group
        block bg-white 
        group rounded-lg p-2 overflow-hidden shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)]    transition-all duration-[250ms] ease-in-out    hover:-translate-y-1    hover:shadow-[0px_2px_4px_rgba(46,41,51,0.08),0px_5px_10px_rgba(71,63,79,0.16)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
       
       
        
        ${wrapperClassName}
      `.trim()}
    >
      {/* Thumbnail */}
      {post.thumbnail && (() => {
        const imagePath = getPostImagePath(post, post.thumbnail);
        const isLogo = isLogoFallback(imagePath);
        return (
          <div className={`relative w-full ${imageHeight} bg-gray-200 overflow-hidden`}>
            <Image
              src={imagePath}
              alt={post.title}
              fill
              className={isLogo ? "object-contain transition-transform duration-200 rounded-lg" : "object-cover transition-transform duration-200 rounded-lg"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        );
      })()}

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Category Tag */}
        <div className="mb-3">
          <span
            className="
              inline-block
              px-3 py-1
              bg-blue-100 text-gray-700
              rounded-md
              text-xs sm:text-sm font-medium
            "
            style={categoryColor ? { backgroundColor: categoryColor } : undefined}
          >
            {categoryName}
          </span>
        </div>

        {/* Title */}
        <h3 className={`
          ${titleSize} font-bold text-gray-900 mb-2
          line-clamp-2
          group-hover:text-amber-600
          transition-colors duration-200
        `.trim()}>
          {post.title}
        </h3>

        {/* Description */}
        {showExcerpt && post.excerpt && (
          <p className={`
            text-sm sm:text-base text-gray-600
            ${excerptLines}
          `.trim()}>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Compact Post Card Component
 * 
 * Displays a minimal post card with:
 * - Category tag with custom color
 * - Post title
 * - Optional left border
 * 
 * Used in:
 * - AutomobileCategory, EducationCategory, HealthCategory, RestaurantsCategory (next 3 posts)
 * - NewsCategory, VideoCategory, TouristCategory (middle and right columns)
 */
export function CategoryPostCardCompact({
  post,
  categoryName,
  categoryColor,
  titleSize = 'text-base sm:text-lg',
  wrapperClassName = '',
  showBorder = true,
}: BaseProps & {
  titleSize?: string;
  wrapperClassName?: string;
  showBorder?: boolean;
}) {
  return (
    <Link
      href={`/${post.slug}`}
      className={`
        group
        block bg-white rounded-lg
        p-4 sm:p-6
        ${showBorder ? 'border-l-4 border-blue-200 group-hover:border-blue-500' : ''}
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
        ${wrapperClassName}
      `.trim()}
    >
      {/* Category Tag */}
      <div className="mb-2 sm:mb-3">
        <span
          className="
            inline-block
            px-3 py-1
            bg-blue-100 text-gray-700
            rounded-md
            text-xs sm:text-sm font-medium
          "
          style={categoryColor ? { backgroundColor: categoryColor } : undefined}
        >
          {categoryName}
        </span>
      </div>

      {/* Title */}
      <h3 className={`
        ${titleSize} font-bold text-gray-900
        line-clamp-2
        group-hover:text-amber-600
        transition-colors duration-200
      `.trim()}>
        {post.title}
      </h3>
    </Link>
  );
}
