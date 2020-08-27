import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { TrciComponent } from './trci/trci.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';


const routes: Routes = [
  { path: '', component: ViewerComponent },
  { path: 'editor', component: ViewerComponent },
  { path: 'agboville', component: TrciComponent },
  { path: 'agboville/:id', component: TrciComponent },
  { path: 'selection-image', component: ImageSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }