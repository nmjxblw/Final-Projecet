class GameScene extends Phaser.Scene {

    constructor(key, name) {
        super(key);
        this.sceneKey = key
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

        //加载计时器函数，当访问场景时自动计时，离开当前场景后清零
        this.loadTimer();

        //加载额外函数
        this.exCreate();
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
                //console.log(this.sceneKey);

                //暂停当前场景并跳转至setting场景，
                this.scene.pause(this.sceneKey);

                //如果setting不存在则创建并插入setting场景
                if (!this.scene.get("setting")) {
                    this.scene.add("setting", SettingScene, true, { currentScene: this.sceneKey, });
                }
                else {
                    //如果setting场景存在，则直接访问setting
                    this.scene.launch("setting", { currentScene: this.sceneKey });
                }
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

    loadTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.scene.isActive(this.currentScene)) {
                    console.log(this.game.globals.timer);
                    this.game.globals.timer += 1;
                }
            },
            callbackScope: this,
            loop: true,
        });

        this.game.globals.timer = 0;
    }

    exCreate() {
        console.warn(`${this.sceneKey}没有设置exCreate()`);
    }
}

class SettingScene extends Phaser.Scene {

    init(data) {
        this.currentScene = data.currentScene || "";
    }

    create(data) {
        //console.log(this.currentScene + "from create()");
        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.backgroundRec = this.add.rectangle(this.cx, this.cy, 400, 600).setFillStyle(0xffffff).setOrigin(0.5);

        //放置全屏按钮//废弃->整合进设置
        this.FullScreen = this.add.text(
            this.cx,
            this.cy,
            "Full Screen")
            .setColor("#000000")
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setFontSize(25)
            .setInteractive()
            .on("pointerover", () => {
                this.FullScreen.setAlpha(1).setScale(1.1).setColor("#444444");
            })
            .on("pointerout", () => {
                this.FullScreen.setAlpha(0.8).setScale(1).setColor("#000000");
            })
            .on("pointerup", () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    this.FullScreen.setText("Full Screen");
                } else {
                    this.scale.startFullscreen();
                    this.FullScreen.setText("Quit FullScreen");
                }
            });

        this.input.on("pointerup", (pointer) => {
            if (!this.backgroundRec.getBounds().contains(pointer.x, pointer.y)) {
                this.scene.stop("setting");
                this.scene.resume(data.currentScene);
            }
        });
    }
}