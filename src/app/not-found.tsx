import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "გვერდი ვერ მოიძებნა",
  description: "სამწუხაროდ, თქვენ მიერ მოძებნილი გვერდი არ არსებობს.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 select-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            გვერდი ვერ მოიძებნა
          </h2>
          <p className="text-lg text-gray-600 md:text-xl">
            სამწუხაროდ, თქვენ მიერ მოძებნილი გვერდი არ არსებობს ან წაიშალა.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="
              inline-flex items-center justify-center
              px-6 py-3
              text-base font-semibold text-white
              bg-amber-500 rounded-lg
              transition-all duration-200
              hover:bg-amber-600 hover:shadow-lg
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
            "
          >
            მთავარ გვერდზე დაბრუნება
          </Link>
          <Link
            href="/raionebi"
            className="
              inline-flex items-center justify-center
              px-6 py-3
              text-base font-semibold text-gray-700
              bg-gray-100 rounded-lg
              transition-all duration-200
              hover:bg-gray-200 hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
            "
          >
            რაიონები
          </Link>
        </div>

        {/* Additional Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            თუ თქვენ ფიქრობთ, რომ ეს შეცდომაა, გთხოვთ{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-amber-600 hover:text-amber-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded"
            >
              დაგვიკავშირდეთ
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
