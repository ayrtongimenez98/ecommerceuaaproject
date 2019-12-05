export class LoginResponseModel {
  Succeeded: boolean;
  Message: string;
  Token: string;
  ExpirationDate: string;
  Roles: Array<string> = [];
  UserId: number;
  Email: string;
  Username: string;
  Documento: string;
  RazonSocial: string;
  Ruc: string;
  FirstName: string;
  LastName: string;
}
