import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Araba } from 'src/app/models/Araba';
import { Kategori } from 'src/app/models/Kategori';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  arabalar!: Araba[];
  modal!: Modal;
  modalBaslik: string = "";
  kategoriler!: Kategori[];
  secAraba!: Araba;
  secDate:string = "";
  toplam:number = 0;
  katId:string = "";
  secKat: Kategori = new Kategori();
  frm: FormGroup = new FormGroup({
    carId: new FormControl(),
    adi: new FormControl(),
    categoryId: new FormControl(),
    adedi: new FormControl(),
    fiyati: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: HotToastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriListele();
      }
    })
    this.KategoriListele();
  }
  ChangeTotal(){
    this.toplam = +this.secAraba.fiyat
    this.secDate = (<HTMLSelectElement>document.getElementById("selector")).value
    this.toplam = this.toplam * +this.secDate
  }

  ArabaListele(){
    this.servis.ArabaListeleByKatId(this.katId).subscribe(d => {
      this.arabalar = d
    })
  }
  KategoriListele(){
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    })   
  }

  Kirala(item: Araba,el:Element){
    this.secAraba = item;
    this.toplam = parseInt(item.fiyat); 
    this.modalBaslik = "Ödeme İşlemleri";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  KatSec(katId:string){
    this.katId = katId
    this.KategoriGetir()
  }
  KategoriGetir(){
    this.servis.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.ArabaListele()
    })
  }
  OdemeYap() {
    
    this.toast.success("Araç Kiralama Başarılı");
    this.ArabaListele();
    this.modal.toggle();
  }

}
