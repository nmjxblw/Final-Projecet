class title extends GameScene {
    constructor() {
        super("title", "title");
    }

    exPreload() {
        this.load.image("background2", "assets/Game cover image.png");
        //this.load.audio("titleBGM","titleBGM.mp3");
    }

    exShortCut() { }

    exCreate() {

        //设置背景图片
        this.backgroundImage = this.add.image(0, 0, "background2").setOrigin(0).setDepth(-1);
        
        //播放背景音乐
        this.bgm2.play();

        this.input.keyboard.on('keydown', (event) => {
                console.log('keydown event', event);
                if (event.key == '1') {
                    this.scene.start('floor two level 1');
                }
            });

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        var titleText = this.add.text(
            this.cx,
            this.cy - 300,
            "Eternal Dragon"
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
                this.bgm2.stop();
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.start("floor one level 0");
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
                this.bgm2.stop();
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
