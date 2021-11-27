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

    form : FormGroup;
    totalCost: number = 0; 
    totalGain : number = 0;
    firstPrice : number = 0; 
    thirdPrice : number = 0; 
    normalPrice : number = 0; 
    showData : boolean = true; 
    plus : IconDefinition = faPlus;

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
            distance : [
                undefined, 
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern('^\\d+$')
                ]],
        })
    }

    changeState(valueBool : boolean){
        this.showData = valueBool; 
    }
    
    onSubmit(e : Event){
        let firstPrice = Number(this.form.value.firstNumber ? this.form.value.firstNumber : 0);
        let normalPrice = Number(this.form.value.turistNumber ? this.form.value.turistNumber : 0);
        let thirdPrice = Number(this.form.value.thirdNumber ? this.form.value.thirdNumber : 0);
        let costPerKm : number = 7000 / 91.1; 
        let costPerFood : number = 50; 
        let valueFirst = 11.10;
        let valueNormal = 7.70; 
        let valueThird = 5.5;  
        
        if(this.form.valid && (firstPrice + normalPrice + thirdPrice) < 41 && (firstPrice + normalPrice + thirdPrice) > 0){
            this.firstPrice = (valueFirst * this.form.value.distance) * firstPrice;
            this.normalPrice = (valueNormal * this.form.value.distance) * normalPrice;
            this.thirdPrice = (valueThird * this.form.value.distance) * thirdPrice;
            this.totalCost = (costPerKm * Number(this.form.value.distance)) + (costPerFood * (firstPrice + normalPrice + thirdPrice));
            this.totalGain = (this.firstPrice + this.normalPrice + this.thirdPrice) - this.totalCost;
        }
        e.preventDefault();
    }

    generateRandomNumber(min : number, max : number) : Number{
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

}