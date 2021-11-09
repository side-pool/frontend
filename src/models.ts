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

export type Similar = {
  author: Author;
  id: number;
  ideaId: number;
  createdDate: string;
  updatedDate: string;
  url: string;
  description: string;
};

export type SimilarState = Pick<Similar, 'url' | 'description'>;

export type ReadIdeasData = Idea[];
export type ReadCommentsData = Comment[];
export type ReadSimilarData = Similar[];

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

export type SideParams = {
  category?: string[];
  isRecruiting?: boolean;
  organization?: string[];
  page?: number;
  search?: string[];
  size?: number;
  skill?: string[];
  sort?:
    | 'createdDate,asc'
    | 'favoriteCount,asc'
    | 'createdDate,desc'
    | 'favoriteCount,desc';
};

export type ReadSidesData = Side[];
