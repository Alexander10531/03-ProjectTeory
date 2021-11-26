import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstExcersiceComponent } from './first-excersice.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FirstExcersiceRoutingModule } from './first.excersice-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
