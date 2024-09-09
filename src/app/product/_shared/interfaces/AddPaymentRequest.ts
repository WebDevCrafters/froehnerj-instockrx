import PaymentStatus from './PaymentStatus';

export interface AddPaymentRequest {
    subscription: string;
    status: PaymentStatus;
    paidOn: number
}
