class thirdFloorLevel1 extends Base {
    constructor() {
        //当前场景为第三层大门前
        super("floor three level 1", "at the door")
    }

    exPreload() {
        this.load.image("door", "card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");
    }

    onEnter() {

        console.log(this.scene_turn);

        this.left_choice_text = dataPath["left"];
        this.right_choice_text = dataPath["right"];

        this.createEventText(dataPath["eventText"]);

        this.card = this.createCard("door");

        this.time.delayedCall(500, () => {
            this.eventCard(dataPath["eventCard1"]);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath["eventCard2"]);
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.gotoScene("floor three level 2")
    }
}

class thirdFloorLevel2 extends Base {
    constructor() {
        //当前场景为第三层大门前
        super("floor three level 2", "the dragon")
    }

    exPreload() {
        this.load.image("dragon", "card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");
    }

    onEnter() {

        initializeLocal();

        //先初始化第一轮的左右选项
        this.left_choice_text = dataPath["left1"];
        //根据玩家是否有盾牌来切换防御词条
        this.def_type = saveData.player.shield ? "shield" : "no_shield";
        this.right_choice_text = dataPath["right1"][this.def_type];
        //加载敌人血量
        this.enemy_hp = dataPath.enemy.hp;
        //加载敌人狂暴状态
        this.enemy_berserk = dataPath.enemy.berserk;
        //创建卡片
        this.card = this.createCard("dragon");

        //播放事件卡片
        this.time.delayedCall(500, () => {
            this.eventCard(dataPath["eventCard1"]);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath["eventCard2"]);
        });

        this.time.delayedCall(6500, () => {
            this.eventCard(dataPath["eventCard3"]);
            this.changeText(this.eventText, dataPath["eventText1"]);
        })

        //设置拖动效果
        this.dragrotate(this.card);
    }

    judgeChoice() {
        console.log(`当前回合数：${this.scene_turn}`);
        if (this.enemy_hp <= 0) {
            this.gotoScene("floor three level 1");
        }
        else if (saveData.player.hp <= 0) {
            this.gotoScene("floor three level 1");
        }
        //根据回合数判断行动
        else if (this.scene_turn % 3 == 1) {
            this.action1();
        }
        else if (this.scene_turn % 3 == 2) {
            this.action2();
        }
        else {
            this.action3();
        }
        console.log(`当前玩家血量:${saveData.player.hp}`);
        this.scene_turn++;
    }

    action1() {
        this.rotateOutAndMakeNewCard(this.card, "dragon");
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为攻击/吐火
        if (this.player_choice == "left") {
            //龙掉血
            this.enemy_hp--;
            //判断玩家掉血情况
            if (this.enemy_berserk) {
                //狂暴情况下，龙的攻击为吐火，且伤害为3
                saveData.player.hp -= 3;
                this.changeText(this.eventText, "You took 3 damges!\nAnd you dealt 1 damge!");
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText7);
                });
            }
            else {
                //非狂暴情况下为攻击，伤害为2
                saveData.player.hp -= 2;
                this.changeText(this.eventText, "You took 2 damges!\nAnd you dealt 1 damge!");
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText2);
                });
            }
            //玩家血量小于等于0，挑战失败
            if (saveData.player.hp <= 0) {
                this.lost();
                return;
            }
            //敌人血量小于等于0，挑战成功
            if (this.enemy_hp <= 0) {
                this.win();
                return;
            }
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.elf_scene();
            }
        }
        //玩家上个选择是防御，龙的上个行为为攻击/吐火
        else {
            //先判断龙是否是狂暴状态
            if (this.enemy_berserk) {
                //狂暴状态，攻击方式为吐火
                //判断玩家是否有盾
                if (!saveData.player.shield && Phaser.Math.Between(1, 100) <= 50) {
                    //无盾且躲避失败
                    saveData.player.hp -= 3;
                    this.changeText(this.eventText, "You didn't dodge the fireball!\nYou took 3 damges.");
                }
                else if (saveData.player.shield) {
                    this.changeText(this.eventText, "You successfully parry the fireball.");
                }
                else {
                    this.changeText(this.eventText, "You dodged the fireball!");
                }
                //玩家血量小于0，挑战失败
                if (saveData.player.hp <= 0) {
                    this.lost();
                    return;
                }
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText7 + "\nWhat are you going to do next?");
                });
            }
            else {
                //非狂暴状态，躲避/格挡了攻击
                if (saveData.player.shield) {
                    this.changeText(this.eventText, "You successfully parry the attack.");
                }
                else {
                    this.changeText(this.eventText, "You dodged the attack.");
                }
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText2);
                });
            }
        }
    }

    action2() {
        this.rotateOutAndMakeNewCard(this.card, "dragon");
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为移动
        if (this.player_choice == "left") {
            this.enemy_hp--;
            this.changeText(this.eventText, "You dealt 1 damge!");
            if (this.enemy_berserk) {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText8 + "\nWhat are you going to do next?");
                });
            }
            else {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText3);
                });
            }
            //敌人血量小于等于0，挑战成功
            if (this.enemy_hp <= 0) {
                this.win();
                return;
            }
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.elf_scene();
            }

        }
        //玩家上个选择是躲避
        else {
            this.changeText(this.eventText, "Nothing happened.");

        }
        if (this.enemy_berserk) {
            this.time.delayedCall(2000, () => {
                this.changeText(this.eventText, dataPath.eventText8 + "\nWhat are you going to do next?");
            });
        }
        else{
            this.time.delayedCall(2000, () => {
                this.changeText(this.eventText, dataPath.eventText3);
            });
        }
    }

    action3() {
        this.rotateOutAndMakeNewCard(this.card, "dragon");
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为吐火
        if (this.player_choice == "left") {
            //龙掉血
            this.enemy_hp--;
            //判断玩家掉血情况
            //龙的攻击为吐火，且伤害为3
            saveData.player.hp -= 3;
            this.changeText(this.eventText, "You took 3 damges!\nAnd you dealt 1 damge!");
            if (this.enemy_berserk) {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText7 + "\nWhat are you going to do next?");
                });
            }
            else {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText1);
                });
            }
            //玩家血量小于等于0，挑战失败
            if (saveData.player.hp <= 0) {
                this.lost();
                return;
            }
            //敌人血量小于等于0，挑战成功
            if (this.enemy_hp <= 0) {
                this.win();
                return;
            }
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.elf_scene();
            }
        }
        //玩家上个选择是攻击，龙的上个行为为吐火
        else {
            //攻击方式为吐火
            //判断玩家是否有盾
            if (!saveData.player.shield && Phaser.Math.Between(1, 100) <= 50) {
                //无盾且躲避失败
                saveData.player.hp -= 3;
                this.changeText(this.eventText, "You didn't dodge the fireball!\nYou took 3 damges!");
            }
            else if (saveData.player.shield) {
                this.changeText(this.eventText, "You successfully parry the fireball.");
            }
            else {
                this.changeText(this.eventText, "You dodged the fireball!");
            }
            //玩家血量小于0，挑战失败
            if (saveData.player.hp <= 0) {
                this.lost();
                return;
            }
            //提示文本
            if (this.enemy_berserk) {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText7 + "\nWhat are you going to do next?");
                });
            }
            else {
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText1);
                });
            }
        }
    }

    elf_scene() {
        saveData.elf = false;
    }

    win() {
        this.changeText(this.eventText, "You win.");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("win");
    }

    lost() {
        this.changeText(this.eventText, "You lost.");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("lost");
    }
}