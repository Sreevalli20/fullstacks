'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { College, CollegeFilters } from '@/types';
import CollegeCard from '@/components/college/CollegeCard';
import SearchFilters from '@/components/search/SearchFilters';
import { Loader2 } from 'lucide-react';

export default function CollegesPage() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<CollegeFilters>({
    page: 1,
    limit: 12,
  });

  const fetchColleges = async (newFilters: CollegeFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getColleges(newFilters);
      setColleges(response.data);
      setPagination(response.pagination);
      setFilters(newFilters);
    } catch (err) {
      setError('Failed to load colleges. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const initialFilters: CollegeFilters = {
      page: 1,
      limit: 12,
    };
    
    if (categoryParam) {
      initialFilters.category = categoryParam;
    }
    
    fetchColleges(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFilterChange = (newFilters: CollegeFilters) => {
    fetchColleges({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    fetchColleges({ ...filters, page });
  };

  const handleClearFilters = () => {
    const categoryParam = searchParams.get('category');
    const clearedFilters: CollegeFilters = {
      page: 1,
      limit: 12,
    };
    
    if (categoryParam) {
      clearedFilters.category = categoryParam;
    }
    
    fetchColleges(clearedFilters);
  };

  const categoryLabel = filters.category ? `${filters.category} Colleges` : 'Explore Colleges';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryLabel}</h1>
        <p className="text-gray-600">Find and compare colleges across India</p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 mb-8 lg:mb-0">
          <SearchFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>

        {/* College Grid */}
        <div className="lg:col-span-3">
          {loading && colleges.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : error ? (
            <div className="card text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchColleges(filters)}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          ) : colleges.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600 mb-4">No colleges found matching your criteria.</p>
              <button onClick={handleClearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
