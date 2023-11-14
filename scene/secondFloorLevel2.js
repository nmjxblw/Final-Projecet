class secondFloorLevel2 extends Base {
  constructor() {
    super("floor two level 2", "battle with the giant");
  }

  onEnter() {
    this.scene1 = this.scene.get("floor one level 4");
    console.log(this.scene1);

    currentPosition = "floor two level 2";

    //Set enemy data
    this.enemy_hp = 6;
    this.enemy_max_hp = 6;
    this.showHp();
    this.renewHp();

    this.giantAttackDamage = 2;
    this.playerAttackDamage = 1;

    this.giantRage = false;
    this.giantRageHP = 3;

    this.currentAction;

    if (typeof this.showEvent == "undefined") {
      this.showEvent = false;
    }

    this.card.setTexture("elf");

    this.left_choice_text = dataPath.left[0];
    this.right_choice_text = dataPath.right[0];

    this.changeText(this.eventText, dataPath.eventText[0]);

    this.dragrotate(this.card);

    this.scene_turn = 1;

    //The number of combat cycle rounds, one cycle is two rounds before the rage, and one cycle is three rounds after the rage.
    this.normalBattleLoop = 2;
    this.ragingBattleLoop = 3;

    //Determine which loop the player is in by dividing the current round number by the current round number in the loop.
    //The specific meaning of remainder
    this.giantMovementBehavior = 0;
    this.giantAttackBehavior = 1;
    this.ragingGiantMovementBehavior = 2;
    this.ragingGiantAttackBehavior = 0;
    this.ragingGiantAttackAgainBehavior = 1;
  }

  //Determine player choice
  judgeChoice() {
    if (this.player_choice != "") {
      if (this.giantRage == false && this.scene_turn == 1) {
        this.determineHelpELF();
      } else if (this.enemy_hp <= 0) {
        this.rotateOutAndMakeNewCard("elf");
        this.delayTime = 1000;
        this.time.delayedCall(this.delayTime, () => {
          this.battleMusicN.stop();
          this.gotoScene("floor two level 3");
        });
      } else if (
        this.giantRage &&
        this.scene_turn % this.ragingBattleLoop ==
          this.ragingGiantMovementBehavior
      ) {
        this.ragingGiantMovement();
      } else if (
        this.giantRage &&
        this.scene_turn % this.ragingBattleLoop ==
          this.ragingGiantAttackBehavior
      ) {
        this.ragingGiantAttack();
      } else if (
        this.giantRage &&
        this.scene_turn % this.ragingBattleLoop ==
          this.ragingGiantAttackAgainBehavior
      ) {
        this.ragingGiantAttackAgain();
      } else if (
        this.scene_turn % this.normalBattleLoop ==
        this.giantMovementBehavior
      ) {
        this.giantMovement();
      } else if (
        this.scene_turn % this.normalBattleLoop ==
        this.giantAttackBehavior
      ) {
        this.giantAttack();
      }

      this.scene_turn++;
    }
  }
  //Initial behavior, if the player chooses to help to move, choose to ignore and enter the next level
  determineHelpELF() {
    if (this.player_choice == "left") {
      game.sound.stopAll();
      this.delayTime = 1000;
      this.time.delayedCall(this.delayTime, () => {
        this.battleMusicN.play();
      });

      this.rotateOutAndMakeNewCard("giant");
      saveData.elf = true;

      this.changeText(this.eventText, dataPath.battleText[0]);

      this.left_choice_text = dataPath.left[1];
      this.right_choice_text = dataPath.right[1];
    } else {
      this.card.label = false;
      this.rotateOutAndMakeNewCard("gate");
      this.time.delayedCall(this.delayTime, () => {
        this.gotoScene("floor three level 1");
      });
    }
  }
  //The previous behavior is an attack, and this behavior is a move.
  giantMovement() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.playerAttackDamage;
      saveData.player.hp -= this.giantAttackDamage;
      this.renewHp();

      if (this.enemy_hp <= 0) {
        this.actionWin();
        return;
      }
      if (this.enemy_hp == this.giantRageHP) {
        this.giantRage = true;
        this.scene_turn = 1;
        this.giantRages();
        return;
      }

      this.changeText(this.eventText, dataPath.battleText[1]);
      this.shakeTween(this.cameras.main);
    } else {
      this.changeText(this.eventText, dataPath.battleText[2]);
    }

    this.currentAction = "giantMovement";

    console.log(this.currentAction);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }
  //The previous behavior is movement, this behavior is attack
  giantAttack() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.playerAttackDamage;
      this.renewHp();

      if (this.enemy_hp <= 0) {
        this.actionWin();
        return;
      }
      if (this.enemy_hp == this.giantRageHP) {
        this.giantRage = true;
        this.scene_turn = 1;
        this.giantRages();
        return;
      }

      this.changeText(this.eventText, dataPath.battleText[3]);
    } else {
      this.changeText(this.eventText, dataPath.battleText[4]);
    }

    this.currentAction = "giantAttack";
    console.log(this.currentAction);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }
  //The initial violent behavior, the text is determined based on the previous behavior, this behavior is an attack
  giantRages() {
    this.card.label = false;

    if (this.currentAction == "giantAttack") {
      if (this.player_choice == "left") {
        this.changeText(this.eventText, dataPath.battleText[5]);
        this.shakeTween(this.cameras.main);
      } else {
        this.changeText(this.eventText, dataPath.battleText[6]);
      }
    } else {
      if (this.player_choice == "left") {
        this.changeText(this.eventText, dataPath.battleText[7]);
      } else {
        this.changeText(this.eventText, dataPath.battleText[8]);
      }
    }

    console.log(this.showEvent);
    if (this.showEvent == false) {
      this.fastDelaytime = 500;
      this.time.delayedCall(this.fastDelaytime, () => {
        this.eventCard(dataPath.eventCard[0]);
      });

      this.slowDelaytime = 3500;
      this.time.delayedCall(this.slowDelaytime, () => {
        this.card.label = true;
        this.eventCard(dataPath.eventCard[1]);
      });

      this.showEvent = true;
    } else {
      this.time.delayedCall(fastDelaytime, () => {
        this.card.label = true;
        this.eventCard(dataPath.eventCard[2]);
      });
    }
    console.log(this.showEvent);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }
    if (this.enemy_hp < 1) {
      this.actionWin();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }
  //The previous behavior is an attack, and this behavior is a move.
  ragingGiantMovement() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.playerAttackDamage;
      saveData.player.hp -= this.giantAttackDamage;
      this.renewHp();
      this.changeText(this.eventText, dataPath.battleText[5]);
      this.shakeTween(this.cameras.main);
    } else {
      this.changeText(this.eventText, dataPath.battleText[6]);
    }

    this.currentAction = "ragingGiantMovement";
    console.log(this.currentAction);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }
    if (this.enemy_hp < 1) {
      this.actionWin();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }
  //The previous behavior is movement and this behavior is attack.
  ragingGiantAttack() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.playerAttackDamage;
      this.renewHp();
      this.changeText(this.eventText, dataPath.battleText[7]);
    } else {
      this.changeText(this.eventText, dataPath.battleText[8]);
    }

    this.currentAction = "ragingGiantAttack";
    console.log(this.currentAction);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }
    if (this.enemy_hp <= 0) {
      this.actionWin();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }
  //The previous behavior is an attack, this behavior is an attack.
  ragingGiantAttackAgain() {
    if (this.player_choice == "left") {
      this.enemy_hp -= this.playerAttackDamage;
      saveData.player.hp -= this.giantAttackDamage;
      this.renewHp();
      this.changeText(this.eventText, dataPath.battleText[5]);
      this.shakeTween(this.cameras.main);
    } else {
      this.changeText(this.eventText, dataPath.battleText[6]);
    }

    this.currentAction = "ragingGiantAttackAgain";
    console.log(this.currentAction);

    if (saveData.player.hp <= 0) {
      this.actionLose();
      return;
    }
    if (this.enemy_hp <= 0) {
      this.actionWin();
      return;
    }

    this.rotateOutAndMakeNewCard("giant");

    this.left_choice_text = dataPath.left[1];
    this.right_choice_text = dataPath.right[1];
  }

  actionWin() {
    this.rotateOutAndMakeNewCard("giant");
    this.changeText(this.eventText, dataPath.eventText[1]);

    this.left_choice_text = dataPath.left[2];
    this.right_choice_text = dataPath.right[2];
  }

  actionLose() {
    this.rotateOutAndMakeNewCard("giant");
    this.changeText(this.eventText, dataPath.battleText[9]);

    if (saveData.player.hp < 0) {
      saveData.player.hp = 0;
    }
    this.renewHp();

    this.card.label = false;

    this.delayTime = 3000;
    this.time.delayedCall(this.delayTime, () => {
      this.battleMusicN.stop();
      this.gotoScene("floor four level 1");
    });
  }
}
