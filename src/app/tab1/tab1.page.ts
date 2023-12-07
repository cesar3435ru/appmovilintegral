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
import { ModalController } from '@ionic/angular';
import { NewCategoriaComponent } from '../components/new-categoria/new-categoria.component';
import { ProductService } from '../services/product.service';

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
  home = 'Sistema de inventario';
  ventas: any[] = [];

  constructor(private modal: ModalController, private p: ProductService) {

    this.getProdsMasVendidos();
    this.getSales();
    this.p.getVentaObservable().subscribe(() => {
      this.getSales();
    });
    this.p.getProductVendidoNowAsAObservable().subscribe(() => {
      this.getProdsMasVendidos();
    });
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
      img: 'https://m.media-amazon.com/images/I/61LA1giEvNL._AC_UF894,1000_QL80_.jpg'
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
      img: 'https://http2.mlstatic.com/D_NQ_NP_881249-MLM47867430793_102021-O.webp'
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

  getSales() {
    this.p.getVentas().subscribe((resp: any) => {
      this.ventas = resp;
      this.ventas.reverse();
      console.log('Mis ventas', this.ventas);
    });
  }


  getProdsMasVendidos() {
    this.p.getProductosMasVendidos().subscribe((resp: any) => {
      // Guardar la respuesta en una variable temporal
      const productosMasVendidos = resp.productos_mas_vendidos;

      // Extraer los nombres de los productos y las cantidades vendidas
      const nombresProductos = productosMasVendidos.map((producto: any) => producto.detalle.nombre);
      const cantidadesVendidas = productosMasVendidos.map((producto: any) => producto.total_vendido);

      // Crear el objeto chartOptions con los datos extraídos
      this.chartOptions = {
        series: [{
          name: "Ventas",
          data: cantidadesVendidas
        }],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Top 5 de productos más vendidos"
        },
        xaxis: {
          categories: nombresProductos
        }
      };

      console.log('Datos de la grafica:', this.chartOptions); // Para verificar los datos antes de mostrar la gráfica
    });
  }

  esCantidadMayor(cantidad: number): boolean {
    return cantidad > 5;
  }




  async openNewCategoria() {

    const md = await this.modal.create({
      component: NewCategoriaComponent,
      mode: 'md',
      initialBreakpoint: .5,
      backdropDismiss: false
    })

    await md.present();

  }

  gPDF() {
    console.log(this.ventas);
    this.p.generatePDF(this.ventas);

  }





}

//FILTRO DE DATOS por fecha
//GRAFICA DE VENTAS
//PRODUCTOS MAS VENDIDOS
