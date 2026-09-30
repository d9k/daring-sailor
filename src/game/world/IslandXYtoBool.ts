import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';
import { WorldMap } from '@/game/world/WorldMap';

export class IslandXYtoBool {
    data: { [key: string]: boolean };
    islandCellType: EnumCellType;

    constructor(
        islandCellType: EnumCellType,
        data: { [key: string]: boolean } = {}
    ) {
        this.islandCellType = islandCellType;
        this.data = data;
    }

    setValue(coords: IntXY, value: boolean = true) {
        this.data[coords.toKey()] = value;
    }

    getValue(coords: IntXY, worldMap: WorldMap): boolean {
        if (this.data[coords.toKey()] === undefined) {
            const isIsland =
                worldMap.getCellType(coords) === this.islandCellType;
            this.setValue(coords, isIsland);
        }
        return this.data[coords.toKey()];
    }

    removeValue(coords: IntXY) {
        delete this.data[coords.toKey()];
    }
}
