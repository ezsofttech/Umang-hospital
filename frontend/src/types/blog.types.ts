export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  body: string;
  published: boolean;
  image?: string | null;
  author?: string | null;
  tags?: string[] | null;
  createdAt: string;
  updatedAt: string;
};
