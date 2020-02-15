import { DecimalPipe } from '@angular/common';

export interface Performer{
    groupName:string;
    perfomanceType:string;
    hourlyRate:number;
    rating:string;
    groupPass:string;
    totalCost?:number;
}