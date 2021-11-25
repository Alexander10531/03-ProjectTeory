import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstExcersiceComponent } from './first-excersice.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FirstExcersiceRoutingModule } from './first.excersice-routing.module';

@NgModule({
    declarations: [
        FirstExcersiceComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        FirstExcersiceRoutingModule,
    ],
    exports : [
        FirstExcersiceComponent,
    ]
})
export class FirstExcersiceModule { }
