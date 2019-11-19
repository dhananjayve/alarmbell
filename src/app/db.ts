/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
    version: 1,
    name: 'alarms_app',
    stores: {
        alarms: {
            autoIncrement: true,
            primaryKey: 'id',
        },
    },
};
