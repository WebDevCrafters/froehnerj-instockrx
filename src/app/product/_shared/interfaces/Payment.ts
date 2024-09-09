import PaymentStatus from './PaymentStatus';
import Subscription from './Subscription';

interface Payment {
  paymentId?: string;
  userId: string;
  subscription: Subscription;
  status?: PaymentStatus;
  paidOn: number;
  searchesConsumed: number;
}

export default Payment;
