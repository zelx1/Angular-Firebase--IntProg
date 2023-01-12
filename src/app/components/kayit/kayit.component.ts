import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/myToast.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.component.html',
  styleUrls: ['./kayit.component.scss']
})
export class KayitComponent implements OnInit {
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    id: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    adres: new FormControl(),
    foto: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: HotToastService,
    public route: Router
  ) { }

  ngOnInit(): void {
  }
  UyeOl(adsoyad: string, email: string, parola: string) {
    let kaytarih = Date();
    let duztarih = Date()
    let admin = '0'
    this.servis.
      KayitOl(email, parola)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.servis.UyeEkle({ 
            uid, email, displayName: adsoyad , duztarih, kaytarih,admin
          })
        ),
        this.toast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.route.navigate(['']);
      });
  }
}
