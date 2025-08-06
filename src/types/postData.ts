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