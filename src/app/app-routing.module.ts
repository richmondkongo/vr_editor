import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { TestComponent } from './test/test.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { EditorComponent } from './editor/editor.component';
import { ListVrComponent } from './list-vr/list-vr.component';


const routes: Routes = [
  { path: '', component: SplashscreenComponent },
  { path: 'splashsreen', component: SplashscreenComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'viewer/:visite', component: ViewerComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'image-selection', component: ImageSelectionComponent },
  { path: 'all-visites', component: ListVrComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }