import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandComponent } from './cand/cand.component';
import { HomeComponent } from './home/home.component';

import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: '', redirectTo: 'cand', pathMatch:'full'},
  {component: HomeComponent, path: 'home'},
  {component: CandComponent, path: 'cand'},
  {component: DialogComponent, path: 'dialog'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
