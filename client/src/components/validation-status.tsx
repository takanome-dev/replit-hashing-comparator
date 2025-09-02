import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

interface ValidationStatusProps {
  validationStatus: {
    rawStringMatch: boolean;
    signatureMatch: boolean;
    encryptionMatch: boolean;
    authTokenMatch: boolean;
  };
}

export default function ValidationStatus({ validationStatus }: ValidationStatusProps) {
  const getStatusColor = (isMatch: boolean) => 
    isMatch ? "bg-primary" : "bg-destructive";

  return (
    <Card className="bg-card border-border mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCheck className="text-primary mr-2" />
          Validation Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg" data-testid="status-raw-string">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(validationStatus.rawStringMatch)}`}></div>
            <span className="text-sm font-medium text-foreground">Raw String Match</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg" data-testid="status-signature">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(validationStatus.signatureMatch)}`}></div>
            <span className="text-sm font-medium text-foreground">Signature Match</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg" data-testid="status-encryption">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(validationStatus.encryptionMatch)}`}></div>
            <span className="text-sm font-medium text-foreground">Encryption Match</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg" data-testid="status-auth-token">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(validationStatus.authTokenMatch)}`}></div>
            <span className="text-sm font-medium text-foreground">Auth Token Match</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
