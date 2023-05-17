class GameScene extends Phaser.Scene {
    init() { }

    constructor(key, name) {
        super(key);
        this.name = name;
        //提取name中的数字转化为int，并用this.level存储
        this.level = parseInt(this.name.replace(/[^0-9]/ig, ""));
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("gear", "gear.png");
    }

    create() {

        this.graphics = this.add.graphics();

        //设置编写游戏时常用的数据
        this.setShortCut();

        //调用加载游戏内UI函数
        this.loadUI();
    }

    //设置编写游戏时常用的数据
    setShortCut() {

        //以config为标准获得游戏画布的长和宽
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        //以镜头为准，获得镜头的中心
        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;
    }

    //加载游戏UI
    loadUI() {
        //放置全屏按钮//废弃->整合进设置
        this.FullScreen = this.add.text(
            this.w * 0.05,
            12,
            "Full Screen")
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setFontSize(25)
            .setInteractive()
            .on("pointerover", () => {
                this.FullScreen.setAlpha(1).setScale(1.1).setColor("#ffff00");
            })
            .on("pointerout", () => {
                this.FullScreen.setAlpha(0.8).setScale(1).setColor("#ffffff");
            })
            .on("pointerup", () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    this.FullScreen.setText("Full Screen").setPosition(this.w * 0.05, 12);
                } else {
                    this.scale.startFullscreen();
                    this.FullScreen.setText("Quit FullScreen").setPosition(this.w * 0.065, 12);
                }
            });

        //放置设置按钮并具有如下功能：1.返回游戏 2.返回标题 3.转到游戏设置 4.全屏（可选：5.保存进度 6.加载进度） 
        this.settingGear = this.add.sprite(
            this.w * 0.98,
            this.h * 0.03,
            "gear"
        )
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.settingGear.setScale(1.1);
                this.gearSpin.play();
            })
            .on('pointerout', () => {
                this.settingGear.setScale(1);
                this.gearSpin.pause();
            })
            .on('pointerup', () => {

            });

        //齿轮转动动画
        this.gearSpin = this.tweens.add({
            targets: this.settingGear,
            angle: "+=360",
            duration: 4000,
            repeat: -1

        })
            .pause();
    }
}