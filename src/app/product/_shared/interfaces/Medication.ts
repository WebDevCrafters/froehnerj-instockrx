interface Medication {
    medicationId?: string;
    name: string;
    dose?: string;
    quantity?: number;
    alternatives?: Medication[];
    pickUpDate?: number;
    brandName?: string;
    /**
      @todo: add brand Name
     */
}

export default Medication;
