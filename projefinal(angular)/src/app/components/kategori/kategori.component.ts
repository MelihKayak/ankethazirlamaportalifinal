import { Kategori } from './../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Anket } from 'src/app/models/Anket';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {

  kategoriler:Kategori[];
  anketler:Anket[];
  kategoriId:string;
  dataSource : any;
  displayedColumns=['kategoriKodu','kategoriAdi','kategoriNo','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KategoriDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  
  Filtrele(e){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
   Ekle(){
    var yeniKayit:Kategori=new Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
}
Duzenle(kayit: Kategori){
  this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
    width:'400px',
    data:{
      kayit:kayit,
      islem:'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
      d.kategoriId=kayit.kategoriId;
      this.apiServis.KategoriDuzenle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.KategoriListele();
        }
      });
    }
  });

}
Sil(kayit:Kategori){
  this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'600px'
  }); 

  this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.kategoriKodu + "  " + kayit.kategoriAdi + "  --> Bu Kategori Silinecektir Onaylıyor Musunuz ?"
  this.ConfirmDialogRef.afterClosed().subscribe(d=>{
    if (d) {
      this.apiServis.KategoriSil(kayit.kategoriId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.KategoriListele();
        }
      });
    }
  });
}

}
