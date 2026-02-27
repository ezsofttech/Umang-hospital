export type Doctor = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  tag?: string;
  role: string;
  qualification?: string;
  about?: string;
  specializations?: string;
  image?: string;
  experience?: string;
  department?: string;
  departmentDescription?: string;
  departmentHref?: string;
  expertise?: string[];
  active?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateDoctorInput = {
  name: string;
  slug: string;
  tag?: string;
  role: string;
  qualification?: string;
  about?: string;
  specializations?: string;
  image?: string;
  experience?: string;
  department?: string;
  departmentDescription?: string;
  departmentHref?: string;
  expertise?: string[];
  active?: boolean;
};
