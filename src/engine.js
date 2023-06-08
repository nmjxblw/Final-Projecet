class GameScene extends Phaser.Scene {

    constructor(key, name) {
        //统一命名规则：
        //key: floor one level 1
        //name: floor one level 1
        //this.floor用于记录层数
        //this.level用于记录当前关卡编号
        super(key);
        this.sceneKey = key
        if (name === undefined) {
            throw new Error("Name parameter is missing.");
        }
        this.name = name;
        var a = ["one", "two", "three", "four"];
        for (var i = 0; i < a.length; i++) {
            if (key.includes(a[i])) {
                this.floor = a[i];
            }
        }
        this.level = parseInt(key.replace(/[^0-9]/ig, ""));
    }

    preload() {
        this.load.image("gear", "assets/gear.png");
        this.load.video("background3", "assets/Dragon_attacks_village.mp4");
        this.load.json("gameData", "json/InGameData.json");
        this.load.audio('doorOpen', 'assets/doorOpen.mp3');
        this.load.audio('unlock', 'assets/unlock.mp3');
        this.load.audio("chestCreak", "assets/chestCreak.wav")
        this.load.audio("peacefulPlace", "assets/peacefulPlace.mp3")
        this.load.audio("Menu_loop", "assets/Menu_loop.mp3")
        this.load.audio("battleThemeA", "assets/battleThemeA.mp3")
        this.load.audio("theLastEncounter", "assets/TheLastEncounter.mp3")
        this.load.audio("cardSound", "assets/mixkit-game-ball-tap-2073.wav")
        this.load.audio("The Fall of Arcana", "assets/The Fall of Arcana.mp3")

        this.exPreload();
    }

    create() {

        //设置编写游戏时常用的数据
        this.setShortCut();

        //调用加载游戏内UI函数
        this.loadUI();

        //加载计时器函数，当访问场景时自动计时，离开当前场景后清零
        this.loadTimer();

        //加载额外函数
        this.exCreate()


    }

    //设置编写游戏时常用的数据
    setShortCut() {

        //以config为标准获得游戏画布的长和宽
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        //以镜头为准，获得镜头的中心
        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        //获得json中的数据,并存储
        gameData = this.cache.json.get('gameData');

        //开门音效
        this.openDoor = this.sound.add(
            'doorOpen',
            {
                loop: false,
                rate: 0.5,
            }
        );

        //解锁音效
        this.unlock = this.sound.add(
            'unlock',
            {
                loop: false,
            }
        );

        //打开宝箱音效
        this.chestCreak = this.sound.add(
            'chestCreak',
            {
                loop: false,
            }
        );

        //卡牌判定音效
        this.cardSound = this.sound.add(
            'cardSound',
            {
                loop: false,
                volume: 0.5,
            }
        );

        //背景音乐
        this.bgm = this.sound.add(
            'peacefulPlace',
            {
                loop: true,
                volume: 0.2,
                fadeIn: 1000,
                fadeOut: 1000,
            }
        );



        //战斗音乐（龙）
        this.battleMusicD = this.sound.add(
            'battleThemeA',
            {
                loop: true,
                volume: 0.2,
                fadeIn: 1000,
                fadeOut: 1000,
            }
        );

        //战斗音乐（普通）
        this.battleMusicN = this.sound.add(
            'theLastEncounter',
            {
                loop: true,
                volume: 0.2,
                fadeIn: 1000,
                fadeOut: 1000,
            }
        );

        //主菜单bgm
        this.bgm2 = this.sound.add(
            'Menu_loop',
            {
                loop: true,
                volume: 0.2,
                fadeIn: 1000,
                fadeOut: 1000,
            }
        );

        //开场bgm
        this.bgm3 = this.sound.add(
            'The Fall of Arcana',
            {
                loop: true,
                volume: 0.2,
                fadeIn: 1000,
                fadeOut: 1000,
            }
        );


        //更多的shortcut
        this.exShortCut();
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

                //暂停当前场景并跳转至setting场景，
                this.scene.pause(this.sceneKey);
                console.log(saveData.volume);

                //如果setting不存在则创建并插入setting场景
                if (!this.scene.get("setting")) {
                    this.scene.add("setting", SettingScene, true, { currentScene: this.scene, });
                }
                else {
                    //如果setting场景存在，则直接访问setting
                    this.scene.launch("setting", { currentScene: this.scene });
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

    //计时器函数，在离开当前游戏场景时暂停或重置
    loadTimer() {
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.scene.isActive(this.sceneKey)) {
                    Timer += 1;
                }
            },
            callbackScope: this,
            loop: true,
        });

        Timer = 0;
    }

    //当子类没有ex函数时报错
    exCreate() {
        console.warn(`${this.sceneKey}没有设置exCreate()`);
    }

    exPreload() {
        console.warn(`${this.sceneKey}没有设置exPreload()`);
    }

    exShortCut() {
        console.warn(`${this.sceneKey}没有设置exShortCut()`);
    }

    exUpdate() {

    }


}

class SettingScene extends Phaser.Scene {

    init(data) {
        this.currentScene = data.currentScene || null;
    }

