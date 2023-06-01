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
