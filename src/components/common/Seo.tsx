import { Metadata } from 'next';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * SEO Component
 * 
 * This component is for reference/documentation purposes.
 * In Next.js App Router, SEO metadata should be handled via
 * the generateMetadata function or Metadata export.
 * 
 * For client-side SEO tags, use this component.
 */
export default function Seo({
  title,
  description,
  keywords = [],
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SeoProps) {
  // In Next.js App Router, we use metadata API instead
  // This component is kept for reference and potential client-side use
  return null;
}

/**
 * Helper function to generate SEO metadata object
 * Use this in generateMetadata functions
 */
export function generateSeoMetadata({
  title,
  description,
  keywords = [],
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  siteName,
  siteUrl,
}: SeoProps & { siteName: string; siteUrl: string }): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      type,
      locale: 'ka_GE',
      siteName,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            alt: title,
            width: 1200,
            height: 630,
          },
        ],
      }),
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
