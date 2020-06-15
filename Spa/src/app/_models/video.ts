export interface Video {
  id: number;
  title: string;
  intro: string;
  videoUrl: string;
  datePosted: Date
  category: string;
  author: string;
  views?: number;
  thumbnailUrl:string;
}
