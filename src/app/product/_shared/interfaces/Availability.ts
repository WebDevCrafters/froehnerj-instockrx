import { User } from './User';

interface Availability {
    availabilityId?: string;
    clinician?: User;
    search: string;
}

export default Availability;
