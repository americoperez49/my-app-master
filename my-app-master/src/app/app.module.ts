import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MySnackBarComponent } from './my-snack-bar/my-snack-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {AngularFireFunctionsModule} from '@angular/fire/functions'

const firebaseConfig = {
 // Your Firebase App Config
};

@NgModule({
  declarations: [
    AppComponent,
    MyDialogComponent,
    MySnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireFunctionsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
