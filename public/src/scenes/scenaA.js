import jugador from "../jugador/jugador.js";
import jugador2 from "../jugador/jugador2.js";
import flecha from "../Object/flecha.js";
import proyectil from "../Object/proyectil.js"


class scenaA extends Phaser.Scene {
    constructor() {
        super({
            key: 'scenaA'
        });
    }


    init() {
        console.log('se ha iniciado la escena A');
    }

    create() {
        this.socket = io();

        // this.socket.emit('login', () => {
            
        // });
        this.add.image(0, 0, 'fondo').setOrigin(0);

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, 0, 'pared').setOrigin(0);
        this.wall_floor.create(this.scale.width, 0, 'pared').setOrigin(1, 0).setFlipX(true);

        this.wall_floor.create(0, this.scale.height, 'piso').setOrigin(0, 1);
        this.wall_floor.create(565, 260, 'piso2');
        this.wall_floor.create(300, 225, 'piso3');
        this.wall_floor.refresh();
        this.wall_floor.getChildren()[2].setOffset(0, -10);
        this.wall_floor.getChildren()[0].setOffset(20, 0);
        this.wall_floor.getChildren()[1].setOffset(-20, 0);
        this.wall_floor.toggleVisible(false);

        this.eleccion = false;
        if (this.eleccion === true) {

            this.mago = new jugador2({
                scene: this,
                x: 300,
                y: 100
            });

            this.grupoproyectil = new proyectil({
                physicsWorld: this.physics.world,
                scene: this,
            });

            const eventos = Phaser.Input.Events;
            this.variable = true;
            this.input.on(eventos.POINTER_DOWN, (evento) => {
                if (evento.isDown && this.variable === true) {
                    this.grupoproyectil.addproyectil(this.mago.x, this.mago.y - 10, this.mago.velocidad);
                    this.mago.anims.play('mago_attack');
                    this.mago.anims.stop()
                    console.log(this.mago);
                    this.variable = false;
                }
            });

            this.physics.add.collider(this.grupoproyectil, this.wall_floor, () => {
                this.grupoproyectil.destruirproyectil();
                this.variable = true;
            });

        } else {
            this.arquero = new jugador({
                scene: this,
                x: 100,
                y: 100,

            });

            //flechas arquero
            this.grupoflecha = new flecha({
                physicsWorld: this.physics.world,
                scene: this,
            });



            //para el arquero
            const eventos = Phaser.Input.Events;
            this.variable = true;
            this.input.on(eventos.POINTER_DOWN, (evento) => {
                if (evento.isDown && this.variable === true) {
                    this.grupoflecha.addflecha(this.arquero.x, this.arquero.y - 10, this.arquero.velocidad);
                    this.arquero.anims.play('arquero_attack');
                    this.arquero.anims.stop()
                    console.log(this.arquero);
                    this.variable = false;
                }
            });
            this.physics.add.collider([this.arquero, this.mago], this.wall_floor);
            this.physics.add.collider(this.grupoflecha, this.wall_floor, () => {
                this.grupoflecha.destruirflecha();
                this.variable = true;
            });

        }

        this.physics.add.collider([this.arquero, this.mago], this.wall_floor);

    }
    update() {
        this.id = this.socket.id;
        if (this.eleccion === true) {
            this.info = this.mago.mandarPos(this.id);
            this.socket.emit('login', this.info)
            this.mago.update();
          
        } else {
            this.info = this.arquero.mandarPos(this.id);
            this.socket.emit('login', this.info)
            this.arquero.update();
            
        }
    }
}





export default scenaA;