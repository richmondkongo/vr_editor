import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewerComponent } from './viewer/viewer.component';
import { FormsModule } from '@angular/forms';
import { TrciComponent } from './trci/trci.component';

import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { LocalSaveService } from './__services/local-save.service';
import { ImageSelectionComponent } from './image-selection/image-selection.component';

const dbConfig = {
  name: 'wevr',
  version: 1,
  objectStoresMeta: [{
    store: 'image',
    storeConfig: { keyPath: 'locale_id', autoIncrement: true },
    storeSchema: [
      // { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }, {
    store: 'hotspot',
    storeConfig: { keyPath: 'locale_id', autoIncrement: true },
    storeSchema: []
  }, {
    store: 'infospot',
    storeConfig: { keyPath: 'locale_id', autoIncrement: true },
    storeSchema: []
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    TrciComponent,
    ImageSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    LocalSaveService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
