export interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  overview: string;
  imageUrl?: string;
  placement?: Placement;
  courses?: Course[];
  reviews?: Review[];
  _count?: {
    courses: number;
  };
}

export interface Placement {
  id: number;
  collegeId: number;
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  companiesVisited: number;
}

export interface Course {
  id: number;
  name: string;
  duration: string;
  fees: number;
  collegeId: number;
}

export interface Review {
  id: number;
  collegeId: number;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CollegeListResponse {
  success: boolean;
  data: College[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CollegeFilters {
  search?: string;
  city?: string;
  state?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}
