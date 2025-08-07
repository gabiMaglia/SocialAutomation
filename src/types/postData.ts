// APP TYPES

export interface PostData {
  id?: number;
  title?: string;
  output: string;
  date?: string;  
  imageUrl?: string;
  posted?:boolean; 
  socialNetwork?:SocialMedia
}

export type SocialMedia = 'facebook' | 'linkedin' | null ;

// CLOUDINARY
export interface SearchApiResponse {
  resources: Array<{
    public_id: string;
    secure_url: string;
    bytes: number;
    format: string;
    created_at: string;
    // ...
  }>;
  total_count?: number;
  time?: number;
  next_cursor?: string;
}