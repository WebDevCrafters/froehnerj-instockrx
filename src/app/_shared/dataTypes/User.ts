export type User = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    type: "patient" | "clinician"
}