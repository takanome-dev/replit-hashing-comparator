import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processJsonData, simulateJavaResults } from "./services/crypto-utils";
import { comparisonRequestSchema, type ComparisonResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Run crypto comparison endpoint
  app.post("/api/crypto/compare", async (req, res) => {
    try {
      const { jsonData } = comparisonRequestSchema.parse(req.body);
      
      // Process with JavaScript implementation
      const javascriptResults = processJsonData(jsonData);
      
      // Simulate Java results (in real implementation, this would call Java service)
      const javaResults = simulateJavaResults(jsonData);
      
      // Compare results and generate validation status
      const validationStatus = {
        rawStringMatch: javaResults.rawString === javascriptResults.rawString,
        signatureMatch: javaResults.signature === javascriptResults.signature,
        encryptionMatch: javaResults.encryptedPayload === javascriptResults.encryptedPayload,
        authTokenMatch: javaResults.authToken === javascriptResults.authToken,
      };
      
      const result: ComparisonResult = {
        javaResults,
        javascriptResults,
        validationStatus,
      };
      
      // Store the comparison result
      const stored = await storage.storeComparison(result);
      
      res.json({ id: stored.id, ...result });
    } catch (error) {
      console.error('Comparison error:', error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
  });

  // Get stored comparison result
  app.get("/api/crypto/compare/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const stored = await storage.getComparison(id);
      
      if (!stored) {
        return res.status(404).json({ error: 'Comparison not found' });
      }
      
      res.json(stored);
    } catch (error) {
      console.error('Retrieval error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
