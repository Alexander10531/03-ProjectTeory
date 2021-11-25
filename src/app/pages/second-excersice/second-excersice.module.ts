import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondExcersiceComponent } from './second-excersice.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SeconExcersiceRoutingModule } from './second-excersice-routing.module';

@NgModule({
    declarations: [
        SecondExcersiceComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        SeconExcersiceRoutingModule,
    ],
    exports: [
        SecondExcersiceComponent,
    ]
})
export class SecondExcersiceModule { }
