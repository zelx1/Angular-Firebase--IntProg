import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { KategoriComponent } from './components/kategori/kategori.component';
import { ArabaComponent } from './components/araba/araba.component';
import { UyeComponent } from './components/uye/uye.component';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/authGuard.service';
import { MytoastService } from './services/myToast.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KayitComponent } from './components/kayit/kayit.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProfilComponent } from './components/profil/profil.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    KategoriComponent,
    ArabaComponent,
    UyeComponent,
    KayitComponent,
    ProfilComponent,
    ProductsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()),
  ],
  providers: [DataService, AuthGuard, MytoastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
