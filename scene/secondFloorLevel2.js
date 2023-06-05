class secondFloorLevel2 extends Base {
    constructor() {
        super("floor two level 2", "battle with the giant")

    }

    onEnter() {

        this.scene1 = this.scene.get('floor one level 4');
        console.log(this.scene1);

        currentPosition = "floor two level 2";

        //加载敌人血量
        this.enemy_hp = 6;
        this.enemy_max_hp = 6;
        this.showHp();
        this.renewHp();

        this.giantRage = false;

        this.currentAction;

        if (typeof this.showEvent == "undefined") {
            this.showEvent = false;
        }

        this.card.setTexture("elf");

        this.left_choice_text = dataPath.left1
        this.right_choice_text = dataPath.right1

        this.changeText(this.eventText, dataPath.eventText1);

        this.dragrotate(this.card);

        this.scene_turn = 1;




    }

    //递归函数，用于实现while loop
    judgeChoice() {
        /* console.log(`当前玩家选项为：${this.player_choice}`);
        console.log(`当前场景回合数：${this.scene_turn}`); */


        if (this.player_choice != "") {
            if (this.giantRage == false && this.scene_turn == 1) {
                this.action1();
            }
            else if (this.enemy_hp <= 0) {
                this.rotateOutAndMakeNewCard("elf");
                this.time.delayedCall(1000, () => {
                    this.battleMusicN.stop();
                    this.gotoScene("floor two level 3");
                })
            }
            else if (this.giantRage && this.scene_turn % 3 == 2) {
                this.action5();
            }
            else if (this.giantRage && this.scene_turn % 3 == 0) {
                this.action6();
            }
            else if (this.giantRage && this.scene_turn % 3 == 1) {
                this.action7();
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
    //初始行为，如果选择帮助为为移动，选择无视进入下一层
    action1() {
        if (this.player_choice == "left") {
            game.sound.stopAll();
            
            this.time.delayedCall(1000, () => {
                this.battleMusicN.play();
            })


            this.rotateOutAndMakeNewCard("giant");
            saveData.elf = true;


            this.changeText(this.eventText, dataPath.battleText1);

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else {
            this.card.label = false;
            this.rotateOutAndMakeNewCard("gate");
            this.time.delayedCall(1000, () => {
                this.gotoScene("floor three level 1");
            })
        }

    }
    //前一行为为攻击，本行为为移动
    action2() {
        if (this.player_choice == "left") {
            this.enemy_hp--;
            saveData.player.hp -= 2;
            this.renewHp();

            if (this.enemy_hp < 1) { this.actionWin(); return; }
            if (this.enemy_hp == 3) { this.giantRage = true; this.scene_turn = 1; this.action4(); return; }

            this.changeText(this.eventText, dataPath.battleText2);
            this.shakeTween(this.cameras.main);
        }
        else {
            this.changeText(this.eventText, dataPath.battleText3);
        }

        this.currentAction = "action2";

        console.log(this.currentAction);

        if (saveData.player.hp <= 0) { this.actionLose(); return; }


        this.rotateOutAndMakeNewCard("giant");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }
    //前一行为移动，本行为为攻击
    action3() {
        if (this.player_choice == "left") {
            this.enemy_hp--;
            this.renewHp();

            if (this.enemy_hp < 1) { this.actionWin(); return; }
            if (this.enemy_hp == 3) { this.giantRage = true; this.scene_turn = 1; this.action4(); return; }

            this.changeText(this.eventText, dataPath.battleText4);
        }
        else {
            this.changeText(this.eventText, dataPath.battleText5);
        }

        this.currentAction = "action3";
        console.log(this.currentAction);




        if (saveData.player.hp <= 0) { this.actionLose(); return; }


        this.rotateOutAndMakeNewCard("giant");



        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }
    //初始暴怒行为，根据前一场景决定文本，本行为为攻击
    action4() {

        this.card.label = false;

        if (this.currentAction == "action3") {
            if (this.player_choice == "left") {
                this.changeText(this.eventText, dataPath.battleText6);
                this.shakeTween(this.cameras.main);
            }
            else {
                this.changeText(this.eventText, dataPath.battleText7);
            }
        }
        else {
            if (this.player_choice == "left") {
                this.changeText(this.eventText, dataPath.battleText8);
            }
            else {
                this.changeText(this.eventText, dataPath.battleText9);
            }
        }

        console.log(this.showEvent);

        if (this.showEvent == false) {
            this.time.delayedCall(500, () => {
                this.eventCard(dataPath["eventCard1"]);
            });

            this.time.delayedCall(3500, () => {
                this.card.label = true;
                this.eventCard(dataPath["eventCard2"]);
            });

            this.showEvent = true;
        }
        else {
            this.time.delayedCall(500, () => {
                this.card.label = true;
                this.eventCard(dataPath["eventCard3"]);
            });
        }
        console.log(this.showEvent);




        if (saveData.player.hp <= 0) { this.actionLose();; return; }
        if (this.enemy_hp < 1) { this.actionWin(); return; }

        this.rotateOutAndMakeNewCard("giant");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }
    //前一行为为攻击，本行为为移动
    action5() {
        if (this.player_choice == "left") {
            this.enemy_hp--;
            saveData.player.hp -= 2;
            this.renewHp();
            this.changeText(this.eventText, dataPath.battleText6);
            this.shakeTween(this.cameras.main);
        }
        else {
            this.changeText(this.eventText, dataPath.battleText7);
        }

        this.currentAction = "action5";
        console.log(this.currentAction);


        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.enemy_hp < 1) { this.actionWin(); return; }

        this.rotateOutAndMakeNewCard("giant");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }
    //前一行为为移动，本行为为攻击
    action6() {
        if (this.player_choice == "left") {
            this.enemy_hp--;
            this.renewHp();
            this.changeText(this.eventText, dataPath.battleText8);
        }
        else {
            this.changeText(this.eventText, dataPath.battleText9);
        }

        this.currentAction = "action6";
        console.log(this.currentAction);


        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.enemy_hp < 1) { this.actionWin(); return; }

        this.rotateOutAndMakeNewCard("giant");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }
    //前一行为为攻击，本行为为攻击
    action7() {
        if (this.player_choice == "left") {
            this.enemy_hp--;
            saveData.player.hp -= 2;
            this.renewHp();
            this.changeText(this.eventText, dataPath.battleText6);
            this.shakeTween(this.cameras.main);
        }
        else {
            this.changeText(this.eventText, dataPath.battleText7);
        }

        this.currentAction = "action7";
        console.log(this.currentAction);


        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.enemy_hp < 1) { this.actionWin(); return; }

        this.rotateOutAndMakeNewCard("giant");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    actionWin() {
        this.rotateOutAndMakeNewCard("giant");
        this.changeText(this.eventText, dataPath.eventText2);

        this.left_choice_text = dataPath.left3;
        this.right_choice_text = dataPath.right3;
    }

    actionLose() {
        this.rotateOutAndMakeNewCard("giant");
        this.changeText(this.eventText, dataPath.battleText10);

        if (saveData.player.hp < 0) {
            saveData.player.hp = 0;

        }
        this.renewHp();

        this.card.label = false;

        this.time.delayedCall(3000, () => {
            this.battleMusicN.stop();
            this.gotoScene("floor four level 1");
        })
    }
}