class testScene extends GameScene {
    constructor() {
        super("testScene", "test scene");
    }

    exCreate() {
        // console.log(this.sceneKey);
        this.time.delayedCall(5000, () => {
            this.scene.start("testScene2");
        });
    }
}

class testScene2 extends GameScene {
    constructor() {
        super("testScene2", "test scene 2")
    }

    exCreate() {
        //console.log(this.sceneKey);
        this.time.delayedCall(5000, () => {
            this.scene.start("testScene");
        });
    }
}


/* let Timer = 0;//临时计时器
let Volume = 0.5;//音量大小，范围:[0-1],float
let GameOver = false;//用于检测玩家是否死亡
let saveDataJsonFilePath = './assets/SaveData.json';//存储SaveData.json的路径，string
let saveData;//玩家临时存档，最终存档存储于localStorage中
let gameData;//游戏数据（关卡数值和其他信息，在'./assets/InGameData.json'中定义以后调用） */

const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [testScene, testScene2],
    backgroundColor: 0x000000,
    title: "Game",
});

