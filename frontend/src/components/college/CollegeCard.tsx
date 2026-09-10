'use client';

import Link from 'next/link';
import { College } from '@/types';
import { MapPin, IndianRupee, Star, BookOpen, TrendingUp, Heart, Scale } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface CollegeCardProps {
  college: College;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80';

export default function CollegeCard({ college }: CollegeCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    try {
      if (isSaved) {
        await api.unsaveCollege(college.id);
        setIsSaved(false);
      } else {
        await api.saveCollege(college.id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to save college:', error);
    }
  };

  const handleCompare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    try {
      if (isComparing) {
        await api.removeFromComparison(college.id);
        setIsComparing(false);
      } else {
        await api.addToComparison(college.id);
        setIsComparing(true);
      }
    } catch (error) {
      console.error('Failed to add to comparison:', error);
      alert(error instanceof Error ? error.message : 'Failed to add to comparison');
    }
  };

  const imageUrl = imageError ? FALLBACK_IMAGE : (college.imageUrl || FALLBACK_IMAGE);

  return (
    <Link href={`/colleges/${college.id}`}>
      <div className="card hover:shadow-lg transition-all h-full flex flex-col">
        <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-xl overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={college.name}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {college.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {college.city}, {college.state}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-semibold">{college.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <IndianRupee className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {(college.fees / 100000).toFixed(1)}L
              </span>
            </div>
          </div>

          {college.placement && (
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                <span>
                  Avg: ₹{(college.placement.averagePackage).toFixed(1)}L
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{college._count?.courses || 0} courses</span>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex gap-2">
          <button
            onClick={handleSave}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              isSaved
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handleCompare}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
              isComparing
                ? 'bg-primary-50 text-primary-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Scale className="h-4 w-4" />
            <span className="text-sm">{isComparing ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
