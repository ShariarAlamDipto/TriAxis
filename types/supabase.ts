export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      booklets: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          cover_image_url: string | null
          exam_type_id: string | null
          subject_id: string | null
          is_physical: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price?: number
          cover_image_url?: string | null
          exam_type_id?: string | null
          subject_id?: string | null
          is_physical?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          cover_image_url?: string | null
          exam_type_id?: string | null
          subject_id?: string | null
          is_physical?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      papers: {
        Row: {
          id: string
          subject_id: string
          exam_type_id: string
          year: number
          title: string
          paper_number: string | null
          description: string | null
          file_url: string
          cover_image_url: string | null
          is_premium: boolean | null
          price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subject_id: string
          exam_type_id: string
          year: number
          title: string
          paper_number?: string | null
          description?: string | null
          file_url: string
          cover_image_url?: string | null
          is_premium?: boolean | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subject_id?: string
          exam_type_id?: string
          year?: number
          title?: string
          paper_number?: string | null
          description?: string | null
          file_url?: string
          cover_image_url?: string | null
          is_premium?: boolean | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          paper_id: string | null
          booklet_id: string | null
          amount: number
          payment_method: string | null
          transaction_id: string | null
          payment_status: string | null
          created_at: string
          address: string | null
          delivery_charge: number | null
        }
        Insert: {
          id?: string
          user_id: string
          paper_id?: string | null
          booklet_id?: string | null
          amount: number
          payment_method?: string | null
          transaction_id?: string | null
          payment_status?: string | null
          created_at?: string
          address?: string | null
          delivery_charge?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          paper_id?: string | null
          booklet_id?: string | null
          amount?: number
          payment_method?: string | null
          transaction_id?: string | null
          payment_status?: string | null
          created_at?: string
          address?: string | null
          delivery_charge?: number | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          is_admin: boolean | null
          created_at: string
          updated_at: string
          address: string | null
          phone: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          is_admin?: boolean | null
          created_at?: string
          updated_at?: string
          address?: string | null
          phone?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          is_admin?: boolean | null
          created_at?: string
          updated_at?: string
          address?: string | null
          phone?: string | null
        }
      }
    }
  }
}
