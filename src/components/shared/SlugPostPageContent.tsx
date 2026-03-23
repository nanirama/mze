import DabuduSection from "@/components/common/DabuduSection";
import type { Post } from "@/lib/sheets";

export default function SlugPostPageContent({
  post,
  region,
}: {
  post: Post;
  region: string;
}) {
  return (
    <div className="bg-[#f8f8f8] y-16 sm:py-20 lg:py-24">
      <main className="mx-auto max-w-7xl px-4">
        <h1 className="text-[3rem] text-[#2d3748] font-bold">{post.title}</h1>
        {region && (
          <p className="mt-4 text-gray-600">
            ქალაქი <strong>{region}</strong>
          </p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
          {/* Main content - 8 columns on large screens */}
          <article className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] hover:shadow-md transition-shadow  px-6 py-8 my-4">
              {post.description && (
                <div className="space-y-1">
                  <div className="text-base text-[#718096]">{post.description}</div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] hover:shadow-md transition-shadow  px-6 py-8 my-4">
              {post.city && (
                <div
                  className="prose max-w-none text-base text-[#718096]"
                  dangerouslySetInnerHTML={{ __html: post.city }}
                />
              )}
            </div>
            <div className="bg-white rounded-lg shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] hover:shadow-md transition-shadow  px-6 py-8 my-4">
              {post.state && (
                <div className="space-y-1">
                  <div className="text-base text-[#718096]">{post.state}</div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-[1px_1px_5px_0_rgba(1,1,1,0.05)] hover:shadow-md transition-shadow  px-6 py-8 my-4">
              {post.federal && (
                <div
                  className="prose max-w-none text-base text-[#718096]"
                  dangerouslySetInnerHTML={{ __html: post.federal }}
                />
              )}
            </div>
          </article>

          {/* Sidebar - 4 columns on large screens */}
          <DabuduSection />
        </div>
      </main>
    </div>
  );
}

