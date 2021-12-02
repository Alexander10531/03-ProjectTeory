import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        IncrementerComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        FormsModule, 
    ], 
    exports: [
        HeaderComponent,
        IncrementerComponent,
    ]
})
export class ComponentsModule { }
