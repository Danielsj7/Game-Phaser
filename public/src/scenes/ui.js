import start from './start.js'
class ui extends Phaser.Scene {
    constructor() {
        super({ key: 'ui' });
    }
    init() {
        console.log("Se ha iniciado ui");
    }
    create() {
        this.add.bitmapText(40, 20, 'pixelFont', "VIDA MAGO:").setScale(0.6).setTint(0x000000);
        this.grupovidasmago = this.add.group({
            key: 'life',
            repeat: 2,
            setXY: {
                x: 50,
                y: 50,
                stepX: 25
            }
        });
        this.add.bitmapText(this.scale.width - 130, 25, 'pixelFont', "VIDA ARQUERO:").setScale(0.6).setTint(0x000000);
        this.grupovidasarquero = this.add.group({
            key: 'life',
            repeat: 2,
            setXY: {
                x: this.scale.width - 120,
                y: 50,
                stepX: 25
            }
        });

        //eventos

        this.registry.events.on('quitarvidamago', () => {
            console.log('vidasss' + this.grupovidasmago.getChildren().length);
            this.grupovidasmago.getChildren()[this.grupovidasmago.getChildren().length - 1].destroy();

        });
        this.registry.events.on('quitarvidaarquero', () => {
            console.log('vidasss' + this.grupovidasarquero.getChildren().length);
            this.grupovidasarquero.getChildren()[this.grupovidasarquero.getChildren().length - 1].destroy();

        });
        this.acabar = false;
        this.registry.events.on('perdio_mago', () => {
            this.registry.events.removeAllListeners();
            this.add.bitmapText(200, 70, 'pixelFont', "FELICITACIONES \n GANO EL ARQUERO").setTint(0x000000).setCenterAlign();
            this.acabar = true;
            this.acabart();

        });
        this.registry.events.on('perdio_arquero', () => {
            this.registry.events.removeAllListeners();
            this.add.bitmapText(200, 70, 'pixelFont', "FELICITACIONES \n GANO EL MAGO").setTint(0x000000).setCenterAlign();
            this.acabar = true;
            this.acabart();

        });



    }
    acabart() {
        if (this.acabar === true) {
            location.reload();
        }


    }
}
export default ui;