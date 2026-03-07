export type Stat = {
  value: string;
  label: string;
};

export type Subcategory = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  metaDescription?: string;
  keywords?: string;
  explanation: string;
  image: string;
  categoryId: string;
  stats?: Stat[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
