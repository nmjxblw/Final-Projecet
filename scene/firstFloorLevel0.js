class firstFloorLevel0 extends GameScene {
    constructor() {
        super("floor one level 0", "intro")
    }

    exCreate() {

        game.sound.stopAll();
        this.bgm3.play();

        this.cameras.main.fadeIn(transitionDuration, 0, 0, 0);
        //设置背景图片
        this.backgroundImage = this.add.image(0, 0, "background3").setOrigin(0).setDepth(-1).setAlpha(1);

        //设置文本框
        this.subtitleBackground = this.add.rectangle(
            this.cx,
            this.cy,
            this.cx,
            500,
            0xffffff)
            .setOrigin(0.5)
            .setDepth(1)
            .setAlpha(0.3);

        this.subtitle = this.add.text(
            this.subtitleBackground.x,
            this.subtitleBackground.y,
            ""
        )
            .setColor("#ffffff")
            .setOrigin(0.5)
            .setDepth(4)
            .setFontSize(50)
            .setFontFamily("Century Gothic")
            .setWordWrapWidth(this.cx)
            .setAlpha(0)
            .setLineSpacing(20);


        this.playSub = this.tweens.chain({
            targets: this.subtitle,
            tweens: [
                {
                    oncomplete: () => {
                        this.subtitle.setText("     Once upon a time, there is a land filled with magic and mysterious elements,and within it, there is a dungeon full of mystery.")
                            .setAlpha(1);
                    },
                },
                {
                    alpha: 1,
                    duration: 8000,
                },
                {
                    alpha: 0,
                    duration: 500,
                },
                {
                    alpha: 1,
                    duration: 500,
                    oncomplete: () => {
                        this.subtitle.setText("     A powerful dragon lives within the dungeon and would bring tragedy to the world once every few years.");
                    }
                },
                {
                    alpha: 1,
                    duration: 8000,
                },
                {
                    alpha: 0,
                    duration: 500,
                },
                {
                    alpha: 1,
                    duration: 500,
                    oncomplete: () => {
                        this.subtitle.setText("     However, as a prophecy tells, one day a brave man would come with the great sword full of unexplainable power, and they would use it to defeat the dragon.");
                    }
                },
                {
                    alpha: 1,
                    duration: 8000,
                },
                {
                    alpha: 0,
                    duration: 500,
                },
                {
                    alpha: 1,
                    duration: 500,
                    oncomplete: () => {
                        this.subtitle.setText("     You are an adventurer. Your hometown is destroyed by the dragon during the previous attack.");
                    }
                },
                {
                    alpha: 1,
                    duration: 8000,
                },
                {
                    alpha: 0,
                    duration: 500,
                },
                {
                    alpha: 1,
                    duration: 500,
                    oncomplete: () => {
                        this.subtitle.setText("     As you see the fire burn through your hometown, you are filled with sorrow and anger, and you swear to defeat the dragon with the great sword from the prophecy.");
                    }
                },
            ],
        });

        this.time.delayedCall(50000, () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => { this.scene.start("floor one level 1") });
        });

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                // 判断点击的不是齿轮
                if (!this.settingGear.getBounds().contains(pointer.x, pointer.y)) {
                    this.cameras.main.fade(500, 0, 0, 0);
                    this.time.delayedCall(500, () => { this.scene.start("floor one level 1") });
                }
            }
        });

    }
}