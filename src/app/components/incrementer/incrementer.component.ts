import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IButtonBottomBar as buttonBottomBar } from '../../utils/interface';
import { GeneralServicesService } from '../../services/general-services.service';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.css']
})
export class IncrementerComponent implements OnInit, OnChanges{

    @Input() index! : number; 
    renderInput! : buttonBottomBar; 
    faPlus : IconDefinition = faPlus; 
    faMinus : IconDefinition = faMinus;
    proof : number = 3;
    constructor(public generalService : GeneralServicesService){ 
    }

    ngOnInit(){
        this.renderInput = this.generalService.obtainDataInput(this.index)
    }

    ngOnChanges(){
        this.renderInput = this.generalService.obtainDataInput(this.index)
    }

    changeValueDecrementer(index : number, incDecValue : number = 1){

        switch(index){
            case 0: 
                this.generalService.setNumberLanes(incDecValue)
                break; 
        }

    }

    changeValueInput(e : any, index: number){
        switch (index) {
            case 1:
                if(!isNaN((Number(e.target.value)))){
                    this.generalService.setIntervalValue(Number(e.target.value));
                    this.generalService.setInputValue(Number(e.target.value));
                }
                break;
            case 2:
                if(!isNaN((Number(e.target.value)))){
                    console.log(typeof(e.target.value))
                    this.generalService.setRatioValue(Number(e.target.value));
                    this.generalService.setInputValue(Number(e.target.value));
                } 
                break;    
        }
    }
}