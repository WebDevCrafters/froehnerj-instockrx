import Subscription from '../../product/_shared/interfaces/Subscription';
import { Package } from '../dataTypes/Package';

export const packageOptions: Subscription[] = []
export const defaultPackage = packageOptions[1];

export const activeSearchData = {
    medications: [
        {
            name: 'Dawa ka naam',
            dose: '10',
            quantity: '100',
            brand: 'Generic Brand',
        },
    ],
    pickupDate: new Date().getTime(),
    paymentCompleted: false,
};
