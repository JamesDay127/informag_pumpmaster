import { Pump } from "../types/pump"
import { demoPumps } from "./demo-data"

/**
 * Placeholder service functions for interacting with backend pumps API.
 * Interacts with demo data in demo-pumps.ts.
 * 
 * Edits/deletion are not made to the file itself, so will be reverted on refresh.
 */


export const listAllPumps = async (userId: number): Promise<Pump[]> => {
  return demoPumps.filter(pump => pump.userId === userId)
}

export const getPumpById = async (pumpId: number, userId: number): Promise<Pump> => {
  const pump = demoPumps.find(pump => pump.id === pumpId && pump.userId === userId)
  if (!pump) {
    throw new Error("Pump not found")
  }
  return pump
}

export const updatePump = async (pump: Pump, userId: number): Promise<Pump> => {
  const index = demoPumps.findIndex(p => p.id === pump.id && p.userId === userId)
  if (index === -1) {
    throw new Error("Pump not found")
  }
  demoPumps[index] = pump
  return pump
}

export const deletePump = async (pumpId: number, userId: number): Promise<void> => {
  // Real implementation would potentially soft delete instead of hard delete depending on business requirements.
  const index = demoPumps.findIndex(p => p.id === pumpId && p.userId === userId)
  if (index === -1) {
    throw new Error("Pump not found")
  }
  demoPumps.splice(index, 1)
}

