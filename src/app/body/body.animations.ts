/**
 * body.animations
 */
import { animate, AnimationTriggerMetadata, group, keyframes, query, style, transition, trigger } from '@angular/animations';

export const bodyAnimations: {
    readonly transformBody: AnimationTriggerMetadata;
} = {
    transformBody: trigger('transformBody', [
        transition('list => settings', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            query(':enter', style({transform: 'translateX(100%)'})),
            query('.alarm-settings-inner', style({opacity: .6, transform: 'scale(0.8)'})),
            group([
                query(':leave', animate('1000ms', keyframes([
                    style({opacity: .6, transform: 'scale(0.8)', offset: 0.5}),
                    style({opacity: .6, transform: 'scale(0.8) translateX(-120%)', offset: 1.0}),
                ]))),
                query(':enter', animate('1000ms 500ms', keyframes([
                    style({transform: 'translateX(0)', offset: 0.5}),
                    style({transform: 'translateX(0)', offset: 1.0}),
                ]))),
                query('.alarm-settings-inner', animate('500ms 1000ms', keyframes([
                    style({opacity: 1, transform: 'scale(1)', offset: 1}),
                ])))
            ])
        ]),
        transition('settings => list', [
            query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
            query(':enter', style({opacity: .6, transform: 'scale(0.8) translateX(-120%)'})),
            group([
                query(':leave', animate('1000ms', keyframes([
                    style({transform: 'translateX(0)', offset: 0}),
                    style({transform: 'translateX(0)', offset: 0.5}),
                    style({transform: 'translateX(120%)', offset: 1.0}),
                ]))),
                query('.alarm-settings-inner', animate('500ms', keyframes([
                    style({opacity: 1, transform: 'scale(1)', offset: 0}),
                    style({opacity: .6, transform: 'scale(.8)', offset: 1}),
                ]))),
                query(':enter', animate('1500ms', keyframes([
                    style({opacity: .6, transform: 'scale(0.8) translateX(-120%)', offset: 0}),
                    style({opacity: .6, transform: 'scale(0.8) translateX(-120%)', offset: 0.33}),
                    style({opacity: .6, transform: 'scale(0.8) translateX(0)', offset: 0.66}),
                    style({opacity: 1, transform: 'scale(1) translateX(0)', offset: 1.0}),
                ]))),
            ])
        ])
    ])
};
