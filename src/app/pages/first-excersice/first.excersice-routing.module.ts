import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FirstExcersiceComponent } from './first-excersice.component';

const routes: Routes = [
    { 
        path: '',
        component: FirstExcersiceComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstExcersiceRoutingModule{}