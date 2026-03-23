import type { Metadata } from "next";
import { notFound } from "next/navigation";
import regions from "@/data/regions.json";
import sectors from "@/data/sectors.json";
import { getPostsByCategory, getPostsBySector } from "@/lib/sheets";
import SectorFilter from "@/components/common/SectorFilter";
import PostsDataCard from "@/components/common/PostsDataCard";
import { generateSeoMetadata } from '@/components/common/Seo';
import { siteConfig } from '@/config/site';
import { Suspense } from "react";

interface Region {
  name: string;
  slug: string;
  category: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sector?: string }>;
}

const allRegions = regions as Region[];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = allRegions.find((r) => r.slug === slug);

  if (!region) {
    return {
      title: "რაიონი ვერ მოიძებნა",
    };
  }

  return generateSeoMetadata({
    title: `${region.name} — ბიზნეს ინფო`,
    description: `${region.name} რაიონის ბიზნეს მისამართები და ინფორმაცია.`,
    keywords: [region.name, 'ბიზნეს მისამართები', 'რაიონები', 'ბიზნეს ინფორმაცია'],
    url: `/raionebi/${slug}`,
    type: 'website',
    siteName: siteConfig.name,
    siteUrl: siteConfig.siteUrl,
  });
}

export default function RegionPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={null}>
      <RegionPageInner params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function RegionPageInner({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sector } = await searchParams;
  const region = allRegions.find((r) => r.slug === slug);

  if (!region) {
    notFound();
  }

  // Get posts based on whether a sector is selected
  const posts = sector 
    ? await getPostsBySector(region.category, sector)
    : await getPostsByCategory(region.category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {region.name}
          </h1>
        </div>
        <div className="flex justify-end">
          <SectorFilter sectors={sectors} regionCategory={region.category} />
        </div>
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
          ამ რაიონისთვის ბიზნესები ჯერ არ არის.
        </p>
      )}
    </main>
  );
}

