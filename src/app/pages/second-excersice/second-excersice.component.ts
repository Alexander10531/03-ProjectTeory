import { Component } from '@angular/core';
import { ICar as car } from '../../utils/interface';
import { generateRandomNumber } from '../../utils/functions'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IButtonBottomBar as buttonBottomBar} from '../../utils/interface';
import { GeneralServicesService } from 'src/app/services/general-services.service';
import { IParametersCar as parametersCar } from "../../utils/interface";

@Component({
  selector: 'app-second-excersice',
  templateUrl: './second-excersice.component.html',
  styleUrls: ['./second-excersice.component.css']
})
export class SecondExcersiceComponent{

    start: boolean = false; 
    lastIndex: number = 0;  
    actualIndex! : number ;
    generatedCar: car[] = [];
    showInput : boolean = false;
    controlInput! : buttonBottomBar[];
    faTimes : IconDefinition = faTimes;
    
    constructor(public generalServices : GeneralServicesService){ 
        this.generateCar();
        this.controlInput = this.generalServices.getControlInput();
        this.generalServices.getIndex()
            .subscribe((data : number) => {
                this.actualIndex = data;
            })
        this.generalServices.setIndex(0);
        
    }

    setActiveButton(index: number){
        this.controlInput[this.actualIndex].active = false;
        this.controlInput[index].active = true;
        this.generalServices.setControlInput(this.controlInput);
        this.generalServices.setIndex(index);
        let numberButton : number[] = [0,1,2,3];
        if(numberButton.includes(index)){
            switch (index) {
                case 0:
                    this.generalServices.setInputValue(this.generalServices.getIntervalValue());
                    break;
                case 1:
                    this.generalServices.setInputValue(this.generalServices.getRatioValue());
                    break;
                case 2:
                    this.start = true; 
                    break;
                case 3: 
                    this.start = false;   
                    console.log("Se limpio la data")
                    this.cleanData();
            }
        }

    }
    
    generateCar(){
        this.createCarData();        
        setInterval(()=>{
            if(this.start){
                this.createCarData();
            }else{
                this.generatedCar = [];
            }
       }, this.generalServices.getIntervalValue() * 1000)
    }

    getCoordinates(lane : number) : parametersCar{
        let x : number = 0; 
        let y : number = 0; 
        let angle: number = 0;      
        let dimensionCarA : number = 53;
        let dimensionCarB : number = 32;
        switch (lane){
            case 0:
                x = this.generalServices.getRatioValue() + (75 - dimensionCarB);
                y = -dimensionCarA;
                break;
            case 1: 
                angle = 90;
                y = this.generalServices.getRatioValue() + (75 - dimensionCarB);
                x = (this.generalServices.getRatioValue() * 2) + (55 + dimensionCarA);
                break;
            case 2: 
                angle = 180;
                x = this.generalServices.getRatioValue() + 25;
                y = (this.generalServices.getRatioValue() * 2) + (50 + dimensionCarA);
                break;
            case 3: 
                y = this.generalServices.getRatioValue() + 25;
                x = - dimensionCarA;
                angle = 270;
                break;
        }

        return {
            x, 
            y, 
            angle,
        }
    }

    createCarData(){
        let initialLane = generateRandomNumber(0,3);
        let finalLane = generateRandomNumber(0,3);
        this.generatedCar.push({
            id : this.lastIndex,
            finalLane: initialLane,
            initialLane: finalLane,
            x: this.getCoordinates(initialLane).x,
            y: this.getCoordinates(initialLane).y,
            angle: this.getCoordinates(initialLane).angle,
        })
       this.lastIndex += 1;
    }

    cleanData(){
        this.generatedCar = [];
    }

}       