interface Pharmacy {
    pharmacyId: string;
    name: string;
    address: string;
    phoneNumber: string;
    faxNumber: string;
    url: string;
    authorizedOfficialName: string;
    authorizedOfficialContactNumber: string;
    location?: Location;
}

export default Pharmacy;
