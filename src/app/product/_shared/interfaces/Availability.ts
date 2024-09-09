import { User } from './User';

interface Availability {
    availabilityId?: string;
    clinician?: User;
    search: string;
    markedOn: number;
}

export default Availability;
