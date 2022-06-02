import { Kategori } from './../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kayit } from 'src/app/models/kayit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anket-listele',
  templateUrl: './anket-listele.component.html',
  styleUrls: ['./anket-listele.component.scss']
})
export class AnketListeleComponent implements OnInit {
  kategoriler: Kategori[];
  kayitlar: Kayit[];
  secKategori: Kategori;
  kategoriId: string;
  displayedColumns = ['anketBilgi', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p){
        this.kategoriId=p.kategoriId;
        this.KategoriGetir();
      }
    });
  }
  
  KategoriGetir(){
    this.apiServis.AnketListeByKategoriId(this.kategoriId).subscribe((d:Kategori)=>{
      this.secKategori=d;
    });
  }

}
