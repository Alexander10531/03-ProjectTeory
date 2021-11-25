import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'excersice',
        loadChildren: () => import('./pages/first-excersice/first-excersice.module').then(m => m.FirstExcersiceModule)
    },
    {
        path: 'project',
        loadChildren: ()=> import('./pages/second-excersice/second-excersice.module').then(m => m.SecondExcersiceModule)
    },
    {
        path: '',
        loadChildren: () => import('./pages/first-excersice/first-excersice.module').then(m => m.FirstExcersiceModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
