import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IDestiny as destiny } from '../../utils/interface';

@Component({
  selector: 'app-first-excersice',
  templateUrl: './first-excersice.component.html',
  styleUrls: ['./first-excersice.component.css']
})
export class FirstExcersiceComponent{

    costPerKm : number = 7000 / 91.1; 
    costPerFood : number = 50; 
    valueFirst = 11.10;
    valueNormal = 7.70; 
    valueThird = 5.5;

    form : FormGroup;
    totalCost: number = 0; 
    totalGain : number = 0;
    firstPrice : number = 0; 
    thirdPrice : number = 0; 
    normalPrice : number = 0; 
    showData : boolean = true; 
    plus : IconDefinition = faPlus;
    valueProjection : destiny[] = []
    destiny : destiny[] = [
        { 
            name : "La Ceiba", 
            distance : 401.7
        },
        {
            name: 'Choluteca',
            distance: 147.1
        },
        {
            name: 'Trujillo',
            distance: 411.1
        },
        {
            name: 'Comayagua',
            distance: 91.1
        },
        {
            name: 'Santa Rosa de Copan',
            distance: 320.8
        },
        {
            name: 'San Pedro Sula',
            distance: 251
        },
        {
            name: 'Yuscaran',
            distance: 65
        },
        {
            name: 'Puerto Lempira',
            distance: 392
        },
        {
            name: 'La Esperanza',
            distance: 193.1
        },
        {
            name: 'La Paz',
            distance: 87.5
        },
        {
            name: 'Gracias',
            distance: 272.9
        },
        {
            name: 'Nuevo Ocotepeque',
            distance: 413.3
        },
        {
            name: 'Juticalpa',
            distance: 179.8
        },
        {
            name: 'Santa Barbara',
            distance: 208.2
        },
        {
            name: 'Nacaome',
            distance: 101.5
        },
        {
            name: 'Yoro',
            distance: 213
        }
    ]

    constructor(private formBuilder : FormBuilder){
        this.form = formBuilder.group({
            firstNumber : [
                undefined, 
                [Validators.min(0), 
                Validators.max(10), 
                Validators.pattern('^\\d+$')]],
            turistNumber : [
                undefined, 
                [Validators.min(0), 
                Validators.max(30),
                Validators.pattern('^\\d+$')]], 
            thirdNumber : [
                undefined, 
                [
                    Validators.min(0),
                    Validators.max(30),
                    Validators.pattern('^\\d+$')
                ]],
            destinyProjection : [
                "Seleccione un lugar de destino", 
                [
                    Validators.required,
                ]
            ]               
        })
    }

    changeState(valueBool : boolean){
        this.showData = valueBool; 
    }
    
    generateRandomNumber(min : number, max : number) : number{
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    // Fix iterations on calculatePrediction
    // calculatePrediction(distance : number){
    //     this.valueProjection = [];
    //     let numberRequest : number = 2;
    //     let someValue = this.destiny.findIndex((destiny) => destiny.distance == distance)
    //     let iteration : number = 0;
    //     this.valueProjection.push(this.destiny[someValue]);
    //     while(iteration != numberRequest){
    //         iteration += 1;
    //         if(someValue + iteration >= this.destiny.length){
    //             someValue = 0;
    //         }
    //         this.valueProjection.push(this.destiny[someValue + iteration]);
    //     }
    // }
    
    // gainProjection(destiny : destiny, numberFirst : number, numberNormal : number, numberThird : number) : destiny{
    //     let gainFirst : number = (this.valueFirst * destiny.distance) * numberFirst;
    //     let gainNormal : number = (this.valueNormal * destiny.distance) * numberNormal;
    //     let gainThird : number = (this.valueThird * destiny.distance) * numberThird;
    //     let totalGain : number = gainFirst + gainNormal + gainThird;
    //     let totalCost : number = (this.costPerKm * destiny.distance) + ((numberFirst + numberNormal + numberThird) * 50 ); 
    //     destiny = {  
    //         ...destiny,
    //         cost : totalCost, 
    //         gain : totalGain,
    //         total : totalGain - totalCost, 
    //     }        
    //     return destiny;
    // }
    
    onSubmit(e : Event){
        e.preventDefault();
        let firstPrice = Number(this.form.value.firstNumber ? this.form.value.firstNumber : 0);
        let normalPrice = Number(this.form.value.turistNumber ? this.form.value.turistNumber : 0);
        let thirdPrice = Number(this.form.value.thirdNumber ? this.form.value.thirdNumber : 0);
        if(this.form.valid && (firstPrice + normalPrice + thirdPrice) < 41 && (firstPrice + normalPrice + thirdPrice) > 0 && !isNaN(this.form.value.destinyProjection)){
            console.log(this.form.value.destinyProjection);
            this.firstPrice = (this.valueFirst * this.form.value.destinyProjection) * firstPrice;
            this.normalPrice = (this.valueNormal * this.form.value.destinyProjection) * normalPrice;
            this.thirdPrice = (this.valueThird * this.form.value.destinyProjection) * thirdPrice;
            this.totalCost = (this.costPerKm * Number(this.form.value.destinyProjection)) + (this.costPerFood * (firstPrice + normalPrice + thirdPrice));
            this.totalGain = (this.firstPrice + this.normalPrice + this.thirdPrice) - this.totalCost;

            // this.calculatePrediction(this.form.value.destinyProjection);
            // for(let i = 0; i < this.valueProjection.length; i++){
            //     this.valueProjection[i] = this.gainProjection(this.valueProjection[i], firstPrice, normalPrice, thirdPrice);
            // }
        }
    }
}