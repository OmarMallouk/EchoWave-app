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
  
  export interface UserLyrics {
    lyrics: Lyric[];
  }