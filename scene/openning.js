class openning extends Phaser.Scene {
    constructor() {
        super("openning");
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