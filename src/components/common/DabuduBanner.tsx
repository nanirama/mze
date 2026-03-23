import Link from 'next/link';

/**
 * DabuduBanner Component
 * 
 * Promotional banner for Dabudu.com
 * Optimized for:
 * - Core Web Vitals (LCP, CLS, FID, INP)
 * - W3C Validation
 * - WCAG 2.1 AA Accessibility
 * - Technical SEO
 * - Fully Responsive Design (Mobile First)
 */
export default function DabuduBanner() {
  return (
    <section
      aria-label="Dabudu.com - ინგლისური ენის შესწავლა"
      className="w-full bg-white py-8 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="
          relative
          bg-gradient-to-r from-slate-800 to-slate-900
          rounded-2xl
          overflow-hidden
          shadow-lg
        ">
          {/* Background Pattern/Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 lg:p-12">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h2 className="
                text-2xl sm:text-3xl lg:text-4xl
                font-bold
                text-purple-200
                mb-3 sm:mb-4
                leading-tight
              ">
                Dabudu.com - ინგლისური ენის შესწავლა და დასაქმება
              </h2>
              <p className="
                text-base sm:text-lg
                text-gray-300
                mb-6 sm:mb-8
              ">
                ინგლისური თანამედროვე მეთოდებით
              </p>
              <Link
                href="https://dabudu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 sm:px-8 sm:py-4
                  bg-blue-500 hover:bg-blue-600
                  text-white
                  rounded-lg
                  font-semibold text-sm sm:text-base
                  transition-all duration-200
                  transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                  shadow-md hover:shadow-lg
                "
              >
                გაიგეთ მეტი
              </Link>
            </div>

            {/* Illustration Area */}
            <div className="
              relative
              hidden lg:block
              h-64
              flex items-center justify-center
            ">
              {/* Simple geometric shapes illustration */}
              <div className="relative w-full h-full">
                {/* Person silhouette */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    {/* Head */}
                    <div className="w-16 h-16 bg-purple-300 rounded-full mb-2"></div>
                    {/* Body */}
                    <div className="w-20 h-24 bg-gray-300 rounded-t-lg"></div>
                    {/* Laptop */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>

                {/* Geometric shapes */}
                <div className="absolute top-4 right-8 w-12 h-12 bg-blue-400 rounded-lg transform rotate-12"></div>
                <div className="absolute top-16 right-4 w-8 h-8 bg-purple-400 rounded-full"></div>
                <div className="absolute bottom-8 right-12 w-16 h-16 bg-blue-500 transform -rotate-12"></div>
                <div className="absolute bottom-4 left-8 w-10 h-10 bg-purple-300 rounded-lg"></div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
                  <line x1="50" y1="50" x2="150" y2="100" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  <line x1="200" y1="80" x2="300" y2="120" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                  <line x1="100" y1="200" x2="250" y2="180" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
