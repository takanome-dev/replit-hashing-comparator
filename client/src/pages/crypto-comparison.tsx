import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Edit, FolderInput, Trash, Play, Cog } from "lucide-react";
import ComparisonPanel from "@/components/comparison-panel";
import ValidationStatus from "@/components/validation-status";
import CodeDisplay from "@/components/code-display";
import type { ComparisonResult } from "@shared/schema";

export default function CryptoComparison() {
  const [jsonInput, setJsonInput] = useState('');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const { toast } = useToast();

  const compareMutation = useMutation({
    mutationFn: async (jsonData: string) => {
      const response = await apiRequest("POST", "/api/crypto/compare", { jsonData });
      return response.json();
    },
    onSuccess: (data) => {
      setComparisonResult(data);
      toast({
        title: "Comparison Complete",
        description: "Cryptographic operations have been executed and compared.",
      });
    },
    onError: (error) => {
      toast({
        title: "Comparison Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });

  const handleLoadSample = () => {
    const sampleData = {
      "user": {
        "name": "John Doe",
        "age": 30
      },
      "amount": 100.50,
      "currency": "USD"
    };
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };

  const handleClear = () => {
    setJsonInput('');
    setComparisonResult(null);
  };

  const handleRunComparison = () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter JSON data to test",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(jsonInput); // Validate JSON
      compareMutation.mutate(jsonInput);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Crypto Comparison Tool</h1>
                <p className="text-sm text-muted-foreground">Java vs JavaScript Implementation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-accent rounded-full">
                <span className="text-xs font-medium text-accent-foreground">v1.0</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-settings">
                <Cog className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Input Section */}
        <div className="mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center">
                  <Edit className="text-accent mr-2" />
                  Test Input
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleLoadSample}
                    data-testid="button-load-sample"
                  >
                    <FolderInput className="mr-2 h-4 w-4" />
                    Load Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    data-testid="button-clear"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    JSON Input Data
                  </label>
                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full h-32 code-font text-sm resize-none bg-input border-border"
                    placeholder='{"user": {"name": "John Doe", "age": 30}, "amount": 100.50, "currency": "USD"}'
                    data-testid="input-json-data"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleRunComparison}
                    disabled={compareMutation.isPending}
                    className="px-8 py-3 bg-primary text-primary-foreground font-medium"
                    data-testid="button-run-comparison"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {compareMutation.isPending ? "Processing..." : "Run Comparison"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Results */}
        {comparisonResult && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ComparisonPanel
                title="Java Implementation"
                icon="java"
                results={comparisonResult.javaResults}
                data-testid="panel-java"
              />
              <ComparisonPanel
                title="JavaScript Implementation"
                icon="javascript"
                results={comparisonResult.javascriptResults}
                data-testid="panel-javascript"
              />
            </div>

            <ValidationStatus validationStatus={comparisonResult.validationStatus} />

            <CodeDisplay />

            {/* Detailed Comparison Table */}
            <Card className="bg-card border-border mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="text-accent mr-2" />
                  Detailed Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="table-comparison">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Operation</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Java Result</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">JavaScript Result</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-foreground">JSON Flattening</td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-java-flattening">
                          {comparisonResult.javaResults.rawString.substring(0, 20)}...
                        </td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-js-flattening">
                          {comparisonResult.javascriptResults.rawString.substring(0, 20)}...
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comparisonResult.validationStatus.rawStringMatch 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-destructive/20 text-destructive'
                          }`}>
                            {comparisonResult.validationStatus.rawStringMatch ? 'Match' : 'Differ'}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-foreground">HMAC Signature</td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-java-signature">
                          {comparisonResult.javaResults.signature.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-js-signature">
                          {comparisonResult.javascriptResults.signature.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comparisonResult.validationStatus.signatureMatch 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-destructive/20 text-destructive'
                          }`}>
                            {comparisonResult.validationStatus.signatureMatch ? 'Match' : 'Differ'}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium text-foreground">AES Encryption</td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-java-encryption">
                          {comparisonResult.javaResults.encryptedPayload.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-js-encryption">
                          {comparisonResult.javascriptResults.encryptedPayload.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comparisonResult.validationStatus.encryptionMatch 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-destructive/20 text-destructive'
                          }`}>
                            {comparisonResult.validationStatus.encryptionMatch ? 'Match' : 'Differ'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-foreground">Auth Token</td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-java-token">
                          {comparisonResult.javaResults.authToken.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4 code-font text-muted-foreground max-w-xs truncate" data-testid="text-js-token">
                          {comparisonResult.javascriptResults.authToken.substring(0, 15)}...
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            comparisonResult.validationStatus.authTokenMatch 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-destructive/20 text-destructive'
                          }`}>
                            {comparisonResult.validationStatus.authTokenMatch ? 'Match' : 'Differ'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
