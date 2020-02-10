import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../services/organizations.service';
import { OrganizationModel } from 'src/app/models/organization.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  organizations: OrganizationModel[] = [];
  loading = false;

  constructor(private organizationsService: OrganizationsService ) { }

  ngOnInit() {
    this.loading = true;
    this.organizationsService.getOrganizations()
        .subscribe( (resp:any) => {
          this.organizations = resp.organizations;
          this.loading = false;
        });  
  }

  deleteOrganization (organization: OrganizationModel, i: number){
    Swal.fire({
      title: 'Delete Record?',
      text: `Do you want delete ${organization.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{
      if (resp.value) {
        this.organizations.splice(i,1);
        this.organizationsService.deleteOrganization(organization.id).subscribe();
      }
    })
    
  }

}
