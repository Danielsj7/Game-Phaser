import Palas from '../gameObjects/palas.js'
class Scene_play extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_play" });
    }

    create() {
        let centerW = this.sys.game.config.width / 2;
        let centerH = this.sys.game.config.height / 2;
        //separador
        this.add.image(centerW, centerH, "linea");
        console.log(this);

        //Palas
        //this.izquierda = this.add.image(30, centerH, "izquierda");
        //creacion de clase para no repetir el codigo
        this.izquierda = new Palas(this, 30, centerH, "izquierda");
        this.derecha = new Palas(this, (centerW * 2) - 30, centerH, "derecha");

        //bolas
        this.physics.world.setBoundsCollision(false, false, true, true); //izq,der,arriba,abajo habilitar para choque
        this.ball = this.physics.add.image(centerW, centerH, "ball");
        this.ball.setCollideWorldBounds(true);//para devolver al chocar
        this.ball.setBounce(1); // devolver con la misma velocidad
        this.ball.setVelocityX(-280);

        //Fisicas
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

        //Controles
        //pasa derecha
        this.cursor = this.input.keyboard.createCursorKeys();
        //pala izquierda
        this. cursosW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this. cursosS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update() {
        if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        }
        //control de palas
        //derecha
        if (this.cursor.down.isDown) {
            this.derecha.body.setVelocityY(300);
        } else if(this.cursor.up.isDown){
            this.derecha.body.setVelocityY(-300);
        } else {
            this.derecha.body.setVelocityY(0);
        }
        //izquierda
        if (this.cursosS.isDown) {
            this.izquierda.body.setVelocityY(300);
        } else if(this.cursosW.isDown){
            this.izquierda.body.setVelocityY(-300);
        }else{
            this.izquierda.body.setVelocityY(0);
        }

    }
    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120)); //para dar velocidad RAMDON
    }
}
export default Scene_play;