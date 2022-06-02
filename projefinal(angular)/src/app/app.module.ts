import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { AnketComponent } from './components/anket/anket.component';
import { UyeComponent } from './components/uye/uye.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AnketListeleComponent } from './components/anket-listele/anket-listele.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    AnketComponent,
    KategoriComponent,
    AnketListeleComponent,

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    KategoriDialogComponent,
    AnketDialogComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    KategoriDialogComponent,
    AnketDialogComponent
    
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
