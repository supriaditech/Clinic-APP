export interface CategoryType {
  id: number;
  name: string;
}

// Interface untuk Review
export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Interface untuk Specialist
export interface Specialist {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  totalReviews: number;
  image: string;
}

// Interface untuk Facility
export interface Facility {
  name: string;
  icon: string;
}

// Interface untuk kategori klinik
export interface ClinicType {
  id: number;
  name: string;
  type: string;
  address: string;
  rating: number;
  totalReviews: number;
  images: string[];
  tabs: string[];
  specialists: Specialist[];
  facilities: Facility[];
  reviews: Review[];
}
