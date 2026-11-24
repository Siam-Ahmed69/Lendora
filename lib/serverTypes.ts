export interface ServerMessage {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface ServerBooking {
  id: string;
  listingId: string;
  listingIdRef: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  securityDeposit: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  paymentMethod: string;
  renterId: string;
}
