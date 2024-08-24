import SubscriptionStatus from "./SubscriptionStatus";


interface Subscription {
    subscriptionId?: string;
    name: string;
    cost: number;
    searchCount: number;
    status?: SubscriptionStatus;
    description?: string;
}

export default Subscription;
