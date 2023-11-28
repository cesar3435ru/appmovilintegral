import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, of, catchError, throwError, tap, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getNewProduct: EventEmitter<any> = new EventEmitter();
  deleteProduct: EventEmitter<any> = new EventEmitter();
  public deleteProductSubject: Subject<void> = new Subject<void>();
  public editProductSubject: Subject<void> = new Subject<void>();
  public ventaSubject: Subject<void> = new Subject<void>();




  url: string = 'http://localhost:8000';


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addProduct(formData: FormData) {
    return this.http.post(this.url + '/api/addproduct', formData);
  }
  deleteProductById(id: number) {
    return this.http.delete(this.url + `/api/product/${id}`);
  }
  getDeletedProductObservable(): Observable<void> {
    return this.deleteProductSubject.asObservable();
  }

  getProducts() {
    return this.http.get(this.url + '/api/products');
  }



  //Coloca el producto
  setNewProduct(product: any) {
    this.getNewProduct.emit(product)
  }


  removeProduct(product: any) {
    this.deleteProduct.emit(product)
  }

  editProduct(id: number, formData: FormData) {
    return this.http.put(this.url + `/api/product/${id}`, formData);
  }
  getEditedProductAsAObservable(): Observable<void> {
    return this.editProductSubject.asObservable();
  }

  doNewSale(data:any) {
    return this.http.post(this.url + '/api/nventa', data);
  }

  getVentaObservable(): Observable<void> {
    return this.ventaSubject.asObservable();
  }

  getVentas() {
    return this.http.get(this.url + '/api/ventas');
  }



}
