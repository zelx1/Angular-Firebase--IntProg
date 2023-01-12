import { Injectable, OnInit } from '@angular/core';
import { Uye } from '../models/Uye';
import { HttpClient } from '@angular/common/http'
import { Kategori } from '../models/Kategori';
import { Araba } from '../models/Araba';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{
  aktifUye = authState(this.auth);
  uye = this.AktifUyeBilgi
  uyeAdmin: string = "";
  
  constructor(
    public http: HttpClient,
    public auth: Auth,
    public fs: Firestore,
    public storage: Storage
  ) { }

  ngOnInit(): void {
    this.uye.subscribe((d) => {
      this.uyeAdmin = d?.admin as string
    })
  }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }
  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Users', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }
  KategoriListele() {
    var ref = collection(this.fs, "Categories")
    return collectionData(ref, {idField: 'katId' }) as Observable<Kategori[]>
  }
  KategoriById(id: string) {
    const ref = doc(this.fs, "Categories/"+ id)
    return docData(ref) as Observable<Kategori>
  }
  KategoriEkle(kat: Kategori) {
    var ref = collection(this.fs, "Categories")
    return addDoc(ref, kat)
  }
  KategoriDuzenle(kat: Kategori) {
    var ref = doc(this.fs, "Categories/"+ kat.katId)
    return updateDoc(ref, { ...kat })
  }
  KategoriSil(kat: Kategori) {
    var ref = doc(this.fs, "Categories/"+ kat.katId)
    return deleteDoc(ref)
  }

  UyeListele() {
    var ref = collection(this.fs, "Users")
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>
  }
  UyeById(uid: string) {
    const ref = doc(this.fs, "Users/" + uid)
    return from(docData(ref)) as Observable<Uye>
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs , "Users", uye.uid)
    return from(setDoc(ref, uye))
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Users", uye.uid);
    return from(updateDoc(ref, { ...uye }))
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Users", uye.uid)
    return from(deleteDoc(ref))
  }


  ArabaListele() {
    var ref = collection(this.fs, "Categories/"+"/Cars")
    return collectionData(ref, {idField: 'carId'}) as Observable<Araba[]>
  }
  ArabaListeleByKatId(katId: string) {
    var ref = collection(this.fs, "Categories/"+ katId + "/Cars")
    return collectionData(ref, {idField:'carId'}) as Observable<Araba[]>
  }
  ArabaById(Araba: Araba) {
    var ref = collection(this.fs, "Categories/"+ Araba.categoryId + "/Cars/"+ Araba.carId)
    return collectionData(ref, {idField:'carId'}) as Observable<Araba[]>
  }
  ArabaEkle(Araba: Araba) {
    var ref = collection(this.fs, "Categories/"+ Araba.categoryId+ "/Cars")
    return addDoc(ref, Araba)
  }
  ArabaDuzenle(Araba: Araba) {
    var ref = doc(this.fs, "Categories/"+ Araba.categoryId+ "/Cars/"+ Araba.carId)
    return updateDoc(ref, { ...Araba })
  }
  ArabaSil(araba: Araba) {
    var ref = doc(this.fs, "Categories/"+ araba.categoryId+"/Cars/"+ araba.carId)
    return deleteDoc(ref)
  }

  AdminCheck(){
    if (this.uyeAdmin == '1'){
      return true
    } else {
      return false
    }
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}