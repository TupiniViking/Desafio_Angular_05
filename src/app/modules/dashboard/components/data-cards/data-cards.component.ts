import { Component, Output, EventEmitter } from '@angular/core';
import { Vehicle, Vehicles } from 'src/app/shared/models/vehicle.model';
import { DataCards } from '../../interfaces/data-card';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-data-cards',
  templateUrl: './data-cards.component.html',
  styleUrls: ['./data-cards.component.scss'],
})
export class DataCardsComponent {
  // #region Properties (4)

  public dataCards: DataCards = [
    { header: 'Total de Vendas', callback: this.getTotalSales.bind(this) },
    { header: 'Conectados', callback: this.getConnected.bind(this) },
    { header: 'Update Software', callback: this.getSoftwareUpdate.bind(this) },
  ];
  @Output() public selectVehicleEvent = new EventEmitter<string>();
  public selectedVehicle = '-';
  vehicles$ = this.vehiclesService.getVehicles();

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(private vehiclesService: VehiclesService) {}

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public getConnected(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.connected ?? '-';
  }

  public getSoftwareUpdate(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.softwareUpdates ?? '-';
  }

  public getTotalSales(vehicles: Vehicles): number | string {
    return this.findSelectedVehicle(vehicles)?.volumetotal ?? '-';
  }

  // #endregion Public Methods (3)

  // #region Private Methods (1)

  private findSelectedVehicle(vehicles: Vehicles): Vehicle | undefined {
    return vehicles.find((v) => v.vehicle === this.selectedVehicle);
  }

  // #endregion Private Methods (1)
}
