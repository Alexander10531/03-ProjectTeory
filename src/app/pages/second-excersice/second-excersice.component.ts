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
    speedSimulation: number = 2; 
    showInput : boolean = false;
    onlyOnestart : boolean = false; 
    quarterCircunferece! : number; 
    controlInput! : buttonBottomBar[];
    faTimes : IconDefinition = faTimes;
    
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
                this.generalServices.setInputValue(this.generalServices.getSpeedSimulation());
                break; 
            case 4:
                this.quarterCircunferece = Math.round((((this.generalServices.getRatioValue() - 60) * 2) * Math.PI) / 4);
                this.generateCar();
                if(!this.onlyOnestart){ 
                    this.moveCar();
                }
                this.disableButton([0,1,2,3,4])
                this.onlyOnestart = true
                this.start = true; 
                break;
            case 5: 
                this.start = false;
                this.disableButton([5]);
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
        let initialLane = generateRandomNumber(0,1);
        let finalLane = generateRandomNumber(0,3);
        // let initialLane = 1;
        // let finalLane = 1;
        this.generatedCar.push({
            period: 0,
            changeAngle: 1, 
            status: "line",
            lastPeriod : -1, 
            changePeriodX: 0, 
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
                            break;
                        case "goFinalLane":
                            this.goFinalLane(i);
                            break; 
                        case "goFinalLane1":
                            this.goFinalLane1(i);
                            break; 
                    }
                }
            }

        }, Math.round((350/this.generalServices.getSpeedSimulation())) / this.generalServices.getSpeed())
    }

    lineMove(index : number){
        let finalDistance : number = 60 + 35;
        this.generatedCar[index].distanceTraveled += 1; 
        if(this.generatedCar[index].distanceTraveled < finalDistance){
            switch(this.generatedCar[index].initialLane){
                case 0: 
                    this.generatedCar[index].y += 1; 
                    break; 
                case 1: 
                    this.generatedCar[index].x -= 1; 
                    break; 
                case 2:
                    this.generatedCar[index].y -= 1; 
                    break; 
                case 3: 
                    this.generatedCar[index].x += 1; 
                    break; 
            } 
        }else{
            this.generatedCar[index].status = "circular";
            this.generatedCar[index].distanceTraveled = 0;
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
        switch (this.generatedCar[index].initialLane) {
            case 0:
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].period = 0.6;
                    this.generatedCar[index].changePeriodY = 1;
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].distanceTraveled = 0; 
                }
                if(this.generatedCar[index].period == 1){
                    this.generatedCar[index].period = 1.6;
                    this.generatedCar[index].changeAngle = -1;
                    this.generatedCar[index].changePeriodY = 1;
                    this.generatedCar[index].changePeriodX = 1;
                }
                if(this.generatedCar[index].period == 2){
                    this.generatedCar[index].changeAngle = -1;
                    this.generatedCar[index].changePeriodX = 1;
                    this.generatedCar[index].changePeriodY = -1;
                    this.generatedCar[index].period = 2.6;
                }
                if(this.generatedCar[index].period == 3){
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].changePeriodY = -1;
                    this.generatedCar[index].changeAngle = -1;
                    this.generatedCar[index].period = 3.6;
                }
                if(this.generatedCar[index].angle == 45){
                    this.generatedCar[index].changeAngle = -1; 
                }
                if( this.generatedCar[index].angle == 0 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 0.6){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changeAngle = 0; 
                }
                if( this.generatedCar[index].angle == -90 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 1.6){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0;
                }
                if( this.generatedCar[index].angle == -180 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 2.6){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changeAngle = 0;
                }
                if( this.generatedCar[index].angle == -270 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 3.6){
                    this.generatedCar[index].changeAngle = 0;
                }
                if(this.defineFinalLane(this.generatedCar[index], index)){
                    this.generatedCar[index].changeAngle = 1; 
                    this.generatedCar[index].status = "goFinalLane"
                }
                if(this.generatedCar[index].period == 0.6 && this.generatedCar[index].finalLane != 3 && this.generatedCar[index].y == this.generalServices.getRatioValue() + 70){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                if(this.generatedCar[index].period == 1.6 && this.generatedCar[index].finalLane != 2 && this.generatedCar[index].x == this.generalServices.getRatioValue() + 40){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                if( this.generatedCar[index].period == 2.6 && 
                    this.generatedCar[index].finalLane != 1 && 
                    this.generatedCar[index].y == this.generalServices.getRatioValue() - 20){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                if( this.generatedCar[index].period == 3.6 && 
                    this.generatedCar[index].finalLane != 2 && 
                    this.generatedCar[index].y == this.generalServices.getRatioValue() - 20){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                this.generatedCar[index].distanceTraveled +=1; 
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
                break;
            case 1:
                // Datos de periodos
                if(this.generatedCar[index].period == 0){
                    this.generatedCar[index].period = 0.6;
                    this.generatedCar[index].changePeriodY = -1;
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].distanceTraveled = 0; 
                }
                if(this.generatedCar[index].period == 1){
                    this.generatedCar[index].period = 1.6;
                    this.generatedCar[index].changeAngle = -1;
                    this.generatedCar[index].changePeriodY = 1;
                    this.generatedCar[index].changePeriodX = -1;
                }
                if(this.generatedCar[index].period == 2){
                    this.generatedCar[index].period = 2.6; 
                    this.generatedCar[index].changeAngle = -1; 
                    this.generatedCar[index].changePeriodX = 1; 
                    this.generatedCar[index].changePeriodY = 1; 
                }
                if(this.generatedCar[index].period == 3){
                    this.generatedCar[index].changePeriodY = -1; 
                    this.generatedCar[index].changePeriodX = 1; 
                    this.generatedCar[index].changeAngle = -1; 
                    this.generatedCar[index].period = 3.6; 
                }
                if( this.generatedCar[index].angle == 135 &&
                    this.generatedCar[index].period == 0.6){
                    this.generatedCar[index].changeAngle = -1; 
                }
                if( this.generatedCar[index].angle == 0 &&
                    this.generatedCar[index].changeAngle == -1 &&
                    this.generatedCar[index].period == 0.6){
                    this.generatedCar[index].changeAngle = 0;
                    this.generatedCar[index].changePeriodX = 0; 
                }
                if( this.generatedCar[index].angle == 90 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 0.6){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0; 
                }
                if( this.generatedCar[index].angle == -90 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 2.6){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0; 
                }
                if( this.generatedCar[index].angle == -180 && 
                    this.generatedCar[index].changeAngle == -1 && 
                    this.generatedCar[index].period == 3.6){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0; 
                }
                if( this.generatedCar[index].period == 2.6 &&
                    this.generatedCar[index].finalLane &&
                    this.generatedCar[index].x == this.generalServices.getRatioValue() + 30){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }

                if( this.generatedCar[index].period == 0.6 && 
                    this.generatedCar[index].finalLane != 0 && 
                    this.generatedCar[index].x == this.generalServices.getRatioValue() - 10){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                if( this.generatedCar[index].period == 1.6 &&
                    this.generatedCar[index].finalLane != 3 &&
                    this.generatedCar[index].y == this.generalServices.getRatioValue() + 30){
                    this.generatedCar[index].period = Math.round(this.generatedCar[index].period);
                }
                if( this.generatedCar[index].angle == 0 &&
                    this.generatedCar[index].changeAngle == -1 &&
                    this.generatedCar[index].period == 1.6){
                        this.generatedCar[index].changeAngle = 0; 
                        this.generatedCar[index].changePeriodX = 0; 
                    }
                if(this.defineFinalLane1(this.generatedCar[index], index)){
                    this.generatedCar[index].changeAngle = 1; 
                    this.generatedCar[index].status = "goFinalLane1"
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle; 
                this.generatedCar[index].x +=this.generatedCar[index].changePeriodX; 
                this.generatedCar[index].y +=this.generatedCar[index].changePeriodY; 
                break; 
            case 2: 
                // PeriodY = 2
                // PerdioX = -3   
                this.generatedCar[index].angle += 1; 
                this.generatedCar[index].distanceTraveled +=1; 
                break; 
            case 3: 
                // PeriodY = -3
                // PeriodX = 2
                this.generatedCar[index].angle += 1; 
                this.generatedCar[index].distanceTraveled +=1; 
                break; 
        }
    }

    defineFinalLane(generatedCar : car, index : number){
        switch (generatedCar.finalLane) {
            case 0: 
            if(generatedCar.x == this.generalServices.getRatioValue() + 70  && generatedCar.y <= this.generalServices.getRatioValue()){
                return true; 
                }
                break;
            case 1: 
            if(generatedCar.y == this.generalServices.getRatioValue() + 10 && generatedCar.x >= this.generalServices.getRatioValue() + 50){
                return true; 
                }
                break;            
            case 2: 
            if(generatedCar.y >= this.generalServices.getRatioValue() + 100 && generatedCar.x == this.generalServices.getRatioValue()){
                return true; 
            }
                break;    
            case 3:
                if(generatedCar.y == this.generalServices.getRatioValue() - 80){
                    return true;    
                }
                break; 
        }

        return false; 

    }

    goFinalLane(index : number){
        switch (this.generatedCar[index].finalLane) {
            case 0: 
                if(this.generatedCar[index].x > this.generalServices.getRatioValue() + 45){
                    this.generatedCar[index].changeAngle = 1; 
                    this.generatedCar[index].changePeriodX = 0; 
                    this.generatedCar[index].changePeriodY = -1; 
                }
                if(this.generatedCar[index].angle == -180){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
            break; 
            case 1: 
            if(this.generatedCar[index].y == this.generalServices.getRatioValue() + 30){
                    this.generatedCar[index].changePeriodX = 1;
                    this.generatedCar[index].changePeriodY = 0; 
                    this.generatedCar[index].changeAngle = 1;
                }
                if(this.generatedCar[index].y < this.generalServices.getRatioValue() + 30){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changePeriodY = -1; 
                    this.generatedCar[index].changeAngle = 0;
                }
                if(this.generatedCar[index].angle == -90){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
                break;             
            case 2: 
                if(this.generatedCar[index].x > this.generalServices.getRatioValue() + 40){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changePeriodY = 1; 
                    this.generatedCar[index].changeAngle = 1;
                }
                if(this.generatedCar[index].angle == 0){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
                break;                   
            case 3:
                if(this.generatedCar[index].angle == 90){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0;
                }else{
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].changePeriodY = 1;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;  
                break;
        }
    }

    goFinalLane1(index : number){
        switch (this.generatedCar[index].finalLane) {
            case 0: 
                if(this.generatedCar[index].x > this.generalServices.getRatioValue() + 45){
                    this.generatedCar[index].changeAngle = 1; 
                    this.generatedCar[index].changePeriodX = 0; 
                    this.generatedCar[index].changePeriodY = -1; 
                }
                if(this.generatedCar[index].angle == 180){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
            break; 
            case 1: 
            if(this.generatedCar[index].y == this.generalServices.getRatioValue() + 75){
                    this.generatedCar[index].changePeriodX = 1;
                    this.generatedCar[index].changePeriodY = 0; 
                    this.generatedCar[index].changeAngle = 1;
                }
                if(this.generatedCar[index].y < this.generalServices.getRatioValue() + 75){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changePeriodY = -1; 
                    this.generatedCar[index].changeAngle = 0;
                }
                if(this.generatedCar[index].angle == -90){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
                break;             
            case 2: 
                if(this.generatedCar[index].x > this.generalServices.getRatioValue() + 40){
                    this.generatedCar[index].changePeriodX = 0;
                    this.generatedCar[index].changePeriodY = 1; 
                    this.generatedCar[index].changeAngle = 1;
                }
                if(this.generatedCar[index].angle == 0){
                    this.generatedCar[index].changeAngle = 0;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;
                break;                   
            case 3:
                if(this.generatedCar[index].angle == 90){
                    this.generatedCar[index].changePeriodY = 0;
                    this.generatedCar[index].changeAngle = 0;
                }else{
                    this.generatedCar[index].changePeriodX = -1;
                    this.generatedCar[index].changePeriodY = 1;
                }
                this.generatedCar[index].angle += this.generatedCar[index].changeAngle;
                this.generatedCar[index].x += this.generatedCar[index].changePeriodX;
                this.generatedCar[index].y += this.generatedCar[index].changePeriodY;  
                break;
        }
    }

    defineFinalLane1(generatedCar : car, index : number){
        switch (generatedCar.finalLane) {
            case 0: 
            if(generatedCar.x == this.generalServices.getRatioValue() + 70  && generatedCar.y <= this.generalServices.getRatioValue()){
                return true; 
                }
                break;
            case 1: 
            if(generatedCar.y == this.generalServices.getRatioValue() + 100 && generatedCar.x >= this.generalServices.getRatioValue()){
                return true; 
                }
                break;            
            case 2: 
            if(generatedCar.y >= this.generalServices.getRatioValue() + 100 && generatedCar.x == this.generalServices.getRatioValue()){
                return true; 
            }
                break;    
            case 3:
                if(generatedCar.y == this.generalServices.getRatioValue() - 50 && generatedCar.x < this.generalServices.getRatioValue()){
                    return true;    
                }
                break; 
        }

        return false; 

    }

}       

// ____ 0-X ____ 
// 0: Negativo   
// 1: Positivo  
// 2: Positivo
// 3: Negativo

// ____ 0-Y ____ 
// 0: Positivo   
// 1: Positivo  
// 2: Negativo
// 3: Negativo

// ____ 0-angle ____ 
// 0: Positivo 
// 1: Negativo
// 2: Negativo 
// 3: Negativo

// ____ 1-X ____ 
// 0: Negativo   
// 1: Negativo  
// 2: Positivo
// 3: Positivo

// ____ 1-Y ____ 
// 0: Negativo   
// 1: Positivo  
// 2: Positivo
// 3: Negativo

// ____ 1-angle ____ 
// 0: Positivo 
// 1: Negativo
// 2: Negativo 
// 3: Negativo

// ____ 2-X ____ 
// 0: Positivo   
// 1: Negativo  
// 2: Negativo
// 3: Positivo

// ____ 2-Y ____ 
// 0: Negativo   
// 1: Negativo  
// 2: Positivo
// 3: Positivo

// ____ 2-angle ____ 
// 0: Negativo   
// 1: Negativo  
// 2: Positivo
// 3: Positivo

// ____ 3-X ____ 
// 0: Positivo   
// 1: Positivo  
// 2: Negativo
// 3: Negativo

// ____ 3-Y ____ 
// 0: Positivo    
// 1: Negativo   
// 2: Negativo
// 3: Positivo 

