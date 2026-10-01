import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';
import { IntXYtoBool } from '@/game/world/IntXYtoBool';
import { IslandXYtoBool } from '@/game/world/IslandXYtoBool';
import { WorldMap } from '@/game/world/WorldMap';
import { ALL_DIRECTIONS, Direction, DirectionEnum } from '@/game/world/Direction';
import { logPrefixFilename } from '@/helpers/vite';

export type WorldMapFloodFillArgs = {
    cellCoords: IntXY;
    islandCells: IslandXYtoBool;
    borderCells: IntXYtoBool;
    preserveDirectionPercent: number;
    iterations: number;
    fillWithCellType: EnumCellType;
};

const SCAN_CELLS_COUNT = 6;
const STEPS_MIN = 4;
const STEPS_RATIO_MIN = 0.1;
const STEPS_RATIO_MAX = 0.4;
const RANDOM_BORDER_CELL_MAX_ATTEMPTS_COUNT = 100;

/**
 * Steps inside iterations
 **/
export class WorldGenerator {
    constructor(private worldMap: WorldMap) {}

    floodFillFromCell({
        cellCoords,
        islandCells,
        borderCells,
        preserveDirectionPercent,
        iterations,
        fillWithCellType,
    }: WorldMapFloodFillArgs) {
        islandCells.setValue(cellCoords);
        borderCells.setValue(cellCoords);

        for (let i = 0; i < iterations; i++) {
            const currentGenerationCell = this.randomBorderCell(
                islandCells,
                borderCells
            );
            if (!currentGenerationCell) {
                break;
            }

            let cell = currentGenerationCell;
            let previousDirection: Direction | undefined;

            const startDirections = this.getRandomIntToDirection(
                islandCells,
                cell
            );

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
                cell = this.worldMap.ensureCellCoords(
                    cell.offset(offset.x, offset.y)
                );
                islandCells.setValue(cell);
                borderCells.setValue(cell);
                this.worldMap.setCellType(cell, fillWithCellType);
                previousDirection = direction;
            }

            borderCells.removeValue(currentGenerationCell);
        }
    }

    getRandomIntToDirection(
        islandCells: IslandXYtoBool,
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
                if (!this.worldMap.validateCellCoords(neighbor)) {
                    continue;
                }
                if (islandCells.getValue(neighbor, this.worldMap)) {
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

    randomBorderCell(
        islandCells: IslandXYtoBool,
        borderCells: IntXYtoBool
    ): IntXY | undefined {
        // TODO think about maxAttemptsCount
        for (let attempt = 0; attempt < RANDOM_BORDER_CELL_MAX_ATTEMPTS_COUNT; attempt++) {
            const keys = Object.keys(borderCells.data);
            if (keys.length === 0) {
                return undefined;
            }

            const key = keys[Math.floor(Math.random() * keys.length)];
            const cell = IntXY.fromKey(key);

            if (!borderCells.getValue(cell)) {
                borderCells.removeValue(cell);
                continue;
            }

            for (const directionEnum of ALL_DIRECTIONS) {
                const offset = new Direction(directionEnum).toOffset();
                const cellToCheck = cell.offset(offset.x, offset.y);
                if (!this.worldMap.validateCellCoords(cellToCheck)) {
                    continue;
                }
                if (!islandCells.getValue(cellToCheck, this.worldMap)) {
                    return cell;
                }
            }

            // borderCells.removeValue(cell);
        }

        console.error(
            `${logPrefixFilename(import.meta.url)}: randomBorderCell exceeded ${RANDOM_BORDER_CELL_MAX_ATTEMPTS_COUNT} attempts`
        );
        return undefined;
    }
}
