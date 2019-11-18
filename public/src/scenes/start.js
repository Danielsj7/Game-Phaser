
class start extends Phaser.Scene {
    constructor() {
        super({ key: "start" });
    }
    init() {
        //this.scene.launch('ui');
    }

    create() {
        this.add.image(0, 0, "fondo2").setOrigin(0).setScale(1.1);
        this.arquero = this.add.image(180, 200, "pluginA").setInteractive();
        this.mago = this.add.image(480, 200, "pluginM").setInteractive();

        const eventos = Phaser.Input.Events;

        this.seleccion = false;

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            gameObject.setTint(0x0000ff);
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if (this.seleccion == false) {
                gameObject.clearTint();
            }
            if (gameObject !== this.choise) {
                gameObject.clearTint();
            }

        });

        this.eleccion = true;

        this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject) => {
            this.choise = gameObject;
            if (this.seleccion == false) {
                if (gameObject == this.arquero) {
                    this.registry.events.on("evento", (dato) => {
                        console.log("Se ha registrado el arquero");

                    });
                    this.eleccion = false;

                } else {
                    this.registry.events.on("evento", (dato) => {
                        console.log("Se ha registrado el mago");

                    });

                }

                this.seleccion = true;
                this.scene.launch('scenaA', {
                    choise: this.eleccion
                });
            }

        });
        this.add.bitmapText(100, 50, 'pixelFont', "SELECCIONE SU PERSONAJE").setScale(1.2);

        //  this.scene.start("scenaA");

    }



}

export default start;