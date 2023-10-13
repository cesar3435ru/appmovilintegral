import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, of, catchError, throwError, tap, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getNewProduct: EventEmitter<any> = new EventEmitter();


  url: string = 'http://localhost:8000';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  addProduct(formData: FormData){
    return this.http.post(this.url + '/api/addproduct', formData);
  }

 

  //Coloca el producto
  setNewProduct(product: any){
    this.getNewProduct.emit(product)
  }
}
