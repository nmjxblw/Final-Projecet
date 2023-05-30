class secondFloorLevel2 extends Base {
    constructor(){
        super("floor two level 2","battle with the giant")
    }

    onEnter() {

        this.monsterHP = 6;

        this.giantRage = false;

        this.currentAction;

        initializeLocal();

        console.log(saveData.player.hp);


        this.left_choice_text = dataPath.left1
        this.right_choice_text = dataPath.right1
        this.card = this.createCard("card1");

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
            else if (this.monsterHP <= 0) {
                this.gotoScene("next");
            }
            else if(this.giantRage && this.scene_turn % 3 == 2 ){
                this.action5();
            }
            else if(this.giantRage && this.scene_turn % 3 == 0 ){
                this.action6();
            }
            else if(this.giantRage && this.scene_turn % 3 == 1 ){
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

    action1() {
        if (this.player_choice == "left")
        {
            
            this.rotateOutAndMakeNewCard(this.card, "card1");
            saveData.elf = true;
            this.changeText(this.eventText, dataPath.battleText1 + this.monsterHP + saveData.player.hp);

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;
        }
        else
        {
            this.gotoScene("testlevel");
        }
        
    }

    action2() {
        if (this.player_choice == "left") { 
            this.monsterHP--;
            saveData.player.hp-= 2; 

            if (this.monsterHP == 3) { this.giantRage = true; this.scene_turn = 1; this.action4(); return; }

            this.changeText(this.eventText, dataPath.battleText2 + this.monsterHP +saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.eventText, dataPath.battleText3 + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action2";

        console.log(this.currentAction);

        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        
        
        this.rotateOutAndMakeNewCard(this.card, "card1");

        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    action3() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 

            if (this.monsterHP == 3) { this.giantRage = true; this.scene_turn = 1; this.action4();return; }

            this.changeText(this.eventText, dataPath.battleText4 + this.monsterHP + saveData.player.hp);
        }
        else{
            this.changeText(this.eventText, dataPath.battleText5 + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action3";
        console.log(this.currentAction);


        

        if (saveData.player.hp<= 0) { this.actionLose(); return; }
        
        
        this.rotateOutAndMakeNewCard(this.card, "card1");

        
        
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    action4() {

        if(this.currentAction == "action3")
        {
            if (this.player_choice == "left") {  
                this.changeText(this.eventText, dataPath.battleText6 + this.monsterHP + saveData.player.hp);
                this.shakeTween(this.cameras.main);
            }
            else{
                this.changeText(this.eventText, dataPath.battleText7 + this.monsterHP + saveData.player.hp);
            }
        }
        else
        {
            if (this.player_choice == "left") {  
                this.changeText(this.eventText, dataPath.battleText8 + this.monsterHP + saveData.player.hp);
            }
            else{
                this.changeText(this.eventText, dataPath.battleText9 + this.monsterHP + saveData.player.hp);
            }
        }

        this.time.delayedCall(500, () => {
            this.eventCard(dataPath["eventCard1"]);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath["eventCard2"]);
        });
        
        
        
        if (saveData.player.hp <= 0) { this.actionLose();; return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    action5() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            saveData.player.hp-= 2; 
            this.changeText(this.eventText, dataPath.battleText6 + this.monsterHP + saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.eventText, dataPath.battleText7 + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action5";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    action6() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            this.changeText(this.eventText, dataPath.battleText8 + this.monsterHP + saveData.player.hp);
        }
        else{
            this.changeText(this.eventText, dataPath.battleText9 + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action6";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    action7() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            saveData.player.hp-=2;
            this.changeText(this.eventText, dataPath.battleText6 + this.monsterHP + saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.eventText, dataPath.battleText7 + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action7";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = dataPath.left2;
        this.right_choice_text = dataPath.right2;
    }

    actionWin() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.eventText, dataPath.eventText2);

        this.left_choice_text = dataPath.left3;
        this.right_choice_text = dataPath.right3;
    }

    actionLose() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.eventText, "你挂了……");

        this.left_choice_text = "离开";
        this.right_choice_text = "离开";
    }
}