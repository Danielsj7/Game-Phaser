class jugador2 extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'animacionmago');


        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(0.5);
        this.body.setBounce(0.3);
        this.body.setSize(70, 100);
        this.body.setOffset(6, 6);

        this.jumping = false;
        this.hitDelay = false;
        this.anims.play('mago_quieto');
        this.move = 'stop';
        this.teclas = this.scene.input.keyboard.addKeys('d,a,w');
        this.life = 3;
        this.velocidad = 0;





    }
    update() {
        if (this.teclas.a.isDown) {
            this.body.setVelocityX(-100);
            this.flipX = true;
            this.velocidad = -100;
            if (this.move !== "run") {
                this.anims.play('mago_run');
                this.move = "run";

            }
        } else if (this.teclas.d.isDown) {
            this.body.setVelocityX(100);
            this.flipX = false;
            this.velocidad = 100;
            if (this.move !== "run") {
                this.anims.play('mago_run');
                this.move = "run";

            }
        } else {
            this.body.setVelocityX(0);
            if (this.move !== "stop") {
                this.anims.play('mago_quieto');
                this.move = "stop";
            }

        }




        if (Phaser.Input.Keyboard.JustDown(this.teclas.w) && !this.jumping) {
            this.jumping = true;
            this.body.setVelocityY(-400);
            if (this.move !== 'jump') {
                this.anims.play('mago_jump');
                setTimeout(() => {
                    this.anims.stop();
                }, 200);

            }
        } else if (this.body.blocked.down) {
            this.jumping = false;
        }


    }
    proyectilcolision() {

        if (!this.hitDelay) {
            if (this.life > 0) {
                this.hitDelay = true;
                this.life--;
                
                this.scene.registry.events.emit('quitarvidamago');
                
            }

            if (this.life === 0) {
                this.scene.registry.events.emit('perdio_mago');
            }
            console.log("hirieron al mago");
            this.scene.time.addEvent({
                delay: 600,
                callback: () => {
                    this.hitDelay = false;
                    console.log(this.hitDelay);
                }
            });

        }

    }
}
export default jugador2;