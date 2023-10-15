import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { VerProductComponent } from './ver-product/ver-product.component';
import { HeaderComponent } from './header/header.component';
import { NewVentaComponent } from './new-venta/new-venta.component';
import { NewCategoriaComponent } from './new-categoria/new-categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductoComponent } from './add-producto/add-producto.component';



@NgModule({
  declarations: [
    NewProductComponent,
    VerProductComponent,
    HeaderComponent,
    NewVentaComponent,
    NewCategoriaComponent,
    AddProductoComponent
  ],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  exports: [NewProductComponent, VerProductComponent, HeaderComponent, NewVentaComponent, NewCategoriaComponent, AddProductoComponent]
})
export class ComponentsModule { }
