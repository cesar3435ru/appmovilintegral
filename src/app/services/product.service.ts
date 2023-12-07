import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, of, catchError, throwError, tap, Subject } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getNewProduct: EventEmitter<any> = new EventEmitter();
  deleteProduct: EventEmitter<any> = new EventEmitter();
  public deleteProductSubject: Subject<void> = new Subject<void>();
  public editProductSubject: Subject<void> = new Subject<void>();
  public ventaSubject: Subject<void> = new Subject<void>();
  public getProductsSubject: Subject<void> = new Subject<void>();
  public getProductVendidoSubject: Subject<void> = new Subject<void>();




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

  getProductsObservable(): Observable<void> {
    return this.getProductsSubject.asObservable();
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

  doNewSale(data: any) {
    return this.http.post(this.url + '/api/nventa', data);
  }

  getVentaObservable(): Observable<void> {
    return this.ventaSubject.asObservable();
  }

  getVentas() {
    return this.http.get(this.url + '/api/ventas');
  }

  async reporte(ventas: any[]) {
    function buildTableBody(data: any, colum: any) {
      const body: any = [];
      data.forEach((row: any) => {
        const dataRow: any = [];
        colum.forEach((colum: any) => {
          const dataObj = {
            text: row['Hola'],
            style: 'subheader'
          };
          dataRow.push(dataObj);
        });
        body.push(dataRow);
        const obj2 = [{
          fontSize: 16, bold: true, text: 'Total', style: 'Subheader'
        },
        {
          fontSize: 16, bold: true, text: '1500', style: 'Subheader'
        },

        ];
        body.push(obj2);

        return body;
      }
      );
    }
  }


  generatePDF(listaProducts: any) {
    // Definir el contenido del PDF
    const documentDefinition = {
      content: [
        {
          text: 'Reporte de ventas', style: 'header'
        },
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Nombre', 'Cantidad', 'Ganancias', 'Stock'],
              ...listaProducts.map((p: any) => [p.product.nombre, p.cantidad, `$${p.ganacias}`, p.product.stock])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true
        }
      }
    };

    // Crear el PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    // Descargar el PDF
    pdfDocGenerator.download('Reporte_de_ventas.pdf');
  }

  getProductosMasVendidos() {
    return this.http.get(this.url + '/api/masvendidos');
  }
  getProductVendidoNowAsAObservable(): Observable<void> {
    return this.getProductVendidoSubject.asObservable();
  }


}
