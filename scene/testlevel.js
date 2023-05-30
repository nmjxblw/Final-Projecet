class testlevel extends Base {

    constructor() {
        super("testlevel");
    }

    eventload() {
        this.events.on('1-right', this.action1, this);
        this.events.on('1-left', this.action2, this);

        this.events.on('2-right', this.action3, this);
        this.events.on('2-left', this.action4, this);

        this.events.on('3-right', this.action5, this);
        this.events.on('3-left', this.action6, this);

    }


    onEnter() {

       

        this.left_choice_text = "点击左边的按钮"
        this.right_choice_text = "点击右边的按钮"
        this.card = this.createCard("card1"); 
        this.eventCard("Dangerous! bad!! escape!");

        this.event_text = this.createEventText("开关1,你选择了: ");

        this.dragrotate(this.card);

        this.scene_turn = 1;

    }

    //根据玩家的选择跳转到相应的action
    judgeChoice() {
        console.log(`当前场景回合数：${this.scene_turn}`);
        if (this.scene_turn === 1) {
            if (this.player_choice === "right") {
                this.scene_turn++;
                this.events.emit('1-right');
            }
            else if (this.player_choice === "left") {
                this.scene_turn++;
                this.events.emit('1-left');
            }
        }
        else if (this.scene_turn === 2) {
            if (this.player_choice === "right") {
                this.scene_turn++;
                this.events.emit('2-right');
            }
            else if (this.player_choice === "left") {
                this.scene_turn++;
                this.events.emit('2-left');
            }
        }
        else if (this.scene_turn === 3) {
            if (this.player_choice === "right") {
                this.events.emit('3-right');
            }
            else if (this.player_choice === "left") {
                this.events.emit('3-left');
            }
        }
    }

    action1() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, "你死了");
        this.card.label = false;

        this.left_choice_text = "寄";
        this.right_choice_text = "寄";
    }

    action2() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, `锁打开了
还剩一把锁，你选择：`);

        this.left_choice_text = "点击左边的按钮";
        this.right_choice_text = "点击右边的按钮";
    }

    action3() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, "你死了");
        this.card.label = false;

        this.left_choice_text = "寄";
        this.right_choice_text = "寄";
    }

    action4() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, `随着两把锁都打开，宝箱解锁了
你从宝箱里获得了神秘的盾牌`);
        this.left_choice_text = "拿走盾牌";
        this.right_choice_text = "拿走盾牌";
    }

    //简单的战斗while loop实例
    action5() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, `这是action5`);
        this.left_choice_text = "action5左选项";
        this.right_choice_text = "action5右选项";
    }

    action6() {
        this.rotateOutAndMakeNewCard(this.card, "card2");
        this.changeText(this.event_text, `这是action6`);
        this.left_choice_text = "action6左选项";
        this.right_choice_text = "action6右选项";
    }
}