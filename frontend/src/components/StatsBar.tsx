'use client';

import { useEffect, useState } from 'react';
import { statisticsService, type Statistic } from '@/services/statistics.service';

export default function StatsBar() {
  const [stats, setStats] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await statisticsService.getAll();
        setStats(data);
      } catch (err) {
        console.error('Failed to load statistics:', err);
        // Fallback to default stats if fetch fails
        setStats([
          { _id: '1', value: '500+', label: 'National healthcare honors' },
          { _id: '2', value: '200+', label: 'People we have treated' },
          { _id: '3', value: '5,000+', label: 'OPD Patients Treated' },
          { _id: '4', value: '5,000+', label: 'Communities we reach out' },
          { _id: '5', value: '5,000+', label: 'Skilled staff on our team' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-white py-8 sm:py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">Loading statistics...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-8 md:flex-nowrap md:justify-between md:gap-x-16 lg:px-8">
        {stats.map((stat) => (
          <div key={stat._id} className="min-w-0 text-center sm:flex-1">
            <p className="text-2xl font-bold text-(--umang-green) sm:text-3xl md:text-4xl">{stat.value}</p>
            <p className="mt-0.5 text-xs font-medium text-gray-800 sm:mt-1 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
