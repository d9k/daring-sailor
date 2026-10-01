import { Scene } from 'phaser';
import { IntXY } from '@/game/world/IntXY';
import { IntXYtoBool } from '@/game/world/IntXYtoBool';
import { IslandXYtoBool } from '@/game/world/IslandXYtoBool';
import { WorldMap } from '@/game/world/WorldMap';
import { WorldMapDrawer } from '@/game/world/WorldMapDrawer';
import { SCENE_WORLD_MAP_GEN } from '@/game/scenes/const';
import { WorldGenerator } from '@/worldGenerator';
import { IslandTypeGenerator } from '@/worldGenerator/island-type-generator';
import { logPrefixFilename } from '@/helpers/vite';
import { randomIntInRange } from '@/helpers/random';

export const WORLD_MAP_TEXTURE_KEY = 'worldMapTexture';
const WORLD_MAP_ZOOM = 1;
const DRAW_MAP_POSITION_X = 60;
const DRAW_MAP_POSITION_Y = 30;
const ISLANDS_COUNT_MIN = 12;
const ISLANDS_COUNT_MAX = 100;
const ISLAND_ITERATIONS = 100;
const ISLAND_PRESERVE_DIRECTION_PERCENT = 10;
const GULFS_MAX_COUNT_MIN = 20;
const GULFS_MAX_COUNT_MAX = 200;

export class WorldGenScene extends Scene {
    canvasTexture!: Phaser.Textures.CanvasTexture;
    worldMap!: WorldMap;
    worldMapDrawer!: WorldMapDrawer;
    redrawWorldMapRequired = false;

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

        /** async generate */
        this.generateIslands(worldGenerator);

        this.add
            .image(
                DRAW_MAP_POSITION_X,
                DRAW_MAP_POSITION_Y,
                WORLD_MAP_TEXTURE_KEY
            )
            .setOrigin(0, 0)
            .setScale(WORLD_MAP_ZOOM);


        this.redraw();

        // this.time.addEvent({
        //     delay: REDRAW_INTERVAL_MS,
        //     callback: () => {
        //         this.redrawPlanned = true;
        //     },
        //     loop: true,
        // });
    }

    generateIslands(worldGenerator: WorldGenerator) {
        const islandTypeGenerator = new IslandTypeGenerator(
            this.worldMap.mapSize
        );

        let islandsGenerated = 0;

        const generateNextIsland = () => {
            console.log(
                `__TEST__ 100: generateIslands: next island, islandsGenerated: ${islandsGenerated}, islandTypeToCount: ${JSON.stringify(islandTypeGenerator.islandTypeToCount)}`
            );

            if (islandsGenerated >= ISLANDS_COUNT_MIN && islandTypeGenerator.isRequiredCountsSatisfied()) {
                console.log(
                    `__TEST__ 190: generateIslands: required counts satisfied, done`
                );
                return;
            }

            if (islandsGenerated >= ISLANDS_COUNT_MAX) {
                throw new Error(
                    `${logPrefixFilename(import.meta.url)}: generateIslands exceeded ${ISLANDS_COUNT_MAX} attempts, islandTypeToCount: ${JSON.stringify(islandTypeGenerator.islandTypeToCount)}`
                );
            }

            if (islandsGenerated >= ISLANDS_COUNT_MIN) {
                islandTypeGenerator.minIslandsGenerated = true;
            }

            const cellCoords = new IntXY(
                Math.floor(Math.random() * this.worldMap.mapSize),
                Math.floor(Math.random() * this.worldMap.mapSize)
            );
            const fillWithCellType =
                islandTypeGenerator.randomIslandCellType(cellCoords.y);

            worldGenerator.floodFillFromCell({
                cellCoords,
                islandCells: new IslandXYtoBool(fillWithCellType),
                borderCells: new IntXYtoBool(),
                preserveDirectionPercent: ISLAND_PRESERVE_DIRECTION_PERCENT,
                iterations: ISLAND_ITERATIONS,
                fillWithCellType,
                generateGulfsMaxCount: randomIntInRange(
                    GULFS_MAX_COUNT_MIN,
                    GULFS_MAX_COUNT_MAX
                ),
            });

            islandsGenerated++;

            this.redrawWorldMapRequired = true;

            // Перенос следующего острова в макротаск разблокирует поток
            setTimeout(generateNextIsland, 0);
        };

        generateNextIsland();
    }

    update() {
        if (this.redrawWorldMapRequired) {
            // console.log('__TEST__ 800 redraw planned');
            this.redrawWorldMapRequired = false;

            this.redraw();
        }
    }

    redraw() {
        // console.log('__TEST__ 800 redraw called');
        this.worldMapDrawer.draw();
    }
}
