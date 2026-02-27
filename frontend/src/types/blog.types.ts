export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  published: boolean;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};
