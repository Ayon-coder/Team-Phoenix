export interface Message {
  id: string;
  productId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  productId: string;
  sellerId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
