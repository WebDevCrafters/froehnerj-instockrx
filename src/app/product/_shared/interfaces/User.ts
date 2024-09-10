import UserType from './UserType';

export type User = {
  userId?: string;
  email?: string;
  phoneNumber?: string;
  name?: string;
  userType?: UserType;
  dob?: number;
  doctorId?: string;
  zipCode?: string;
  password?: string;
  location?: Location;
};
