import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import regions from '@/data/regions.json';

export const metadata: Metadata = {
  title: 'ბიზნეს ინფო ქალაქების მიხედვით',
  description: 'იპოვეთ ბიზნეს მისამართები ქალაქების მიხედვით',
  keywords: ['ბიზნეს მისამართები', 'ქალაქები', 'რაიონები', 'ბიზნეს ინფორმაცია', 'საქართველო'],
  alternates: {
    canonical: `${siteConfig.siteUrl}/raionebi`,
  },
  openGraph: {
    title: 'ბიზნეს ინფო ქალაქების მიხედვით',
    description: 'იპოვეთ ბიზნეს მისამართები ქალაქების მიხედვით',
    url: `${siteConfig.siteUrl}/raionebi`,
    type: 'website',
    locale: 'ka_GE',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ბიზნეს ინფო ქალაქების მიხედვით',
    description: 'იპოვეთ ბიზნეს მისამართები ქალაქების მიხედვით',
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

interface District {
  name: string;
  slug: string;
}

// Ensure JSON data is typed
const allRegions = regions as District[];
const midIndex = Math.ceil(allRegions.length / 2);
const leftRegions = allRegions.slice(0, midIndex);
const rightRegions = allRegions.slice(midIndex);

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
        {/* right arrow → */}
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

  function DistrictList({ items }: { items: District[] }) {
    return (
      <ul role="list" className="space-y-1">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/raionebi/${item.slug}`}
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
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

export default function RaionebiPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <section
      aria-labelledby="districts-heading"
      className="bg-[#f8f8f8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        

        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">

          {/* Column 1 */}
          <div>
          <h1
          id="districts-heading"
          className="
            mb-10 sm:mb-12
            text-3xl sm:text-4xl font-bold
            text-slate-600 tracking-tight
          "
        >
          რაიონები
        </h1>
          </div>

          {/* Column 2 */}
          <div>
            <DistrictList items={leftRegions} />
          </div>

          {/* Column 3 */}
          <div className="sm:col-span-1 sm:col-start-2 lg:col-start-3">
            <DistrictList items={rightRegions} />
          </div>

        </div>
      </div>
    </section>
    </main>
  );
}
