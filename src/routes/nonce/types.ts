export interface QueryNonceFilters {
  query?: string | null;
  take?: number;
  skip?: number;
  orderBy?: string;
  sort?: string;
  orgFormId?: string;
}

export interface NonceType {
  id?: string;
  nonce?: string;
  createdAt?: Date;
  orgFormId?: string;
}
