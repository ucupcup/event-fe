import { TicketHttpRepository } from '@infrastructure/repositories/TicketHttpRepository';
import type { TicketRepository } from '@domain/repositories/TicketRepository';
import { createPurchaseTicketsUseCase } from '@domain/usecases/PurchaseTickets';

// Simple DI container for wiring dependencies
class Container {
  private _ticketRepo: TicketRepository | null = null;

  get ticketRepository(): TicketRepository {
    if (!this._ticketRepo) this._ticketRepo = new TicketHttpRepository();
    return this._ticketRepo;
  }

  get purchaseTicketsUseCase() {
    return createPurchaseTicketsUseCase(this.ticketRepository);
  }
}

export const container = new Container();
