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
