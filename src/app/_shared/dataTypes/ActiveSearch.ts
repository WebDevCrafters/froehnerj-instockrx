import { Medication } from './Medication';

export type ActiveSearch = {
  medications: Medication[];
  pickupDate: number;
  paymentCompleted: boolean;
};
