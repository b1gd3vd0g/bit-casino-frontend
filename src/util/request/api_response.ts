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
export type BalanceResponse = { balance: number };
export type StreakResponse = { streak: number };

export type BonusResponse = { available: boolean; streak: number };
