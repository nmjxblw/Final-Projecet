class testScene extends GameScene{
    constructor(){
        super("testScene","test scene");
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
    scene: [testScene],
    backgroundColor: 0x000000,
    title: "Game",
});

game.globals = {
    TestVar: 100,//调用全局值示例：console.log(this.game.globals.TestVar);
    Timer: 0,

    GameOver: false,
};