export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  cpf!: string;
  zipCode!: string;
  street!: string;
  number!: string;
  complement?: string | null;
  neighborhood!: string;
  city!: string;
  state!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
