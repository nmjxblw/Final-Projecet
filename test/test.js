//用于测试的代码
function getGameDataExample() {
    return gameData.floor.one.enemy1.hp;
}

class baseTest extends GameScene {
    exPreload() {
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");
    }

    exCreate() {

        //假定卡牌大小为400*600
        var rectW = 400;
        var rectH = 600;

        //卡牌中心位置在屏幕正中间
        var cardRectX = this.cx;
        var cardRectY = this.cy;

        //设置旋转锚点初始位置，位于屏幕正中间往下0.75倍卡牌长度
        var routatePointX = this.cx;
        var routatePointY = this.cy + rectH * 0.75;

        //用distance表示卡牌中心到旋转锚点的距离
        var distance = Phaser.Math.Distance.Between(routatePointX, routatePointY, cardRectX, cardRectY);
        //以及卡牌中心和旋转锚点连线与x轴的夹角
        var initAngle = Phaser.Math.Angle.Between(routatePointX, routatePointY, cardRectX, cardRectY);

        //console.log(distance);

        //显示旋转锚点
        let routatePoint = this.add.circle(
            routatePointX,
            routatePointY,
            10,
            0xffffff)
            .setAlpha(0.5);

        //测试锚点，用于标记图像的位置
        let testCircle = this.add.circle(
            distance * Math.cos(initAngle) + routatePointX,
            distance * Math.sin(initAngle) + routatePointY,
            20,
            0x00ff00)
            .setAlpha(0);

        //设置文本框，在用户互动后再设置其他参数
        let showText = this.add.text(0, 0, "")
            .setColor("#000")
            .setAlpha(0)
            .setOrigin(0.5)
            .setFontSize(50)
            .setFontFamily("Century Gothic")
            .setWordWrapWidth(300);

        //设置文本框锚点,用于标记文本框位置
        let textCircle = this.add.circle(
            showText.x,
            showText.y,
            10,
            0xff00ff)
            .setAlpha(0);

        //设置文本背景位置、大小以及深度（位于文本下方）
        let textRect = this.add.rectangle(showText.x, showText.y, 600, 200)
            .setFillStyle(0xffffff)
            .setOrigin(0.5)
            .setAlpha(0)
            .setDepth(showText.depth - 1);

        // 设置图片的位置、大小以及深度（位于文本背景的下方）
        var card = this.add.sprite(this.cx, this.cy, 'card1')
            .setOrigin(0.5)
            .setDepth(textRect.depth - 1);

        var backgroundCard = this.add.sprite(this.cx, this.cy, 'card1')
            .setOrigin(0.5)
            .setDepth(card.depth - 1);



        //模拟卡片翻转动画，用于场景过度
        this.input.on("pointerup", () => {
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
        });

        //测试按键监听
        this.input.keyboard.on("keyup", (event) => {
            if (event.key === 'q') {
                card.setTexture("card1");
            }
            else if (event.key === 'w') {
                let eventRect = this.add.rectangle(this.cx, this.cy - this.h, 600, 400, 0xf0f0f0).setOrigin(0.5).setAlpha(0.8);

                let eventShow = this.tweens.chain({
                    targets: eventRect,
                    tweens: [
                        {
                            y: { from: this.cy - this.h, to: this.cy },
                            ease: 'Back.Out',
                            duration: 500,
                        },
                        {
                            x: this.cx,
                            y: this.cy,
                            duration: 2000,
                        },
                        {
                            y: this.cy + this.h,
                            ease: "back.in",
                            duration: 500,
                        }
                    ],
                });

                let eventText = this.add.text(this.cx, this.cy - this.h, 'Event')
                    .setAlpha(0)
                    .setOrigin(0.5)
                    .setFontFamily('Century Gothic')
                    .setFontSize(50)
                    .setColor("0x000000")
                    .setDepth(event.depth + 1);

                let textShow = this.tweens.chain({
                    targets: eventText,
                    tweens: [
                        {
                            y: { from: this.cy - this.h, to: this.cy },
                            alpha: { from: 0, to: 1 },
                            ease: 'Back.Out',
                            duration: 500,
                        },
                        {
                            x: this.cx,
                            y: this.cy,
                            duration: 2000,
                        },
                        {
                            y: this.cy + this.h,
                            ease: "back.in",
                            duration: 500,
                        },
                    ],
                });

                let eventStar = this.star(eventText.x - 100, this.cy).setDepth(eventText.depth + 1).setAlpha(0);

                let starShow = this.tweens.chain({
                    targets: eventStar,
                    tweens: [
                        {
                            y: { from: this.cy - this.h, to: this.cy },
                            alpha: { from: 0, to: 1 },
                            ease: 'Back.Out',
                            duration: 500,
                        },
                        {
                            x: eventText.x - 100,
                            y: this.cy,
                            duration: 2000,
                        },
                        {
                            y: this.cy + this.h,
                            alpha: { from: 1, to: 0 },
                            ease: "back.in",
                            duration: 500,
                        },
                    ],
                });

                this.time.delayedCall(3000, () => {
                    eventRect.destroy();
                    eventText.destroy();
                    eventStar.destroy();
                });
            }
        });


        //鼠标移动监听
        this.input.on("pointermove", (pointer) => {

            //通过改变旋转锚点的坐标来实现拖动效果
            if (pointer.x > this.cx + 20) {
                routatePointX = this.cx + 20;
            }
            else if (pointer.x < this.cx - 20) {
                routatePointX = this.cx - 20;
            }
            else {
                routatePointX = pointer.x;
            }

            routatePoint.x = routatePointX;

            if (pointer.y > this.cy + 10) {
                routatePointY = this.cy + rectH * 0.75 + 10;
            }
            else if (pointer.y < this.cy - 10) {
                routatePointY = this.cy + rectH * 0.75 - 10;
            }
            else {
                routatePointY = pointer.y + rectH * 0.75;
            }

            routatePoint.y = routatePointY;

            //angleBetweenRotatePoint用于记录鼠标和锚点之间的角度，正数表示鼠标在旋转锚点右侧，负数表示在旋转锚点左侧
            var angleBetweenRotatePoint = Phaser.Math.Angle.Between(routatePointX, routatePointY, pointer.x, pointer.y) + Math.PI / 2;
            //以锚点为坐标原点，向上和向右为正方向，判断鼠标与y轴的夹角绝对值是否大于30度，如果是则将角度设为30度且方向相同
            if (angleBetweenRotatePoint > Math.PI / 6) {
                angleBetweenRotatePoint = Math.PI / 6;
            }
            else if (angleBetweenRotatePoint < - Math.PI / 6) {
                angleBetweenRotatePoint = - Math.PI / 6;
            }

            //设置文本位移，使得文本显示时不超过卡片范围。
            var textOffsetDirection = 1;
            if (angleBetweenRotatePoint > 0) {
                textOffsetDirection = -1;
            }

            //根据角度大小调整透明度（文本和文本背景）
            var alphaD = 6 * Math.abs(angleBetweenRotatePoint / Math.PI);

            //将角度转化为度数制
            var angleBetweenRotatePointD = Phaser.Math.Wrap(Phaser.Math.RadToDeg(angleBetweenRotatePoint), -360, 360);
            //console.log(`当前卡牌的中心与锚点连线与y轴的夹角：${Math.round(angleBetweenRotatePointD)}°`);

            //先设置测试锚点的位置
            testCircle.x = distance * Math.cos(initAngle + angleBetweenRotatePoint) + routatePointX;
            testCircle.y = distance * Math.sin(initAngle + angleBetweenRotatePoint) + routatePointY;

            //再将测试锚点的坐标赋予卡牌
            card.x = testCircle.x;
            card.y = testCircle.y;

            //设置卡牌的旋转角度
            card.setAngle(angleBetweenRotatePointD);

            //设置文本位置和内容
            showText.x = (distance + 150) * Math.cos(initAngle + angleBetweenRotatePoint) + routatePointX + textOffsetDirection * alphaD * 25;
            showText.y = (distance + 150) * Math.sin(initAngle + angleBetweenRotatePoint) + routatePointY;
            textCircle.x = showText.x;
            textCircle.y = showText.y;
            textRect.x = showText.x - textOffsetDirection * alphaD * 25;
            textRect.y = showText.y;

            //设置选项初始值为空
            var choice = "";

            //将透明度赋予文本背景
            textRect.setAlpha(0.1 * alphaD);
            //console.log(`文本框Alpha:${alphaD.toFixed(3)}`);

            //添加动画效果和设置选项内容
            if (angleBetweenRotatePoint >= 5 / 180 * Math.PI) {
                choice = "This is the right choice. You should choose this without a doubt.";
            }
            else if (angleBetweenRotatePoint <= -5 / 180 * Math.PI) {
                choice = "This is the left choice.";
            }
            //设置文本内容和透明度
            showText.setText(choice).setAlpha(alphaD);


            //设置字体参数，用于自动调整字体大小
            var showTextSize = 50;
            showText.setFontSize(showTextSize);

            //用while loop实现自动调整字体大小
            //showText已经设定过文本的最大宽度了,因此根据文本高度调整字体大小
            while (showText.height > textRect.height) {
                showTextSize--;
                showText.setFontSize(showTextSize);
            }
            //console.log(showText.style.fontSize);
        });
    }

    star(sx, sy) {

        var pointList = [];
        var points = 5;
        var innerAngle = Math.PI / points;
        var radius = 8;
        var innerRadius = radius / 2;

        for (var i = 0; i < points * 2; i++) {
            var radiusToUse = i % 2 === 0 ? radius : innerRadius;
            var x = radiusToUse * Math.cos(innerAngle * i);
            var y = radiusToUse * Math.sin(innerAngle * i);
            pointList.push(x);
            pointList.push(y);
        }

        var star = this.add.polygon(sx, sy, pointList, 0xffff00);
        star.setOrigin(0.5);

        console.log(star);

        // 添加旋转动画
        this.tweens.add({
            targets: star,
            angle: 360,
            duration: 2000,
            repeat: -1
        });

        return star;
    }
}


class baseTest1 extends baseTest {

    constructor() {
        super("baseTest1", "baseTest1")
    }
}

class baseTest2 extends baseTest {

    constructor() {
        super("baseTest2", "baseTest2")
    }
}