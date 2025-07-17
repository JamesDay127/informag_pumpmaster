import { UserForFrontend } from "../types/user"
import { demoUsers } from "./demo-data"

/**
 * Placeholder service functions for interacting with backend users API.
 * Interacts with demo data in demo-users.ts.
 */

export const getUserById = async (id: number): Promise<UserForFrontend> => {
  const user = demoUsers.find(user => user.id === id)

  if (!user) {
    throw new Error("User not found")
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
  }
}

/**
 * Real implementation would either check against DB and return JWT etc. or use third party auth like AWS Cognito.
 */
export const login = async (username: string, password: string): Promise<UserForFrontend> => {
  const user = demoUsers.find(user => user.username === username && user.password === password)

  if (!user) {
    throw new Error("Invalid username or password")
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
  }
}


