import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getPostBySlug, getAllPosts, getPostsByCategory } from '@/lib/posts';
import { getAllCategories } from '@/lib/categories';
import { extractHeadings } from '@/lib/toc';
import SocialShare from '@/components/common/SocialShare';
import { generateSeoMetadata } from '@/components/common/Seo';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all posts
 */
export async function generateStaticParams() {
  const allPosts = getAllPosts();
  
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'პოსტი ვერ მოიძებნა',
    };
  }

  const title = post.title;
  const description = post.excerpt || `${post.title} - ${siteConfig.description}`;
  const image = post.thumbnail ? `/assets/images/posts/${post.thumbnail}` : undefined;

  return generateSeoMetadata({
    title,
    description,
    keywords: post.keywords || [post.category],
    url: `/posts/${slug}`,
    image,
    type: 'article',
    publishedTime: post.date,
    author: post.author,
    siteName: siteConfig.name,
    siteUrl: siteConfig.siteUrl,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get category info
  const allCategories = getAllCategories();
  const category = allCategories.find(
    cat => cat.name === post.category || cat.slug === post.category
  );

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  // Get related posts (same category, excluding current post)
  const relatedPosts = category
    ? getPostsByCategory(category.name, category.slug)
        .filter(p => p.slug !== post.slug)
        .slice(0, 4)
    : [];

  // Get all posts for navigation
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-[3rem] font-black text-[#2d3748] mb-6">
                {post.title}
              </h1>
              
              {category && (
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-lg text-gray-500">კატეგორია:</span>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-lg font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    {category.name}
                  </Link>
                </div>
              )}

              {/* Thumbnail */}
              {post.thumbnail && (
                <div className="relative w-full h-64 md:h-[600] bg-gray-200 rounded-lg overflow-hidden mb-8">
                  <Image
                    src={`/assets/images/posts/${post.thumbnail}`}
                    alt={post.title}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div className="post-content space-y-4">
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Check if it's a heading
                  const headingMatch = paragraph.match(/^(#{1,6})\s+(.+)$/);
                  if (headingMatch) {
                    const level = headingMatch[1].length;
                    const text = headingMatch[2].trim();
                    const heading = headings.find(h => h.text === text);
                    const className = 
                      level === 1 ? 'text-3xl font-bold mt-8 mb-4 text-gray-900' :
                      level === 2 ? 'text-2xl font-bold mt-6 mb-3 text-gray-900' :
                      level === 3 ? 'text-xl font-bold mt-4 mb-2 text-gray-900' :
                      'text-lg font-bold mt-3 mb-2 text-gray-900';
                    
                    if (level === 1) {
                      return (
                        <h1
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h1>
                      );
                    } else if (level === 2) {
                      return (
                        <h2
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h2>
                      );
                    } else if (level === 3) {
                      return (
                        <h3
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h3>
                      );
                    } else if (level === 4) {
                      return (
                        <h4
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h4>
                      );
                    } else if (level === 5) {
                      return (
                        <h5
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h5>
                      );
                    } else {
                      return (
                        <h6
                          key={index}
                          id={heading?.id}
                          className={className}
                        >
                          {text}
                        </h6>
                      );
                    }
                  }
                  
                  // Check if it's a link
                  if (paragraph.match(/^\[.+\]\(.+\)$/)) {
                    const linkMatch = paragraph.match(/^\[(.+)\]\((.+)\)$/);
                    if (linkMatch) {
                      return (
                        <p key={index} className="mb-4">
                          <a
                            href={linkMatch[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-700 underline"
                          >
                            {linkMatch[1]}
                          </a>
                        </p>
                      );
                    }
                  }
                  
                  // Check if it's an iframe (YouTube embed)
                  const iframeMatch = paragraph.match(/<iframe[^>]*><\/iframe>/);
                  if (iframeMatch) {
                    return (
                      <div
                        key={index}
                        className="my-6"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    );
                  }
                  
                  // Regular paragraph
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4 text-gray-700 text-xl leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </div>

            {/* Social Share */}
            <SocialShare
              url={`${siteConfig.siteUrl}/posts/${post.slug}`}
              title={post.title}
              description={post.excerpt}
            />

            {/* Navigation */}
            <nav className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
              {previousPost ? (
                <Link
                  href={`/posts/${previousPost.slug}`}
                  className="group flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <span className="text-sm">←</span>
                  <div>
                    <div className="text-sm text-gray-500">წინა</div>
                    <div className="font-bold text-base">{previousPost.title}</div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextPost && (
                <Link
                  href={`/posts/${nextPost.slug}`}
                  className="group flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors sm:ml-auto"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500">შემდეგი</div>
                    <div className="font-bold text-base">{nextPost.title}</div>
                  </div>
                  <span className="text-sm">→</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-[#718096] mb-4">
                    Table of contents
                  </h2>
                  <nav aria-label="Table of contents">
                    <ol className="space-y-2">
                      {headings.map((heading, index) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="
                              flex items-center gap-3
                              text-sm text-gray-700
                              hover:text-amber-600
                              transition-colors duration-150
                              focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded
                            "
                            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                          >
                            <span className="
                              flex items-center justify-center
                              w-7 h-7 rounded-full
                              bg-indigo-100 text-indigo-600
                              text-xs font-medium
                              flex-shrink-0
                            ">
                              {index + 1}
                            </span>
                            <span className="line-clamp-2">{heading.text}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-[#718096] mb-4">
                    {category?.name || 'სხვა პოსტები'}
                  </h2>
                  <ul className="space-y-3">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link
                          href={`/posts/${relatedPost.slug}`}
                          className="
                            block
                            p-3 rounded-lg
                            bg-gray-50 hover:bg-amber-50
                            border-l-4 border-indigo-200 hover:border-amber-500
                            transition-all duration-150
                            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                          "
                        >
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {relatedPost.title}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
