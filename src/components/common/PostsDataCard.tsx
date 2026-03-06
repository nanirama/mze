import Link from 'next/link';
import Image from 'next/image';

interface Post {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
}

interface PostsDataCardProps {
  post: Post;
}

export default function PostsDataCard({ post }: PostsDataCardProps) {
  return (
    <Link
      href={`/${post.slug}`}
      className="bg-white rounded-lg shadow-[0px_6px_16px_rgba(52,105,203,0.16)] hover:shadow-md transition-shadow duration-200 p-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
    >
      <div className="flex justify-start items-start gap-4">
        {post.icon && (
          <div className="w-[40px] h-[40px] flex-shrink-0">
            <Image
              src={`/assets/images/${post.icon}`}
              alt={post.title}
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-amber-600 transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
