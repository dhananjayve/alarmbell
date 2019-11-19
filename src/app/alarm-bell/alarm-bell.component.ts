import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-alarm-bell',
    templateUrl: './alarm-bell.component.html',
    styleUrls: ['./alarm-bell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlarmBellComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('alarmAudio') alarmAudioElmRef: ElementRef;

    @Output() confirm = new EventEmitter<any>();

    constructor() {
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        this.alarmAudioElmRef.nativeElement.pause();
    }

    public ngAfterContentInit(): void {
        this.alarmAudioElmRef.nativeElement.play();
    }

    handleBellBtnClick( event: any ) {
        this.alarmAudioElmRef.nativeElement.pause();
        this.confirm.emit();
        event.preventDefault();
    }
}
