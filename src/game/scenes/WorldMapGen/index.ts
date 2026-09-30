import { Scene } from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/game/const/main';

export const WORLD_MAP_TEXTURE_KEY = 'worldMapTexture';
const REDRAW_INTERVAL_MS = 1000;

export class WorldMapGen extends Scene {
    canvasTexture!: Phaser.Textures.CanvasTexture;
    redrawPlanned = false;

    constructor() {
        super('WorldMapGen');
    }

    create() {
        this.canvasTexture = this.textures.createCanvas(
            WORLD_MAP_TEXTURE_KEY,
            GAME_WIDTH,
            GAME_HEIGHT
        )!;

        this.redraw();

        this.add.image(0, 0, WORLD_MAP_TEXTURE_KEY).setOrigin(0, 0).setScale(32);

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

        this.canvasTexture.setPixel(0, 0, 0x33, 0x99, 0xff);
        this.canvasTexture.setPixel(1, 0, 0x33, 0xff, 0x33);

        this.canvasTexture.refresh();
    }
}
