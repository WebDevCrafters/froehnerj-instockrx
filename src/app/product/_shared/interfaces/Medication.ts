interface Medication {
    medicationId?: string;
    name: string;
    dose?: string;
    quantity?: number;
    alternatives?: Medication[];
    pickUpDate?: number;
}

export default Medication;
