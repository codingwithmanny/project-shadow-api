export interface QueryMemberFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  orgId?: string;
  userId?: string;
}

export interface Member {
  id?: string;
  orgId?: string;
  name?: string;
  walletAddress?: string;
  validated?: Date;
  nonce?: string;
  nonceDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
