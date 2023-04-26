import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CmsRoutingModule } from './cms-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';





@NgModule({
  declarations: [
    TasksComponent,
    GridComponent,
    LayoutComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,

    CmsRoutingModule,
    FormsModule,



  ]
})
export class CmsModule { }
