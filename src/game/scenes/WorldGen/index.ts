import { Scene } from 'phaser';
import { EnumCellType } from '@/game/world/EnumCellType';
import { IntXY } from '@/game/world/IntXY';
import { IntXYtoBool } from '@/game/world/IntXYtoBool';
import { IslandXYtoBool } from '@/game/world/IslandXYtoBool';
import { WorldMap } from '@/game/world/WorldMap';
import { WorldMapDrawer } from '@/game/world/WorldMapDrawer';
import { SCENE_WORLD_MAP_GEN } from '@/game/scenes/const';
import { WorldGenerator } from '@/worldGenerator';

export const WORLD_MAP_TEXTURE_KEY = 'worldMapTexture';
const REDRAW_INTERVAL_MS = 1000;
const WORLD_MAP_ZOOM = 1;
const DRAW_MAP_POSITION_X = 60;
const DRAW_MAP_POSITION_Y = 30;
const ISLANDS_COUNT = 12;
const ISLAND_ITERATIONS = 100;
const ISLAND_PRESERVE_DIRECTION_PERCENT = 10;

export class WorldGenScene extends Scene {
    canvasTexture!: Phaser.Textures.CanvasTexture;
    worldMap!: WorldMap;
    worldMapDrawer!: WorldMapDrawer;
    redrawPlanned = false;

    constructor() {
        super(SCENE_WORLD_MAP_GEN);
    }

    create() {
        this.worldMap = new WorldMap();

        const worldGenerator = new WorldGenerator(this.worldMap);

        this.canvasTexture = this.textures.createCanvas(
            WORLD_MAP_TEXTURE_KEY,
            this.worldMap.mapSize,
            this.worldMap.mapSize
        )!;

        this.worldMapDrawer = new WorldMapDrawer(
            this.worldMap,
            this.canvasTexture
        );

        this.generateIslands(worldGenerator);

        this.redraw();

        this.add
            .image(
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

    generateIslands(worldGenerator: WorldGenerator) {
        for (let i = 0; i < ISLANDS_COUNT; i++) {
            worldGenerator.floodFillFromCell({
                cellCoords: new IntXY(
                    Math.floor(Math.random() * this.worldMap.mapSize),
                    Math.floor(Math.random() * this.worldMap.mapSize)
                ),
                islandCells: new IslandXYtoBool(EnumCellType.Grass),
                borderCells: new IntXYtoBool(),
                preserveDirectionPercent: ISLAND_PRESERVE_DIRECTION_PERCENT,
                iterations: ISLAND_ITERATIONS,
                fillWithCellType: EnumCellType.Grass,
            });
        }
    }

    update() {
        if (this.redrawPlanned) {
            this.redrawPlanned = false;

            this.redraw();
        }
    }

    redraw() {
        this.worldMapDrawer.draw();
    }
}
