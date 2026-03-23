import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import sectors from '@/data/sectors.json';
import { generateSeoMetadata } from '@/components/common/Seo';

export const metadata: Metadata = generateSeoMetadata({
  title: 'ბიზნეს ინფო სექტორების მიხედვით',
  description: 'იპოვეთ ბიზნეს მისამართები სექტორების მიხედვით',
  keywords: ['ბიზნეს მისამართები', 'სექტორები', 'ბიზნეს ინფორმაცია', 'საქართველო'],
  url: '/seqtorebi',
  type: 'website',
  siteName: siteConfig.name,
  siteUrl: siteConfig.siteUrl,
});

interface Sector {
  category: string;
  name: string;
  slug: string;
}

const allSectors = sectors as Sector[];
const midIndex = Math.ceil(allSectors.length / 2);
const leftSectors = allSectors.slice(0, midIndex);
const rightSectors = allSectors.slice(midIndex);

function ArrowIcon() {
  return (
    <span
      aria-hidden="true"
      className="
        inline-flex items-center justify-center
        h-7 w-7 rounded-full
        bg-indigo-100 text-indigo-400
        flex-shrink-0
        transition-colors duration-200
        group-hover:bg-indigo-200 group-hover:text-indigo-600
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

function SectorList({ items }: { items: Sector[] }) {
  return (
    <ul role="list" className="space-y-1">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/seqtorebi/${item.slug}`}
            className="
              group
              inline-flex items-center gap-3
              py-2 pr-2
               text-base font-semibold text-[#221638]
              transition-colors duration-150
              hover:text-indigo-600
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
              rounded-md
            "
          >
            <ArrowIcon />
            {item.category}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SeqtorebiPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <section
        aria-labelledby="sectors-heading"
        className="bg-[#f8f8f8] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
            <div>
              <h1
                id="sectors-heading"
                className="
                  mb-10 sm:mb-12
                  text-3xl sm:text-4xl font-bold
                  text-slate-600 tracking-tight
                "
              >
                სექტორები
              </h1>
            </div>

            <div>
              <SectorList items={leftSectors} />
            </div>

            <div className="sm:col-span-1 sm:col-start-2 lg:col-start-3">
              <SectorList items={rightSectors} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
