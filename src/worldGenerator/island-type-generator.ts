import { EnumCellType } from '@/game/world/EnumCellType';

type TileTypeConfig = {
    rangePercents: [number, number];
    requiredCount: number;
};

const TILE_TYPE_TO_Y_PERCENTS: { [cellType: number]: TileTypeConfig } = {
    [EnumCellType.Snow]: { rangePercents: [0, 40], requiredCount: 1 },
    [EnumCellType.Grass]: { rangePercents: [35, 70], requiredCount: 5 },
    [EnumCellType.Sand]: { rangePercents: [65, 100], requiredCount: 2 },
};

export class IslandTypeGenerator {
    islandTypeToCount: { [cellType: number]: number } = {};
    minIslandsGenerated = false;

    constructor(private mapSize: number) {}

    randomIslandCellType(y: number): EnumCellType {
        const yPercent = (y / (this.mapSize - 1)) * 100;

        const tileTypeToCurrentY: EnumCellType[] = [];
        for (const cellTypeKey in TILE_TYPE_TO_Y_PERCENTS) {
            const { rangePercents } = TILE_TYPE_TO_Y_PERCENTS[cellTypeKey];
            const [percentMin, percentMax] = rangePercents;
            if (yPercent >= percentMin && yPercent <= percentMax) {
                tileTypeToCurrentY.push(Number(cellTypeKey));
            }
        }

        const tileTypes = this.getFilteredTileTypeToCurrentY(
            tileTypeToCurrentY
        );

        const result = tileTypes[Math.floor(Math.random() * tileTypes.length)];
        this.islandTypeToCount[result] = (this.islandTypeToCount[result] ?? 0) + 1;
        return result;
    }

    getFilteredTileTypeToCurrentY(
        tileTypeToCurrentY: EnumCellType[]
    ): EnumCellType[] {
        if (!this.minIslandsGenerated) {
            return tileTypeToCurrentY;
        }

        const notSatisfied = tileTypeToCurrentY.filter(
            (cellType) =>
                (this.islandTypeToCount[cellType] ?? 0) <
                TILE_TYPE_TO_Y_PERCENTS[cellType].requiredCount
        );

        return notSatisfied.length > 0 ? notSatisfied : tileTypeToCurrentY;
    }

    isRequiredCountsSatisfied(): boolean {
        for (const cellTypeKey in TILE_TYPE_TO_Y_PERCENTS) {
            const cellType = Number(cellTypeKey);
            if (
                (this.islandTypeToCount[cellType] ?? 0) <
                TILE_TYPE_TO_Y_PERCENTS[cellType].requiredCount
            ) {
                return false;
            }
        }
        return true;
    }
}
