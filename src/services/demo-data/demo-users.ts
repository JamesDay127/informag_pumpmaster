import { User } from "../../types/user";

/**
 * This file will be used in place of a database for simplicity
 */
export const demoUsers: User[] = [
  {
    id: 1,
    name: "Demo User",
    username: "demo",
    password: "password1", // In real app either hash password in DB or use AWS cognito
  },
  {
    id: 2,
    name: "Demo User 2",
    username: "demouser",
    password: "password2",
  },
  {
    id: 3,
    name: "Demo User 3",
    username: "demouser3",
    password: "password3",
  }
]