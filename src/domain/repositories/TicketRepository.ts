import type { TicketOrder, TicketOrderItem, TicketType } from '@domain/entities/Ticket';

export interface TicketRepository {
  listTicketTypes(): Promise<TicketType[]>;
  createOrder(payload: { email: string; items: TicketOrderItem[] }): Promise<TicketOrder>;
  getOrderById(id: string): Promise<TicketOrder | null>; // includes status
}
