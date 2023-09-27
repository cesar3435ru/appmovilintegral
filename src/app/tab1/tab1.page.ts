import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register(); //Se debe importar en cada componente que se vayan a usar
// import { Swiper } from 'Swiper';

interface productslide {
  id: number,
  imagen: string,

}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  titulo = 'Sistema de inventario';


  constructor() { }

  swiperSlideChanged(e: any) {
    console.log('Changed', e);
  }

  masVendidos: productslide[] = [
    {
      id: 1,
      imagen: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/12/henry-cavill-superman.jpg?resize=1500%2C957&quality=50&strip=all&ssl=1'
    },
    {
      id: 2,
      imagen: 'https://images8.alphacoders.com/133/1330089.png'
    },
    {
      id: 3,
      imagen: 'https://images2.alphacoders.com/133/1330026.png'
    },
    {
      id: 4,
      imagen: 'https://images8.alphacoders.com/133/1330025.png'
    },
    {
      id: 5,
      imagen: 'https://images6.alphacoders.com/684/684831.jpg'
    },
  ]

}
