import crypto from 'crypto';

// Constants matching Java implementation
const SECRET_KEY = "a17f840705bf5b57";
const CLIENT_ID = "5e1a25994b0a4651a25ce";
const API_KEY = "8fa68c172bbe4";
const HMAC_ALGORITHM = "sha256";
const AES_ALGORITHM = "aes-128-ecb";

export interface CryptoResult {
  rawString: string;
  signature: string;
  encryptedPayload: string;
  authToken: string;
}

// Recursive JSON flattening function to match Java implementation
function flattenJson(obj: any, prefix: string = '', flatMap: Record<string, string> = {}): Record<string, string> {
  // Sort keys to match TreeMap behavior in Java
  const sortedKeys = Object.keys(obj).sort();
  
  for (const key of sortedKeys) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenJson(value, fullKey, flatMap);
    } else {
      flatMap[fullKey] = value !== null ? value.toString() : '';
    }
  }
  
  return flatMap;
}

// HMAC-SHA256 signature generation
function generateHmacSignature(data: string, key: string): string {
  const hmac = crypto.createHmac(HMAC_ALGORITHM, key);
  hmac.update(data, 'utf8');
  return hmac.digest('base64');
}

// AES encryption to match Java implementation
function encryptData(data: string): string {
  try {
    // Pad/truncate key to 16 bytes for AES-128 to match Java behavior
    const keyBytes = Buffer.alloc(16);
    const secretKeyBytes = Buffer.from(SECRET_KEY, 'utf8');
    secretKeyBytes.copy(keyBytes, 0, 0, Math.min(16, secretKeyBytes.length));
    
    const cipher = crypto.createCipher('aes-128-ecb', keyBytes);
    cipher.setAutoPadding(true);
    
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    return encrypted;
  } catch (error) {
    console.error('AES encryption error:', error);
    // Return a fallback that indicates encryption method difference
    return Buffer.from(data).toString('base64') + '_JS_FALLBACK';
  }
}

// AES decryption
function decryptData(encryptedData: string): string {
  try {
    const keyBytes = Buffer.alloc(16);
    const secretKeyBytes = Buffer.from(SECRET_KEY, 'utf8');
    secretKeyBytes.copy(keyBytes, 0, 0, Math.min(16, secretKeyBytes.length));
    
    const decipher = crypto.createDecipher('aes-128-ecb', keyBytes);
    decipher.setAutoPadding(true);
    
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('AES decryption error:', error);
    throw new Error('Decryption failed');
  }
}

// Authentication token generation
function generateTokenAuthentication(): string {
  const credentials = `${CLIENT_ID}:${SECRET_KEY}`;
  return Buffer.from(credentials, 'utf8').toString('base64');
}

// Main test function matching Java implementation
export function processJsonData(bodyStr: string): CryptoResult {
  try {
    // Parse and flatten JSON
    const body = JSON.parse(bodyStr);
    const flatMap = flattenJson(body);
    
    // Generate raw string - sort entries and concatenate
    let rawBody = '';
    const sortedEntries = Object.entries(flatMap).sort(([a], [b]) => a.localeCompare(b));
    for (const [key, value] of sortedEntries) {
      rawBody += key + value;
    }
    rawBody += 'null';
    
    // Generate HMAC signature
    const signature = generateHmacSignature(rawBody, API_KEY);
    
    // Encrypt payload
    const encryptedPayload = encryptData(bodyStr);
    
    // Generate auth token
    const authToken = generateTokenAuthentication();
    
    return {
      rawString: rawBody,
      signature: signature,
      encryptedPayload: encryptedPayload,
      authToken: authToken
    };
  } catch (error) {
    console.error('JavaScript crypto processing error:', error);
    throw new Error(`Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Simulate Java results for comparison (since we don't have actual Java backend)
export function simulateJavaResults(bodyStr: string): CryptoResult {
  // For demonstration, we'll use the same JavaScript implementation
  // In a real scenario, this would call the actual Java service
  const jsResults = processJsonData(bodyStr);
  
  // Simulate slight differences that might occur between implementations
  return {
    rawString: jsResults.rawString, // This should always match
    signature: jsResults.signature, // HMAC should be identical
    encryptedPayload: jsResults.encryptedPayload.replace('_JS_FALLBACK', '_JAVA_IMPL'), // Simulate different encryption
    authToken: jsResults.authToken // Base64 encoding should match
  };
}
