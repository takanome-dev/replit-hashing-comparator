import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CryptoResult } from "@shared/schema";

interface ComparisonPanelProps {
  title: string;
  icon: "java" | "javascript";
  results: CryptoResult;
  "data-testid"?: string;
}

export default function ComparisonPanel({ title, icon, results, "data-testid": testId }: ComparisonPanelProps) {
  const iconClass = icon === "java" ? "text-destructive" : "text-yellow-500";
  const iconSymbol = icon === "java" ? "☕" : "📜"; // Using Unicode symbols since we can't use react-icons

  return (
    <Card className="bg-card border-border" data-testid={testId}>
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center">
          <span className={`mr-2 ${iconClass}`}>{iconSymbol}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Raw String</label>
          <div 
            className="p-3 bg-muted rounded-md code-font text-sm text-foreground border border-border min-h-[60px] break-all"
            data-testid={`text-${icon}-raw-string`}
          >
            {results.rawString}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">HMAC Signature</label>
          <div 
            className="p-3 bg-muted rounded-md code-font text-sm text-foreground border border-border min-h-[40px] break-all"
            data-testid={`text-${icon}-signature`}
          >
            {results.signature}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Encrypted Payload</label>
          <div 
            className="p-3 bg-muted rounded-md code-font text-sm text-foreground border border-border min-h-[60px] break-all"
            data-testid={`text-${icon}-encrypted`}
          >
            {results.encryptedPayload}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Auth Token</label>
          <div 
            className="p-3 bg-muted rounded-md code-font text-sm text-foreground border border-border min-h-[40px] break-all"
            data-testid={`text-${icon}-auth-token`}
          >
            {results.authToken}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
