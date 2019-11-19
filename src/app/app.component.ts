import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ClockService } from './clock.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromAlarmActions from './store/alarm-actions';
import { Alarm, ClockValue } from './store/alarm-model';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {

    public isConfigSettings = false;

    public isBellRinging = false;

    public alarms$: Observable<Alarm[]>;

    private clockValue$: Observable<ClockValue>;

    private checkAlarmSub = Subscription.EMPTY;

    get clock$(): Observable<Date> {
        return this.clockService.clock$;
    }

    constructor( private clockService: ClockService,
                 private store: Store<fromRoot.State>,
                 private cdRef: ChangeDetectorRef ) {
        this.alarms$ = this.store.pipe(select(fromRoot.getAlarms));
    }

    public ngOnInit(): void {
        this.clockService.runClock();

        this.store.dispatch(new fromAlarmActions.Load());

        this.clockValue$ = this.clock$.pipe(
            map(( moment: Date ) => {
                return {
                    hour: moment.getHours(),
                    minute: moment.getMinutes(),
                    day: moment.getDay(),
                };
            }),
            distinctUntilChanged(( m1: ClockValue, m2: ClockValue ) => {
                return m1.hour === m2.hour &&
                    m1.minute === m2.minute &&
                    m1.day === m2.day;
            })
        );
    }

    public ngAfterContentInit(): void {
        this.checkAlarmSub = combineLatest(this.alarms$, this.clockValue$).pipe(
            map(( [alarms, clockValue] ) => this.checkAlarm(alarms, clockValue)),
        ).subscribe(( alarm ) => {
            this.isBellRinging = !!alarm;
            this.cdRef.markForCheck();
        });
    }

    public ngOnDestroy(): void {
        this.checkAlarmSub.unsubscribe();
    }

    public handleAlarmBellConfirm(): void {
        this.isBellRinging = false;
        this.cdRef.markForCheck();
        return;
    }

    private checkAlarm( alarms: Alarm[], clockValue: ClockValue ): Alarm | null {
        for (const alarm of alarms) {
            if (alarm.hour === clockValue.hour &&
                alarm.minute === clockValue.minute &&
                alarm.days.indexOf(clockValue.day) > -1) {
                return alarm;
            }
        }

        return null;
    }
}
