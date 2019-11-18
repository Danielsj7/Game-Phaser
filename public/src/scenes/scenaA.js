import jugador from "../jugador/jugador.js";
import jugador2 from "../jugador/jugador2.js";
import flecha from "../Object/flecha.js";
import proyectil from "../Object/proyectil.js"



class scenaA extends Phaser.Scene {
    constructor() {
        super({ key: 'scenaA' });
    }
    init(data) {
        console.log('se ha iniciado la escena A');
        this.eleccion = data.choise;
        this.scene.launch('ui');
    }
    create() {



        this.add.image(0, 0, 'fondo').setOrigin(0);

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, 0, 'pared').setOrigin(0);
        this.wall_floor.create(this.scale.width, 0, 'pared').setOrigin(1, 0).setFlipX(true);

        this.wall_floor.create(0, this.scale.height, 'piso').setOrigin(0, 1);
        this.wall_floor.create(565, 260, 'piso2');
        this.wall_floor.create(300, 225, 'piso3');
        this.wall_floor.refresh();
        this.wall_floor.getChildren()[3].setSize(120, 90);
        this.wall_floor.getChildren()[3].setOffset(0, -5);

        this.wall_floor.getChildren()[2].setOffset(0, -10);
        this.wall_floor.getChildren()[0].setOffset(20, 0);
        this.wall_floor.getChildren()[1].setOffset(-20, 0);
        this.wall_floor.toggleVisible(false);

        this.registry.events.emit("evento", this.choise).valueOf

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
                    this.variable = false;
                }
            });

            this.physics.add.collider(this.grupoproyectil, this.wall_floor, () => {
                this.grupoproyectil.destruirproyectil();
                this.variable = true;
            });
            this.arquero = new jugador({
                scene: this,
                x: 100,
                y: 100,

            });

            
            this.physics.add.collider(this.grupoproyectil, this.arquero, () => {
                this.grupoproyectil.destruirproyectil();
                this.arquero.flechacolision();
                
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
                    
                    this.variable = false;
                }
            });

            this.physics.add.collider(this.grupoflecha, this.wall_floor, () => {
                this.grupoflecha.destruirflecha();
                this.variable = true;
            });
            this.mago = new jugador2({
                scene: this,
                x: 300,
                y: 100
            });
            this.physics.add.collider(this.grupoflecha, this.mago, () => {
                this.mago.proyectilcolision();
                this.grupoflecha.destruirflecha();
                this.variable = true;
            });

        }



        this.physics.add.collider([this.arquero, this.mago], this.wall_floor);



    }
    update() {
        if (this.eleccion === true) {
            this.mago.update();
        } else {
            this.arquero.update();
        }




    }
}





export default scenaA;