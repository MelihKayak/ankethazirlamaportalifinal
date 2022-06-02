import { Anket } from './../../../models/Anket';
import { Kategori } from './../../../models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.scss']
})
export class AnketDialogComponent implements OnInit {
  kategoriId:string;
  kategoriler:Kategori[];
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit:Anket;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<AnketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="Soru Ekle";
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="Soru Düzenle";
    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      anketAdi:[this.yeniKayit.anketAdi],
      anketKategoriId:[this.yeniKayit.anketKategoriId]
    
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(kategori:Kategori){
    this.kategoriId = kategori.kategoriId;
  }

}
