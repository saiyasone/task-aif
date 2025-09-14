import type { BaseResponse } from "./base";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

export type PostResponse = BaseResponse<Post>;
export type PostsResponse = BaseResponse<Post[]>;
