
export class UserTokenModel {
  token: string;
  userId: number;
  expirationDate: Date;
  roles: Array<string> = [];
  email: string;
  username: string;
  documento:string;
  razonSocial:string;
  ruc:string;
  firstName: string;
  lastName: string;
  succeeded: boolean;

  constructor(token?: string, userId?: number, expirationDate?: Date, roles?: Array<string>, email?: string,
              username?: string, documento?:string, razonSocial?:string, ruc?:string, firstName?: string,
              lastName?: string, succeeded?: boolean) {
    this.token = token;
    this.userId = userId;
    this.expirationDate = expirationDate;
    this.roles = roles;
    this.email = email;
    this.username = username;
    this.documento = documento;
    this.razonSocial = razonSocial;
    this.ruc = ruc;
    this.firstName = firstName;
    this.lastName = lastName;
    this.succeeded = succeeded;
  }
}
