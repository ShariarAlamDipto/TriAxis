export interface Subject {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ExamType {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Booklet {
  id: string;
  title: string;
  description?: string;
  price: number;
  cover_image_url?: string;
  exam_type_id?: string;
  subject_id?: string;
  is_physical: boolean;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  exam_type?: ExamType;
}

export interface Paper {
  id: string;
  subject_id: string;
  exam_type_id: string;
  year: number;
  title: string;
  paper_number?: string;
  description?: string;
  file_url: string;
  cover_image_url?: string;
  is_premium: boolean;
  price: number;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  exam_type?: ExamType;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  paper_id: string;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  paper?: Paper;
}
