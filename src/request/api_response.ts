export type ApiResponse<T> = {
  status: number;
  body?: T | MessageResponse;
};

export type TokenResponse = { token: string };
export type MessageResponse = { message: string };
