import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArabaComponent } from './components/araba/araba.component';
import { HomeComponent } from './components/home/home.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { KayitComponent } from './components/kayit/kayit.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UyeComponent } from './components/uye/uye.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'kategoriler',
    component: KategoriComponent

  },
  {
    path: 'uyeler',
    component: UyeComponent

  },
  {
    path: 'arabalar',
    component: ArabaComponent

  },
  {
    path: 'arabalar/:katId',
    component: ArabaComponent
  },
  {
    path: 'kayit',
    component: KayitComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
