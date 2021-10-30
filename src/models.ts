export interface UserData {
  username: string;
  password: string;
  nickname: string;
}

export interface MyData extends Exclude<UserData, 'password'> {
  id: number;
  point: number;
}

export type Author = {
  id: number;
  nickname: string;
  level: number;
};

export type Idea = {
  id: number;
  title: string;
  content: string;
  author: Author;
  isFavorite: boolean | null;
  favoriteCount: number;
  isDone: boolean;
  hashtags: string[];
  createdDate: string;
  updatedDate: string;
};

export type Comment = {
  author: Author;
  id: number;
  ideaId: number;
  content: string;
  createdDate: string;
  updatedDate: string;
};

export type ReadIdeasData = Idea[];
export type ReadCommentData = Comment[];
