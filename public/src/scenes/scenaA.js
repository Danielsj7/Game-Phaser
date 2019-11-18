import jugador from "../jugador/jugador.js";
import jugador2 from "../jugador/jugador2.js";
import flecha from "../Object/flecha.js";
import proyectil from "../Object/proyectil.js"


class scenaA extends Phaser.Scene {
    constructor() {
        super({
            key: 'scenaA'
        });
        this.socket = io();
    }


    init() {
        console.log('se ha iniciado la escena A');
    }

    create() {
        this.id = this.socket.id;
        console.log(this.id);



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

            this.player = new jugador2({
                scene: this,
                x: 300,
                y: 100
            }, this.socket);

            this.grupoproyectil = new proyectil({
                physicsWorld: this.physics.world,
                scene: this,
            });

            const eventos = Phaser.Input.Events;
            this.variable = true;
            this.input.on(eventos.POINTER_DOWN, (evento) => {
                if (evento.isDown && this.variable === true) {
                    this.grupoproyectil.addproyectil(this.player.x, this.player.y - 10, this.player.velocidad);
                    this.player.anims.play('mago_attack');
                    this.player.anims.stop()
                    this.variable = false;
                }
            });

            this.physics.add.collider(this.grupoproyectil, this.wall_floor, () => {
                this.grupoproyectil.destruirproyectil();
                this.variable = true;
            });

        } else {
            this.player = new jugador({
                scene: this,
                x: 100,
                y: 100,

            }, this.socket);

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
                    this.grupoflecha.addflecha(this.player.x, this.player.y - 10, this.player.velocidad);
                    this.player.anims.play('arquero_attack');
                    this.player.anims.stop()
                    this.variable = false;
                }
            });
            this.physics.add.collider([this.player, this.player], this.wall_floor);
            this.physics.add.collider(this.grupoflecha, this.wall_floor, () => {
                this.grupoflecha.destruirflecha();
                this.variable = true;
            });


        }
        this.socket.emit('login', this.player)
        this.socket.on('fullSala', () => {
            document.write('Sala llena, intentelo más tarde');
        })

        this.socket.on('2player', (players) => {
            console.log('2PLAYER ON')
            if (this.id != players[0].id) {
                this.player2 = new jugador2({
                    scene: this,
                    x: players[0].x,
                    y: players[0].y,

                }, this.socket);

            } else {
                //Actualizar al players[0]
                this.player2 = new jugador2({
                    scene: this,
                    x: players[1].x,
                    y: players[1].y,
                }, this.socket);
                this.physics.add.collider([this.player2, this.player2], this.wall_floor);
            }
            this.physics.add.collider([this.player2, this.player2], this.wall_floor);


        });

        this.socket.on('otherPlayer', (players) => {
            if (this.id != players[0].id) {
                //Actualizar al players[0]
                this.player2.x = players[0].x;
                this.player2.y = players[0].y;
            } else {
                //Actualizar al players[1]
                this.player2.x = players[1].x;
                this.player2.y = players[1].y;
            }
        })
        this.physics.add.collider([this.player, this.player], this.wall_floor);

    }
    update() {
        this.player.update(this.socket);
    }
}





export default scenaA;