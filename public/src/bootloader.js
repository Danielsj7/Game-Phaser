class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {

        this.load.setPath('./assets/');

        this.load.image(['fondo', 'pared', 'piso', 'piso2', 'piso3', 'flecha', "fondo2",
            'proyectil', 'mago1', 'arquero1', "pluginA", "pluginM", 'life']);

        this.load.image('font', 'font/font.png');
        this.load.json('fontData', 'font/font.json');

        

        this.load.atlas('animacionarquero', 'animacionarquero.png', 'animacionarquero_atlas.json');
        this.load.animation('animacion', 'animacionarquero_anim.json');

        this.load.atlas('animacionmago', 'animacionmago.png', 'animacionmago_atlas.json');
        this.load.animation('animacion2', 'animacionmago_anim.json');

        this.load.atlas('quieto', 'quieto.png', 'quieto_atlas.json');
        this.load.animation('animacion3', 'quieto_anim.json');

        this.load.on('complete', () => {
            
            const fontData = this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));

            
            this.scene.start('start');
        });
    }

    create() {




    }
}
export default Bootloader;