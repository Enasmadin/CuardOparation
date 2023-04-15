import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AddComponent } from './components/add/add.component';
import { AddEmpolyeeComponent } from './components/add-empolyee/add-empolyee.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { UpdateCopmponentComponent } from './components/update-copmponent/update-copmponent.component';
import { IndexEmployeeComponent } from './components/index-employee/index-employee.component';




@NgModule({
  declarations: [
    AppComponent,

    AddComponent,
    AddEmpolyeeComponent,
   
    UpdateCopmponentComponent,
   IndexEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot()
      
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
