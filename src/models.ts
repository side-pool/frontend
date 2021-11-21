export interface UserData {
  username: string;
  password: string;
  nickname: string;
}

export interface MyData extends Exclude<UserData, 'password'> {
  id: number;
  point: number;
  level: number;
}

export type Author = {
  id: number;
  nickname: string;
  level: number;
};

export interface Favorites {
  isFavorite: boolean | null;
  favoriteCount: number;
}

export type Idea = {
  id: number;
  title: string;
  content: string;
  author: Author;
  isDone: boolean;
  hashtags: string[];
  createdDate: string;
  updatedDate: string;
} & Favorites;

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
  category: string[];
  organization: number[];
  skill: number[];
  isRecruiting?: boolean;
  page: number;
  search?: string[];
  size: number;
  sort:
    | 'createdDate,asc'
    | 'favoriteCount,asc'
    | 'createdDate,desc'
    | 'favoriteCount,desc';
  commentTag: number;
};

export type SideComment = Omit<Comment, 'ideaId'> & {
  commentTag?: number;
  sideId: number;
};

export type ReadSidesData = Side[];
export type ReadSidesCommentData = SideComment[];

export type Alarm = {
  content: string;
  createdDate: string;
  endPoint: string;
  id: number;
  messageType: string;
  postType: string;
  read: boolean;
  title: string;
  updatedDate: string;
  postId: number;
};

export type AlarmData = Alarm[];

export type HashTagInfo = {
  word: string;
  count: number;
};

export type MiniIdea = {
  content: string;
  createdDate?: string;
  hashtags: string[];
  id?: number;
  isDone: boolean;
  title: string;
  updatedDate?: string;
};

export type MiniIdeaData = MiniIdea[];

export type MyComment = Comment & {
  title: string;
  type: string;
  postId: number;
};
