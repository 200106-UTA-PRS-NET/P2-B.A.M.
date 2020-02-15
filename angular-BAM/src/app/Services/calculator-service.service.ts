import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Calc } from '../calc';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  url = "https://newton.now.sh";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

    /**GET: get venues */
    getResult(operation: string, expression: string):Promise<Calc>
    {
      return this.http.get<Calc>(`${this.url}/${operation}/${expression}`).toPromise();
    }

}
