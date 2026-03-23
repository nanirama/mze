import type { Metadata } from 'next';
import CategoryGrid from "@/components/common/CategoryGrid";
import AutomobileCategory from "@/components/common/AutomobileCategory";
import DabuduBanner from "@/components/common/DabuduBanner";
import NewsCategory from "@/components/common/NewsCategory";
import EducationCategory from "@/components/common/EducationCategory";
import VideoCategory from "@/components/common/VideoCategory";
import RestaurantsCategory from "@/components/common/RestaurantsCategory";
import TouristCategory from "@/components/common/TouristCategory";
import HealthCategory from "@/components/common/HealthCategory";
import HomeSliderSection from "@/components/common/HomeSliderSection";
import { generateSeoMetadata } from '@/components/common/Seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = generateSeoMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: ['ახალი ამბები', 'ტურისტული ადგილები', 'ბიზნეს მისამართები', 'საინფორმაციო ცენტრი', 'საქართველო'],
  url: '/',
  type: 'website',
  siteName: siteConfig.name,
  siteUrl: siteConfig.siteUrl,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <CategoryGrid />
      <HomeSliderSection />
      <AutomobileCategory />
      <DabuduBanner />
      <NewsCategory />
      <EducationCategory />
      <VideoCategory />
      <RestaurantsCategory />
      <TouristCategory />
      <HealthCategory />
    </div>
  );
}
