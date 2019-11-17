class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "Bootloader" });
  }
  preload() {
    
    this.load.on("complete", () => { //metodo escucha
      this.scene.start("Scene_play"); //llamar la Ecena
    });
    this.load.image("ball", "./assets/ball.png");
    this.load.image("izquierda", "./assets/left_pallete.png");
    this.load.image("derecha", "./assets/right_pallete.png");
    this.load.image("linea", "./assets/separator.png");


  }


}

export default Bootloader;