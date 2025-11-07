import { Message, Review } from "@/types";

const MESSAGES_KEY = "campus_messages";
const REVIEWS_KEY = "campus_reviews";
const CURRENT_USER_KEY = "campus_current_user";

// User management
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (!user) {
    const newUser = {
      id: `user_${Date.now()}`,
      name: `Student ${Math.floor(Math.random() * 1000)}`,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  }
  return JSON.parse(user);
};

// Messages
export const getMessages = (): Message[] => {
  const messages = localStorage.getItem(MESSAGES_KEY);
  return messages ? JSON.parse(messages) : [];
};

export const saveMessage = (message: Omit<Message, "id" | "timestamp">): Message => {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: `msg_${Date.now()}_${Math.random()}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  messages.push(newMessage);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMessage;
};

export const getConversationMessages = (productId: string, userId: string): Message[] => {
  const messages = getMessages();
  return messages.filter(
    (msg) =>
      msg.productId === productId &&
      (msg.senderId === userId || msg.receiverId === userId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const markMessagesAsRead = (productId: string, userId: string) => {
  const messages = getMessages();
  const updated = messages.map((msg) =>
    msg.productId === productId && msg.receiverId === userId
      ? { ...msg, read: true }
      : msg
  );
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
};

export const getUnreadCount = (userId: string): number => {
  const messages = getMessages();
  return messages.filter((msg) => msg.receiverId === userId && !msg.read).length;
};

// Reviews
export const getReviews = (): Review[] => {
  const reviews = localStorage.getItem(REVIEWS_KEY);
  return reviews ? JSON.parse(reviews) : [];
};

export const saveReview = (review: Omit<Review, "id" | "timestamp">): Review => {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: `rev_${Date.now()}_${Math.random()}`,
    timestamp: new Date().toISOString(),
  };
  reviews.push(newReview);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  return newReview;
};

export const getProductReviews = (productId: string): Review[] => {
  const reviews = getReviews();
  return reviews.filter((r) => r.productId === productId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getSellerReviews = (sellerId: string): Review[] => {
  const reviews = getReviews();
  return reviews.filter((r) => r.sellerId === sellerId);
};

export const getAverageRating = (sellerId: string): { average: number; count: number } => {
  const reviews = getSellerReviews(sellerId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
};

export const deleteReview = (reviewId: string) => {
  const reviews = getReviews();
  const filtered = reviews.filter((r) => r.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(filtered));
};

export const updateReview = (reviewId: string, updates: Partial<Review>) => {
  const reviews = getReviews();
  const updated = reviews.map((r) =>
    r.id === reviewId ? { ...r, ...updates } : r
  );
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
};
