import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent  implements OnInit {
  products: any[] = [];
  myproducts: any[] = [];

  constructor(private PopCtrl: PopoverController) { }

  ngOnInit() {
    console.log(this.products);
    this.myproducts = this.products;
    console.log(this.myproducts);

  }


  selectProduct(p: any){
    console.log('Desde popover', p);
    this.PopCtrl.dismiss({item: p});  
  }

}
