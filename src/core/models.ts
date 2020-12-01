export interface Document {
  femaleNames: Array<string>;
  maleNames: Array<string>;
  lastNames: Array<string>;
  domains: Array<string>;
  professions: Array<string>;
  universities: Array<string>;
  bloodtype: Array<string>;
  civilStatus: Array<string>;
}

export interface Name {
  gender?: "F" | "M";
  firstName?: string;
}

export interface Person extends Name {
  lastName?: string;
  birthdate?: Date;
  dni?: string;
  email?: string;
  profession?: string;
  university?: string;
  mobile?: string;
  telephone?: string;
  bloodtype?: string;
  civilstatus?: string;
}

export interface FakePeopleOptions {
  fields: (keyof Omit<Person, "gender">)[];
  gender?: "F" | "M";
  length: number;
  domain?: string;
  birthdateStartAt?: Date;
  birthdateEndAt?: Date;
  dniFormat?: boolean;
  phoneNumberFormat?: boolean;
}

export interface GeneratorOptions {
  name: string;
  type:
    | "firstName"
    | "lastName"
    | "dni"
    | "profession"
    | "university"
    | "bloodType"
    | "civilStatus"
    | "date"
    | "dni"
    | "email"
    | "phoneNumber";
}
