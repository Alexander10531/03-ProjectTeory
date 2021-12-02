import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IButtonBottomBar as buttonBottomBar } from '../utils/interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

    private inputValue! : number; 
    private ratioValue : number = 200; 
    private numberOfLanes: number = 2; 
    private intervalValue: number = 1; 
    private index$ = new Subject<number>();
    private incrementerValue: number = this.getNumberOfLanes;
    
    private controlInput : buttonBottomBar[] = [
        {
            index: 0,
            active: true,
            subNotes: "Min:2, Max:4",
            typeContainer: "incrementer",
            buttonTitle: "Numero de carriles",
            title: "Ingrese la cantidad de carriles",
        },
        {
            index: 1,
            active: false,
            typeContainer: "input",
            subNotes: "Dato en segundo",
            buttonTitle: "Intervalo de ingreso",
            title: "Ingrese el intervalo sobre el que entrara un carro a la simulacion",
        },
        {
            index: 2,
            active: false, 
            typeContainer: "input",
            buttonTitle: "Radio de rotonda",
            subNotes: "El radio se encontrara en metros",
            title: "Ingrese el radio que desea que tenga la rotonda",
        }
    ]

    getControlInput(): buttonBottomBar[]{
        return this.controlInput;
    }

    setControlInput(newControlInput : buttonBottomBar[]): void{
        this.controlInput = newControlInput; 
    }

    setIndex(newIndex : number){
        this.index$.next(newIndex);
    }

    getIndex() : Observable<number>{
        return this.index$.asObservable();
    }
    
    obtainDataInput(index : number) : buttonBottomBar{
        return this.controlInput[index];
    }

    get getNumberOfLanes() : number{
        return this.numberOfLanes
    }

    setNumberLanes(incDec : number){
        if(this.numberOfLanes + incDec >= 2 && this.numberOfLanes + incDec <= 4){
            this.numberOfLanes = this.numberOfLanes + incDec;
            this.incrementerValue = this.numberOfLanes; 
        }
    }

    get getIncrementerValue() : any{
        return this.incrementerValue
    }

    getRatioValue() : number{
        return this.ratioValue;
    }

    setRatioValue(newRatioValue : number) : void{
        this.ratioValue = newRatioValue;
    }

    getIntervalValue() : number{
        return this.intervalValue;
    }

    setIntervalValue(newInterval : number) : void{
        this.intervalValue = newInterval; 
    }    

    getInputValue() : number{
        return this.inputValue;
    }

    setInputValue(newValue : number){
        this.inputValue = newValue;
    }
}