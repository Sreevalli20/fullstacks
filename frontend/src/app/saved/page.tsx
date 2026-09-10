'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { College } from '@/types';
import CollegeCard from '@/components/college/CollegeCard';
import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (!token) {
      router.push('/login');
      return;
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchSavedColleges = async () => {
      try {
        const data = await api.getSavedColleges();
        setColleges(data);
      } catch (error) {
        console.error('Failed to load saved colleges:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedColleges();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Colleges</h1>
        <p className="text-gray-600">Your favorite colleges</p>
      </div>

      {colleges.length === 0 ? (
        <div className="card text-center py-12">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Saved Colleges</h2>
          <p className="text-gray-600 mb-6">
            Save colleges to view them here later.
          </p>
          <button onClick={() => router.push('/colleges')} className="btn-primary">
            Browse Colleges
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
