import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from '../../models/Sonuc';
import { DataService } from '../../services/data.service';
import { MytoastService } from '../../services/myToast.service';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {

  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    uyeId: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    foto: new FormControl(),
    adres: new FormControl(),
    duztarih: new FormControl(),
  })
  constructor(
    public servis: DataService,
    public toast: HotToastService
  ) { }

  ngOnInit() {
    this.UyeListele();

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.servis.UyeListele().subscribe(d => {
      this.uyeler = d;
    });
  }
  
  UyeEkleDuzenle(email:string,parola:string) {
    var uye: Uye = this.frm.value
    var displayName = uye.displayName
    var tarih = new Date();
    if (!uye.uid) {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        this.servis.KayitOl(email, parola).pipe(
          switchMap(({ user : { uid } })=> 
          this.servis.UyeEkle({
            uid: uid, 
            email: email, 
            displayName: displayName,
            uyeId: '0',
            parola: uye.parola,
            admin: uye.admin,
            kaytarih: uye.kaytarih,
            duztarih: uye.duztarih,
            foto: uye.foto,
            adres: uye.adres
          })
          )
        ).subscribe(() => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Uye Eklendi";
          this.toast.success(this.sonuc.mesaj)
          this.UyeListele();
          this.modal.toggle();
        })
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.servis.UyeDuzenle(uye).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.success(this.sonuc.mesaj)
        this.UyeListele();
        this.modal.toggle();
      });
    }
  }
  UyeSil() {
    this.servis.UyeSil(this.secUye).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.success(this.sonuc.mesaj);
      this.UyeListele();
      this.modal.toggle();
    });
  }
}