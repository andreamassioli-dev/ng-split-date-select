import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { components } from "./components";
import { pipes } from "./pipes";
import { DateService } from "./services/date.service";

@NgModule({
  declarations: [
    components,
    pipes
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  exports: [
    components,
    pipes
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        DateService
      ]
    };
  }

}
