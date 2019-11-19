import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Alarm } from '../store/alarm-model';
import * as fromRoot from '../store';
import * as fromAlarmActions from '../store/alarm-actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-alarm-list',
    templateUrl: './alarm-list.component.html',
    styleUrls: ['./alarm-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmListComponent implements OnInit {

    @Input() alarms: Alarm[];

    @Output() alarmClick = new EventEmitter<Alarm>();

    @HostBinding('class.alarm-list-wrapper')
    get alarmListWrapperClass(): boolean {
        return true;
    }

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
    }

    handleAlarmStatusChange( status: boolean, alarm: Alarm ) {
        alarm.isActive = status;
        this.store.dispatch(new fromAlarmActions.UpdateAlarm(alarm));
    }

    handleAlarmClick( alarm: any ) {
        this.alarmClick.emit(alarm);
    }
}
