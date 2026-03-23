import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { generateSeoMetadata } from '@/components/common/Seo';
import { siteConfig } from '@/config/site';
import SlugPostPageContent from "@/components/shared/SlugPostPageContent";
import MarkdownPostPageContent from "@/components/shared/MarkdownPostPageContent";
import { getPostBySlug as getSheetPostBySlug } from "@/lib/sheets";
import { getPostBySlug as getMarkdownPostBySlug, getPostImagePath } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPostBySlugTagged(slug: string) {
  // Next.js tagged cache: "use cache" enables caching for this async server function.
  // cacheTag() lets us selectively invalidate per-slug via revalidateTag().
  "use cache";
  cacheTag(`post:${slug}`);
  cacheLife({ expire: 300 }); // keep up to ~5 minutes (matches the in-memory TTL in sheets.ts)
  return getSheetPostBySlug(slug);
}

async function getMarkdownPostBySlugTagged(slug: string) {
  "use cache";
  cacheTag(`post:${slug}`);
  cacheLife({ expire: 300 });
  return getMarkdownPostBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mdPost = await getMarkdownPostBySlugTagged(slug);

  if (mdPost) {
    const image = mdPost.thumbnail ? getPostImagePath(mdPost, mdPost.thumbnail) : undefined;
    return generateSeoMetadata({
      title: mdPost.title,
      description: mdPost.excerpt || `${mdPost.title} - ${siteConfig.description}`,
      keywords: mdPost.keywords || [mdPost.category],
      url: `/${mdPost.slug}`,
      image,
      type: "article",
      publishedTime: mdPost.date,
      author: mdPost.author,
      siteName: siteConfig.name,
      siteUrl: siteConfig.siteUrl,
    });
  }

  const post = await getPostBySlugTagged(slug);

  if (!post) {
    return {
      title: 'პოსტი ვერ მოიძებნა',
    };
  }

  return generateSeoMetadata({
    title: post.title,
    description: post.description || `${post.title} - ${siteConfig.description}`,
    keywords: ['ბიზნეს ინფორმაცია', 'ბიზნეს მისამართები'],
    url: `/${post.slug}`,
    image: '/assets/images/logo.png',
    type: 'article',
    siteName: siteConfig.name,
    siteUrl: siteConfig.siteUrl,
  });
}

export default function PostPage({ params }: Props) {
  return (
    <Suspense fallback={null}>
      <PostPageInner params={params} />
    </Suspense>
  );
}

async function PostPageInner({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const mdPost = await getMarkdownPostBySlugTagged(slug);
  if (mdPost) {
    return <MarkdownPostPageContent post={mdPost} />;
  }

  const post = await getPostBySlugTagged(slug);
  if (!post) notFound();

  // filters comes from Google Sheets as a comma-separated string, e.g. "avto, foti"
  const region = post.filters ? post.filters.split(",")[1]?.trim() : "";

  return <SlugPostPageContent post={post} region={region} />;
}
