import { Scene } from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/const/main';

type CellColor = [number, number, number];

export const WORLD_MAP_TEXTURE_KEY = 'worldMapTexture';
const REDRAW_INTERVAL_MS = 1000;
const WORLD_MAP_WIDTH = 256;
const WORLD_MAP_HEIGHT = 256;
const WORLD_MAP_ZOOM = 2;

const COLOR_WATER: CellColor = [0x33, 0x99, 0xff];
const COLOR_GRASS: CellColor = [0x33, 0xff, 0x33];

export class WorldMapGen extends Scene {
    canvasTexture!: Phaser.Textures.CanvasTexture;
    redrawPlanned = false;
    counter = 0;

    constructor() {
        super('WorldMapGen');
    }

    create() {
        this.canvasTexture = this.textures.createCanvas(
            WORLD_MAP_TEXTURE_KEY,
            WORLD_MAP_WIDTH ,
            WORLD_MAP_HEIGHT
        )!;

        this.redraw();

        this.add.image(0, 0, WORLD_MAP_TEXTURE_KEY).setOrigin(0, 0).setScale(WORLD_MAP_ZOOM);

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
            this.redraw();
        }
    }

    redraw() {
        console.log("__TEST__ 100: WorldMapGen: redraw")
        const ctx = this.canvasTexture.getContext();
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        this.canvasTexture.setPixel(this.counter, 0, ...COLOR_WATER);
        this.canvasTexture.setPixel(this.counter + 1, 0, ...COLOR_GRASS);

        this.counter ++;

        this.canvasTexture.refresh();
    }
}
