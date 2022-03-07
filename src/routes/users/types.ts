export interface QueryUserFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
}

export interface User {
  id?: string;
  username?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: Date;
}
