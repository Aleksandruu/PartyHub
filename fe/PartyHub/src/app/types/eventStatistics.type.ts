export interface EventStatistics {
  name: string;
  location: string;
  date: Date;
  ticketsSold: number;
  moneyEarned: number;
  generatedInvites: number;
  ticketBasedAttendees: number;
  invitationBasedAttendees: number;
  price: number;
  discount: number;
}
