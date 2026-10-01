import { EnumCellType } from '@/game/world/EnumCellType';
import { WorldMap } from '@/game/world/WorldMap';
import { IntXY } from '@/game/world/IntXY';

type CellColor = [number, number, number];

const COLOR_WATER: CellColor = [0x33, 0x99, 0xff];
const COLOR_GRASS: CellColor = [0x33, 0xff, 0x33];
const COLOR_FOREST: CellColor = [0x0a, 0x6b, 0x1f];
const COLOR_SNOW: CellColor = [0xff, 0xff, 0xff];
const COLOR_SAND: CellColor = [0xff, 0xe1, 0x33];

const CELL_TYPE_TO_COLOR: { [cellType: number]: CellColor } = {
    [EnumCellType.Water]: COLOR_WATER,
    [EnumCellType.Grass]: COLOR_GRASS,
    [EnumCellType.Forest]: COLOR_FOREST,
    [EnumCellType.Snow]: COLOR_SNOW,
    [EnumCellType.Sand]: COLOR_SAND,
};

export class WorldMapDrawer {
    constructor(
        private worldMap: WorldMap,
        private canvasTexture: Phaser.Textures.CanvasTexture
    ) {}

    draw() {
        this.canvasTexture.clear();

        for (let y = 0; y < this.worldMap.mapSize; y++) {
            for (let x = 0; x < this.worldMap.mapSize; x++) {
                const cellType = this.worldMap.getCellType(new IntXY(x, y));
                this.canvasTexture.setPixel(x, y, ...CELL_TYPE_TO_COLOR[cellType]);
            }
        }

        this.canvasTexture.refresh();
    }
}
