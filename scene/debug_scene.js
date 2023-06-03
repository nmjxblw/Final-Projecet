class debug_scene extends Phaser.Scene {
    constructor(key) {
        super("debug scene");
    }

    create() {
        quickSaveData();
        console.log(this.scene.manager.getAt(1).sys.config);
        this.scene.start(this.scene.manager.getAt(1).sys.config);
    }
}