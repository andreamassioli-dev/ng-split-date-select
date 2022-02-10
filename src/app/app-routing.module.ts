import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'date', loadChildren: () => import('./features/date/date.module').then(m => m.DateModule) },
  { path: '**', redirectTo: 'date' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
