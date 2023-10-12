import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, of, catchError, throwError, tap, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getNewCategory: EventEmitter<any> = new EventEmitter();

  // Un sujeto utilizado para notificar eventos relacionados con la categoría.
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

  //Obtiene un Observable que permite observar eventos relacionados con la categoria.
  getCategoryObservable(): Observable<void> {
    return this.categorySubject.asObservable();
  }

  listOfCategories(){
    return this.http.get(this.url + '/api/categories');
  }


  //Coloca la categoria
  setNewCategory(category: any){
    this.getNewCategory.emit(category)
  }

}