    create(data) {
        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.backgroundRec1 = this.add.graphics();
        this.backgroundRec1.fillStyle(0x444444).fillRoundedRect(this.cx - 210, this.cy - 310, 420, 620);
        this.backgroundBound = this.add.rectangle(this.cx, this.cy, 420, 620).setAlpha(0);
        this.backgroundRec2 = this.add.graphics();
        this.backgroundRec2.fillStyle(0xffffff).fillRoundedRect(this.cx - 200, this.cy - 300, 400, 600);

        //放置全屏按钮
        var fullScreenText = this.scale.isFullscreen ? "Quit FullScreen" : "Full Screen";
        this.FullScreen = this.add.text(
            this.cx,
            this.cy - 250,
            `${fullScreenText}`)
            .setColor("#000000")
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setFontSize(30)
            .setInteractive()
            .on("pointerover", () => {
                this.FullScreen.setText(`· ${fullScreenText}`).setAlpha(1).setScale(1.1).setColor("#444444");
            })
            .on("pointerout", () => {
                this.FullScreen.setText(`${fullScreenText}`).setAlpha(0.8).setScale(1).setColor("#000000");
            })
            .on("pointerup", () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    this.FullScreen.setText("Full Screen");
                    fullScreenText = "Full Screen";
                } else {
                    this.scale.startFullscreen();
                    this.FullScreen.setText("Quit FullScreen");
                    fullScreenText = "Quit FullScreen";
                }
            });

        //放置返回标题按钮
        this.BackTitle = this.add.text(
            this.cx,
            this.cy - 150,
            `Go Title`)
            .setColor("#000000")
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setFontSize(30)
            .setInteractive()
            .on("pointerover", () => {
                this.BackTitle.setText(`· Go Title`).setAlpha(1).setScale(1.1).setColor("#444444");
            })
            .on("pointerout", () => {
                this.BackTitle.setText(`Go Title`).setAlpha(0.8).setScale(1).setColor("#000000");
            })
            .on("pointerup", () => {
                if (!this.scene.get('title')) {
                    console.warn("没有场景的键是'title'")
                }
                else {
                    this.cameras.main.fade(500, 0, 0, 0);
                    writeSaveData();
                    this.scene.stop(data.currentScene.key);
                    game.sound.stopAll();
                    this.scene.start("title");
                }
            });

        //音量文本
        this.VolumeText = this.add.text(
            this.cx,
            this.cy - 50,
            `Volume:${Math.floor(saveData.volume * 100)}%`
        )
            .setColor("#000000")
            .setOrigin(0.5)
            .setAlpha(1)
            .setFontFamily("Century Gothic")
            .setFontSize(30);

        //设置音量调节栏
        this.VolumeSlider = this.add.rectangle(this.cx, this.cy + 50, 250, 12.5).setFillStyle(0x444444).setOrigin(0.5).setInteractive();
        this.VolumeBar = this.add.rectangle(200 * saveData.volume + this.cx - 100, this.cy + 50, 20, 40).setFillStyle(0x444444).setOrigin(0.5);
        //音量设置公式
        saveData.volume = (this.VolumeBar.x - this.cx + 100) / 200;

        this.VolumeBar.setInteractive({ draggable: true });
        this.input.setDraggable(this.VolumeBar);

        this.VolumeBar.on('drag', (pointer, dragX) => {
            // 限制滑块的拖动范围在音量调节栏内部
            if (dragX < this.cx - 100) {
                dragX = this.cx - 100;
            } else if (dragX > this.cx + 100) {
                dragX = this.cx + 100;
            }

            this.VolumeBar.setPosition(dragX, this.cy + 50);
            saveData.volume = (dragX - this.cx + 100) / 200;
            game.sound.volume = saveData.volume;
            this.VolumeText.setText(`Volume:${Math.floor(saveData.volume * 100)}%`);
        });

        this.VolumeSlider.on("pointerdown", (pointer) => {
            if (pointer.x < this.cx - 100) {
                this.VolumeBar.x = this.cx - 100;
            }
            else if (pointer.x > this.cx + 100) {
                this.VolumeBar.x = this.cx + 100;
            }
            else {
                this.VolumeBar.x = pointer.x;
            }

            saveData.volume = (this.VolumeBar.x - this.cx + 100) / 200;
            game.sound.volume = saveData.volume;
            this.VolumeText.setText(`Volume:${Math.floor(saveData.volume * 100)}%`);
        });

        //设置返回按钮
        this.BackGame = this.add.text(
            this.cx,
            this.cy + 150,
            `Back`)
            .setColor("#000000")
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setFontFamily("Century Gothic")
            .setFontSize(30)
            .setInteractive()
            .on("pointerover", () => {
                this.BackGame.setText(`· Back`).setAlpha(1).setScale(1.1).setColor("#444444");
            })
            .on("pointerout", () => {
                this.BackGame.setText(`Back`).setAlpha(0.8).setScale(1).setColor("#000000");
            })
            .on("pointerup", () => {
                writeSaveData();
                this.scene.stop("setting");
                this.scene.resume(data.currentScene.key);
            });

        //当玩家点击菜单外时自动关闭菜单
        this.input.on("pointerup", (pointer) => {
            if (!this.backgroundBound.getBounds().contains(pointer.x, pointer.y)) {
                writeSaveData();
                this.scene.stop("setting");
                this.scene.resume(data.currentScene.key);
            }
        });


    }
}