declare namespace Express {
  export interface Request {
    user?: {
      aud?: string;
      exp?: number;
      sub?: string;
      email?: string;
      phone?: string;
      app_metadata?: {
        provider?: string;
        providers: any[];
      };
      user_metadata?: {
        [key: string]: any;
      };
      role?: string;
    };
  }
}
