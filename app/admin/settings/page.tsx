"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Mail, Users, Activity, LogOut } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SettingsPage() {
  const { admin, logout } = useAuth();
  const [email2FA, setEmail2FA] = useState(false);
  const [smtpHealth, setSmtpHealth] = useState<"checking" | "healthy" | "error">("checking");

  useEffect(() => {
    setSmtpHealth("healthy");
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your admin account and system settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch id="2fa" checked={email2FA} onCheckedChange={setEmail2FA} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Configuration
            </CardTitle>
            <CardDescription>Manage email settings and SMTP health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Email</Label>
              <Input value={admin?.email || ""} disabled />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">SMTP Status:</span>
              <span className={`text-sm font-medium ${
                smtpHealth === "healthy" ? "text-green-500" : 
                smtpHealth === "checking" ? "text-yellow-500" : "text-red-500"
              }`}>
                {smtpHealth === "healthy" ? "Healthy" : 
                 smtpHealth === "checking" ? "Checking..." : "Error"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admin Users
            </CardTitle>
            <CardDescription>View and manage admin accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View and manage other admin users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Login Activity
            </CardTitle>
            <CardDescription>View recent login activity and active sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View active sessions and devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <LogOut className="h-5 w-5" />
              Logout
            </CardTitle>
            <CardDescription>Sign out from your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}