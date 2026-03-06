export type Category = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  metaDescription?: string;
  keywords?: string;
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
