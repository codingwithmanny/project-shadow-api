export interface QueryOrgFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  include?: string;
  userId?: string;
}

export interface Org {
  id?: string;
  name?: string;
  apiKey?: string;
  secretKey?: string;
  public?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
