class testScene extends GameScene{
    constructor(){
        super("testScene","test scene");
    }

    exCreate(){
        console.log(this.sceneKey);
        this.time.delayedCall(5000,()=>{
            this.scene.start("testScene2");
        });
    }
}

class testScene2 extends GameScene{
    constructor(){
        super("testScene2","test scene 2")
    }

    exCreate(){
        console.log(this.sceneKey);
        this.time.delayedCall(5000,()=>{
            this.scene.start("testScene");
        });
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [testScene,testScene2],
    backgroundColor: 0x000000,
    title: "Game",
});

game.globals = {
    TestVar: 100,//调用全局值示例：console.log(this.game.globals.TestVar);
    Timer: 0,
    Volume:0.5,

    GameOver: false,
};