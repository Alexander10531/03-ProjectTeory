import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SecondExcersiceComponent } from './second-excersice.component';

const routes: Routes = [
    { 
        path: '',
        component: SecondExcersiceComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeconExcersiceRoutingModule{}