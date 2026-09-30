import { Scene } from 'phaser';
import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';
import { WORLD_MAP_SIZE, WorldMap } from '@/game/world/WorldMap';
import { WorldMapDrawer } from '@/game/world/WorldMapDrawer';
import { SCENE_WORLD_MAP_GEN } from '@/game/scenes/const';

export const WORLD_MAP_TEXTURE_KEY = 'worldMapTexture';
const REDRAW_INTERVAL_MS = 1000;
const WORLD_MAP_ZOOM = 1;
const DRAW_MAP_POSITION_X = 60;
const DRAW_MAP_POSITION_Y = 30;

export class WorldGenScene extends Scene {
    canvasTexture!: Phaser.Textures.CanvasTexture;
    worldMap!: WorldMap;
    worldMapDrawer!: WorldMapDrawer;
    redrawPlanned = false;
    counter = 0;

    constructor() {
        super(SCENE_WORLD_MAP_GEN);
    }

    create() {
        this.worldMap = new WorldMap();

        this.canvasTexture = this.textures.createCanvas(
            WORLD_MAP_TEXTURE_KEY,
            WORLD_MAP_SIZE,
            WORLD_MAP_SIZE
        )!;

        this.worldMapDrawer = new WorldMapDrawer(
            this.worldMap,
            this.canvasTexture
        );

        this.redraw();

        this.add.image(
            DRAW_MAP_POSITION_X,
            DRAW_MAP_POSITION_Y,
            WORLD_MAP_TEXTURE_KEY
        )
            .setOrigin(0, 0)
            .setScale(WORLD_MAP_ZOOM);

        this.time.addEvent({
            delay: REDRAW_INTERVAL_MS,
            callback: () => {
                this.redrawPlanned = true;
            },
            loop: true,
        });
    }

    update() {
        if (this.redrawPlanned) {
            this.redrawPlanned = false;

            this.worldMap.setCellType(
                new IntXY(this.counter, 0),
                EnumCellType.Water
            );
            this.worldMap.setCellType(
                new IntXY(this.counter + 1, 0),
                EnumCellType.Grass
            );

            this.counter = (this.counter + 1) % (WORLD_MAP_SIZE - 1);

            this.redraw();
        }
    }

    redraw() {
        this.worldMapDrawer.draw();
    }
}
