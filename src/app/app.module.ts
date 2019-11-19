import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AlarmBoxComponent } from './alarm-box/alarm-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlCheckBoxModule, OwlSwitchModule } from 'owl-ng';
import { FormsModule } from '@angular/forms';
import { DoubleDigitsPipe } from './double-digits/double-digits.pipe';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmSettingsComponent } from './alarm-settings/alarm-settings.component';
import { StoreModule } from '@ngrx/store';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { schema } from './db';
import { AlarmEffects } from './store/alarm-effects';
import { AlarmBellComponent } from './alarm-bell/alarm-bell.component';

@NgModule({
    declarations: [
        AppComponent,
        BodyComponent,
        FooterComponent,
        HeaderComponent,
        AlarmBoxComponent,
        DoubleDigitsPipe,
        AlarmListComponent,
        AlarmSettingsComponent,
        AlarmBellComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        // NG Store
        StoreModule.forRoot(reducers),

        /**
         * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
         * service available.
         */
        DBModule.provideDB(schema),

        /**
         * EffectsModule.forRoot() is imported once in the root module and
         * sets up the effects class to be initialized immediately when the
         * application starts.
         *
         * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
         */
        EffectsModule.forRoot([AlarmEffects]),

        OwlSwitchModule,
        OwlCheckBoxModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
