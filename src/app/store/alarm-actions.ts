/**
 * alarm-actions
 */

import { Action } from '@ngrx/store';
import { Alarm } from './alarm-model';

export enum AlarmActionTypes {
    Load = 'Load',
    LoadSuccess = 'Load Success',
    LoadFail = 'Load Fail',
    AddAlarm = 'Add Alarm',
    AddAlarmSuccess = 'Add Alarm Success',
    AddAlarmFail = 'Add Alarm Fail',
    UpdateAlarm = 'Update Alarm',
    UpdateAlarmSuccess = 'Update Alarm Success',
    UpdateAlarmFail = 'Update Alarm Fail',
    DeleteAlarm = 'Delete Alarm',
    DeleteAlarmSuccess = 'Delete Alarm Success',
    DeleteAlarmFail = 'Delete Alarm Fail',
}

/**
 * Load all alarms
 * */
export class Load implements Action {
    readonly type = AlarmActionTypes.Load;

    constructor() {
    }
}

export class LoadSuccess implements Action {
    readonly type = AlarmActionTypes.LoadSuccess;

    constructor( public payload: Alarm[] ) {
    }
}

export class LoadFail implements Action {
    readonly type = AlarmActionTypes.LoadFail;

    constructor( public payload: any ) {
    }
}

/**
 * Add an alarm to store
 * */
export class AddAlarm implements Action {
    readonly type = AlarmActionTypes.AddAlarm;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Succeed to add an alarm to store
 * */
export class AddAlarmSuccess implements Action {
    readonly type = AlarmActionTypes.AddAlarmSuccess;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Fail to add an alarm to store
 * */
export class AddAlarmFail implements Action {
    readonly type = AlarmActionTypes.AddAlarmFail;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Update an alarm settings
 * */
export class UpdateAlarm implements Action {
    readonly type = AlarmActionTypes.UpdateAlarm;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Succeed to update an alarm settings
 * */
export class UpdateAlarmSuccess implements Action {
    readonly type = AlarmActionTypes.UpdateAlarmSuccess;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Fail to update an alarm settings
 * */
export class UpdateAlarmFail implements Action {
    readonly type = AlarmActionTypes.UpdateAlarmFail;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Delete an alarm
 * */
export class DeleteAlarm implements Action {
    readonly type = AlarmActionTypes.DeleteAlarm;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Succeed to delete an alarm from store
 * */
export class DeleteAlarmSuccess implements Action {
    readonly type = AlarmActionTypes.DeleteAlarmSuccess;

    constructor( public payload: Alarm ) {
    }
}

/**
 * Fail to delete an alarm from store
 * */
export class DeleteAlarmFail implements Action {
    readonly type = AlarmActionTypes.DeleteAlarmFail;

    constructor( public payload: Alarm ) {
    }
}

export type AlarmActions =
    Load |
    LoadSuccess |
    LoadFail |
    AddAlarm |
    AddAlarmSuccess |
    AddAlarmFail |
    UpdateAlarm |
    UpdateAlarmSuccess |
    UpdateAlarmFail |
    DeleteAlarm |
    DeleteAlarmSuccess |
    DeleteAlarmFail;
