import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganizationModel } from '../models/organization.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  createOrganization(organization: OrganizationModel) {
    return this.http.post(`${this.url}/organizations`, organization)
                  .pipe(
                    map( (resp:any) => {
                      organization.id = resp.organizations.id;
                      return organization;
                    })
                  );
  }


  updateOrganization(organization: OrganizationModel) {
    const organizationTemp = {
      ...organization
    };
    delete organizationTemp.id;
    return this.http.put(`${this.url}/organizations/${organization.id}`, organizationTemp);
  }

  getOrganizations(){
    return this.http.get(`${this.url}/organizations/list`);
  }

  getOrganization(id){
    return this.http.get(`${this.url}/organizations/${id}`);
  }

  deleteOrganization(id){
    return this.http.delete(`${this.url}/organizations/${id}`);
  }
}
