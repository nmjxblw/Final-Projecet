class Base extends GameScene {

    constructor() {
        super("Base", "Base");
    }

    exPreload() {
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");
        this.load.image("testPoint", "testpoint.png");

        this.eventload();
    }

    exShortCut() {
        this.s = this.game.config.width * 0.01;
        //假定卡牌大小为400*600
        this.cardW = 400;
        this.cardH = 600;

        //设定思路：
        //先设定旋转锚点，然后根据旋转锚点的位置设置卡牌的中心
        //旋转锚点设定在屏幕的中间偏下的位置，这样能实现卡片旋转出屏幕的效果
        this.rotatePoint = this.add.circle(
            this.cx,
            this.h - 50,
            10,
            0xffffff)
            .setAlpha(1);

        //标记旋转锚点的初始位置，以便于复位
        this.initialRotatePointX = this.rotatePoint.x;
        this.initialRotatePointY = this.rotatePoint.y;

        //然后根据旋转锚点设置卡牌的中心位置，用圆来表示
        //卡牌中心距离旋转锚点0.75倍卡牌长度
        //在debug后记得把透明度设置为0.
        this.cardCenterPoint = this.add.circle(
            this.cx,
            this.h - 50 - this.cardH * 0.75,
            10,
            0xffff00)
            .setAlpha(0.8);

        //同样的，记录卡片的初始位置
        this.initialCardCenterX = this.cardCenterPoint.x;
        this.initialCardCenterY = this.cardCenterPoint.y;

        //用distance表示卡牌中心到旋转锚点的距离
        //distance通用公式：
        this.distance = Phaser.Math.Distance.Between(
            this.rotatePoint.x,
            this.rotatePoint.y,
            this.cardCenterPoint.x,
            this.cardCenterPoint.y);

        //初始卡牌中心和旋转锚点连线与x轴的夹角
        //夹角通用公式：
        this.initialAngle = Phaser.Math.Angle.Between(
            this.rotatePoint.x,
            this.rotatePoint.y,
            this.cardCenterPoint.x,
            this.cardCenterPoint.y);
    }

    exCreate() {

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(transitionDuration, 0, 0, 0);

        this.background1 = this.add.rectangle(this.w * 0.5, this.h * 0.5, 650, 900, 0xF0E68C);
        this.background1.setDepth(1);

        //设置文本框，在用户互动后再设置其他参数
        this.cardText = this.add.text(0, 0, "")
            .setColor("#000")
            .setAlpha(0)
            .setOrigin(0.5)
            .setDepth(4)
            .setFontSize(50)
            .setFontFamily("Century Gothic")
            .setWordWrapWidth(300);


        //设置卡片文本框锚点,用于标记文本框位置
        this.cardTextCircle = this.add.circle(
            this.cardText.x,
            this.cardText.y,
            10,
            0xff00ff)
            .setAlpha(0.5);

        //设置卡牌文本背景位置、大小以及深度（位于文本下方）
        this.cardTextBackground = this.add.rectangle(
            this.cardText.x,
            this.cardText.y,
            600,
            200)
            .setFillStyle(0xffffff)
            .setOrigin(0.5)
            .setAlpha(0)
            .setDepth(3);

        //设置事件文本背景位置、大小以及深度（位于文本下方）
        this.eventTextBackground = this.add.rectangle(
            this.w * 0.5,
            this.h * 0.2,
            650,
            240)
            .setFillStyle(0xffffff)
            .setOrigin(0.5)
            .setAlpha(0.4)
            .setDepth(3);

        this.onEnter();

    }

    onEnter() {
        //console.warn(`${this.sceneKey}没有设置onEnter()`);
    }

    eventload() {

    }

    gotoScene(key) {
        this.cameras.main.fade(transitionDuration, 0, 0, 0);
        this.time.delayedCall(transitionDuration, () => {
            this.scene.start(key);
        });
    }


    showtitle(Levelname) {
        this.title = this.add.text(this.w / 2, 30, Levelname,
            {
                font: "28px Arial",
                color: "#ffffff",
            });
        this.title.setOrigin(0.5);
        this.title.setDepth(2);
    }

    //创建卡片，第一个参数为卡片使用的图片名称，第二个参数为卡片的标签
    createCard(name) {
        //以卡片中心位置创建卡牌
        let card = this.add.sprite(
            this.cardCenterPoint.x,
            this.cardCenterPoint.y,
            name)
            .setOrigin(0.5)
            .setDepth(1)

        //card.live = true;
        card.label = true;

        return card;
    }

    //调用此函数快速创建一个最上方的text文本框
    createEventText(eventText) {
        let textsize = 25;

        let temp = this.add.text(
            this.eventTextBackground.x,
            this.eventTextBackground.y,
            eventText)
            .setColor("#000")
            .setAlpha(0)
            .setOrigin(0.5)
            .setDepth(4)
            .setFontSize(textsize)
            .setFontFamily("Century Gothic")
            .setWordWrapWidth(500);

        while (temp.height > this.eventTextBackground.height) {
            textsize--;
            temp.setFontSize(textsize);
        }

        this.tweens.add({
            targets: temp,
            alpha: { from: 0, to: 1 },
            delay: 500,
            duration: 500,
            ease: 'Linear',
        })

        return temp;
    }

    //调用此函数使得参数中的卡片可以旋转，text1,2分别为左右旋转时显示的文本，choose1,2分别为左右松开时选择的选项
    dragrotate(card, text1, text2, choose1, choose2) {
        function dragRotateObject(pointer) {
            if (pointer.x > this.initialCardCenterX + 20) {
                this.rotatePoint.x = this.initialRotatePointX + 20;
            }
            else if (pointer.x < this.initialCardCenterX - 20) {
                this.rotatePoint.x = this.initialRotatePointX - 20;
            }
            else {
                this.rotatePoint.x = pointer.x;
            }

            if (pointer.y > this.initialCardCenterY + 10) {
                this.rotatePoint.y = this.initialRotatePointY + 10;
            }
            else if (pointer.y < this.initialCardCenterY - 10) {
                this.rotatePoint.y = this.initialRotatePointY - 10;
            }
            else {
                this.rotatePoint.y = pointer.y + this.cardH * 0.75;
            }

            //angleBetweenRotatePoint用于记录鼠标和锚点之间的角度，正数表示鼠标在旋转锚点右侧，负数表示在旋转锚点左侧
            //注：得到的角度是弧度
            var angleBetweenRotatePoint = Phaser.Math.Angle.Between(
                this.rotatePoint.x,
                this.rotatePoint.y,
                pointer.x,
                pointer.y)
                + Math.PI / 2;

            //以锚点为坐标原点，向上和向右为正方向，判断鼠标与y轴的夹角绝对值是否大于30度，如果是则将角度设为30度且方向相同
            if (angleBetweenRotatePoint > Math.PI / 6) {
                angleBetweenRotatePoint = Math.PI / 6;
            }
            else if (angleBetweenRotatePoint < - Math.PI / 6) {
                angleBetweenRotatePoint = - Math.PI / 6;
            }

            //设置卡片文本位移，使得卡片文本显示时不超过卡片范围。
            var textOffsetDirection = 1;
            if (angleBetweenRotatePoint > 0) {
                textOffsetDirection = -1;
            }

            //根据角度大小调整透明度（文本和文本背景）
            //公式：旋转角度的绝对值度数/30度角
            // => Math.abs(angleBetweenRotatePoint) / ( Math.PI / 180 * 30)
            var alphaD = 6 * Math.abs(angleBetweenRotatePoint / Math.PI);

            //将角度转化为度数制
            var angleBetweenRotatePointD = Phaser.Math.Wrap(Phaser.Math.RadToDeg(angleBetweenRotatePoint), -360, 360);
            //console.log(`当前卡牌的中心与锚点连线与y轴的夹角：${Math.round(angleBetweenRotatePointD)}°`);

            //先设置卡牌中心的位置
            this.cardCenterPoint.x = this.distance * Math.cos(this.initialAngle + angleBetweenRotatePoint) + this.rotatePoint.x;
            this.cardCenterPoint.y = this.distance * Math.sin(this.initialAngle + angleBetweenRotatePoint) + this.rotatePoint.y;

            //再将卡牌中心的坐标赋予卡牌
            card.x = this.cardCenterPoint.x;
            card.y = this.cardCenterPoint.y;

            //设置卡牌的旋转角度
            card.setAngle(angleBetweenRotatePointD);

            //设置文本位置和内容
            this.cardText.x = (this.distance + 150) * Math.cos(this.initialAngle + angleBetweenRotatePoint) + this.rotatePoint.x + textOffsetDirection * alphaD * 25;
            this.cardText.y = (this.distance + 150) * Math.sin(this.initialAngle + angleBetweenRotatePoint) + this.rotatePoint.y;
            this.cardTextCircle.x = this.cardText.x;
            this.cardTextCircle.y = this.cardText.y;
            this.cardTextBackground.x = this.cardText.x - textOffsetDirection * alphaD * 25;
            this.cardTextBackground.y = this.cardText.y;

            //设置选项初始值为空
            var choice = "";

            //将透明度赋予文本背景
            this.cardTextBackground.setAlpha(0.1 * alphaD);
            //console.log(`文本框Alpha:${alphaD.toFixed(3)}`);

            //添加动画效果和设置选项内容
            if (angleBetweenRotatePoint >= 5 / 180 * Math.PI) {
                choice = text2;
            }
            else if (angleBetweenRotatePoint <= -5 / 180 * Math.PI) {
                choice = text1;
            }
            //设置文本内容和透明度
            this.cardText.setText(choice).setAlpha(alphaD);


            //设置字体参数，用于自动调整字体大小
            var cardTextSize = 50;
            this.cardText.setFontSize(cardTextSize);

            //用while loop实现自动调整字体大小
            //showText已经设定过文本的最大宽度了,因此根据文本高度调整字体大小
            while (this.cardText.height > this.cardTextBackground.height) {
                cardTextSize--;
                this.cardText.setFontSize(cardTextSize);
            }

        }

        //鼠标点下时，如果点击卡片则旋转
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                // 判断点击的是卡片
                if (card.getBounds().contains(pointer.x, pointer.y) && card.label) {
                    // 启用拖动旋转操作
                    this.input.on('pointermove', dragRotateObject, this);
                }
            }
        });

        //鼠标抬起时结束旋转回到原位
        this.input.on('pointerup', (pointer) => {
            //angleBetweenRotatePoint用于记录鼠标和锚点之间的角度，正数表示鼠标在旋转锚点右侧，负数表示在旋转锚点左侧
            let angleBetweenRotatePoint = Phaser.Math.Angle.Between(this.rotatePoint.x, this.rotatePoint.y, pointer.x, pointer.y) + Math.PI / 2;

                //以锚点为坐标原点，向上和向右为正方向，判断鼠标与y轴的夹角绝对值是否大于30度，大于正30度选择选项2，小于负30度选择选项以，之后将卡片设置为不可移动
                if (angleBetweenRotatePoint > Math.PI / 6 && card.label) {
                    this.events.emit(choose2);
                    card.label = false;
                    this.switchCard(card);

                }
                else if (angleBetweenRotatePoint < - Math.PI / 6 && card.label) {
                    this.events.emit(choose1);
                    card.label = false;
                    this.switchCard(card);
                }
                else
                {
                    //回到原位置
                    card.setAngle(0);
                    card.x = this.cardRectX;
                    card.y = this.cardRectY;
                }

            // 停止拖动旋转操作
            this.input.off('pointermove', dragRotateObject, this);
            //回到原位置
            card.setAngle(0);
            card.x = this.initialCardCenterX;
            card.y = this.initialCardCenterY;
            this.rotatePoint.x = this.initialRotatePointX;
            this.rotatePoint.y = this.initialRotatePointY;
            this.cardText.setAlpha(0);
            this.cardTextBackground.setAlpha(0);



        });


    }

    rotateOutAndMakeNewCard(card) {
        let rotateAngle = Phaser.Math.Angle.Between(
            this.rotatePoint.x,
            this.rotatePoint.y,
            card.x,
            card.y);

        //console.log(rotateAngle);

        let dToR = Math.PI / 180;//degree 1
        let rToD = 180 / Math.PI;
        let bar = this.distance;

        let rotateAnime = this.time.addEvent({
            loop: true,
            delay: 10,
            callback: () => {
                if (rotateAngle <= Math.PI / 4 && rotateAngle > -Math.PI / 2) {
                    rotateAngle += dToR * 2.7;

                }
                else if (rotateAngle <= -Math.PI / 2 && rotateAngle >= -Math.PI * 5 / 4) {
                    rotateAngle -= dToR * 2.7;
                }

                bar += 10;
                card.x = this.rotatePoint.x + bar * Math.cos(rotateAngle);
                card.y = this.rotatePoint.y + bar * Math.sin(rotateAngle);
                card.angle = Phaser.Math.Wrap(Phaser.Math.RadToDeg(rotateAngle + Math.PI / 2), -360, 360);

                if (rotateAngle > Math.PI / 4 || rotateAngle < -Math.PI * 5 / 4) {
                    this.cardReset(card);
                    rotateAnime.destroy();
                }
            },
            callbackscope: this,
        });
    }

    cardReset(card) {
        card.setTexture("card1");
        card.angle = 0;
        this.rotatePoint.x = this.initialRotatePointX;
        this.rotatePoint.y = this.initialRotatePointY;
        card.x = this.initialCardCenterX;
        card.y = this.initialCardCenterY;
        this.tweens.add({
            targets: card,
            x: "-= 350",
            yoyo: true,
            duration: 400,
        });

        this.tweens.add({
            targets: card,
            scaleX: { from: 1, to: 0 },
            yoyo: true,
            duration: 250,
            repeat: 0,
            oncompleted: () => {
                this.time.delayedCall(250, () => {
                    card.setTexture("card2");
                });
            },
        });
    }


    //调用此函数快速将一个无用的文本隐藏
    changeText(text, new_text) {
        this.tweens.add({
            targets: text,
            alpha: { from: 1, to: 0 },
            duration: 300,
            ease: 'Linear',
            repeat: false,
            yoyo: true,
            oncomplete: () => {
                this.time.delayedCall(300, () => {
                    text.setText(new_text);
                })
            },
        })
    }

    switchCard(card)
    {
        this.tweens.add({
            targets: card,
            x: "-= 350",
            yoyo: true,
            duration: 400,
        });


        this.tweens.add({
            targets: card,
            scaleX: { from: 1, to: 0 },
            yoyo: true,
            duration: 250,
            repeat: 0,
            oncompleted: () => {
                this.time.delayedCall(250, () => {
                    card.setTexture("card1");
                    
                });
            },
        }); 
    }

    timer(time) {

    }

    finish(target_num) {
        if (target_num < 1) {
            this.gotoScene('Level' + level + 'settlement')
        }
    }


    update() {

    }

}