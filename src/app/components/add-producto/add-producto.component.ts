import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { validarPrecio } from 'src/app/validators/precio.validator';


@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss'],
})
export class AddProductoComponent implements OnInit {
  edit = false;
  //Boton de editar o guardar
  productId: number = 0;
  imgProduct = './assets/upload.png';
  currentFile?: any[] = [];
  categorias: any[] = [];
  formProduct!: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private compressImg: NgxImageCompressService,
    private fb: FormBuilder,
    private categoryService: ConfigService,
    private _productService: ProductService,
    private nParams: NavParams,
    private alert: ToastService
  ) {
    this.getCategorias();
    this.formProduct = this.fb.group({
      nombre: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(10)]],
      precio_adquirido: [0, Validators.required],
      precio_de_venta: [0, [Validators.required, validarPrecio]],
      stock: [0, Validators.required],
      caducidad: ["", Validators.required],
      imagen: [""],
      cat_id: [0, Validators.required],
    },
      { validators: validarPrecio },
    );

    let info = this.nParams.get('datakey');
    if (info) {
      console.log(info);
      this.formProduct.reset(info);
      this.edit = true;
      this.imgProduct = info.imagen;
      console.log('Valor: ', this.edit);
      this.productId = info.id; // Extrae el ID del objeto y almacénalo
      console.log('ID del producto:', this.productId);
    } else {
      this.edit = false;
      console.log('Valor: ', this.edit);
    }
  }

  validarMonto() {
    return !!this.formProduct?.errors?.['ErrorPrecio']
  }


  getCategorias() {
    this.categoryService.listOfCategories().subscribe((resp: any) => {
      this.categorias = resp;
    })
  }


  ngOnInit() { }

  imageProduct(ev: any) {
    console.log(ev);
    this.compressImg.uploadFile().then(({ image, orientation }) => {
      this.generarURL(image);
      const blob = this.dataURItoBlob(image);
      this.currentFile![0] = blob;
    })
  }

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
    // this.formGroup.get('image').patchValue(imageUrl)
  }


  async close() {
    await this.modalCtrl.dismiss();
  }


  validaCtrl(control: string) {
    return !!this.formProduct.get(control)?.errors && this.formProduct.get(control)?.touched
  }



  submit() {
    // if (this.formProduct.invalid) return  //sino cumple con las validaciones regresa
    console.log(this.formProduct.errors);
    const formdata = new FormData();
    let data = this.formProduct.getRawValue();

    for (const dataKey in data) {
      formdata.append(dataKey, data[dataKey]);
    }
    if (this.currentFile) {
      formdata.append('imagen', this.currentFile[0]);
    }

    console.log('Formdata', formdata)

    this._productService.addProduct(formdata).subscribe(resp => {
      console.log(resp);
      this.formProduct.reset();
      this._productService.setNewProduct(resp); //Set el emitter

      this.close();
    })




    console.log(data);



  }

  // saveProduct() {
  //   if (this.productForm.valid) {
  //     console.log(this.productForm.value);
  //     this.productForm.reset();
  //     this.presentToast('middle');
  //     this.showProgressBar = false;
  //     this.updateProgress();
  //   }
  // }

  

  saveData() {
    console.log(this.formProduct.errors);
    const formdata = new FormData();
    let data = this.formProduct.getRawValue();
    for (const dataKey in data) {
      formdata.append(dataKey, data[dataKey]);
    }
    if (this.currentFile) {
      formdata.append('imagen', this.currentFile[0]);
    }
    console.log('Formdata', formdata);
    if (this.edit) {
      console.log('Actualizar producto');
      this._productService.addProduct(formdata).subscribe((resp: any) => {
        console.log(resp);
        if (resp) {
          this.alert.mostrarToast('Producto creado con éxito', 5000, 'top', 'success', 'checkmark-circle');
          this._productService.setNewProduct(resp);
          this.modalCtrl.dismiss();
          this.formProduct.reset();
        }
      });
    } else {
      this._productService.editProduct(this.productId, formdata,).subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp) {
            this.alert.mostrarToast('Producto actualizado con éxito', 5000, 'top', 'success', 'checkmark-circle');
            this._productService.setNewProduct(resp);
            this.modalCtrl.dismiss();
            this.formProduct.reset();
          }
        }
      );
    }
  }

}