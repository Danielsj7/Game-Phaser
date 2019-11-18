import Bootloader from './Bootloader.js';
import scenaA from './scenes/scenaA.js';
import start from "./scenes/start.js";
import ui from './scenes/ui.js';



const config = {
    title: "JuegoTerminado",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 640,
        height: 360,
        //mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#f9ca24",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            },
            //debug: true
        }
    },
    scene: [
        Bootloader, start ,scenaA, ui
    ]
};

new Phaser.Game(config);