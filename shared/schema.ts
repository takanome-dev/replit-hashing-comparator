import { z } from "zod";

export const cryptoResultSchema = z.object({
  rawString: z.string(),
  signature: z.string(),
  encryptedPayload: z.string(),
  authToken: z.string(),
});

export const comparisonRequestSchema = z.object({
  jsonData: z.string(),
});

export const comparisonResultSchema = z.object({
  javaResults: cryptoResultSchema,
  javascriptResults: cryptoResultSchema,
  validationStatus: z.object({
    rawStringMatch: z.boolean(),
    signatureMatch: z.boolean(),
    encryptionMatch: z.boolean(),
    authTokenMatch: z.boolean(),
  }),
});

export type CryptoResult = z.infer<typeof cryptoResultSchema>;
export type ComparisonRequest = z.infer<typeof comparisonRequestSchema>;
export type ComparisonResult = z.infer<typeof comparisonResultSchema>;
