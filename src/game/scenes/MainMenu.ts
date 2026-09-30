import { Scene, GameObjects } from 'phaser';
import { FONT_SIZE_SMALL, GAME_HEIGHT_CENTER, GAME_TITLE, GAME_WIDTH_CENTER } from '~/const/main';
import { SCENE_GAME, SCENE_MAIN_MENU } from '@/game/scenes/const';

export class MainMenuScene extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    sceneTitle: GameObjects.Text;
    gameTitle: GameObjects.Text;

    constructor ()
    {
        super(SCENE_MAIN_MENU);
    }

    create ()
    {
        this.background = this.add.image(GAME_WIDTH_CENTER, GAME_HEIGHT_CENTER, 'background');

        this.logo = this.add.image(GAME_WIDTH_CENTER, 30, 'logo').setScale(0.5);

        const textStyle =  {
            fontFamily: 'Arial Black',
            fontSize: FONT_SIZE_SMALL,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }

        this.gameTitle = this.add.text(GAME_WIDTH_CENTER, GAME_HEIGHT_CENTER, GAME_TITLE, {...textStyle, color: '#ffff00', stroke: '#222222'}).setOrigin(0.5);
        this.sceneTitle = this.add.text(GAME_WIDTH_CENTER, GAME_HEIGHT_CENTER + 30, 'Main Menu', textStyle).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start(SCENE_GAME);

        });
    }
}
