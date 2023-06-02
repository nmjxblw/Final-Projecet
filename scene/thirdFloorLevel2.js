class thirdFloorLevel2 extends Base {
    constructor() {
        //当前场景为第三层龙
        super("floor three level 2", "the dragon")
        currentPosition = this.sceneKey;
    }

    onEnter() {

        //先初始化第一轮的左右选项
        this.left_choice_text = dataPath.left1;
        //根据玩家是否有盾牌来切换防御词条
        this.def_type = saveData.player.shield ? "shield" : "no_shield";
        this.right_choice_text = dataPath.right1[this.def_type];
        //加载敌人血量
        this.enemy_hp = dataPath.enemy.hp;
        //加载敌人狂暴状态
        this.enemy_berserk = dataPath.enemy.berserk;
        //设置卡片的图案
        this.card.setTexture("dragon_normal");
        //设置卡片不可转动
        this.card.label = false;

        //播放事件卡片
        this.time.delayedCall(500, () => {
            this.changeText(this.eventText, dataPath.eventCard1);
        });

        this.time.delayedCall(3500, () => {
            this.changeText(this.eventText, dataPath.eventCard2);
        });

        this.time.delayedCall(6500, () => {
            this.changeText(this.eventText, dataPath.eventCard3);
            this.time.delayedCall(3000, () => {
                this.changeText(this.eventText, dataPath.eventText1);
                this.card.label = true;
            });
        });

        //设置拖动效果
        this.dragrotate(this.card);
    }

    judgeChoice() {
        if (this.from_elf_scene) {
            this.action4();
        }
        else if (this.enemy_hp <= 0) {
            this.rotateOutAndMakeNewCard("player");
            this.gotoScene("floor three level 3");
            return;
        }
        else if (saveData.player.hp <= 0) {
            saveData.player.hp == 0;
            this.rotateOutAndMakeNewCard("player");
            this.gotoScene("floor four level 1");
            return;
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
        this.scene_turn++;
    }

    action1() {
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为攻击/吐火
        if (this.player_choice == "left") {
            //龙掉血
            this.enemy_hp--;
            //判断玩家掉血情况
            if (this.enemy_berserk) {
                //狂暴情况下，龙的攻击为吐火，且伤害为3
                saveData.player.hp -= 3;
                this.shakeTween(this.cameras.main);
                this.changeText(this.eventText, "You took 3 damges!\nAnd you dealt 1 damge!");
                //玩家血量小于等于0，挑战失败
                if (saveData.player.hp <= 0) {
                    this.card.dargable = false;
                    this.time.delayedCall(1000, () => {
                        this.lost();
                    });
                    return;
                }
                //敌人血量小于等于0，挑战成功
                if (this.enemy_hp <= 0) {
                    this.card.dargable = false;
                    this.time.delayedCall(1000, () => {
                        this.win();
                    });
                    return;
                }
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText7);
                });
            }
            else {
                //非狂暴情况下为攻击，伤害为2
                saveData.player.hp -= 2;
                this.shakeTween(this.cameras.main);
                this.changeText(this.eventText, "You took 2 damges!\nAnd you dealt 1 damge!");
                //玩家血量小于等于0，挑战失败
                if (saveData.player.hp <= 0) {
                    this.card.dargable = false;
                    this.time.delayedCall(1000, () => {
                        this.lost();
                    });
                    return;
                }
                //敌人血量小于等于0，挑战成功
                if (this.enemy_hp <= 0) {
                    this.card.dargable = false;
                    this.time.delayedCall(1000, () => {
                        this.win();
                    });
                    return;
                }
                this.time.delayedCall(2000, () => {
                    this.changeText(this.eventText, dataPath.eventText2);
                });
            }
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.time.delayedCall(3000, () => { this.elf_scene(); });
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
                    this.shakeTween(this.cameras.main);
                    this.changeText(this.eventText, "You didn't dodge the fireball!\nYou took 3 damges.");
                    //玩家血量小于0，挑战失败
                    if (saveData.player.hp <= 0) {
                        this.card.dargable = false;
                        this.time.delayedCall(1000, () => {
                            this.lost();
                        });
                        return;
                    }
                }
                else if (saveData.player.shield) {
                    this.changeText(this.eventText, "You successfully parry the fireball.");
                }
                else {
                    this.changeText(this.eventText, "You dodged the fireball!");
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

        if (!this.enemy_berserk) {
            this.rotateOutAndMakeNewCard("dragon_normal");
        }
        else {
            this.rotateOutAndMakeNewCard("dragon_berserk");
        }
    }

    action2() {
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为移动
        if (this.player_choice == "left") {
            this.enemy_hp--;
            this.changeText(this.eventText, "You dealt 1 damge!");
            //敌人血量小于等于0，挑战成功
            if (this.enemy_hp <= 0) {
                this.card.dargable = false;
                this.time.delayedCall(1000, () => {
                    this.win();
                });
                return;
            }
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
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.time.delayedCall(3000, () => { this.elf_scene(); });
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
        else {
            this.time.delayedCall(2000, () => {
                this.changeText(this.eventText, dataPath.eventText3);
            });
        }

        if (!this.enemy_berserk) {
            this.rotateOutAndMakeNewCard("dragon_normal");
        }
        else {
            this.rotateOutAndMakeNewCard("dragon_berserk");
        }
    }

    action3() {
        //根据玩家的选择先判断龙是否掉血
        //玩家上个选择是攻击，龙的上个行为为吐火
        if (this.player_choice == "left") {
            //龙掉血
            this.enemy_hp--;
            //判断玩家掉血情况
            //龙的攻击为吐火，且伤害为3
            saveData.player.hp -= 3;
            this.shakeTween(this.cameras.main);
            this.changeText(this.eventText, "You took 3 damges!\nAnd you dealt 1 damge!");
            //玩家血量小于等于0，挑战失败
            if (saveData.player.hp <= 0) {
                this.card.dargable = false;
                this.time.delayedCall(1000, () => {
                    this.lost();
                });
                return;
            }
            //敌人血量小于等于0，挑战成功
            if (this.enemy_hp <= 0) {
                this.card.dargable = false;
                this.time.delayedCall(1000, () => {
                    this.win();
                });
                return;
            }
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
            //狂暴提示
            if (this.enemy_hp <= 5 && !this.enemy_berserk) {
                this.eventCard(dataPath.eventCard6);
                this.enemy_berserk = true;
            }
            //判断是否触发精灵事件
            if (saveData.elf && this.enemy_hp <= 5) {
                this.time.delayedCall(3000, () => { this.elf_scene(); });
            }
        }
        //玩家上个选择是防御，龙的上个行为为吐火
        else {
            //攻击方式为吐火
            //判断玩家是否有盾
            if (!saveData.player.shield && Phaser.Math.Between(1, 100) <= 50) {
                //无盾且躲避失败
                saveData.player.hp -= 3;
                this.shakeTween(this.cameras.main);
                this.changeText(this.eventText, "You didn't dodge the fireball!\nYou took 3 damges!");
                //玩家血量小于0，挑战失败
                if (saveData.player.hp <= 0) {
                    this.lost();
                    return;
                }
            }
            else if (saveData.player.shield) {
                this.changeText(this.eventText, "You successfully parry the fireball.");
            }
            else {
                this.changeText(this.eventText, "You dodged the fireball!");
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

        if (!this.enemy_berserk) {
            this.rotateOutAndMakeNewCard("dragon_normal");
        }
        else {
            this.rotateOutAndMakeNewCard("dragon_berserk");
        }
    }

    //加载精灵退场后画面
    action4() {
        this.from_elf_scene = false;
        this.rotateOutAndMakeNewCard("dragon_berserk");
        this.changeText(this.eventText, dataPath.eventText9);
        this.left_choice_text = dataPath.left1;
        this.right_choice_text = dataPath.right1[this.def_type];
    }

    //加载精灵登场画面
    elf_scene() {
        saveData.elf = false;
        this.from_elf_scene = true
        this.cardReset("elf");
        this.card.label = false;
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
        //设置卡牌不可拖动
        //当剧情结束后才能拖动
        this.time.delayedCall(1000, () => {
            this.changeText(this.eventText, dataPath.eventText4);
        });
        this.time.delayedCall(4000, () => {
            this.changeText(this.eventText, dataPath.eventText5);
        });
        this.time.delayedCall(7000, () => {
            this.eventCard(dataPath.eventCard5);
            this.enemy_hp -= 1;
        });
        this.time.delayedCall(10000, () => {
            this.changeText(this.eventText, dataPath.eventText6);
        });

        this.time.delayedCall(12000, () => {
            this.cardReset("player");
            this.card.label = true;
        });
        this.scene_turn--;
    }

    win() {
        this.time.delayedCall(1000, () => {
            this.rotateOutAndMakeNewCard("player");
            this.changeText(this.eventText, "You win.");
            this.card.dargable = true;
        });
        this.left_choice_text = "I got this...";
        this.right_choice_text = "I got this!!!";
        console.log("win");
    }

    lost() {
        this.time.delayedCall(1000, () => {
            this.rotateOutAndMakeNewCard("player");
            this.changeText(this.eventText, "You lost.");
            this.card.dargable = true;
        });
        this.left_choice_text = "wait...";
        this.right_choice_text = "what?!";
        console.log("lost");
    }
}