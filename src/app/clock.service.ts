import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClockService {

    private _clock$: Observable<Date>;
    get clock$(): Observable<Date> {
        return this._clock$;
    }

    constructor() {
    }

    public runClock(): void {
        this._clock$ = interval(1000).pipe(
            map(( x: number ) => {
                return new Date();
            }),
            share()
        );
    }
}
