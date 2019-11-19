import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-alarm-settings',
    templateUrl: './alarm-settings.component.html',
    styleUrls: ['./alarm-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmSettingsComponent implements OnInit, AfterContentInit {

    @Input() alarmId: string;

    @Input() alarmHour: number;

    @Input() alarmMinute: number;

    @Input() alarmDays: number[];

    @Output() public save = new EventEmitter<{ hour: number, minute: number, days: number[] }>();

    @Output() public update = new EventEmitter<{ hour: number, minute: number, days: number[] }>();

    @Output() public delete = new EventEmitter<string>();

    @HostBinding('class.alarm-settings-wrapper')
    get alarmSettingWrapperClass(): boolean {
        return true;
    }

    private _hour: number;
    get hour(): number {
        return this._hour;
    }

    private _minute: number;
    get minute(): number {
        return this._minute;
    }

    private _days: number[];
    get days(): number[] {
        return this._days;
    }

    set days( val: number[] ) {
        this._days = val;
    }

    get canIncreaseHour(): boolean {
        return this._hour < 23;
    }

    get canDecreaseHour(): boolean {
        return this._hour > 0;
    }

    get canIncreaseMinute(): boolean {
        return this._minute < 59;
    }

    get canDecreaseMinute(): boolean {
        return this._minute > 0;
    }

    constructor() {
    }

    public ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this._hour = this.alarmHour || 0;
        this._minute = this.alarmMinute || 0;
        this._days = this.alarmDays || [0, 1, 2, 3, 4, 5, 6];
    }

    public handleHoursUp( event: any ) {
        if (this.canIncreaseHour) {
            this._hour += 1;
        }

        event.preventDefault();
    }

    handleHoursDown( event: any ) {
        if (this.canDecreaseHour) {
            this._hour -= 1;
        }

        event.preventDefault();
    }

    handleMinutesUp( event: any ) {
        if (this.canIncreaseMinute) {
            this._minute += 1;
        }

        event.preventDefault();
    }

    handleMinutesDown( event: any ) {
        if (this.canDecreaseMinute) {
            this._minute -= 1;
        }

        event.preventDefault();
    }

    handleSavingBtnClick( event: any ) {
        if (this.alarmId) {
            this.update.emit({hour: this._hour, minute: this._minute, days: this._days});
        } else {
            this.save.emit({hour: this._hour, minute: this._minute, days: this._days});
        }
        event.preventDefault();
    }

    handleDeleteBtnClick( event: any ) {
        this.delete.emit(this.alarmId);
        event.preventDefault();
    }
}
