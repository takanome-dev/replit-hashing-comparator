import { type ComparisonResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  storeComparison(result: ComparisonResult): Promise<{ id: string; result: ComparisonResult }>;
  getComparison(id: string): Promise<{ id: string; result: ComparisonResult } | undefined>;
}

export class MemStorage implements IStorage {
  private comparisons: Map<string, { id: string; result: ComparisonResult }>;

  constructor() {
    this.comparisons = new Map();
  }

  async storeComparison(result: ComparisonResult): Promise<{ id: string; result: ComparisonResult }> {
    const id = randomUUID();
    const stored = { id, result };
    this.comparisons.set(id, stored);
    return stored;
  }

  async getComparison(id: string): Promise<{ id: string; result: ComparisonResult } | undefined> {
    return this.comparisons.get(id);
  }
}

export const storage = new MemStorage();
