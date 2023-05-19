class Base extends GameScene {

    constructor() {
        super("Base", "Base");
    }

    exPreload()
    {
        this.load.image("card", "card.png");
        this.load.image("testPoint", "testpoint.png");
    }

    exCreate() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        //两种背景图片，暂时为占位资源
        this.background1 = this.add.rectangle(this.w * 0.5 , this.h * 0.5, 600, 800, 0xF0E68C);
        this.background2 = this.add.rectangle(this.w * 0.5 , this.h * 0.6, 490, 490, 0x00FF00);
        //两个触发点
        this.testpoint1 = this.matter.add.sprite(this.w * 0.335, this.h * 0.6,'testPoint');
        this.testpoint2 = this.matter.add.sprite(this.w * 0.665, this.h * 0.6,'testPoint');

        //添加标签
        this.testpoint1.body.label = 'testpoint1';
        this.testpoint2.body.label = 'testpoint2';

        //添加设置不透明
        this.testpoint1.alpha = 0;
        this.testpoint2.alpha = 0;

        //设置两个触发点的属性为传感器
        this.testpoint1.body.isSensor = true;
        this.testpoint2.body.isSensor = true;
        
        //创建卡片
        let card1 = this.creatcard('card','card');

        //调用旋转函数
        this.dragrotate(card1);

        //调用覆盖检测
        this.CollisionDetection(card1);



        this.onEnter();

    }

    onEnter() {
        
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key);
        });
    }


    showtitle(Levelname)
    {
        this.title = this.add.text(this.w / 2, 30, Levelname,
        {
            font: "28px Arial",
            color: "#ffffff",    
        });
        this.title.setOrigin(0.5);
        this.title.setDepth(2);
    }

    creatcard(name,label)
    {
        let card = this.matter.add.sprite(this.w * 0.5, this.h * 0.83, name);

        card.setBody({
            type: 'rectangle',
            width: 500,
            height: 800,
          });

        this.matter.body.setStatic(card.body, true);
        card.body.label = label;

        card.setOrigin(0.5, 1.0);
       

        return card;
    }

    dragrotate(card)
    {
        function dragRotateObject(pointer)
    {
        //设置角度和偏移量
        let angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, card.x, card.y) * Phaser.Math.RAD_TO_DEG;
        angle += Phaser.Math.RadToDeg(30);

        //旋转
        card.rotation = Phaser.Math.DegToRad(angle);

        
        
        //添加一些轻微的移动效果
        if(pointer.x > this.w * 0.5)
        {
            if(card.x < this.w * 0.5 + 30)
            {
                card.x += 2;
  
            }
            
        }
        else if(pointer.x < this.w * 0.5 )
        {
            if(card.x > this.w * 0.5 - 30)
            {
                card.x -= 2;
  
            }
        }
    }
        //鼠标点下时，如果点击卡片则旋转
        this.input.on('pointerdown', (pointer) =>
        {
            if (pointer.leftButtonDown()) {
                // 判断点击的是卡片
                if (card.getBounds().contains(pointer.x, pointer.y)) {
                    // 启用拖动旋转操作
                    this.input.on('pointermove', dragRotateObject, this);
                }
            }
        });

        //鼠标抬起时结束旋转回到原位
        this.input.on('pointerup', (pointer) =>
        {
            // 停止拖动旋转操作
            this.input.off('pointermove', dragRotateObject, this);
            //回到原位置
            card.setAngle(0);
            card.x = this.w * 0.5;
        });
    
    }

    CollisionDetection(card)
    {
        this.matter.world.on('collisionstart', (event,o1,o2) =>
        {

            if([o1.label, o2.label].indexOf('card') != -1 && [o1.label, o2.label].indexOf('testpoint1') != -1)
            {
                console.log(1);
            }

        });

        this.matter.world.on('collisionstart', (event,o1,o2) =>
        {

            if([o1.label, o2.label].indexOf('card') != -1 && [o1.label, o2.label].indexOf('testpoint2') != -1)
            {
                console.log(2);
            }

        });

    }


    timer(time)
    {

    }

    finish(target_num)
    {
        if(target_num < 1)
        {
            this.gotoScene('Level'+ level + 'settlement')
        }
    }


    update()
    {
        
    }

}