'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { College } from '@/types';
import { Scale, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
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
    
    const fetchComparison = async () => {
      try {
        const data = await api.getComparison();
        setColleges(data);
      } catch (error) {
        console.error('Failed to load comparison:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, [isAuthenticated]);

  const handleRemove = async (collegeId: number) => {
    try {
      await api.removeFromComparison(collegeId);
      setColleges(colleges.filter((c) => c.id !== collegeId));
    } catch (error) {
      console.error('Failed to remove from comparison:', error);
    }
  };

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

  if (colleges.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="card text-center py-12">
          <Scale className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Colleges to Compare</h2>
          <p className="text-gray-600 mb-6">
            Add colleges to compare from the colleges page.
          </p>
          <button onClick={() => router.push('/colleges')} className="btn-primary">
            Browse Colleges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Colleges</h1>
        <p className="text-gray-600">Compare up to 3 colleges side by side</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[200px]">
                Feature
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="py-4 px-4 min-w-[300px]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{college.name}</div>
                      <div className="text-sm text-gray-600">
                        {college.city}, {college.state}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(college.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Rating</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{college.rating.toFixed(1)}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Annual Fees</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  ₹{(college.fees / 100000).toFixed(1)} L
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Average Package</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  {college.placement ? `₹${college.placement.averagePackage.toFixed(1)} L` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Highest Package</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  {college.placement ? `₹${college.placement.highestPackage.toFixed(1)} L` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Placement Rate</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  {college.placement ? `${college.placement.placementRate.toFixed(1)}%` : 'N/A'}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Number of Courses</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  {college._count?.courses || 0}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-4 px-4 text-gray-600 font-medium">Companies Visited</td>
              {colleges.map((college) => (
                <td key={college.id} className="py-4 px-4 font-semibold text-gray-900">
                  {college.placement ? college.placement.companiesVisited : 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => router.push('/colleges')} className="btn-secondary">
          Add More Colleges
        </button>
      </div>
    </div>
  );
}
