import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Araba } from 'src/app/models/Araba';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/myToast.service';

@Component({
  selector: 'app-araba',
  templateUrl: './araba.component.html',
  styleUrls: ['./araba.component.scss']
})

export class ArabaComponent implements OnInit {
  arabalar!: Araba[];
  kategoriler!: Kategori[];
  uye = this.servis.AktifUyeBilgi
  
  modal!: Modal;
  toplam: number = 0;
  modalBaslik: string = "";
  secAraba!: Araba;
  katId: string = "";
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    carId: new FormControl(),
    carname: new FormControl(),
    year: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
    imgUrl: new FormControl(),
    fiyat: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.KategoriListele();
    
  }
  KatSec(katId: string) {
    this.katId = katId;
    this.KategoriGetir();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Araba Ekle";
    this.modal.show();
  }
  Duzenle(araba: Araba, el: HTMLElement) {
    this.frm.patchValue(araba);
    this.modalBaslik = "Araba Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(araba: Araba, el: HTMLElement) {
    this.secAraba = araba;
    this.modalBaslik = "Araba Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Kirala(item: Araba,el:Element){
    this.secAraba = item;
    this.toplam = parseInt(item.fiyat); 
    this.modalBaslik = "Ödeme İşlemleri";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ArabaListele() {
    this.servis.ArabaListeleByKatId(this.katId).subscribe(d => {
      this.arabalar = d;
    });
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.ArabaListele();
    });
  }
  ArabaEkleDuzenle() {
    var araba: Araba = this.frm.value
    var tarih = new Date();
    if (!araba.carId) {
        araba.kaytarih = tarih.getTime().toString();
        araba.duztarih = tarih.getTime().toString();
        this.servis.ArabaEkle(araba).then(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Araba Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.ArabaListele();
          this.modal.toggle();
        });
    } else {
      araba.duztarih = tarih.getTime().toString();
      this.servis.ArabaDuzenle(araba).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Araba Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.ArabaListele();
        this.modal.toggle();
      });
    }
  }
  ArabaSil() {
    this.servis.ArabaSil(this.secAraba).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Araba Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.ArabaListele();
      this.modal.toggle();
    });
  }
  OdemeYap() {
    this.sonuc.islem = true;
    this.sonuc.mesaj = "Araç Kiralandı!";
    this.toast.ToastUygula(this.sonuc);
    this.ArabaListele();
    this.modal.toggle();
  }

  
}
