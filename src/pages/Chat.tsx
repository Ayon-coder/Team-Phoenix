import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { products } from "@/data/products";
import {
  getCurrentUser,
  getConversationMessages,
  saveMessage,
  markMessagesAsRead,
} from "@/lib/storage";
import { Message } from "@/types";

const Chat = () => {
  const { productId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (productId) {
      const conversationMessages = getConversationMessages(
        productId,
        currentUser.id
      );
      setMessages(conversationMessages);
      markMessagesAsRead(productId, currentUser.id);
    }
  }, [productId, currentUser.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !product) return;

    const sellerId = `seller_${product.seller.replace(/\s/g, "_")}`;
    const message = saveMessage({
      productId: productId!,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: sellerId,
      receiverName: product.seller,
      content: newMessage.trim(),
      read: false,
    });

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate seller response after 2 seconds
    setTimeout(() => {
      const response = saveMessage({
        productId: productId!,
        senderId: sellerId,
        senderName: product.seller,
        receiverId: currentUser.id,
        receiverName: currentUser.name,
        content: "Thanks for your interest! I'll get back to you soon.",
        read: false,
      });
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <Button variant="ghost" asChild className="mb-4 w-fit">
          <Link to={`/products/${productId}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
        </Button>

        <Card className="flex-1 flex flex-col p-4 max-w-4xl mx-auto w-full">
          {/* Chat Header */}
          <div className="border-b pb-4 mb-4">
            <h2 className="font-semibold text-lg text-foreground">
              {product.seller}
            </h2>
            <p className="text-sm text-muted-foreground">{product.title}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[500px]">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isCurrentUser = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">
                        {msg.senderName}
                      </p>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
