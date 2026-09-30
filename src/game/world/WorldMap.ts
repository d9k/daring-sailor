import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';

export const WORLD_MAP_SIZE = 256;

export class WorldMap {
    data: EnumCellType[][] = [];
    mapSize: number;

    constructor(mapSize: number = WORLD_MAP_SIZE) {
        this.mapSize = mapSize;
        this.reset();
    }

    reset() {
        this.data = [];
        for (let y = 0; y < this.mapSize; y++) {
            this.data.push(new Array(this.mapSize).fill(EnumCellType.Water));
        }
    }

    getCellType(coords: IntXY): EnumCellType {
        const fixedCoords = this.ensureCellCoords(coords);
        return this.data[fixedCoords.y][fixedCoords.x];
    }

    setCellType(coords: IntXY, cellType: EnumCellType) {
        const fixedCoords = this.ensureCellCoords(coords);
        this.data[fixedCoords.y][fixedCoords.x] = cellType;
    }

    ensureCellCoords(coords: IntXY): IntXY {
        return new IntXY(
            Math.max(0, Math.min(coords.x, this.mapSize - 1)),
            Math.max(0, Math.min(coords.y, this.mapSize - 1))
        );
    }

    validateCellCoords(coords: IntXY): boolean {
        return (
            coords.x >= 0 &&
            coords.x < this.mapSize &&
            coords.y >= 0 &&
            coords.y < this.mapSize
        );
    }
}
