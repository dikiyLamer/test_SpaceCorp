import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurad } from './guards/auth.guard';
import { MooviesComponent } from './moovies/moovies.component';
import { ChildComponent } from './child/child.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', pathMatch: "full", component: AppComponent},
  {path: 'login', component: ChildComponent},
  {path: 'moovies', canActivate: [AuthGurad], component: MooviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
