import { Anket } from './../../models/Anket';
import { Kategori } from './../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kayit } from 'src/app/models/kayit';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-anket',
  templateUrl: './anket.component.html',
  styleUrls: ['./anket.component.scss']
})
export class AnketComponent implements OnInit {
  kategoriler: Kategori[];
  anketler: Anket[];
  kayitlar: Kayit[];
  kategoriId: string;
  dataSource: any;
  displayedColumns = ['anketAdi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<AnketDialogComponent>;
  ConfirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  KategoriSec(kategori: Kategori) {
    this.kategoriId = kategori.kategoriId;
    this.KategoriListele();
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle() {
    var yeniKayit: Anket = new Anket();
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d);

        this.apiServis.AnketEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListele();
          }
        });
      }
    });
  }

  Duzenle(kayit: Kategori) {
    this.dialogRef = this.matDialog.open(AnketDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.kategoriId = kayit.kategoriId;
        this.apiServis.AnketDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListele();
          }
        });
      }
    });

  }
  Sil(kayit: Anket) {
    this.ConfirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '600px'
    });

    this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.anketAdi + " Adlı Kategorinin " + kayit.anketAdi + "  --> Adlı Anketi Silinecektir Onaylıyor Musunuz ?"
    this.ConfirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AnketSil(kayit.anketId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AnketListele();
          }
        });
      }
    });
  }
  AnketListele(){
    this.apiServis.AnketListeByKategoriId(this.kategoriId).subscribe((d:Anket[])=>{
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
}
