export type ApiResponse<T> = {
  status: number;
  body?: T | MessageResponse;
};

export type PlayerResponse = {
  id: string;
  email: string;
  username: string;
  created_at: string;
};

export type TokenResponse = { token: string };
export type MessageResponse = { message: string };
