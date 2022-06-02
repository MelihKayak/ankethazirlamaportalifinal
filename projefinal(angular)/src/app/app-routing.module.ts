import { AnketComponent } from './components/anket/anket.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyeComponent } from './components/uye/uye.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'uye',
    component: UyeComponent
  },
  {
    path:'kategori',
    component: KategoriComponent
  },
  {
    path:'anket',
    component: AnketComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
