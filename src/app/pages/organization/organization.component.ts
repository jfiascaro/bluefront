import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrganizationModel } from '../../models/organization.model';
import { OrganizationsService } from '../../services/organizations.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organization = new OrganizationModel();

  constructor( private organizationsService: OrganizationsService,
               private route: ActivatedRoute  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');  //convertir a int
    
    if (id !== 'new') {
      this.organizationsService.getOrganization(id)
          .subscribe ((resp:any) =>{
            this.organization = resp.organizations;
          });
    }

  }

  save( form: NgForm ) {
    if( form.invalid ) {
      console.log('Invalid Form');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.organization.id ) {
      peticion = this.organizationsService.updateOrganization(this.organization);
      } else {
      peticion = this.organizationsService.createOrganization(this.organization);
      }

    peticion.subscribe (resp =>{
      Swal.fire({
        title: this.organization.name,
        text: 'Se actualizó correctamente',
        icon: 'success',
      })
    });

  }

}
