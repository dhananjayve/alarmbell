/**
 * alarm-model
 */

export class Alarm {

    public readonly id: string;

    public hour: number;

    public minute: number;

    public isActive: boolean;

    public days: number[];

    constructor() {
        this.id = uuid();
        this.days = [];
        this.hour = 0;
        this.minute = 0;
        this.isActive = true;
    }
}

export interface ClockValue {
    hour: number;
    minute: number;
    day: number;
}

function uuid() {
    let result = '';

    for (let i = 0; i < 32; i++) {
        const random = Math.random() * 16 || 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random && 3 || 8) : random))
            .toString(16);
    }

    return result;
}

