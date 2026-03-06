import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  thumbnail?: string;
  keywords?: string[];
  content: string;
  excerpt?: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

/**
 * Get all posts from markdown files
 */
export function getAllPosts(): Post[] {
  try {
    const folders = fs.readdirSync(postsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const posts: Post[] = [];

    for (const folderName of folders) {
      const folderPath = path.join(postsDirectory, folderName);
      const indexPath = path.join(folderPath, 'index.mdx');

      if (fs.existsSync(indexPath)) {
        const fileContents = fs.readFileSync(indexPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Create slug from folder name
        const slug = folderName;

        posts.push({
          slug,
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          category: data.category || '',
          thumbnail: data.thumbnail || undefined,
          keywords: data.keywords || [],
          content,
          excerpt: content.substring(0, 200).replace(/\n/g, ' ').trim() + '...',
        });
      }
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

/**
 * Get posts by category name or slug
 * Matches posts where post.category equals either category.name or category.slug
 */
export function getPostsByCategory(categoryName: string, categorySlug: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.category === categoryName || post.category === categorySlug
  );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts();
  return allPosts.find(post => post.slug === slug) || null;
}
