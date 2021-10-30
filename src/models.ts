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

export type Side = {
  active: string;
  category: string[];
  createdDate?: string;
  favoriteCount?: number;
  id?: number;
  logoUrl?: string;
  recruiting?: boolean;
  summary: string;
  title: string;
  updatedDate?: string;
};
