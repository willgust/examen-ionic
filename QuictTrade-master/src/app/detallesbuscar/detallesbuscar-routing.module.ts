import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesbuscarPage } from './detallesbuscar.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesbuscarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesbuscarPageRoutingModule {}
