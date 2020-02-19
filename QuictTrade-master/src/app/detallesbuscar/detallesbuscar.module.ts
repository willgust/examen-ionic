import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesbuscarPageRoutingModule } from './detallesbuscar-routing.module';

import { DetallesbuscarPage } from './detallesbuscar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesbuscarPageRoutingModule
  ],
  declarations: [DetallesbuscarPage]
})
export class DetallesbuscarPageModule {}
