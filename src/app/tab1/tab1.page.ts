import { Component, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register(); //Se debe importar en cada componente que se vayan a usar
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


interface productslide {
  id: number,
  imagen: string,

}
interface product {
  id: number,
  precio: number,
  stock: number,
  name: string,
  img: string,
  description: string,
  state: boolean,
  code: string,

}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  titulo = 'Sistema de inventario';


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }



  swiperSlideChanged(e: any) {
    console.log('Changed', e);
  }
  onSwiperInit(event: any) {
    event.autoplay.start();
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

  misProductos: product[] = [

    {
      id: 1,
      name: "Galletas de animalito",
      description: "Las mas buenas",
      code: "c453g",
      precio: 100,
      stock: 10,
      state: true,
      img: 'https://chedrauimx.vtexassets.com/arquivos/ids/18990294-1600-auto?v=638302163026430000&width=1600&height=auto&aspect=true'
    },

    {
      id: 2,
      name: "Sabritas",
      description: "Las mejores",
      code: "c553a",
      precio: 200,
      stock: 0,
      state: true,
      img: 'https://www.tasteboutique.com/cdn/shop/products/Sabritas_con_sal_170_gr_540x.jpg?v=1586040425'
    },
    {
      id: 3,
      name: "Takis",
      description: "Las mejores",
      code: "ta530",
      precio: 300,
      stock: 0,
      state: true,
      img: 'https://chedrauimx.vtexassets.com/arquivos/ids/19701968-1600-auto?v=638315289761330000&width=1600&height=auto&aspect=true'
    },
    {
      id: 4,
      name: "Celular",
      description: "Las mejores",
      code: "ma453",
      precio: 10000,
      stock: 17,
      state: true,
      img: 'https://m.media-amazon.com/images/I/61wVdpwmktL._AC_SL1500_.jpg'
    },
  ]



}
