import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { VerProductComponent } from './ver-product/ver-product.component';



@NgModule({
  declarations: [
    NewProductComponent,
    VerProductComponent
  ],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [NewProductComponent, VerProductComponent]
})
export class ComponentsModule { }
