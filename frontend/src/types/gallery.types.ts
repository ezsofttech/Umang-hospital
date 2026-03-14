export type Gallery = {
  id: string;
  title: string;
  image?: string | null;
  caption?: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
