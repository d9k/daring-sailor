import { IntXY } from '@/game/world/IntXY';

export enum DirectionEnum {
    Up = 'Up',
    Right = 'Right',
    Left = 'Left',
    Down = 'Down',
}

export const ALL_DIRECTIONS: DirectionEnum[] = [
    DirectionEnum.Up,
    DirectionEnum.Right,
    DirectionEnum.Left,
    DirectionEnum.Down,
];

export class Direction {
    constructor(public data: DirectionEnum) {}

    toOffset(): IntXY {
        switch (this.data) {
            case DirectionEnum.Up:
                return new IntXY(0, -1);
            case DirectionEnum.Down:
                return new IntXY(0, 1);
            case DirectionEnum.Left:
                return new IntXY(-1, 0);
            case DirectionEnum.Right:
                return new IntXY(1, 0);
        }
    }

}
