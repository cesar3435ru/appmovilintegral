import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { VerProductComponent } from './ver-product/ver-product.component';
import { HeaderComponent } from './header/header.component';
import { NewVentaComponent } from './new-venta/new-venta.component';
import { NewCategoriaComponent } from './new-categoria/new-categoria.component';



@NgModule({
  declarations: [
    NewProductComponent,
    VerProductComponent,
    HeaderComponent,
    NewVentaComponent,
    NewCategoriaComponent
  ],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [NewProductComponent, VerProductComponent, HeaderComponent, NewVentaComponent, NewCategoriaComponent]
})
export class ComponentsModule { }
