import Medication from './Medication';
import { SearchStatus } from './SearchStatus';

interface Search {
    searchId?: string;
    patient?: string;
    medication?: Medication;
    status?: SearchStatus;
    zipCode?: number;
    dob?: number;
    location?: Location;
    prescriberName?: string;
}

export default Search;
