'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { College } from '@/types';
import { MapPin, IndianRupee, Star, BookOpen, TrendingUp, Building2, Users, Heart, Scale, ArrowLeft, Loader2 } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80';

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await api.getCollegeById(parseInt(params.id as string));
        setCollege(response.data);
      } catch (err) {
        setError('College not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [params.id]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      if (isSaved) {
        await api.unsaveCollege(college!.id);
        setIsSaved(false);
      } else {
        await api.saveCollege(college!.id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to save college:', error);
    }
  };

  const handleCompare = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      if (isComparing) {
        await api.removeFromComparison(college!.id);
        setIsComparing(false);
      } else {
        await api.addToComparison(college!.id);
        setIsComparing(true);
      }
    } catch (error) {
      console.error('Failed to add to comparison:', error);
      alert(error instanceof Error ? error.message : 'Failed to add to comparison');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">College Not Found</h2>
          <p className="text-gray-600 mb-6">The college you&apos;re looking for doesn&apos;t exist.</p>
          <button onClick={() => router.push('/colleges')} className="btn-primary">
            <ArrowLeft className="h-4 w-4 inline mr-2" />
            Back to Colleges
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = imageError ? FALLBACK_IMAGE : (college.imageUrl || FALLBACK_IMAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/colleges')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Colleges
      </button>

      {/* Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden flex-shrink-0 relative">
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
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{college.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {college.city}, {college.state}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{college.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                  isSaved
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleCompare}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                  isComparing
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Scale className="h-4 w-4" />
                {isComparing ? 'Added' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-600">{college.overview}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <IndianRupee className="h-6 w-6 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            ₹{(college.fees / 100000).toFixed(1)}L
          </div>
          <div className="text-sm text-gray-600">Annual Fees</div>
        </div>
        <div className="card text-center">
          <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{college.rating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
        <div className="card text-center">
          <BookOpen className="h-6 w-6 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{college._count?.courses || 0}</div>
          <div className="text-sm text-gray-600">Courses</div>
        </div>
        {college.placement && (
          <div className="card text-center">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              ₹{college.placement.averagePackage.toFixed(1)}L
            </div>
            <div className="text-sm text-gray-600">Avg Package</div>
          </div>
        )}
      </div>

      {/* Placement Statistics */}
      {college.placement && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Placement Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Average Package</div>
              <div className="text-lg font-semibold">₹{college.placement.averagePackage.toFixed(1)} LPA</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Highest Package</div>
              <div className="text-lg font-semibold">₹{college.placement.highestPackage.toFixed(1)} LPA</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Placement Rate</div>
              <div className="text-lg font-semibold">{college.placement.placementRate.toFixed(1)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Companies Visited</div>
              <div className="text-lg font-semibold">{college.placement.companiesVisited}</div>
            </div>
          </div>
        </div>
      )}

      {/* Courses */}
      {college.courses && college.courses.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Courses Offered</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {college.courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-1">{course.name}</div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{course.duration}</span>
                  <span>₹{(course.fees / 100000).toFixed(1)}L</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {college.reviews && college.reviews.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {college.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{review.rating.toFixed(1)}</span>
                  <span className="text-gray-600">by {review.author}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
