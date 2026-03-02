import { Model } from 'mongoose';

export const generateSlug = (title: string): string => {
  if (!title || typeof title !== 'string') return 'untitled';
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  return slug || 'untitled';
};

/**
 * Generates a slug that is guaranteed unique within the given model.
 * If `base` already exists, appends -2, -3, etc. until unique.
 * Pass `excludeId` when updating an existing document to exclude it from the check.
 */
export const generateUniqueSlug = async (
  title: string,
  model: Model<any>,
  excludeId?: string,
): Promise<string> => {
  const base = generateSlug(title);
  let slug = base;
  let counter = 2;

  while (true) {
    const query: any = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const existing = await model.findOne(query).lean().exec();
    if (!existing) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
};
