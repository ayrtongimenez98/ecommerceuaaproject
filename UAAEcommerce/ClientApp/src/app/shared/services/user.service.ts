import { Injectable } from "@angular/core";
import { UserTokenModel } from "../../models/user-token.model";
import { UserModel } from "../../models/user.model";
import { GraphQlService } from "./graphql.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {ProductUpdateResponseModel} from "../../models/product-update-response.model";
import {SystemValidationModel} from "../../models/systemvalidation.model";

@Injectable()
export class UserService {
  constructor(private readonly graphql: GraphQlService) {

  }

  users(): Observable<Array<UserModel>> {
    const query = `{
      users {
        id
        firstName
        lastName
        username
        document
        phoneNumber
      }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["users"] as Array<UserModel>));
  }

  user(id: string): Observable<UserModel> {
    const query = `query($id: ID!){
                      user(id: $id){
                        id
                        firstName
                        lastName
                        username
                        phoneNumber
                        roles
                      }
                    }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data["user"] as UserModel));
  }

  updateProfile(firstName: string, lastName: string, cellphone: string, username: string, email: string, password: string, rePassword: string, profilepic: string): Promise<UserModel> {
    const query = `mutation ($profile: MeInput!) {
                    updateProfile(profile: $profile) {
                      id
                      email
                      firstName
                      lastName
                      phoneNumber
                      username
                    }
                  }`;
    const variables = {
      "profile": {
        "email": email,
        "phoneNumber": cellphone,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "oldPassword": rePassword,
        "profilePicture": profilepic
      }
    };
    return new Promise((resolve, reject) => {
      this.graphql.query(query, variables).subscribe(x => {
        resolve(x.data["updateProfile"]);
      });
    });
  }

  me(): Promise<UserModel> {
    const query =
      `{\r\n  me {\r\n    email\r\n    firstName\r\n    lastName\r\n    phoneNumber\r\n    username\r\n  profilePicture \r\n }\r\n}`;
    return new Promise((resolve, reject) => {
      this.graphql.query(query, null).subscribe(x => {
        resolve(x.data["me"]);
      });
    });
  }

  createUser = (email: string, username: string, phoneNumber: string, firstName: string, lastName: string,  roles: Array<string>, password?: string, photo?: string): Observable<UserModel> => {
    const query = `mutation($user: UserInputType!){
                      createUser(user: $user){
                        id
                      }
                    }`;
    const user = {
      "user": {
        "email": email,
        "username": username,
        "phoneNumber": phoneNumber,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "profilePicture": photo,
        "roles": roles
      }
    };
    return this.graphql.query(query, user).pipe(map(x => x.data["createUser"] as UserModel));
  };

  updateUser = (id: string, email: string, username: string, phoneNumber: string, firstName: string, lastName: string, roles: Array<string>, password?: string, photo?: string): Observable<UserModel> => {
    const query = `mutation($id: String!, $user: UserInputType!){
                      updateUser(id: $id, user: $user){
                        id
                      }
                    }`;
    const user = {
      "id": id,
      "user": {
        "email": email,
        "username": username,
        "phoneNumber": phoneNumber,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "profilePicture": photo,
        "roles": roles
      }
    };
    return this.graphql.query(query, user).pipe(map(x => x.data["updateUser"] as UserModel));
  };

  logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("expirationDate");
    window.localStorage.removeItem("roles");
  };

  userProfile(id: string): Observable<UserModel> {
    const query = `query($id: ID!){
                      userProfile(id: $id){
                        id
                        firstName
                        lastName
                        username
                        phoneNumber
                        documento
                        address
                        date
                        city
                        razonSocial
                      }
                    }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data["userProfile"] as UserModel));
  }

  deleteUserById(userId: string): Observable<SystemValidationModel> {
    const query = `mutation($userId: String!){
                    deleteUserById(userId: $userId){
                      success
                      message
                    }
                  }`;
    return this.graphql.query(query, {userId}).pipe(map(x => x.data["deleteUserById"] as SystemValidationModel));

  }

  resetPassByUserName(username: string):Observable<SystemValidationModel> {
    const query = `query($username: String!){
                      resetPass(username: $username){
                       success
                       message
                      }
                    }`;
    return this.graphql.query(query, {username}).pipe(map(x => x.data["resetPass"] as SystemValidationModel));
  }

  updateUserPass(userId:string, password:string, token:string):Observable<SystemValidationModel> {
    const query = `mutation($userId: String!, $password: String!, $token: String!){
                    updateUserPass(userId: $userId, password: $password, token: $token){
                      success
                      message
                    }
                  }`;
    return this.graphql.query(query, {userId, password, token}).pipe(map(x => x.data["updateUserPass"] as SystemValidationModel));
  }
}
