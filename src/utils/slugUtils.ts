/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts the blog post ID from a slug by finding the matching post
 * @param slug - The slug to match against
 * @param blogPosts - Array of blog posts to search through
 * @returns The blog post ID if found, null otherwise
 */
export function getBlogPostIdFromSlug(slug: string, blogPosts: any[]): string | null {
  const matchingPost = blogPosts.find(post => 
    createSlug(post.title) === slug
  );
  return matchingPost ? matchingPost.id : null;
}

