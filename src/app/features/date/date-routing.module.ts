import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from "./date.component";

const routes: Routes = [
  { path: '', component: DateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateRoutingModule { }
