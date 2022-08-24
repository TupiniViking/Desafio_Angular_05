import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { VehiclesData } from 'src/app/shared/models/vehicle.model';
import { TableField, TableFields } from '../../interfaces/table-field';
import { VehiclesService } from '../../services/vehicles.service';

const VIN_LENGTH = 20;
const INPUT_DEBOUNCE_MS = 200;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    trigger('delaySpinner', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 250ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DataTableComponent implements OnInit, OnDestroy {
  // #region Properties (11)

  private _allVehiclesData: VehiclesData | undefined;
  private _allVehiclesDataSub = new Subscription();
  private _hasVinMatched = false;
  private _isTableDataOnScreen = false;
  public isLoadingTableData = false;
  public searchedVin = new FormControl(
    { value: '', disabled: true },
    Validators.required
  );

  allVehiclesData$: Observable<VehiclesData> =
    this.vehiclesService.getVehiclesData();
  filteredVehiclesData$: Observable<VehiclesData> =
    this.searchedVin.valueChanges.pipe(
      debounceTime(INPUT_DEBOUNCE_MS),
      map((inputtedValue: string) => {
        // Converts value to uppercase in forms
        const upperCaseInputtedValue = inputtedValue.toUpperCase();
        this.searchedVin.setValue(upperCaseInputtedValue, {
          emitEvent: false,
        });
        return upperCaseInputtedValue;
      }),
      tap((inputtedValue) => {
        // Store flag locally as to not depend o input value later in pipe
        this._hasVinMatched =
          inputtedValue.length === VIN_LENGTH &&
          this.vinMatchVehicleData(inputtedValue);

        // Unfocus input field as to not popup datalist on data load
        if (this._hasVinMatched && this.vinInputElement) {
          this.vinInputElement.nativeElement.blur();
        }

        // Sets flag that triggers spinner in template
        this.isLoadingTableData =
          (this._hasVinMatched && !this._isTableDataOnScreen) ||
          (!this._hasVinMatched && this._isTableDataOnScreen);
      }),
      distinctUntilChanged(),
      switchMap((inputtedValue) =>
        this.vehiclesService.getVehiclesData(inputtedValue)
      ),
      tap(() => {
        // Controls final state of loading flags
        if (this.isLoadingTableData)
          this._isTableDataOnScreen = this._hasVinMatched;
        this.isLoadingTableData = false;
      })
    );

  public tableFields: TableFields = [
    { header: 'Código - Vin' },
    { header: 'Odômetro', data: 'odometer', unit: ' km' },
    { header: 'Nível de Combustível', data: 'fuelLevel', unit: ' %' },
    { header: 'Status', data: 'status' },
    { header: 'Lat.', data: 'lat' },
    { header: 'Long.', data: 'long' },
  ];
  vehiclesData$: Observable<VehiclesData> = merge(
    this.allVehiclesData$,
    this.filteredVehiclesData$
  ).pipe(
    tap(() =>
      this.searchedVin.enable({
        onlySelf: true,
        emitEvent: false,
      })
    )
  );
  @ViewChild('vinInput')
  public vinInputElement: ElementRef | undefined;

  // #endregion Properties (11)

  // #region Constructors (1)

  constructor(private vehiclesService: VehiclesService) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public getDataFromVehicle(data: TableField['data'], vehiclesData: VehiclesData) {
    if (!data || vehiclesData.length !== 1) return '-'; // still no match
    return vehiclesData[0][data].toString();
  }

  public ngOnDestroy(): void {
    this._allVehiclesDataSub.unsubscribe();
  }

  public ngOnInit(): void {
    this._allVehiclesDataSub = this.allVehiclesData$.subscribe(
      (allVehiclesData) => (this._allVehiclesData = allVehiclesData)
    );
  }

  public vinMatchVehicleData(vin: string): boolean {
    return !!this._allVehiclesData?.find(
      // redundancy check to uppercase, already handled in pipe
      (vehicleData) => vehicleData.vin.toUpperCase() === vin.toUpperCase()
    );
  }

  // #endregion Public Methods (4)
}
