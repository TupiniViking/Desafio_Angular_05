import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.scss'],
  animations: [
    trigger('imageLeave', [
      state('true', style({ transform: 'translateX(10%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('false => true', animate(150)),
    ]),

    trigger('imageArrive', [
      state('true', style({ transform: 'translateX(-10%)', opacity: 0 })),
      state('false', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('true => false', animate(150)),
    ]),
  ],
})
export class CarImageComponent implements OnChanges {
  // #region Properties (5)

  private _previousImgAlt = '';
  private _previousImgUrl = '';

  public hasImgLeft = false;
  public hasSelectionChanged = false;
  @Input() public selectedVehicle = '';

  // #endregion Properties (5)

  // #region Public Accessors (2)

  public get vehicleImgAlt(): string {
    if (this.hasSelectionChanged) return this._previousImgAlt;

    const _vehicleImgAlt = this.selectedVehicle;
    this._previousImgAlt = _vehicleImgAlt;
    return _vehicleImgAlt;
  }

  public get vehicleImgUrl(): string {
    if (this.hasSelectionChanged) return this._previousImgUrl;

    const _vehicleImgUrl =
      this.selectedVehicle !== ''
        ? `assets/img/${this.selectedVehicle.replace(/\s/g, '')}.png`
        : '';
    this._previousImgUrl = _vehicleImgUrl;
    return _vehicleImgUrl;
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (5)

  public afterArrive() {
    this.hasImgLeft = false;
    this.hasSelectionChanged = false;
  }

  public afterLeave() {
    this.hasImgLeft = true; // triggers arrive transition
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVehicle']) {
      this.hasSelectionChanged = true; // triggers leave transition
    }
  }

  public triggerArrive(): boolean {
    return this.hasImgLeft && this.hasSelectionChanged;
  }

  public triggerLeave(): boolean {
    return !this.hasImgLeft && this.hasSelectionChanged;
  }

  // #endregion Public Methods (5)
}
