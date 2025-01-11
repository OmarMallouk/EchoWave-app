export interface Lyric {
  _id: string;
  title: string;
  content: string;
  user: string;
  mood: Array<{ name: string }>;
  genre: Array<{ name: string }>;
  createdAt: string;
  updatedAt: string;

  }

  export interface Song  {
    title: string;
    _id: string;
    content: string;
    comments?: {
       content: string;
       user: string;
       _id: string;
        created_at: string }[];
};
  
  export interface UserLyrics {
    lyrics: Lyric[];
  }