export interface QueryHookFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  orgId?: string;
  userId?: string;
}

export interface Hook {
  id?: string;
  orgId?: string;
  name?: string;
  method?: string;
  url?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
