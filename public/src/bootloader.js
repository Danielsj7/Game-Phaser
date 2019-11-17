class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {

        this.load.setPath('./assets/');

        this.load.image(['fondo', 'pared', 'piso', 'piso2', 'piso3','flecha','proyectil', 'mago1', 'arquero1']);
        
        
        this.load.atlas('animacionarquero', 'animacionarquero.png', 'animacionarquero_atlas.json');
        this.load.animation('animacion', 'animacionarquero_anim.json');

        this.load.atlas('animacionmago', 'animacionmago.png', 'animacionmago_atlas.json');
        this.load.animation('animacion2', 'animacionmago_anim.json');

        this.load.atlas('quieto', 'quieto.png', 'quieto_atlas.json');
        this.load.animation('animacion3', 'quieto_anim.json');
        
        this.load.on('complete', () => {
            console.log('Load complete');
            this.scene.start('scenaA');
        });
    }

    create() {
        
        
       
    
    }
}
export default Bootloader;