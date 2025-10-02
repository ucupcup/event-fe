export type TicketTypeId = string;

export interface TicketType {
  id: TicketTypeId;
  name: string; // e.g. Regular, VIP, Early Bird
  price: number; // in smallest currency unit (e.g., cents)
  currency: string; // e.g. IDR
  quota?: number;
  available?: number;
}

export interface TicketOrderItem {
  ticketTypeId: TicketTypeId;
  quantity: number;
}

export interface TicketOrder {
  id: string;
  email: string;
  items: TicketOrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'failed';
  paymentProvider?: 'midtrans' | 'xendit' | 'dummy';
}

