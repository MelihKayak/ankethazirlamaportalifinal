import { Anket } from './../models/Anket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Uye } from '../models/Uye';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  
  apiUrl = "http://localhost:65046/api/";
  AnketListeByKategoriId: any;
  constructor(
    public http: HttpClient
  ) { }

  UyeListe() {
    return this.http.get(this.apiUrl + "uyeliste");
  }

  UyeById(uyeId: string) {
    return this.http.get(this.apiUrl + "uyebyid/" + uyeId);
  }

  UyeEkle(uye:Uye){
    return this.http.post(this.apiUrl+"uyeekle",uye);
  }

  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+"uyeduzenle",uye);
  }

  UyeSil(uyeId: string){
    return this.http.delete(this.apiUrl+"uyesil/" + uyeId);
  }

  KategoriListe(){
    return this.http.get(this.apiUrl+"kategoriliste");
  }

  KategoriById(kategoriId: string){
    return this.http.get(this.apiUrl+"kategoribyid/"+ kategoriId);
  }

  KategoriEkle(kategori: Kategori){
    return this.http.post(this.apiUrl+"kategoriekle", kategori);
  }

  KategoriDuzenle(kategori: Kategori){
    return this.http.put(this.apiUrl+"kategoriduzenle", kategori);
  }

  KategoriSil(kategoriId: string){
    return this.http.delete(this.apiUrl+"kategorisil/" + kategoriId);
  }
  AnketListe(){
    return this.http.get(this.apiUrl+"anketliste");
  }
  AnketById(anketId: string){
    return this.http.get(this.apiUrl+"anketbyid/"+ anketId);
  }
  AnketEkle(anket: Anket){
    return this.http.post(this.apiUrl+"anketekle/", anket);
  }
  AnketDuzenle(anket: Anket){
    return this.http.put(this.apiUrl+"anketduzenle", anket);
  }
  AnketSil(anketId: string){
    return this.http.delete(this.apiUrl+"anketsil/" + anketId);
  }



  

}
