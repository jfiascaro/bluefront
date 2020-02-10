import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './pages/organization/organization.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';

const routes: Routes = [
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'organization/:id', component: OrganizationComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'organizations' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
