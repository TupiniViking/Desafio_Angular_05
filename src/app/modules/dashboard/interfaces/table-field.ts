import { VehicleData } from 'src/app/shared/models/vehicle.model';

export interface TableField {
  // #region Properties (3)

  data?: keyof VehicleData;
  header: string;
  unit?: string;

  // #endregion Properties (3)
}

export type TableFields = TableField[];
