import Location from '../../../_shared/dataTypes/Location';
import Medication from './Medication';
import { SearchStatus } from './SearchStatus';

interface Search {
    searchId?: string;
    patient?: string;
    medication?: Medication;
    status?: SearchStatus;
    zipCode?: string;
    dob?: number;
    location?: Location;
    prescriberName?: string;
}

export default Search;
