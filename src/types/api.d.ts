declare type ApiResponse<T> = {
    statusCode: number;
    success: boolean;
    errors?: unknown;
    data: T;
  };
  
  declare type User = {
    userId: string;
    username: string;
    email: string;
    expToken: number;
    token: string;
  };