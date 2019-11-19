/**
 * alarm-effects
 */

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { defer, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
    AddAlarm,
    AddAlarmFail,
    AddAlarmSuccess,
    AlarmActionTypes,
    DeleteAlarmFail,
    DeleteAlarmSuccess,
    LoadFail,
    LoadSuccess, UpdateAlarm, UpdateAlarmFail, UpdateAlarmSuccess
} from './alarm-actions';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Alarm } from './alarm-model';

@Injectable()
export class AlarmEffects {

    @Effect({dispatch: false})
    openDB$: Observable<any> = defer(() => {
        return this.db.open('alarms_app');
    });

    @Effect()
    loadAlarms$: Observable<Action> = this.actions$.pipe(
        ofType(AlarmActionTypes.Load),
        switchMap(() =>
            this.db
                .query('alarms')
                .pipe(
                    toArray(),
                    map(( alarms: Alarm[] ) => new LoadSuccess(alarms)),
                    catchError(error => of(new LoadFail(error)))
                )
        )
    );

    @Effect()
    addAlarm$: Observable<Action> = this.actions$.pipe(
        ofType(AlarmActionTypes.AddAlarm),
        map((action: AddAlarm) => action.payload),
        mergeMap(alarm =>
            this.db
                .insert('alarms', [alarm])
                .pipe(
                    map(() => new AddAlarmSuccess(alarm)),
                    catchError(() => of(new AddAlarmFail(alarm)))
                )
        )
    );

    @Effect()
    removeAlarm$: Observable<Action> = this.actions$.pipe(
        ofType(AlarmActionTypes.DeleteAlarm),
        map((action: AddAlarm) => action.payload),
        mergeMap(alarm =>
            this.db
                .executeWrite('alarms', 'delete', [alarm.id])
                .pipe(
                    map(() => new DeleteAlarmSuccess(alarm)),
                    catchError(() => of(new DeleteAlarmFail(alarm)))
                )
        )
    );

    @Effect()
    updateAlarm$: Observable<Action> = this.actions$.pipe(
        ofType(AlarmActionTypes.UpdateAlarm),
        map((action: UpdateAlarm) => action.payload),
        mergeMap(alarm =>
            this.db
                .executeWrite('alarms', 'put', [alarm])
                .pipe(
                    map(() => new UpdateAlarmSuccess(alarm)),
                    catchError(() => of(new UpdateAlarmFail(alarm)))
                )
        )
    );

    constructor( private actions$: Actions, private db: Database ) {
    }
}
