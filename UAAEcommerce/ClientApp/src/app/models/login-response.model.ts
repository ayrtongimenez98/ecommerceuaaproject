export class LoginResponseModel {
  succeeded: boolean;
  message: string;
  token: string;
  expirationDate: string;
  roles: Array<string> = [];
  userId: string;
  email: string;
  username: string;
  documento: string;
  razonSocial: string;
  ruc: string;
  firstName: string;
  lastName: string;
}
