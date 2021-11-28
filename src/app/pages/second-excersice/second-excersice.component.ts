import { Component } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-second-excersice',
  templateUrl: './second-excersice.component.html',
  styleUrls: ['./second-excersice.component.css']
})
export class SecondExcersiceComponent{

    constructor() { }
    faChevronUp : IconDefinition = faChevronUp;
    showInput : boolean = false;

}
