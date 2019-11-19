import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Alarm } from '../store/alarm-model';
import { bodyAnimations } from './body.animations';
import * as fromRoot from '../store';
import * as fromAlarmActions from '../store/alarm-actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        bodyAnimations.transformBody
    ],
})
export class BodyComponent implements OnInit {

    @Input() isConfigSettings: boolean;

    @Input() alarms: Alarm[];

    @Output() isConfigSettingsChange = new EventEmitter<boolean>();

    public alarmOnConfig: Alarm | null = null;

    /*public alarms: Alarm[] = [
        {
            id: '0',
            hour: 0,
            minute: 30,
            isActive: true,
            days: [0, 2, 4, 6]
        },
        {
            id: '1',
            hour: 10,
            minute: 20,
            isActive: true,
            days: [0, 1, 2, 4]
        },
        {
            id: '2',
            hour: 18,
            minute: 5,
            isActive: true,
            days: [0, 1, 2, 3, 4, 5, 6]
        },
        {
            id: '3',
            hour: 23,
            minute: 42,
            isActive: true,
            days: [0, 2, 4, 6]
        },
    ];*/

    @HostBinding('@transformBody')
    get handleTransformBodyAnimations(): string {
        return this.isConfigSettings ? 'settings' : 'list';
    }

    constructor( private store: Store<fromRoot.State> ) {
    }

    ngOnInit() {
    }

    handleAlarmSave( settings: { hour: number, minute: number, days: number[] } ): void {
        const alarm = new Alarm();
        alarm.hour = settings.hour;
        alarm.minute = settings.minute;
        alarm.days = settings.days;
        alarm.isActive = true;
        this.store.dispatch(new fromAlarmActions.AddAlarm(alarm));
        this.isConfigSettings = false;
        this.isConfigSettingsChange.emit(false);
    }

    handleAlarmUpdate( settings: { hour: number, minute: number, days: number[] } ) {
        if (!this.alarmOnConfig) {
            return;
        }

        this.alarmOnConfig.hour = settings.hour;
        this.alarmOnConfig.minute = settings.minute;
        this.alarmOnConfig.days = settings.days;
        this.alarmOnConfig.isActive = true;
        this.store.dispatch(new fromAlarmActions.UpdateAlarm(this.alarmOnConfig));
        this.alarmOnConfig = null;
        this.isConfigSettings = false;
        this.isConfigSettingsChange.emit(false);
    }

    handleAlarmDelete( id: string ) {
        if (!this.alarmOnConfig || this.alarmOnConfig.id !== id) {
            return;
        }

        this.store.dispatch(new fromAlarmActions.DeleteAlarm(this.alarmOnConfig));
        this.alarmOnConfig = null;
        this.isConfigSettings = false;
        this.isConfigSettingsChange.emit(false);
    }

    handleAlarmClick( alarm: Alarm ): void {
        this.alarmOnConfig = alarm;
        this.isConfigSettings = true;
        this.isConfigSettingsChange.emit(true);
    }
}
