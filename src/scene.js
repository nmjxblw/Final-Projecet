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

    exPreload() { }

    exShortCut() { }
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

    exPreload() { }

    exShortCut() { }
}

class openning extends Phaser.Scene {
    constructor() {
        super("openning");
    }

    preload() {
        this.load.path = "../assets/";
    }

    create() {

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setBackgroundColor(0xf0f0f0);

        loadSaveData();

        var cx = this.cameras.main.centerX;
        var cy = this.cameras.main.centerY;
        let rA = 0;

        this.time.addEvent({
            delay: 50,
            callback: createCircle,
            callbackScope: this,
            loop: true,
        });

        function createCircle() {
            let color = Phaser.Display.Color.RandomRGB(50, 255);

            rA += 0.2

            let circle = this.add.circle(cx + 300 * Math.cos(rA), cy + 300 * Math.sin(rA), 20, color.color);

            this.tweens.add({
                targets: circle,
                alpha: 0,
                scale: 2.5,
                duration: 2000,
                onComplete: function () {
                    circle.destroy();
                }
            });
        }

        this.logoText = this.add.text(cx, cy, "Game Maker")
            .setOrigin(0.5)
            .setAlpha(0.5)
            .setFontSize(80)
            .setAngle(-10)
            .setColor("#000000")
            .setFontFamily("Comic Sans MS");

        this.tweens.add({
            targets: this.logoText,
            alpha: 1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.time.delayedCall(5000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("warnning") });
        });

        this.input.on("pointerdown", () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("warnning") });
        });
    }
}

class warnning extends GameScene {
    constructor() {
        super('warnning', 'warnning')
    }

    exPreload() { }

    exShortCut() { }

    exCreate() {

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.warnningTitle = this.add.text(
            this.cx,
            this.cy - 300,
            "Game Warnning"
        )
            .setOrigin(0.5)
            .setColor("#ffffff")
            .setFontSize(150)
            .setFontFamily('Gabriola');

        this.warnningContent = this.add.text(
            this.cx,
            this.cy, `This game contains fantasy, violence and other elements.\n If you feel uncomfortable, please exit the game.`
        )
            .setOrigin(0.5)
            .setColor("#ffffff")
            .setFontSize(75)
            .setFontFamily('Gabriola');;


        this.time.delayedCall(8000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("title") });
        });

        this.input.on("pointerdown", () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("title") });
        });
    }
}

class title extends GameScene {
    constructor() {
        super("title", "title");
    }

    exPreload() {
        //this.load.audio("titleBGM","titleBGM.mp3");
    }

    exShortCut() { }

    exCreate() {

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        var titleText = this.add.text(
            this.cx,
            this.cy - 300,
            "Game Title"
        )
            .setOrigin(0.5)
            .setColor("#ffffff")
            .setFontSize(150)
            .setFontFamily('Gabriola');

        let startText = this.add.text(
            this.cx,
            this.cy + 200,
            "Start"
        )
            .setOrigin(0.5)
            .setFontSize(50)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setInteractive()
            .on("pointerover", () => {
                startText.setText("· Start").setAlpha(1).setScale(1.1).setColor("#ffff00");
            })
            .on("pointerout", () => {
                startText.setText("Start").setAlpha(0.8).setScale(1).setColor("#ffffff");
            })
            .on("pointerup", () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.start("intro");
                });
            });

        let creditText = this.add.text(
            this.cx,
            this.cy + 300,
            "Credit"
        )
            .setOrigin(0.5)
            .setFontSize(50)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setInteractive()
            .on("pointerover", () => {
                creditText.setText("· Credit").setAlpha(1).setScale(1.1).setColor("#ffff00");
            })
            .on("pointerout", () => {
                creditText.setText("Credit").setAlpha(0.8).setScale(1).setColor("#ffffff");
            })
            .on("pointerup", () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.start("credit");
                });
            });

        let exitText = this.add.text(
            this.cx,
            this.cy + 400,
            "Exit"
        )
            .setOrigin(0.5)
            .setFontSize(50)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setInteractive()
            .on("pointerover", () => {
                exitText.setText("· Exit").setAlpha(1).setScale(1.1).setColor("#ffff00");
            })
            .on("pointerout", () => {
                exitText.setText("Exit").setAlpha(0.8).setScale(1).setColor("#ffffff");
            })
            .on("pointerup", () => {
                this.time.delayedCall(1000, () => {
                    window.close();
                });
            });
    }
}

class credit extends GameScene {
    constructor() {
        super("credit", "credit");
    }

    exPreload() { }

    exShortCut() { }

    exCreate() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let memberText1 = this.add.text(
            100,
            50,
            "Team"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(100);

        let artText1 = this.add.text(
            100 + this.cx,
            50,
            "Art"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(100);

        let soundText1 = this.add.text(
            100,
            50 + this.cy,
            "Sound"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(100);


        let backText = this.add.text(
            this.cx,
            this.cy + 450,
            "Back to Title"
        )
            .setOrigin(0.5)
            .setFontSize(50)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setInteractive()
            .on("pointerover", () => {
                backText.setText("· Back to Title").setAlpha(1).setScale(1.1).setColor("#ffff00");
            })
            .on("pointerout", () => {
                backText.setText("Back to Title").setAlpha(0.8).setScale(1).setColor("#ffffff");
            })
            .on("pointerup", () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.start("title");
                });
            });
    }
}


const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        // mode: Phaser.Scale.ScaleModes.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    //scene: [openning, warnning, testScene, testScene2, title, credit],
    //scene: [testlevel],
    //scene: [baseTest1, baseTest2],
    ////scene: [baseBattle],
    //scene: [secondFloorLevel1, secondFloorLevel2],
     scene: [
         thirdFloorLevel1,
         thirdFloorLevel2,
     ],
    backgroundColor: 0x000000,
    title: "Game",
});

