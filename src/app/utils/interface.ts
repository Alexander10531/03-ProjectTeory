export interface IDestiny{
    name : string,
    cost? : number, 
    gain? : number, 
    total? : number,
    distance : number, 
}

export interface IButtonBottomBar{
    index: number,
    title: string,
    active: boolean,
    subNotes?: string,
    buttonTitle: string,
    typeContainer: string,
}

export interface IChangeValue{
    index: number, 
    incDec?: number, 
    event: any, 
}

export interface ICar{
    id: number, 
    finalLane: number, 
    initialLane: number,
}

export interface IParametersCar{
    x: number, 
    y: number, 
    angle: number,
}