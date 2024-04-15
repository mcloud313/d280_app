import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  { path: '', redirectTo: '/world', pathMatch: 'full' }, //Redirect the root path
  { path: 'world', component: WorldComponent } // Add this line 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [WorldComponent] // Declare the component here
})
export class AppRoutingModule { }
