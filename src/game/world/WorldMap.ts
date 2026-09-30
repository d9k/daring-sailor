import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';

export const WORLD_MAP_SIZE = 256;

export class WorldMap {
    data: EnumCellType[][] = [];

    constructor() {
        this.reset();
    }

    reset() {
        this.data = [];
        for (let y = 0; y < WORLD_MAP_SIZE; y++) {
            this.data.push(new Array(WORLD_MAP_SIZE).fill(EnumCellType.Water));
        }
    }

    getCellType(coords: IntXY): EnumCellType {
        return this.data[coords.y][coords.x];
    }

    setCellType(coords: IntXY, cellType: EnumCellType) {
        this.data[coords.y][coords.x] = cellType;
    }
}
