export type Subcategory = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  metaDescription?: string;
  keywords?: string;
  explanation: string;
  image: string;
  categoryId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
