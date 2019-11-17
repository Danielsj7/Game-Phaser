class proyectil extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addproyectil();

        

    }
    addproyectil(x, y, velocidad) {
        this.create(x, y, 'proyectil').setDepth(2);
        this.children.iterate((f) => {
            f.setScale(0.5);
            f.body.setSize(90, 20);
            f.body.setOffset(20, 15);
            f.body.setGravityY(-300);

        });
        if (velocidad > 0) {
            this.setVelocityX(500);
        } else { this.setVelocityX(-500); 
        }

    }
    destruirproyectil() {
        this.children.entries[0].destroy();
        
    }

    update() {

    }
}
export default proyectil;