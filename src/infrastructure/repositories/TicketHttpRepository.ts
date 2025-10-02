import { http } from '@infrastructure/http/client';
import type { TicketRepository } from '@domain/repositories/TicketRepository';
import type { TicketOrder, TicketOrderItem, TicketType } from '@domain/entities/Ticket';

export class TicketHttpRepository implements TicketRepository {
  async listTicketTypes(): Promise<TicketType[]> {
    // TODO: adjust endpoint when backend is ready
    const { data } = await http.get<TicketType[]>('/tickets/types');
    return data;
  }

  async createOrder(payload: { email: string; items: TicketOrderItem[] }): Promise<TicketOrder> {
    const { data } = await http.post<TicketOrder>('/orders', payload);
    return data;
  }

  async getOrderById(id: string): Promise<TicketOrder | null> {
    const { data } = await http.get<TicketOrder | null>(`/orders/${id}`);
    return data;
  }
}
