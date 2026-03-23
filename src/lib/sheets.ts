import { google } from "googleapis";
import { env } from "@/config/site";

export type Post = {
  slug: string;
  title: string;
  [key: string]: string;
};
// Cache for posts to avoid multiple API calls during build
let postsCache: Post[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

// Allows external revalidation endpoints to bust the in-memory cache immediately.
// This complements Next.js tagged cache invalidation.
export function clearPostsCache() {
  postsCache = null;
  cacheTimestamp = 0;
}

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: env.GOOGLE_PROJECT_ID,
      client_id: env.GOOGLE_CLIENT_ID,
      client_email: env.GOOGLE_CLIENT_EMAIL,
      private_key: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

// Rate limiting helper
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 200; // 200ms between requests

async function rateLimitedRequest<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  
  // Retry logic with exponential backoff
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      // Check if it's a rate limit error (429)
      if (error?.code === 429 && attempt < retries - 1) {
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 10000); // Max 10 seconds
        console.warn(`Rate limit hit, retrying in ${backoffDelay}ms... (attempt ${attempt + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}

export async function getSheetRows(sheetName: string): Promise<string[][]> {
  return rateLimitedRequest(async () => {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: env.SPREADSHEET_ID,
      range: sheetName,
    });

    return res.data.values ?? [];
  });
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  const [headers, ...data] = rows;
  return data.map((row) =>
    headers.reduce((acc, header, i) => {
      acc[header.trim().toLowerCase()] = row[i]?.trim() ?? "";
      return acc;
    }, {} as Record<string, string>)
  );
}

export async function getPosts(): Promise<Post[]> {
  // Return cached data if available and not expired
  const now = Date.now();
  if (postsCache && (now - cacheTimestamp) < CACHE_TTL) {
    return postsCache;
  }

  // Fetch fresh data
  const rows = await getSheetRows("Posts");
  if (!rows.length) {
    postsCache = [];
    cacheTimestamp = now;
    return [];
  }

  const objects = rowsToObjects(rows);

  postsCache = objects
    .filter((row) => row.slug)
    .map((row) => ({
      ...row,
      slug: row.slug,
      title: row.title ?? "",
    })) as Post[];
  
  cacheTimestamp = now;
  return postsCache;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts();
  // return posts.filter(
  //   (post) => post.filters?.split(",")[1]?.trim().toLowerCase() === slug.toLowerCase()
  // );
  return posts.filter(
    (post) => post.category === category
  );
}

export async function getPostsBySector(category: string, sector: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(
    (post) => post.category === category && post.filters?.split(",")[0]?.trim().toLowerCase() === sector.toLowerCase()
  );
  // return posts.filter(
  //   (post) => post.category === category
  // );
}

export async function getPostsBySectorSlug(sectorSlug: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter(
    (post) => post.filters?.split(",")[0]?.trim().toLowerCase() === sectorSlug.toLowerCase()
  );
}