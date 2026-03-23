import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import sectors from "@/data/sectors.json";
import { getPostsBySectorSlug } from "@/lib/sheets";
import PostsDataCard from "@/components/common/PostsDataCard";
import { generateSeoMetadata } from '@/components/common/Seo';
import { Suspense } from "react";

interface Sector {
  category: string;
  name: string;
  slug: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const allSectors = sectors as Sector[];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = allSectors.find((s) => s.slug === slug);

  if (!sector) {
    return {
      title: "სექტორი ვერ მოიძებნა",
    };
  }

  return generateSeoMetadata({
    title: `${sector.category} — ბიზნეს ინფო`,
    description: `${sector.category} სექტორის ბიზნეს მისამართები და ინფორმაცია.`,
    keywords: [sector.category, 'ბიზნეს მისამართები', 'სექტორები', 'ბიზნეს ინფორმაცია'],
    url: `/seqtorebi/${sector.slug}`,
    type: 'website',
    siteName: siteConfig.name,
    siteUrl: siteConfig.siteUrl,
  });
}

export default function SectorPage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <SectorPageInner params={params} />
    </Suspense>
  );
}

async function SectorPageInner({ params }: PageProps) {
  const { slug } = await params;
  const sector = allSectors.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  // Get all posts for this sector
  const posts = await getPostsBySectorSlug(sector.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {sector.category}
        </h1>
      </div>
      
      {posts.length > 0 ? (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            ბიზნესები ({posts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostsDataCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">
          ამ სექტორისთვის ბიზნესები ჯერ არ არის.
        </p>
      )}
    </main>
  );
}
