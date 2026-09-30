import { AUTO, Game } from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH } from '@/game/const/main';

import { BootScene } from './scenes/Boot';
import { GameScene } from './scenes/Game';
import { PreloaderScene } from './scenes/Preloader';
import { WorldGenScene } from './scenes/WorldGen';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    // backgroundColor: '#028af8',
    backgroundColor: '#FFFFFF',
    // pixelArt: true,
    // zoom: AUTO,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    scene: [
        BootScene,
        PreloaderScene,
        WorldGenScene,
        GameScene
    ],
    input: {
        gamepad: true,
    },
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
