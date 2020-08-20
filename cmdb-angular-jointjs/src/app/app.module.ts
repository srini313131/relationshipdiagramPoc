import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { JointComponent } from './app-joint/joint.component';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  imports:      [ BrowserModule, FormsModule , SidebarModule, BrowserAnimationsModule,
    InputTextModule,ButtonModule,CheckboxModule,RadioButtonModule,TabViewModule,
    ReactiveFormsModule

  ],
  declarations: [ AppComponent, JointComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
