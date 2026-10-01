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
    generateGulfsMaxCount?: number;
};

export enum GulfCandidateNeighborTypeEnum {
    WATER = 'WATER',
    ISLAND = 'ISLAND',
}

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
        generateGulfsMaxCount = 0,
    }: WorldMapFloodFillArgs) {
        // console.log(
        //     `__TEST__ 200: floodFillFromCell: entry cell ${cellCoords.toKey()}, fillWithCellType: ${fillWithCellType}`
        // );

        islandCells.setValue(cellCoords);
        borderCells.setValue(cellCoords);

        for (let i = 0; i < iterations; i++) {
            // console.log(
            //     `__TEST__ 300: floodFillFromCell: iteration ${i}/${iterations}, islandCells: ${Object.keys(islandCells.data).length}, borderCells: ${Object.keys(borderCells.data).length}`
            // );
            const currentGenerationCell = this.randomBorderCell(
                islandCells,
                borderCells
            );
            if (!currentGenerationCell) {
                // console.log(
                //     `__TEST__ 350: floodFillFromCell: randomBorderCell returned undefined, break on iteration ${i}`
                // );
                break;
            }

            let cell = currentGenerationCell;
            let previousDirection: Direction | undefined;

            const startDirections = this.getRandomIntToDirection(
                islandCells,
                cell
            );

            const generateSteps = this.calcGenerateStepsCount(startDirections);

            // console.log(
            //     `__TEST__ 400: floodFillFromCell: startDirections: ${JSON.stringify(startDirections)}, generateSteps: ${generateSteps}`
            // );

            for (let s = 0; s < generateSteps; s++) {
                const directions = this.getRandomIntToDirection(islandCells, cell);
                if (Object.keys(directions).length === 0) {
                    // console.log(
                    //     `__TEST__ 450: floodFillFromCell: no directions on step ${s}, break`
                    // );
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

        // console.log(
        //     `__TEST__ 500: floodFillFromCell: done, islandCells: ${Object.keys(islandCells.data).length}`
        // );

        this.generateGulfs(islandCells, borderCells, generateGulfsMaxCount);
    }

    generateGulfs(
        islandCells: IslandXYtoBool,
        borderCells: IntXYtoBool,
        generateGulfsMaxCount: number
    ) {
        if (generateGulfsMaxCount <= 0) {
            return;
        }

        const gulfCandidateCells = this.getGulfCandidateCells(
            islandCells,
            borderCells
        );

        console.log(
            `__TEST__ 600: generateGulfs: gulfCandidateCells (${gulfCandidateCells.length}): ${gulfCandidateCells.map((cell) => cell.toKey()).join(', ')}`
        );

        while (generateGulfsMaxCount > 0 && gulfCandidateCells.length > 0) {
            const candidateIndex = Math.floor(Math.random() * gulfCandidateCells.length);
            const gulfCandidateCell = gulfCandidateCells.splice(candidateIndex, 1)[0];

            islandCells.removeValue(gulfCandidateCell);
            borderCells.removeValue(gulfCandidateCell);

            // this.worldMap.setCellType(gulfCandidateCell, EnumCellType.Debug);
            this.worldMap.setCellType(gulfCandidateCell, EnumCellType.Water);

            console.log(
                `__TEST__ 620: generateGulfs: gulf generated at ${gulfCandidateCell.toKey()}`
            );

            generateGulfsMaxCount--;
        }
    }

    getGulfCandidateCells(
        islandCells: IslandXYtoBool,
        borderCells: IntXYtoBool
    ): IntXY[] {
        const gulfCandidateCells: IntXY[] = [];

        const { Up, Down, Left, Right } = DirectionEnum;
        const { WATER, ISLAND } = GulfCandidateNeighborTypeEnum;

        for (const key of Object.keys(borderCells.data)) {
            const cell = IntXY.fromKey(key);

            const neighborTypeToDirection: {
                [direction: string]:
                    | GulfCandidateNeighborTypeEnum
                    | undefined;
            } = {};

            for (const directionEnum of ALL_DIRECTIONS) {
                const offset = new Direction(directionEnum).toOffset();
                const neighbor = cell.offset(offset.x, offset.y);

                neighborTypeToDirection[directionEnum] =
                    this.getCandidateNeighborType(islandCells, neighbor);
            }

            const isHorizontalGulf =
                neighborTypeToDirection[Left] === WATER &&
                neighborTypeToDirection[Right] === WATER &&
                neighborTypeToDirection[Up] === ISLAND &&
                neighborTypeToDirection[Down] === ISLAND;

            const isVerticalGulf =
                neighborTypeToDirection[Up] === WATER &&
                neighborTypeToDirection[Down] === WATER &&
                neighborTypeToDirection[Left] === ISLAND &&
                neighborTypeToDirection[Right] === ISLAND;

            if (isHorizontalGulf || isVerticalGulf) {
                gulfCandidateCells.push(cell);
            }
        }

        return gulfCandidateCells;
    }

    getCandidateNeighborType(
        islandCells: IslandXYtoBool,
        neighbor: IntXY
    ): GulfCandidateNeighborTypeEnum | undefined {
        if (!this.worldMap.validateCellCoords(neighbor)) {
            return undefined;
        }

        return islandCells.getValue(neighbor, this.worldMap)
            ? GulfCandidateNeighborTypeEnum.ISLAND
            : GulfCandidateNeighborTypeEnum.WATER;
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
                // console.log(
                //     `__TEST__ 310: randomBorderCell: borderCells empty, attempt ${attempt}`
                // );
                return undefined;
            }

            const key = keys[Math.floor(Math.random() * keys.length)];
            const cell = IntXY.fromKey(key);
            // console.log(
            //     `__TEST__ 320: randomBorderCell: attempt ${attempt}, cell ${key}, borderCells size ${keys.length}`
            // );

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

        // console.log(
        //     `__TEST__ 330: randomBorderCell exceeded ${RANDOM_BORDER_CELL_MAX_ATTEMPTS_COUNT} attempts, islandCells: ${Object.keys(islandCells.data).length}, borderCells: ${Object.keys(borderCells.data).length}`
        // );
        console.error(
            `${logPrefixFilename(import.meta.url)}: randomBorderCell exceeded ${RANDOM_BORDER_CELL_MAX_ATTEMPTS_COUNT} attempts`
        );
        return undefined;
    }
}
