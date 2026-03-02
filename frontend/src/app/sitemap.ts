import { MetadataRoute } from 'next';
import { fetchBlogs, fetchDoctors, fetchCategories, fetchSubcategories } from '@/lib/serverApi';
import { SITE_URL } from '@/lib/config';

// Always server-render the sitemap so it reflects live DB data
// and avoids build-time fetch failures against localhost
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/departments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/doctors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    // Add departments (categories)
    const categories = await fetchCategories();
    const categoryRoutes = categories
      .filter((category) => !!category.slug)
      .map((category) => ({
        url: `${SITE_URL}/departments/${category.slug}`,
        lastModified: new Date(category.updatedAt || category.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    // Add services (subcategories)
    const subcategories = await fetchSubcategories();
    const serviceRoutes = subcategories
      .filter((subcategory) => !!subcategory.slug)
      .map((subcategory) => ({
        url: `${SITE_URL}/services/${subcategory.slug}`,
        lastModified: new Date(subcategory.updatedAt || subcategory.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    // Add doctors
    const doctors = await fetchDoctors();
    const doctorRoutes = doctors
      .filter((doctor) => !!doctor.slug)
      .map((doctor) => ({
        url: `${SITE_URL}/doctors/${doctor.slug}`,
        lastModified: new Date(doctor.updatedAt || doctor.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));

    // Add blogs
    const blogs = await fetchBlogs(true); // Only published blogs
    const blogRoutes = blogs
      .filter((blog) => !!blog.slug)
      .map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }));

    routes.push(...categoryRoutes, ...serviceRoutes, ...doctorRoutes, ...blogRoutes);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return routes;
}