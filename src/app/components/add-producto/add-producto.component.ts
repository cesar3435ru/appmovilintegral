import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss'],
})
export class AddProductoComponent implements OnInit {



  imgProduct = '../../assets/upload.png';
  currentFile?: any[] = [];
  formProduct!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private compressImg: NgxImageCompressService,
    private fb: FormBuilder,
    private productS: ProductService
  ) {
    this.formProduct = this.fb.group({
      nombre: ['', [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10)]],
      precio_adquirido: [0, Validators.required],
      precio_de_venta: [0, Validators.required],
      stock: [0, Validators.required],
      caducidad: ['', Validators.required],
      imagen: [''],
      codigo: ['', Validators.required],
      cat_id: [0, Validators.required]
    })
  }

  ngOnInit() { }

  async close() {
    await this.modalCtrl.dismiss();
  }

  imageProduct(ev: any) {
    console.log(ev);
    this.compressImg.uploadFile().then(({ image, orientation }) => {
      this.generarURL(image);
      const blob = this.dataURItoBlob(image);
      this.currentFile![0] = blob;
    });
  }

  // la convierte en url
  generarURL(image: any) {
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: '' });
    // Crear la URL de la imagen
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    // Utilizar la URL de la imagen
    this.imgProduct = imageUrl;
    document.getElementById("imgProd")?.setAttribute(
      'src', imageUrl);
  }

  //la transformacion del codigo a la imagen 
  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString })
  }

  guardar() {
    if (this.formProduct.invalid) return  //sino cumple con las validaciones regresa
    const formdata = new FormData(); //form data creacion 
    let data = this.formProduct.getRawValue(); //obtenemos la info en data
    for (const dataKey in data) { //en el for va uno por uno en los atributos de data
      formdata.append(dataKey, data[dataKey]);
    }

    if (this.currentFile) {
      formdata.append('imagen', this.currentFile[0]);
    }

    this.productS.addProduct(formdata).subscribe(resp => {
      console.log(resp);
    }, (error: any) => {
      console.error("Error en la solicitud:", error);
    });

  }

  categorias = ['Abarrotes', 'Frutas y verduras', 'Limpieza', 'Vinos y licores', 'Especies', 'Golosinas']

 

}
