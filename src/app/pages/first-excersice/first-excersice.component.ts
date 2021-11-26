import { Form, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { faPlus, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-first-excersice',
  templateUrl: './first-excersice.component.html',
  styleUrls: ['./first-excersice.component.css']
})
export class FirstExcersiceComponent{

    showData : boolean = true; 
    plus : IconDefinition = faPlus; 
    form : FormGroup;
    firstPrice : number = 0; 
    normalPrice : number = 0; 
    thirdPrice : number = 0; 


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
        
        let firstPrice = this.form.value.firstPrice ? this.form.value.firstPrice : 0;
        let normalPrice = this.form.value.turistNumber ? this.form.value.turistNumber : 0;
        let thirdPrice = this.form.value.thirdNumber ? this.form.value.thirdNumber : 0;
        let valueFirst = 11.10;
        let valueNormal = 7.70; 
        let valueThird = 5.50;

        if(this.form.valid && (this.normalPrice + this.thirdPrice + this.firstPrice) < 41 && (this.normalPrice + this.thirdPrice + this.firstPrice) > 0){
            this.firstPrice = (valueFirst * this.form.value.distance) * firstPrice;
            this.firstPrice = (valueNormal * this.form.value.distance) * normalPrice;
            this.thirdPrice = (valueThird * this.form.value.distance) * thirdPrice;
            console.log(firstPrice);                
            console.log(firstPrice);            
            console.log(thirdPrice);            
        }
        e.preventDefault();
    }

}