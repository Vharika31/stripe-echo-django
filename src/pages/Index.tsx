
import { useState } from "react";
import { CreditCard, DollarSign, Users, TrendingUp, Settings, Book, Key, BarChart3, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import PaymentForm from "@/components/PaymentForm";
import TransactionsList from "@/components/TransactionsList";
import APIDocumentation from "@/components/APIDocumentation";
import DashboardStats from "@/components/DashboardStats";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "payments":
        return <PaymentForm />;
      case "transactions":
        return <TransactionsList />;
      case "api":
        return <APIDocumentation />;
      default:
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back! Here's what's happening with your payments.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Create Payment
              </Button>
            </div>
            
            <DashboardStats />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: "pay_123", amount: "$299.00", status: "succeeded", time: "2 minutes ago" },
                      { id: "pay_124", amount: "$150.00", status: "pending", time: "5 minutes ago" },
                      { id: "pay_125", amount: "$89.99", status: "succeeded", time: "10 minutes ago" },
                    ].map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-white/60 backdrop-blur-sm">
                        <div>
                          <p className="font-medium">{payment.id}</p>
                          <p className="text-sm text-muted-foreground">{payment.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{payment.amount}</p>
                          <Badge variant={payment.status === "succeeded" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>PCI DSS Compliance</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SSL Certificate</span>
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fraud Detection</span>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Two-Factor Auth</span>
                      <Badge className="bg-green-100 text-green-800">On</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
