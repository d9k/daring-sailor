import { IntXY } from '@/game/world/IntXY';

export class IntXYtoBool {
    data: { [key: string]: boolean };

    constructor(data: { [key: string]: boolean } = {}) {
        this.data = data;
    }

    setValue(coords: IntXY, value: boolean = true) {
        this.data[coords.toKey()] = value;
    }

    getValue(coords: IntXY): boolean {
        return this.data[coords.toKey()];
    }
}
