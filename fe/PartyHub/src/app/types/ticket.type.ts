export interface Ticket {
    ticketId: string,
    eventName: string,
    qrCode: File | null,
    eventDate: Date,
    eventLocation: string
}