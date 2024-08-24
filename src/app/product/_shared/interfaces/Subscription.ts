import SubscriptionStatus from "./SubscriptionStatus";


interface Subscription {
    subscriptionId?: String;
    name: string;
    cost: number;
    searchCount: number;
    status: SubscriptionStatus;
}

export default Subscription;
