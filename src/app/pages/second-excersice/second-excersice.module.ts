import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';
import { SecondExcersiceComponent } from './second-excersice.component';
import { SeconExcersiceRoutingModule } from './second-excersice-routing.module';

@NgModule({
    declarations: [
        SecondExcersiceComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FontAwesomeModule,
        SeconExcersiceRoutingModule,
    ],
    exports: [
        SecondExcersiceComponent,
    ]
})
export class SecondExcersiceModule { }
