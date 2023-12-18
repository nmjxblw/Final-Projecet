class thirdFloorLevel2 extends Base {
  constructor() {
    super("floor three level 2", "the dragon");
  }

  onEnter() {
    this.currentSceneGlobal();
    game.sound.stopAll();

    this.battleMusicD.play({ fadeIn: this.one_second });

    //load enemy
    this.enemy_max_hp = dataPath.enemy.hp;
    this.enemy_berserk_hp = 5;
    this.enemy_hp = this.enemy_max_hp;
    this.showHp();
    this.renewHp();

    currentPosition = "floor three level 2";
    //initialize the left choice text
    this.left_choice_text = this.left_choice_text_iterator.next().value;
    //then the right choice text
    this.def_type = saveData.player.shield ? "shield" : "no_shield";
    this.right_choice_text = this.right_choice_text_iterator.next().value[this.def_type];

    //load enemy state
    this.enemy_berserk = dataPath.enemy.berserk;
    //load card texture
    this.card.setTexture("dragon_normal");
    //set card non rotatable
    this.card.label = false;

    //get elf state
    this.elf_help = saveData.elf;

    //display the event by time
    const first_time_trigger = 500;
    const second_time_trigger = 3500;
    const third_time_trigger = 6500;
    this.time.delayedCall(first_time_trigger, () => {
      this.changeText(this.eventText, this.eventCardIterator.next().value);
    });

    this.time.delayedCall(second_time_trigger, () => {
      this.changeText(this.eventText, this.eventCardIterator.next().value);
    });

    this.time.delayedCall(third_time_trigger, () => {
      this.changeText(this.eventText, this.eventCardIterator.next().value);
      this.time.delayedCall(this.three_seconds, () => {
        this.changeText(this.eventText, dataPath.eventText[this.dragon_attack_turn_text_index]);
        this.card.label = true;
        this.card.dargable = true;
      });
    });

    //set the drag rotate
    this.dragrotate(this.card);
  }

  currentSceneGlobal() {
    this.one_second = 1000;
    this.two_seconds = 2000;
    this.three_seconds = 3000;
    this.four_seconds = 4000;
    this.seven_seconds = 7000;
    this.ten_seconds = 10000;
    this.twelve_seconds = 12000;
    this.dragon_fire_ball_damage = 3;
    this.dragon_attack_damage = 2;
    this.player_attack_damage = 1;
    this.dead_hp = 0;
    this.min_pick = 1;
    this.max_pick = 100;
    this.half_of_range = 50;
    this.left_choice_text_iterator = dataPath.left[Symbol.iterator]();
    this.right_choice_text_iterator = dataPath.right[Symbol.iterator]();
    this.eventCardIterator = dataPath.eventCard[Symbol.iterator]();
    this.dragon_attack_turn_text_index = 0;
    this.dragon_attack_berserk_turn_text_index = 6;
    this.dragon_move_turn_text_index = 1;
    this.dragon_move_berserk_turn_text_index = 7;
    this.dragon_fire_ball_turn_text_index = 2;
    this.elf_first_worlds_text_index = 3;
    this.elf_second_worlds_text_index = 4;
    this.dragon_attack_elf_text_index = 5;
    this.elf_shoot_event_card_index = 4;
    this.dragon_berserk_event_card_index = 5;
  }

  judgeChoice() {
    const turnLoop = 3;
    const dragonAttackTurn = 1;
    const dragonMoveTurn = 2;
    if (this.from_elf_scene) {
      this.elfShootTurn();
    } else if (this.enemy_hp <= this.dead_hp) {
      this.rotateOutAndMakeNewCard("player");
      this.gotoScene("floor three level 3");
      return;
    } else if (saveData.player.hp <= this.dead_hp) {
      saveData.player.hp == this.dead_hp;
      this.rotateOutAndMakeNewCard("player");
      this.gotoScene("floor four level 1");
      return;
    }
    //action by turn
    else if (this.scene_turn % turnLoop == dragonAttackTurn) {
      this.dragonAttackTurn();
    } else if (this.scene_turn % turnLoop == dragonMoveTurn) {
      this.dragonMoveTurn();
    } else {
      this.dragonFireBallTurn();
    }
    //move to next turn
    this.scene_turn++;
  }

  dragonAttackTurn() {
    //determine the if player taken damage
    if (this.player_choice == "left") {
      //player attack, dragon and player both take damage
      this.enemy_hp -= this.player_attack_damage;
      //determine the if player is dead
      if (this.enemy_berserk) {
        saveData.player.hp -= this.dragon_fire_ball_damage;
        saveData.player.hp =
          saveData.player.hp < this.dead_hp ? this.dead_hp : saveData.player.hp;
        this.shakeTween(this.cameras.main);
        this.changeText(
          this.eventText,
          "You took 3 damges!\nAnd you dealt 1 damge!"
        );
        this.renewHp();
        //player dead, failed
        if (saveData.player.hp <= this.dead_hp) {
          this.card.dargable = false;
          this.time.delayedCall(this.one_second, () => {
            this.lost();
          });
          return;
        }
        //dragon dead, win
        if (this.enemy_hp <= this.dead_hp) {
          this.card.dargable = false;
          this.time.delayedCall(this.one_second, () => {
            this.win();
          });
          return;
        }
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_attack_berserk_turn_text_index]);
        });
      } else {
        //non berserker, player take 2 damage
        saveData.player.hp -= this.dragon_attack_damage;
        saveData.player.hp =
          saveData.player.hp < this.dead_hp ? this.dead_hp : saveData.player.hp;
        this.shakeTween(this.cameras.main);
        this.changeText(
          this.eventText,
          "You took 2 damges!\nAnd you dealt 1 damge!"
        );
        this.renewHp();
        if (saveData.player.hp <= this.dead_hp) {
          this.card.dargable = false;
          this.time.delayedCall(this.one_second, () => {
            this.lost();
          });
          return;
        }
        if (this.enemy_hp <= this.dead_hp) {
          this.card.dargable = false;
          this.time.delayedCall(this.one_second, () => {
            this.win();
          });
          return;
        }
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_fire_ball_turn_text_index]);
        });
      }
      if (this.enemy_hp <= this.enemy_berserk_hp && !this.enemy_berserk) {
        this.eventCard(dataPath.eventCard[this.dragon_berserk_event_card_index]);
        this.enemy_berserk = true;
      }
      //elf event
      if (this.elf_help && this.enemy_hp <= this.enemy_berserk_hp) {
        this.time.delayedCall(this.three_seconds, () => {
          this.elf_scene();
        });
      }
    } else {
      if (this.enemy_berserk) {
        // if player have a shield, player dodge the fireball,otherwise player have 50% chance to dodge

        if (
          !saveData.player.shield &&
          Phaser.Math.Between(this.min_pick, this.max_pick) <=
            this.half_of_range
        ) {
          //无盾且躲避失败
          saveData.player.hp -= this.dragon_fire_ball_damage;
          saveData.player.hp =
            saveData.player.hp < this.dead_hp
              ? this.dead_hp
              : saveData.player.hp;
          this.shakeTween(this.cameras.main);
          this.changeText(
            this.eventText,
            "You didn't dodge the fireball!\nYou took 3 damges."
          );
          this.renewHp();
          if (saveData.player.hp <= this.dead_hp) {
            this.card.dargable = false;
            this.time.delayedCall(this.one_second, () => {
              this.lost();
            });
            return;
          }
        } else if (saveData.player.shield) {
          this.changeText(
            this.eventText,
            "You successfully parry the fireball."
          );
        } else {
          this.changeText(this.eventText, "You dodged the fireball!");
        }
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(
            this.eventText,
            dataPath.eventText[this.dragon_attack_berserk_turn_text_index] + "\nWhat are you going to do next?"
          );
        });
      } else {
        //dodge the attack
        if (saveData.player.shield) {
          this.changeText(this.eventText, "You successfully parry the attack.");
        } else {
          this.changeText(this.eventText, "You dodged the attack.");
        }
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_fire_ball_turn_text_index]);
        });
      }
    }

    if (!this.enemy_berserk) {
      this.rotateOutAndMakeNewCard("dragon_normal");
    } else {
      this.rotateOutAndMakeNewCard("dragon_berserk");
    }
  }

  dragonMoveTurn() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.player_attack_damage;
      this.changeText(this.eventText, "You dealt 1 damge!");
      this.renewHp();
      if (this.enemy_hp <= this.dead_hp) {
        this.card.dargable = false;
        this.time.delayedCall(this.one_second, () => {
          this.win();
        });
        return;
      }
      if (this.enemy_berserk) {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(
            this.eventText,
            dataPath.eventText[this.dragon_move_berserk_turn_text_index] + "\nWhat are you going to do next?"
          );
        });
      } else {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_move_turn_text_index]);
        });
      }
      if (this.enemy_hp <= this.enemy_berserk_hp && !this.enemy_berserk) {
        this.eventCard(dataPath.eventCard[this.dragon_berserk_event_card_index]);
        this.enemy_berserk = true;
      }
      if (this.elf_help && this.enemy_hp <= this.enemy_berserk_hp) {
        this.time.delayedCall(this.three_seconds, () => {
          this.elf_scene();
        });
      }
    }
    //player choose dodg
    else {
      this.changeText(this.eventText, "Nothing happened.");
    }
    if (this.enemy_berserk) {
      this.time.delayedCall(this.two_seconds, () => {
        this.changeText(
          this.eventText,
          dataPath.eventText[this.dragon_move_berserk_turn_text_index] + "\nWhat are you going to do next?"
        );
      });
    } else {
      this.time.delayedCall(this.two_seconds, () => {
        this.changeText(this.eventText, dataPath.eventText[this.dragon_move_turn_text_index]);
      });
    }

    if (!this.enemy_berserk) {
      this.rotateOutAndMakeNewCard("dragon_normal");
    } else {
      this.rotateOutAndMakeNewCard("dragon_berserk");
    }
  }

  dragonFireBallTurn() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.player_attack_damage;
      saveData.player.hp -= this.dragon_fire_ball_damage;
      saveData.player.hp =
        saveData.player.hp < this.dead_hp ? this.dead_hp : saveData.player.hp;
      this.shakeTween(this.cameras.main);
      this.changeText(
        this.eventText,
        "You took 3 damges!\nAnd you dealt 1 damge!"
      );
      this.renewHp();
      //玩家血量小于等于0，挑战失败
      if (saveData.player.hp <= this.dead_hp) {
        this.card.dargable = false;
        this.time.delayedCall(this.one_second, () => {
          this.lost();
        });
        return;
      }
      if (this.enemy_hp <= this.dead_hp) {
        this.card.dargable = false;
        this.time.delayedCall(this.one_second, () => {
          this.win();
        });
        return;
      }
      if (this.enemy_berserk) {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(
            this.eventText,
            dataPath.eventText[this.dragon_attack_berserk_turn_text_index] + "\nWhat are you going to do next?"
          );
        });
      } else {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_attack_turn_text_index]);
        });
      }
      if (this.enemy_hp <= this.enemy_berserk_hp && !this.enemy_berserk) {
        this.eventCard(dataPath.eventCard[this.dragon_berserk_event_card_index]);
        this.enemy_berserk = true;
      }
      if (this.elf_help && this.enemy_hp <= this.enemy_berserk_hp) {
        this.time.delayedCall(this.three_seconds, () => {
          this.elf_scene();
        });
      }
    }
    //player defense
    else {
      if (!saveData.player.shield && Phaser.Math.Between(this.min_pick, this.max_pick) <= this.half_of_range) {
        saveData.player.hp -= this.dragon_fire_ball_damage;
        saveData.player.hp = saveData.player.hp < this.dead_hp ? this.dead_hp : saveData.player.hp;
        this.shakeTween(this.cameras.main);
        this.changeText(
          this.eventText,
          "You didn't dodge the fireball!\nYou took 3 damges!"
        );
        this.renewHp();
        if (saveData.player.hp <= this.dead_hp) {
          this.lost();
          return;
        }
      } else if (saveData.player.shield) {
        this.changeText(this.eventText, "You successfully parry the fireball.");
      } else {
        this.changeText(this.eventText, "You dodged the fireball!");
      }

      if (this.enemy_berserk) {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(
            this.eventText,
            dataPath.eventText[this.dragon_attack_berserk_turn_text_index] + "\nWhat are you going to do next?"
          );
        });
      } else {
        this.time.delayedCall(this.two_seconds, () => {
          this.changeText(this.eventText, dataPath.eventText[this.dragon_attack_turn_text_index]);
        });
      }
    }

    if (!this.enemy_berserk) {
      this.rotateOutAndMakeNewCard("dragon_normal");
    } else {
      this.rotateOutAndMakeNewCard("dragon_berserk");
    }
  }

  //elf event end
  elfShootTurn() {
    this.from_elf_scene = false;
    this.rotateOutAndMakeNewCard("dragon_berserk");
    this.changeText(this.eventText, dataPath.eventText9);
    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1][this.def_type];
  }

  //load elf event
  elf_scene() {
    this.elf_help = false;
    this.from_elf_scene = true;
    this.cardReset("elf");
    this.card.label = false;
    this.left_choice_text = dataPath.left2;
    this.right_choice_text = dataPath.right2;

    this.time.delayedCall(this.one_second, () => {
      this.changeText(this.eventText, dataPath.eventText[this.elf_first_worlds_text_index]);
    });
    this.time.delayedCall(this.four_seconds, () => {
      this.changeText(this.eventText, dataPath.eventText[this.elf_second_worlds_text_index]);
    });
    this.time.delayedCall(this.seven_seconds, () => {
      this.eventCard(dataPath.eventCard[this.elf_shoot_event_card_index]);
      this.enemy_hp -= this.player_attack_damage;
      this.renewHp();
    });
    this.time.delayedCall(this.ten_seconds, () => {
      this.changeText(this.eventText, dataPath.eventText[this.dragon_attack_elf_text_index]);
    });

    this.time.delayedCall(this.twelve_seconds, () => {
      this.cardReset("player");
      this.card.label = true;
      this.card.dragable = true;
    });
    this.scene_turn--;
  }

  win() {
    this.rotateOutAndMakeNewCard("player");
    this.time.delayedCall(this.one_second, () => {
      this.battleMusicD.stop();
      this.changeText(this.eventText, "You win.");
      this.card.dargable = true;
    });
    this.left_choice_text = "I got this...";
    this.right_choice_text = "I got this!!!";
  }

  lost() {
    this.rotateOutAndMakeNewCard("player");
    this.time.delayedCall(this.one_second, () => {
      this.battleMusicD.stop();
      this.changeText(this.eventText, "You lost.");
      this.card.dargable = true;
    });
    this.left_choice_text = "wait...";
    this.right_choice_text = "what?!";
  }
}
