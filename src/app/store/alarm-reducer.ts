/**
 * alarm-reducer
 */
import { Alarm } from './alarm-model';
import { AlarmActions, AlarmActionTypes } from './alarm-actions';

export interface State {
    alarms: Alarm[];
}

const initialState: State = {
    alarms: [],
};

export function reducer( state = initialState, action: AlarmActions ): State {
    let updatedAlarms;

    switch (action.type) {
        case AlarmActionTypes.LoadSuccess:
            return {
                alarms: [...action.payload]
            };

        case AlarmActionTypes.AddAlarmSuccess:
        case AlarmActionTypes.DeleteAlarmFail:
        case AlarmActionTypes.UpdateAlarmFail:
            if (state.alarms.find(( alarm ) => alarm.id === action.payload.id)) {
                return state;
            }

            return {
                alarms: [action.payload, ...state.alarms]
            };

        case AlarmActionTypes.UpdateAlarmSuccess:
            updatedAlarms = state.alarms.map(( alarm: Alarm ) => {
                return alarm.id === action.payload.id ?
                    action.payload : alarm;
            });

            return {
                alarms: updatedAlarms
            };

        case AlarmActionTypes.DeleteAlarmSuccess:
        case AlarmActionTypes.AddAlarmFail:
            updatedAlarms = state.alarms.filter(( alarm: Alarm ) => alarm.id !== action.payload.id);

            return {
                alarms: updatedAlarms
            };

        default:
            return state;
    }
}

export const getAlarms = ( state: State ) => state.alarms;
