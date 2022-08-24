import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // #region Properties (1)

  public selectedVehicle = '';

  // #endregion Properties (1)

  // #region Public Methods (1)

  public selectVehicle(vehicle: string) {
    this.selectedVehicle = vehicle;
  }

  // #endregion Public Methods (1)
}
