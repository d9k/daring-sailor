import { Direction, DirectionEnum } from '@/game/world/Direction';
import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';
import { IntXYtoBool } from '@/game/world/IntXYtoBool';

export type WorldMapFloodFillArgs = {
    cellCoords: IntXY;
    islandCells: IntXYtoBool;
    borderCells: IntXYtoBool;
    preserveDirectionPercent: number;
    iterations: number;
};

export const WORLD_MAP_SIZE = 256;

const SCAN_CELLS_COUNT = 6;
const STEPS_MIN = 4;
const STEPS_RATIO_MIN = 0.1;
const STEPS_RATIO_MAX = 0.4;

/**
 * Steps inside iterations
 **/
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

    getValue(coords: IntXY): EnumCellType {
        return this.data[coords.y][coords.x];
    }

    setValue(coords: IntXY, cellType: EnumCellType) {
        this.data[coords.y][coords.x] = cellType;
    }

    floodFillFromCell({
        cellCoords,
        islandCells,
        borderCells,
        preserveDirectionPercent,
        iterations,
    }: WorldMapFloodFillArgs) {
        if (this.isEmpty(islandCells)) {
            islandCells.setValue(cellCoords);
        }
        if (this.isEmpty(borderCells)) {
            borderCells.setValue(cellCoords);
        }

        for (let i = 0; i < iterations; i++) {
            const currentGenerationCell = this.randomBorderCell(borderCells);
            if (!currentGenerationCell) {
                break;
            }

            let cell = currentGenerationCell;
            let previousDirection: Direction | undefined;

            const startDirections = this.getRandomIntToDirection(
                islandCells,
                cell
            );
            if (Object.keys(startDirections).length === 0) {
                borderCells.setValue(currentGenerationCell, false);
                continue;
            }

            const generateSteps = this.calcGenerateStepsCount(startDirections);

            for (let s = 0; s < generateSteps; s++) {
                const directions = this.getRandomIntToDirection(islandCells, cell);
                if (Object.keys(directions).length === 0) {
                    break;
                }

                let direction: Direction;
                if (
                    previousDirection &&
                    Math.random() * 100 < preserveDirectionPercent &&
                    Object.values(directions).includes(
                        previousDirection.data
                    )
                ) {
                    direction = previousDirection;
                } else {
                    const keys = Object.keys(directions);
                    const key = keys[Math.floor(Math.random() * keys.length)];
                    direction = new Direction(directions[Number(key)]);
                }

                const offset = direction.toOffset();
                cell = cell.offset(offset.x, offset.y);
                islandCells.setValue(cell);
                borderCells.setValue(cell);
                previousDirection = direction;
            }

            borderCells.setValue(currentGenerationCell, false);
        }
    }

    getRandomIntToDirection(
        islandCells: IntXYtoBool,
        cell: IntXY
    ): { [index: number]: DirectionEnum } {
        const result: { [index: number]: DirectionEnum } = {};
        let index = 0;

        for (let relativeY = -SCAN_CELLS_COUNT; relativeY <= SCAN_CELLS_COUNT; relativeY++) {
            for (let relativeX = -SCAN_CELLS_COUNT; relativeX <= SCAN_CELLS_COUNT; relativeX++) {
                if (relativeX === 0 && relativeY === 0) {
                    continue;
                }
                const neighbor = cell.offset(relativeX, relativeY);
                if (islandCells.getValue(neighbor)) {
                    continue;
                }
                if (relativeX !== 0) {
                    result[index++] =
                        relativeX > 0
                            ? DirectionEnum.Right
                            : DirectionEnum.Left;
                }
                if (relativeY !== 0) {
                    result[index++] =
                        relativeY > 0
                            ? DirectionEnum.Down
                            : DirectionEnum.Up;
                }
            }
        }

        return result;
    }

    calcGenerateStepsCount(directions: { [index: number]: DirectionEnum }): number {
        const ratio =
            STEPS_RATIO_MIN +
            Math.random() * (STEPS_RATIO_MAX - STEPS_RATIO_MIN);
        return Math.max(STEPS_MIN, Math.floor(Object.keys(directions).length * ratio));
    }

    randomBorderCell(borderCells: IntXYtoBool): IntXY | undefined {
        const keys = Object.keys(borderCells.data).filter(
            (key) => borderCells.data[key]
        );
        if (keys.length === 0) {
            return undefined;
        }
        return IntXY.fromKey(keys[Math.floor(Math.random() * keys.length)]);
    }

    isEmpty(cells: IntXYtoBool): boolean {
        return Object.keys(cells.data).length === 0;
    }
}
