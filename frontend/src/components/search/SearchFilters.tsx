'use client';

import { CollegeFilters } from '@/types';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  filters: CollegeFilters;
  onFilterChange: (filters: CollegeFilters) => void;
  onClear: () => void;
}

export default function SearchFilters({ filters, onFilterChange, onClear }: SearchFiltersProps) {
  const handleChange = (key: keyof CollegeFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    filters.city ||
    filters.state ||
    filters.minFees ||
    filters.maxFees ||
    filters.minRating ||
    filters.sortBy !== undefined;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="College name..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city..."
            value={filters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="input-field"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            placeholder="Enter state..."
            value={filters.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="input-field"
          />
        </div>

        {/* Fee Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fee Range (₹)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minFees || ''}
              onChange={(e) => handleChange('minFees', e.target.value ? Number(e.target.value) : undefined)}
              className="input-field flex-1"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxFees || ''}
              onChange={(e) => handleChange('maxFees', e.target.value ? Number(e.target.value) : undefined)}
              className="input-field flex-1"
            />
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <input
            type="number"
            placeholder="3.0"
            min="0"
            max="5"
            step="0.1"
            value={filters.minRating || ''}
            onChange={(e) => handleChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
            className="input-field"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'name'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="input-field"
          >
            <option value="name">Name (A-Z)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="fees">Fees (Low to High)</option>
            <option value="placement">Placement (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
