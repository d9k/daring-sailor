import { EnumCellType } from '@/game/world/EnumCellType';
import { WORLD_MAP_SIZE, WorldMap } from '@/game/world/WorldMap';
import { IntXY } from '@/game/world/IntXY';

type CellColor = [number, number, number];

const COLOR_WATER: CellColor = [0x33, 0x99, 0xff];
const COLOR_GRASS: CellColor = [0x33, 0xff, 0x33];

const CELL_TYPE_TO_COLOR: { [cellType: number]: CellColor } = {
    [EnumCellType.Water]: COLOR_WATER,
    [EnumCellType.Grass]: COLOR_GRASS,
};

export class WorldMapDrawer {
    constructor(
        private worldMap: WorldMap,
        private canvasTexture: Phaser.Textures.CanvasTexture
    ) {}

    draw() {
        this.canvasTexture.clear();

        for (let y = 0; y < WORLD_MAP_SIZE; y++) {
            for (let x = 0; x < WORLD_MAP_SIZE; x++) {
                const cellType = this.worldMap.getCellType(new IntXY(x, y));
                this.canvasTexture.setPixel(x, y, ...CELL_TYPE_TO_COLOR[cellType]);
            }
        }

        this.canvasTexture.refresh();
    }
}
