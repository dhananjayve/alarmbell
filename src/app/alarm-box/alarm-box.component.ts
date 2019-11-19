import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { Alarm } from '../store/alarm-model';

@Component({
    selector: 'app-alarm-box',
    templateUrl: './alarm-box.component.html',
    styleUrls: ['./alarm-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmBoxComponent implements OnInit {

    @Input() alarm: Alarm;

    @Output() changeStatus = new EventEmitter<any>();

    @HostBinding('class.app-alarm-box')
    get alarmBoxClass(): boolean {
        return true;
    }

    get isMorningHour(): boolean {
        return this.alarm.hour >= 6 && this.alarm.hour < 18;
    }

    constructor() {
    }

    ngOnInit() {
    }

    handleStatusChange( isActive: boolean ) {
        this.changeStatus.emit(isActive);
    }

    handleClickOnSwitch( event: any ) {
        event.stopPropagation();
    }
}
