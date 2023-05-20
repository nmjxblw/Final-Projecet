//用于测试的代码
function getGameDataExample() {
    return gameData.floor.one.enemy1.hp;
}

class baseTest extends GameScene {
    exPreload() {
        this.load.image("card", "card.png");
    }

    exCreate() {

        var rectW = 400;
        var rectH = 600;
        var cardRectX = this.cx;
        var cardRectY = this.cy;
        var routatePointX = this.cx;
        var routatePointY = this.cy + rectH * 0.75;
        var distance = Phaser.Math.Distance.Between(routatePointX, routatePointY, cardRectX, cardRectY);
        var initAngle = Phaser.Math.Angle.Between(routatePointX, routatePointY, cardRectX, cardRectY);

        console.log(distance);

        //显示旋转锚点
        let routatePoint = this.add.circle(routatePointX, routatePointY, 10, 0xffffff).setAlpha(0.5);

        // 设置图片的位置和大小
        var card = this.add.image(this.cx, this.cy, 'card').setOrigin(0.5);

        //测试锚点，用于标记图像的位置
        let testCicle = this.add.circle(distance * Math.cos(initAngle) + routatePointX, distance * Math.sin(initAngle) + routatePointY, 20, 0x00ff00).setAlpha(0);

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
                angleBetweenRotatePoint = Math.PI / 6
            }
            else if (angleBetweenRotatePoint < - Math.PI / 6) {
                angleBetweenRotatePoint = - Math.PI / 6;
            }

            //将角度转化为度数制用于debug
            var angleBetweenRotatePointD = Phaser.Math.Wrap(Phaser.Math.RadToDeg(angleBetweenRotatePoint), 0, 360);
            console.log(angleBetweenRotatePointD);

            //先设置测试锚点的位置
            testCicle.x = distance * Math.cos(initAngle + angleBetweenRotatePoint) + routatePointX;
            testCicle.y = distance * Math.sin(initAngle + angleBetweenRotatePoint) + routatePointY;

            //再将测试锚点的坐标赋予卡牌
            card.x = testCicle.x;
            card.y = testCicle.y;

            //设置卡牌的旋转角度
            card.setAngle(angleBetweenRotatePointD);
        });
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