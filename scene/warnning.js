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