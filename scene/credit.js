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

        let memberText2 = this.add.text(
            memberText1.x + 200,
            memberText1.y + 150,
            "Guixiang Li - Backup Production Lead\nYuanxiao Wu - Testing Lead\nZexuan Li- Production Lead\nZhuo Chen - Technology Lead"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(50)
            .setWordWrapWidth(750);

        let artText1 = this.add.text(
            100 + this.cx,
            50,
            "Art"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(100);

        let artText2 = this.add.text(
            artText1.x + 300,
            artText1.y + 250,
            "By Guixiang Li\nThe treasure, skeletal soldier and gateimages are from Ai drawing.\n(https://hotpot.ai/art-generator)\nKey words:\nA 2D-style treasure chest with two keyholes.\nA 2D gate that embodies the style of a dungeon.\nAn illustration of a skeletal soldier."
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(50)
            .setWordWrapWidth(750);


        let soundText1 = this.add.text(
            100,
            50 + this.cy,
            "Sound"
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(100);

        let soundText2 = this.add.text(
            soundText1.x + 300,
            soundText1.y + 250,``
        )
            .setOrigin(0.5)
            .setFontFamily("Gabriola")
            .setFontSize(50)
            .setWordWrapWidth(750);


        let backText = this.add.text(
            this.cx,
            this.cy + 500,
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
