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
    distanceArch : number[][] = [[1, 3/4, 1/2, 1/4], [1/4, 1, 3/4, 1/2], [1/2, 3/4, 1, 1/4], [ 1/4, 1/2, 3/4, 1 ]];
    
    constructor(public generalServices : GeneralServicesService){ 
        this.generalServices.setInputValue(this.generalServices.getIntervalValue());
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
        switch (index) {
            case 0:
                this.generalServices.setInputValue(this.generalServices.getIntervalValue());
                break;
            case 1:
                this.generalServices.setInputValue(this.generalServices.getRatioValue());
                break;
            case 2:
                this.generalServices.setInputValue(this.generalServices.getSpeed()); 
                break; 
            case 3:
                this.generateCar();
                this.moveCar();
                this.disableButton([0,1,2,3])
                this.start = true; 
                break;
            case 4: 
                this.start = false;
                this.disableButton([4]);
                this.cleanData();

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
                x = this.generalServices.getRatioValue() + (30 - dimensionCarB);
                y = -dimensionCarA;
                break;
            case 1: 
                angle = 90;
                y = this.generalServices.getRatioValue() + (30 - dimensionCarB);
                x = (this.generalServices.getRatioValue() * 2) + (55 + dimensionCarA);
                break;
            case 2: 
                angle = 180;
                x = this.generalServices.getRatioValue() + 75;
                y = (this.generalServices.getRatioValue() * 2) + (50 + dimensionCarA);
                break;
            case 3: 
                y = this.generalServices.getRatioValue() + 75;
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
            period: 0,
            status: "line",
            changePeriodX: 0, 
            circularAngle: 0, 
            changePeriodY: 0,
            distanceTraveled: 0, 
            id : this.lastIndex,
            finalLane: finalLane,
            initialLane: initialLane,
            x: this.getCoordinates(initialLane).x,
            y: this.getCoordinates(initialLane).y,
            angle: this.getCoordinates(initialLane).angle,
        })
       this.lastIndex += 1;
    }

    cleanData(){
        this.generatedCar = [];
    }

    moveCar(){
        setInterval(()=>{
            if(this.start){
                for(let i = 0; i < this.generatedCar.length; i++){
                    switch (this.generatedCar[i].status) {
                        case "line":
                            this.lineMove(i);
                            break;
                        case "circular":
                            this.circularMove(i)
                        
                    }
                }
            }

        }, 1000 / this.generalServices.getSpeed())
    }

    lineMove(index : number){
        this.generatedCar[index].distanceTraveled += 1; 
        if(this.generatedCar[index].distanceTraveled >= 85){
            this.generatedCar[index].status = "circular"
            this.generatedCar[index].distanceTraveled = 0 
        }
        switch(this.generatedCar[index].initialLane){
            case 0:
                this.generatedCar[index].y +=1;
                if(this.generatedCar[index].y > 10){
                    this.generatedCar[index].angle += 2; 
                }
                break;  
            case 1: 
                this.generatedCar[index].x -= 1;
                if(this.generatedCar[index].x < (this.generalServices.getRatioValue() * 2) + 50 - 18){
                    this.generatedCar[index].angle += 2;
                }
                break; 
            case 2:
                this.generatedCar[index].y -= 1;
                if(this.generatedCar[index].y < (this.generalServices.getRatioValue() * 2) + 50 - 18){
                    this.generatedCar[index].angle += 2;
                }
                break; 
            case 3:
                this.generatedCar[index].x +=+ 1;
                if(this.generatedCar[index].x > 18){
                    this.generatedCar[index].angle += 2;
                }
                break; 
        }        
    }

    disableButton(disable : number[]){
        for(let i = 0; i < this.controlInput.length; i++){
            if(disable.includes(this.controlInput[i].index)){
                this.controlInput[i].disable = true;
            }else{
                this.controlInput[i].disable = false;
            }            
        }
    }

    circularMove(index : number){
        let periodX : number; 
        let periodY : number; 
        switch (this.generatedCar[index].initialLane) {
            case 0:
                periodX = 1; 
                periodY = 2; 
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].changePeriodY = 1;
                }
                if(this.generatedCar[index].period != 0 && this.generatedCar[index].period / periodX){
                    this.generatedCar[index].changePeriodX -= this.generatedCar[index].changePeriodX;
                }
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY; 
                break;
            case 1:
                periodX = 2; 
                periodY = 3; 
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].changePeriodY = -1;
                }
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY; 
                break;
            case 2:
                periodX = 2; 
                periodY = 3; 
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].changePeriodX = +1;
                    this.generatedCar[index].changePeriodY = -1;
                }
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY; 
                break;
            case 3:
                periodX = 1; 
                periodY = 2; 
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].changePeriodX = 1;
                    this.generatedCar[index].changePeriodY = 1;
                }
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;     
                break;
        }
    }

}       