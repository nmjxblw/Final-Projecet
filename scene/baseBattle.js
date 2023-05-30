class baseBattle extends Base {
    constructor() {
        super("floor one level 1", "floor one level 1")
    }

    onEnter() {

        this.monsterHP = 3;


        this.left_choice_text = "开始战斗"
        this.right_choice_text = "开始战斗"
        this.card = this.createCard("card1");

        this.eventCard("拖动卡牌以游玩");
        this.event_text = this.createEventText("骷髅兵向你袭来");

        this.dragrotate(this.card);

        this.scene_turn = 1;


    }

     //根据玩家的选择跳转到相应的action
    judgeChoice() {
        /* console.log(`当前玩家选项为：${this.player_choice}`);
        console.log(`当前场景回合数：${this.scene_turn}`); */
        if (this.player_choice != "") {
            if (this.scene_turn == 1) {
                this.action1();
            }
            else if (this.monsterHP <= 0) {
                this.gotoScene("next");
            }
            else if (this.scene_turn % 2 == 0) {
                this.action2();
            }
            else if (this.scene_turn % 2 == 1) {
                this.action3();
            }
            this.scene_turn++;
        }
    }

    action1() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, `骷髅兵准备移动: ` + this.monsterHP + saveData.player.hp);


        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action2() {
        if (this.player_choice == "left") {
            this.monsterHP--;
            this.changeText(this.event_text, `你对骷髅兵造成了1点伤害,
骷髅兵准备攻击: ` + this.monsterHP + saveData.player.hp);
        }
        else {
            this.changeText(this.event_text, `你躲了个寂寞，
骷髅兵准备攻击: ` + this.monsterHP + saveData.player.hp);
        }

        if (this.monsterHP <= 0) { this.action4(); return; }
        this.rotateOutAndMakeNewCard(this.card, "card1");



        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action3() {
        if (this.player_choice == "left") {
            this.monsterHP--;
            saveData.player.hp--;
            this.changeText(this.event_text, `你受到了1点伤害,
你对骷髅兵造成了1点伤害
骷髅兵准备移动: ` + this.monsterHP + saveData.player.hp);
        }
        else {
            this.changeText(this.event_text, `你躲开了骷髅兵的攻击
骷髅兵准备移动: ` + this.monsterHP + saveData.player.hp);
        }
        if (this.monsterHP <= 0) { this.action4(); return; }
        if (PlayerHP <= 0) { action5(); return; }
        this.rotateOutAndMakeNewCard(this.card, "card1");

        this.left_choice_text = "攻击";
        this.right_choice_text = "躲避";
    }

    action4() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "恭喜你！你打败了骷髅兵！");

        this.left_choice_text = "离开";
        this.right_choice_text = "离开";
    }

    action5() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.event_text, "你挂了……");

        this.left_choice_text = "离开";
        this.right_choice_text = "离开";
    }
}




