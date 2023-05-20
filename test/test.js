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
        this.add.circle(routatePointX, routatePointY, 10, 0xffffff);

        //显示初始卡牌的中心
        this.add.circle(cardRectX, cardRectY, 10, 0xffff00);

        var card = this.add.image(this.cx, this.cy, 'card').setOrigin(0.5); // 设置图片的位置和大小

        let testCicle = this.add.circle(distance * Math.cos(initAngle) + routatePointX, distance * Math.sin(initAngle) + routatePointY, 20, 0x00ff00);

        this.input.on("pointermove", (pointer) => {
            var angleBetweenRotatePoint = Phaser.Math.Angle.Between(routatePointX, routatePointY, pointer.x, pointer.y) + Math.PI / 2;
            if (angleBetweenRotatePoint > Math.PI / 6) {
                angleBetweenRotatePoint = Math.PI / 6
            }
            else if (angleBetweenRotatePoint < - Math.PI / 6) {
                angleBetweenRotatePoint = - Math.PI / 6;
            }

            var angleBetweenRotatePointD = Phaser.Math.Wrap(Phaser.Math.RadToDeg(angleBetweenRotatePoint), 0, 360);
            console.log(angleBetweenRotatePoint);
            testCicle.x = distance * Math.cos(initAngle + angleBetweenRotatePoint) + routatePointX;
            testCicle.y = distance * Math.sin(initAngle + angleBetweenRotatePoint) + routatePointY;

            card.x = testCicle.x;
            card.y = testCicle.y;

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