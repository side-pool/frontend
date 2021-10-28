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
  id: number;
  ideaId: number;
  content: string;
  author: Author;
};

export type ReadIdeasData = Idea[];
