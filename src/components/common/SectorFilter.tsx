'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Sector {
  category: string;
  name: string;
  slug: string;
}

interface SectorFilterProps {
  sectors: Sector[];
  regionCategory: string;
}

export default function SectorFilter({ sectors, regionCategory: _regionCategory }: SectorFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedSector = searchParams.get('sector') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sector', value);
    } else {
      params.delete('sector');
    }
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sector');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full md:w-auto flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <label htmlFor="sector-filter" className="text-base font-medium text-gray-700 whitespace-nowrap">
          ფილტრი
        </label>
        <select
          id="sector-filter"
          value={selectedSector}
          onChange={handleChange}
          className="
            w-full md:w-auto
            px-4 py-2
            text-base
            border border-gray-300 rounded-lg
            bg-white
            text-gray-900
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            transition-colors duration-200
          "
        >
          <option value="">ყველა სექტორი</option>
          {sectors.map((sector) => (
            <option key={sector.slug} value={sector.slug}>
              {sector.category}
            </option>
          ))}
        </select>
      </div>
      {selectedSector && (
        <button
          type="button"
          onClick={handleClearFilter}
          className="
            text-sm font-medium text-gray-600 hover:text-amber-600
            whitespace-nowrap self-end
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
            rounded-md px-2 py-1
            transition-colors duration-200
          "
          aria-label="ფილტრის გასუფთავება"
        >
          გასუფთავება
        </button>
      )}
    </div>
  );
}
