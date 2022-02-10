import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card bg-light">
      <div *ngIf="header" class="card-header">
        {{ header }}
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {

  @HostBinding() style = 'display: block';

  @Input() header?: string;

}
