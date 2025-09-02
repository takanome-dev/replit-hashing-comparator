import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Lightbulb } from "lucide-react";

export default function CodeDisplay() {
  const javaCode = `// Java Constants
private static final String secretKey = "a17f840705bf5b57";
private static final String clientID = "5e1a25994b0a4651a25ce";
private static final String apiKey = "8fa68c172bbe4";

// JSON Flattening
private static void flattenJson(String prefix, 
    Map<String, Object> map, Map<String, String> flatMap) {
    for (Map.Entry<String, Object> entry : map.entrySet()) {
        String key = prefix.isEmpty() ? entry.getKey() 
            : prefix + "." + entry.getKey();
        Object value = entry.getValue();
        
        if (value instanceof Map) {
            flattenJson(key, (Map<String, Object>) value, flatMap);
        } else {
            flatMap.put(key, value != null ? value.toString() : "");
        }
    }
}

// HMAC Signature Generation
public static String generateHmacSignature(String data, String key) 
    throws Exception {
    Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKeySpec = new SecretKeySpec(
        key.getBytes("UTF-8"), "HmacSHA256");
    sha256_HMAC.init(secretKeySpec);
    byte[] hmacBytes = sha256_HMAC.doFinal(data.getBytes("UTF-8"));
    return Base64.getEncoder().encodeToString(hmacBytes);
}`;

  const jsCode = `// JavaScript Constants
const secretKey = "a17f840705bf5b57";
const clientID = "5e1a25994b0a4651a25ce";
const apiKey = "8fa68c172bbe4";

// JSON Flattening
function flattenJson(obj, prefix = '', flatMap = {}) {
    const sortedKeys = Object.keys(obj).sort();
    
    for (const key of sortedKeys) {
        const fullKey = prefix ? \`\${prefix}.\${key}\` : key;
        const value = obj[key];
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenJson(value, fullKey, flatMap);
        } else {
            flatMap[fullKey] = value !== null ? value.toString() : '';
        }
    }
    return flatMap;
}

// HMAC Signature Generation
function generateHmacSignature(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data, 'utf8');
    return hmac.digest('base64');
}`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      {/* Code Implementation */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <span className="mr-2 text-destructive">☕</span>
              Java Implementation
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(javaCode)}
              data-testid="button-copy-java"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <pre className="syntax-highlight rounded-md p-4 text-xs code-font overflow-x-auto">
              <code className="text-foreground">{javaCode}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <span className="mr-2 text-yellow-500">📜</span>
              JavaScript Implementation
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(jsCode)}
              data-testid="button-copy-javascript"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <pre className="syntax-highlight rounded-md p-4 text-xs code-font overflow-x-auto">
              <code className="text-foreground">{jsCode}</code>
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Notes */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="text-yellow-500 mr-2" />
            Implementation Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Key Differences</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">›</span>
                  AES encryption may differ due to different padding schemes
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">›</span>
                  JavaScript uses Node.js crypto module for server-side compatibility
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 mt-1">›</span>
                  UTF-8 encoding handling varies between platforms
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Compatibility Notes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">›</span>
                  HMAC-SHA256 signatures should always match
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">›</span>
                  Base64 encoding is consistent across platforms
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">›</span>
                  JSON flattening algorithm produces identical results
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
