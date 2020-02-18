import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Tag } from '../tag';
import { TagWithId } from '../tag';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  //url = 'https://localhost:44341/BAMAPI/Tags';
  url = 'https://bamapi.azurewebsites.net/BAMAPI/Tags';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) //send the object as JSON
  };

  constructor(private http: HttpClient) { }

  //get all tags
  getTags(): Promise<TagWithId[]>{
    return this.http.get<TagWithId[]>(this.url).toPromise();
  }

  //get a specific tag
  getTagById(tagId:number): Promise<TagWithId>{
    return this.http.get<TagWithId>(`${this.url}/${tagId}`).toPromise();
  }

  getTagsByGroupName(groupName: string): Promise<TagWithId[]>{
    return this.http.get<TagWithId[]>(`${this.url}/ByName/${groupName}`).toPromise();
  }

  //create a tag
  postTag(tag:Tag): Promise<Tag>{
    return this.http.post<Tag>(this.url, tag, this.httpOptions).toPromise();
  }

  removeTag(tagId: number): Promise<TagWithId> {
    return this.http.delete<TagWithId>(`${this.url}/${tagId}`).toPromise();
  }
   
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
    
  }
  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
  }
}
