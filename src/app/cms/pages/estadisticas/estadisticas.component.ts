import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-grid',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

  }

  public barChartLengend =true;
  public barChartPlugins =[];

  public barChartData: ChartConfiguration<'bar'>['data']={
    labels: ['Noviembre'],
    datasets:[
      {data: [1], label: 'ADMIN'},
      {data: [5], label: 'CLIENTE'},

    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options']={
    responsive: true,
  };


}
