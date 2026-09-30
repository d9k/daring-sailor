import { GAME_HEIGHT_CENTER, GAME_WIDTH_CENTER } from '@/game/const/main';
import { Scene } from 'phaser';
import { SCENE_GAME_OVER, SCENE_MAIN_MENU } from '@/game/scenes/const';

export class GameOverScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super(SCENE_GAME_OVER);
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(GAME_WIDTH_CENTER, GAME_HEIGHT_CENTER, 'background');
        this.background.setAlpha(0.5);

        this.gameover_text = this.add.text(GAME_WIDTH_CENTER, GAME_HEIGHT_CENTER, 'Thanks for trying\nthis demo!', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        });
        this.gameover_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start(SCENE_MAIN_MENU);

        });
    }
}
