import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { dateReducer, DateState } from "./date/store/reducers/date.reducer";

export interface AppState {
  date: DateState
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      date: dateReducer
    }, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
        strictActionWithinNgZone: true,
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 100
    })
  ]
})
export class CoreModule { }
