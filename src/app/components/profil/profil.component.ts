import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { DataService } from 'src/app/services/data.service';
import { concatMap } from 'rxjs';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  uye = this.fbServis.AktifUyeBilgi;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    email: new FormControl(),
    displayName: new FormControl(),
    tel: new FormControl(),
    adres: new FormControl(),
  });
  constructor(
    public fbServis: DataService,
    public htoast: HotToastService
    ) { }

  ngOnInit(): void {
    this.fbServis.AktifUyeBilgi
      .subscribe((user) => {
        this.frm.patchValue({ ...user });
      });
  }
  Kaydet() {
    this.fbServis
      .UyeDuzenle(this.frm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }
  ResimYukle(event: any, user: Uye) {
    this.fbServis
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.htoast.observe({
          loading: 'Fotoğraf Yükleniyor...',
          success: 'Fotoğraf yüklendi',
          error: 'Hata oluştu',
        }),
        concatMap((foto) =>
          this.fbServis.UyeDuzenle({ uid: user.uid, foto })
        )
      )
      .subscribe();
  }
}