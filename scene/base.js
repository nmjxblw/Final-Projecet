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
    }

    exCreate() {

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(transitionDuration, 0, 0, 0);

        this.background1 = this.add.rectangle(this.w * 0.5 , this.h * 0.5, 650, 900, 0xF0E68C);
        this.background1.setDepth(1);

        //假定卡牌大小为400*600
        this.rectW = 400;
        this.rectH = 600;
 
        //卡牌中心位置在屏幕正中间
        this.cardRectX = this.cx;
        this.cardRectY = this.h * 0.59;
 
        //设置旋转锚点初始位置，位于屏幕正中间往下0.75倍卡牌长度
        this.routatePointX = this.cardRectX;
        this.routatePointY = this.cardRectY + this.rectH * 0.75;
 
        //用distance表示卡牌中心到旋转锚点的距离
        this.distance = Phaser.Math.Distance.Between(this.routatePointX, this.routatePointY, this.cardRectX, this.cardRectY);
        //以及卡牌中心和旋转锚点连线与x轴的夹角
        this.initAngle = Phaser.Math.Angle.Between(this.routatePointX, this.routatePointY, this.cardRectX, this.cardRectY);
 
        //console.log(distance);
 
        //显示旋转锚点
        this.routatePoint = this.add.circle(
            this.routatePointX,
            this.routatePointY,
             10,
             0xffffff)
             .setAlpha(1);
 
        //测试锚点，用于标记图像的位置
        this.testCircle = this.add.circle(
            this.distance * Math.cos(this.initAngle) + this.routatePointX,
            this.distance * Math.sin(this.initAngle) + this.routatePointY,
            20,
            0x00ff00)
            .setAlpha(0.5);
 
        //设置文本框，在用户互动后再设置其他参数
        this.showText = this.add.text(0, 0, "")
            .setColor("#000")
            .setAlpha(0)
            .setOrigin(0.5)
            .setDepth(4)
            .setFontSize(50)
            .setFontFamily("Century Gothic")
            .setWordWrapWidth(300);
             
 
        //设置文本框锚点,用于标记文本框位置
        this.textCircle = this.add.circle(
            this.showText.x,
            this.showText.y,
            10,
            0xff00ff)
            .setAlpha(0.5);
 
        //设置文本背景位置、大小以及深度（位于文本下方）
        this.textRect = this.add.rectangle(this.showText.x, this.showText.y, 600, 200)
            .setFillStyle(0xffffff)
            .setOrigin(0.5)
            .setAlpha(0)
            .setDepth(3);

        this.textRect2 = this.add.rectangle(this.w * 0.5, this.h * 0.2, 650, 240)
            .setFillStyle(0xffffff)
            .setOrigin(0.5)
            .setAlpha(0.4)
            .setDepth(3);
 
        // 设置图片的位置、大小以及深度（位于文本背景的下方)
        // let text1 = "This is the right choice. You should choose this without a doubt."
        // let text2 = "This is the left choice."
        // let card = this.creatcard("card1");


        // this.dragrotate(card,text1,text2);

        this.onEnter();

    }

    onEnter() {
        //console.warn(`${this.sceneKey}没有设置onEnter()`);
    }

    eventload(){

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
    creatcard(name) {
        let card = this.add.sprite(this.cardRectX, this.cardRectY, name)
        .setOrigin(0.5)
        .setDepth(1)

        //card.live = true;
        card.label = true;

        return card;
    }

    //调用此函数快速创建一个最上方的text文本框
    createtext(text)
    {
        let textsize = 25;

        let temp = this.add.text(this.textRect2.x, this.textRect2.y, text)
        .setColor("#000")
        .setAlpha(0)
        .setOrigin(0.5)
        .setDepth(4)
        .setFontSize(textsize)
        .setFontFamily("Century Gothic")
        .setWordWrapWidth(500);       

        while (temp.height > this.textRect2.height) {
            textsize--;
            temp.setFontSize(textsize);
        }

        this.tweens.add({
            targets: temp,
            alpha:{from: 0, to: 1},
            delay:500,
            duration: 500,
            ease: 'Linear',
        })

        return temp;
    }

    //调用此函数使得参数中的卡片可以旋转，text1,2分别为左右旋转时显示的文本，choose1,2分别为左右松开时选择的选项
    dragrotate(card,text1,text2,choose1,choose2) {
            function dragRotateObject(pointer) {
                if (pointer.x > this.cardRectX + 20) {
                    this.routatePointX = this.cardRectX + 20;
                }
                else if (pointer.x < this.cardRectX - 20) {
                    this.routatePointX = this.cardRectX - 20;
                }
                else {
                    this.routatePointX = pointer.x;
                }
    
                this.routatePoint.x = this.routatePointX;
    
                if (pointer.y > this.cardRectY + 10) {
                    this.routatePointY = this.cardRectY + this.rectH * 0.75 + 10;
                }
                else if (pointer.y < this.cardRectY - 10) {
                    this.routatePointY = this.cardRectY + this.rectH * 0.75 - 10;
                }
                else {
                    this.routatePointY = pointer.y + this.rectH * 0.75;
                }
    
                this.routatePoint.y = this.routatePointY;
    
                //angleBetweenRotatePoint用于记录鼠标和锚点之间的角度，正数表示鼠标在旋转锚点右侧，负数表示在旋转锚点左侧
                var angleBetweenRotatePoint = Phaser.Math.Angle.Between(this.routatePointX, this.routatePointY, pointer.x, pointer.y) + Math.PI / 2;
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
                this.testCircle.x = this.distance * Math.cos(this.initAngle + angleBetweenRotatePoint) + this.routatePointX;
                this.testCircle.y = this.distance * Math.sin(this.initAngle + angleBetweenRotatePoint) + this.routatePointY;
    
                //再将测试锚点的坐标赋予卡牌
                card.x = this.testCircle.x;
                card.y = this.testCircle.y;
    
                //设置卡牌的旋转角度
                card.setAngle(angleBetweenRotatePointD);
    
                //设置文本位置和内容
                this.showText.x = (this.distance + 150) * Math.cos(this.initAngle + angleBetweenRotatePoint) + this.routatePointX + textOffsetDirection * alphaD * 25;
                this.showText.y = (this.distance + 150) * Math.sin(this.initAngle + angleBetweenRotatePoint) + this.routatePointY;
                this.textCircle.x = this.showText.x;
                this.textCircle.y = this.showText.y;
                this.textRect.x = this.showText.x - textOffsetDirection * alphaD * 25;
                this.textRect.y = this.showText.y;
    
                //设置选项初始值为空
                var choice = "";
    
                //将透明度赋予文本背景
                this.textRect.setAlpha(0.1 * alphaD);
                //console.log(`文本框Alpha:${alphaD.toFixed(3)}`);
    
                //添加动画效果和设置选项内容
                if (angleBetweenRotatePoint >= 5 / 180 * Math.PI) {
                    choice = text2;
                }
                else if (angleBetweenRotatePoint <= -5 / 180 * Math.PI) {
                    choice = text1;
                }
                //设置文本内容和透明度
                this.showText.setText(choice).setAlpha(alphaD);
    
    
                //设置字体参数，用于自动调整字体大小
                var showTextSize = 50;
                this.showText.setFontSize(showTextSize);
    
                //用while loop实现自动调整字体大小
                //showText已经设定过文本的最大宽度了,因此根据文本高度调整字体大小
                while (this.showText.height > this.textRect.height) {
                    showTextSize--;
                    this.showText.setFontSize(showTextSize);
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
                let angleBetweenRotatePoint = Phaser.Math.Angle.Between(this.routatePointX, this.routatePointY, pointer.x, pointer.y) + Math.PI / 2;

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
                card.x = this.cardRectX;
                card.y = this.cardRectY;
                this.routatePointX = this.cardRectX;
                this.routatePointY = this.cardRectY + this.rectH * 0.75;
                this.routatePoint.x = this.routatePointX;
                this.routatePoint.y = this.routatePointY;
                this.showText.setAlpha(0);
                this.textRect.setAlpha(0);

            });
        


    }

    //调用此函数快速将替换文本框文本
    changeText(text,new_text)
    {
        this.tweens.add({
            targets: text,
            alpha:{from: 1, to: 0},
            duration:300,
            ease: 'Linear',
            repeat:false,
            yoyo:true,
            oncomplete:()=>{
                this.time.delayedCall(300,()=>{
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