import { Injectable } from "@angular/core";
import { GraphQlService } from "./graphql.service";
import { RoleModel } from "../../models/role.model";
import { map } from "rxjs/operators";
import { SystemValidationModel } from "../../models/systemvalidation.model";
import { Observable } from "rxjs";

@Injectable()
export class RolesService {

  constructor(private readonly graphql: GraphQlService) {

  }

  roles(page: number = 0, itemsPerPage: number = 10): Observable<Array<RoleModel>> {
    const query = `query($page: Int, $itemsPerPage: Int){
                        roles(page: $page, itemsPerPage: $itemsPerPage){
                            id
                            name
                        }
                    }`;
    return this.graphql.query(query, { page, itemsPerPage }).pipe(map(x => x.data["roles"] as Array<RoleModel>));
  }

  rol(id: string): Observable<RoleModel> {
    const query = `query($id: ID!){
                            role(id: $id){
                                id
                                name
                            }
                        }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data['role'] as RoleModel));
  }

  create(name: string): Observable<RoleModel> {
    const query = `mutation ($role: RoleInput!){
                            createRole(role: $role){
                                id
                                name
                            }
                        }`;
    const variables = {
      "role": {
        "name": name
      }
    }
    return this.graphql.query(query, variables).pipe(map(x => x.data["createRole"] as RoleModel));
  }

  update(id: string, name: string): Observable<RoleModel> {
    const query = `mutation ($id: ID!, $role: RoleInput!){
                            updateRole(id: $id, role: $role){
                                id
                                name
                            }
                        }`;
    const variables = {
      id,
      "role": {
        "name": name
      }
    }
    return this.graphql.query(query, variables).pipe(map(x => x.data["updateRole"] as RoleModel));
  }

  delete(id: string): Observable<SystemValidationModel> {
    const query = `mutation($id: ID!) {
                    deleteRole(id: $id) {
                      success
                      message
                    }
                  }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data["deleteRole"] as SystemValidationModel));
  }
}
