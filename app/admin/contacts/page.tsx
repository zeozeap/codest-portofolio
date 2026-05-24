"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Loader2 } from "lucide-react";
import { contactApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  reply?: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    contactApi.getAll()
      .then(res => setContacts(res.data))
      .catch(() => toast({ title: "Error", description: "Failed to load messages" }));
  }, [toast]);

  const handleReply = async () => {
    if (!selectedContact || !replyText.trim()) return;
    setLoading(true);
    try {
      await contactApi.reply(selectedContact._id, replyText);
      toast({ title: "Reply sent", description: `Reply sent to ${selectedContact.email}` });
      setReplyText("");
      setSelectedContact(null);
    } catch {
      toast({ title: "Error", description: "Failed to send reply" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">View and reply to contact messages</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>{contacts.length} messages</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 text-left border-b hover:bg-muted/50 ${
                    selectedContact?._id === contact._id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{contact.subject}</p>
                    </div>
                    {!contact.isRead && <Badge>New</Badge>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedContact ? selectedContact.subject : "Select a message"}
            </CardTitle>
            {selectedContact && (
              <CardDescription>
                From: {selectedContact.name} ({selectedContact.email})
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">{selectedContact.message}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reply</label>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleReply} disabled={loading || !replyText.trim()}>
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" /> Send Reply</>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-center">
                <div>
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Select a message to view and reply</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}