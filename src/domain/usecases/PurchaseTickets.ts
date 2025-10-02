import type { TicketOrder, TicketOrderItem } from '@domain/entities/Ticket';
import type { TicketRepository } from '@domain/repositories/TicketRepository';

export interface PurchaseTicketsInput {
  email: string;
  items: TicketOrderItem[];
}

export interface PurchaseTicketsUseCase {
  execute(input: PurchaseTicketsInput): Promise<TicketOrder>;
}

export function createPurchaseTicketsUseCase(repo: TicketRepository): PurchaseTicketsUseCase {
  return {
    async execute(input) {
      // Validation will be added in feature implementation
      return repo.createOrder({ email: input.email, items: input.items });
    },
  };
}
