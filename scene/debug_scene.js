class debug_scene extends Phaser.Scene {
    constructor(key) {
        super("debug scene");
    }

    preload() {
        // this.load.json("saveData", "json/SaveData.json");
    }

    create() {
        // saveData = this.cache.json.get('saveData');
        loadSaveData();
        this.time.delayedCall(100, () => {
            console.log(this.scene.manager.getAt(1).sys.config);
            this.scene.start(this.scene.manager.getAt(1).sys.config);
        });
        
    }
}