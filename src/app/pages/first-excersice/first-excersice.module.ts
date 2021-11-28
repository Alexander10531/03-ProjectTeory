import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FirstExcersiceComponent } from './first-excersice.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FirstExcersiceRoutingModule } from './first.excersice-routing.module';

@NgModule({
    declarations: [
        FirstExcersiceComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ComponentsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FirstExcersiceRoutingModule,
    ],
    exports : [
        FirstExcersiceComponent,
    ]
})
export class FirstExcersiceModule { }
