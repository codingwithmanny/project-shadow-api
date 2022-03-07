export interface QueryFormFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  orgId?: string;
  userId?: string;
}

export interface Form {
  id?: string;
  orgId?: string;
  name?: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
