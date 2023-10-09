import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, of, catchError, throwError, tap, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public categorySubject: Subject<void> = new Subject<void>();


  url: string = 'http://localhost:8000';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

 
  
  addCategory(formData: FormData){
    return this.http.post(this.url + '/api/addcategory', formData);
  }
  getCategoryObservable(): Observable<void> {
    return this.categorySubject.asObservable();
  }

  listOfCategories(){
    return this.http.get(this.url + '/api/categories');
  }

}
