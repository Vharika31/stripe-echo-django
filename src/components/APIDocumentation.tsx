
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Copy, Key, Globe, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const APIDocumentation = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Code snippet has been copied to your clipboard.",
    });
  };

  const endpoints = [
    {
      method: "POST",
      path: "/v1/payments",
      description: "Create a new payment",
      methodColor: "bg-green-100 text-green-800"
    },
    {
      method: "GET",
      path: "/v1/payments/{id}",
      description: "Retrieve a payment",
      methodColor: "bg-blue-100 text-blue-800"
    },
    {
      method: "GET",
      path: "/v1/payments",
      description: "List all payments",
      methodColor: "bg-blue-100 text-blue-800"
    },
    {
      method: "POST",
      path: "/v1/refunds",
      description: "Create a refund",
      methodColor: "bg-green-100 text-green-800"
    },
    {
      method: "GET",
      path: "/v1/customers",
      description: "List customers",
      methodColor: "bg-blue-100 text-blue-800"
    }
  ];

  const codeExamples = {
    curl: `curl -X POST https://api.stripeclone.com/v1/payments \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "description": "Payment for services"
  }'`,
    javascript: `const stripe = require('stripeclone-node')('sk_test_...');

const payment = await stripe.payments.create({
  amount: 2000,
  currency: 'usd',
  description: 'Payment for services',
});

console.log(payment);`,
    python: `import stripeclone
stripeclone.api_key = "sk_test_..."

payment = stripeclone.Payment.create(
    amount=2000,
    currency='usd',
    description='Payment for services',
)

print(payment)`,
    php: `<?php
require_once('vendor/autoload.php');

\\StripeClone\\StripeClone::setApiKey('sk_test_...');

$payment = \\StripeClone\\Payment::create([
    'amount' => 2000,
    'currency' => 'usd',
    'description' => 'Payment for services',
]);

echo $payment;
?>`
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          API Documentation
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete reference for integrating with our payment API.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="w-5 h-5 mr-2 text-blue-600" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use your API key to authenticate requests. Include it in the Authorization header.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              Authorization: Bearer sk_test_...
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-600" />
              Base URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All API requests should be made to our secure base URL.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              https://api.stripeclone.com
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-600" />
              Rate Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              API requests are limited to ensure service quality.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Live mode:</span>
                <Badge>100/sec</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Test mode:</span>
                <Badge>25/sec</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>
              Available endpoints for payment processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Badge className={endpoint.methodColor}>
                      {endpoint.method}
                    </Badge>
                    <div>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Code className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>
              Sample code in various programming languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">Node.js</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
              </TabsList>
              {Object.entries(codeExamples).map(([language, code]) => (
                <TabsContent key={language} value={language}>
                  <div className="relative">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(code)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-600" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get up and running with our API in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Get API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Sign up and get your test and live API keys from the dashboard.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Make Test Payment</h3>
              <p className="text-sm text-muted-foreground">
                Use our test environment to process your first payment safely.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Go Live</h3>
              <p className="text-sm text-muted-foreground">
                Switch to live keys and start processing real payments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIDocumentation;
