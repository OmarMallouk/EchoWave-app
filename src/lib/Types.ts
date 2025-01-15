export interface User {
  channelName: string;
  description: string;
  username: string;
  profile_picture: string;
  _id: string;
  role: string;
  bookmarkedChannels: { channelName: string; profile_picture: string, _id: string; }[],
  }

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

  export interface Song {
    title: string;
    _id: string;
    content: string;
    comments?: {
      content: string;
      user: string;
      _id: string;
      profile_picture: string;
      producerId: string;
      created_at: string;
    }[];
  }
  
  export interface UserLyrics {
    lyrics: Lyric[];
  }