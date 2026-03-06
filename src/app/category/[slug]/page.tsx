import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/posts';
import { generateSeoMetadata } from '@/components/common/Seo';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all categories
 */
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'კატეგორია ვერ მოიძებნა',
    };
  }

  const title = category.name;
  const description = category.description || `${category.name} - ${siteConfig.description}`;
  const image = category.icon ? `/assets/images/categories/${category.icon}` : undefined;

  return generateSeoMetadata({
    title,
    description,
    keywords: [category.name, 'კატეგორია'],
    url: `/category/${slug}`,
    image,
    type: 'website',
    siteName: siteConfig.name,
    siteUrl: siteConfig.siteUrl,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Get posts by category name or slug (either one matches)
  const posts = getPostsByCategory(category.name, category.slug);

  return (
    <main id="main-content" className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {category.icon && (
                <div className="flex-shrink-0">
                  <Image
                    src={`/assets/images/categories/${category.icon}`}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
              )}
              <div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold !text-[#2d3748]"
                  style={category.color ? { color: category.color } : undefined}
                >
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-base text-[#718096] max-w-3xl mt-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="mt-12">
              <div className="flex flex-wrap flex-row gap-6 items-center justify-center">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"> */}
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group block w-[30%] bg-white rounded-lg p-2 overflow-hidden shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] 
transition-all duration-[250ms] ease-in-out 
hover:-translate-y-1 
hover:shadow-[0px_2px_4px_rgba(46,41,51,0.08),0px_5px_10px_rgba(71,63,79,0.16)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    {/* Thumbnail */}
                    {post.thumbnail && (
                      <div className="relative w-full h-[290px] bg-gray-200 overflow-hidden">
                        <Image
                          src={`/assets/images/posts/${post.thumbnail}`}
                          alt={post.title}
                          fill
                          className="object-cover  transition-transform duration-200 rounded-lg"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-[#2d3748] mb-6 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#718096] text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  ამ კატეგორიაში პოსტები ჯერ არ არის
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
