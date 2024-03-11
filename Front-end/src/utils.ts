import { User } from "./types";

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// this funciton is used to logout the user
export const clearUserInfo = (): void => {
  localStorage.clear();
  window.location.reload();
};
