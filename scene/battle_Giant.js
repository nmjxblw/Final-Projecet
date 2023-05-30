class battleGiant extends Base {
    constructor(){
        super("floor two level 2","battle with the giant")
    }

    onEnter() {

        this.monsterHP = 6;

        this.giantRage = false;

        this.currentAction;

        initializeLocal();

        //console.log(saveData.player); 
        console.log(`当前玩家血量:${saveData.player.hp}`);
        console.log(`当前猎人是否被解救：${saveData.hunter}`);

        this.left_choice_text = "Help him"
        this.right_choice_text = "While he lures the giant away to the next level"
        this.card = this.createCard("card1");

        this.changeText(this.eventText,`Coming to the second level, you see a hunter being chased by a giant and you choose: `);

        this.dragrotate(this.card);

        this.scene_turn = 1;


    }

    //根据玩家的选择跳转到相应的action
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
            this.changeText(this.evenText, `Giants ready to attack: ` + this.monsterHP + saveData.player.hp);

            this.left_choice_text = "Attack";
            this.right_choice_text = "Dodge";
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

            this.changeText(this.evenText, `The giant hit you for 2 points of damage 
You hit the giant for 1 point of damage
Giant ready to move: ` + this.monsterHP + saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.evenText, `You dodged the giant's attack
Giant ready to move: ` + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action2";

        console.log(this.currentAction);

        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        
        
        this.rotateOutAndMakeNewCard(this.card, "card1");

        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    action3() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 

            if (this.monsterHP == 3) { this.giantRage = true; this.scene_turn = 1; this.action4();return; }

            this.changeText(this.evenText, `You hit the giant for 1 point of damage
Giant ready to attack: ` + this.monsterHP + saveData.player.hp);
        }
        else{
            this.changeText(this.evenText, `The giant did not attack you
Giant ready to attack: ` + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action3";
        console.log(this.currentAction);


        

        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        
        
        this.rotateOutAndMakeNewCard(this.card, "card1");

        
        
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    action4() {

        if(this.currentAction == "action3")
        {
            if (this.player_choice == "left") {  
                this.changeText(this.evenText, `The giant hit you for 2 points of damage
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
                this.shakeTween(this.cameras.main);
            }
            else{
                this.changeText(this.evenText, `You dodged the giant's attack
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
            }
        }
        else
        {
            if (this.player_choice == "left") {  
                this.changeText(this.evenText, `You hit the giant for 1 point of damage
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
            }
            else{
                this.changeText(this.evenText, `The giant did not attack you
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
            }
        }
        
        this.eventCard(`When some powerful enemies will become angry after a certain level of attack, 
then you can't judge his behavior, 
try to summarize his attack pattern under the anger to deal with it`);
        
        if (saveData.player.hp <= 0) { this.actionLose();; return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    action5() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            saveData.player.hp-= 2; 
            this.changeText(this.evenText, `The giant hit you for 2 points of damage
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.evenText, `You dodged the giant's attack
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action5";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    action6() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            this.changeText(this.evenText, `You hit the giant for 1 point of damage
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
        }
        else{
            this.changeText(this.evenText, `The giant did not attack you
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action6";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    action7() {
        if (this.player_choice == "left") { 
            this.monsterHP--; 
            saveData.player.hp-=2;
            this.changeText(this.evenText, `The giant hit you for 2 points of damage
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
            this.shakeTween(this.cameras.main);
        }
        else{
            this.changeText(this.evenText, `You dodged the giant's attack
Giant are preparing for next action` + this.monsterHP + saveData.player.hp);
        }

        this.currentAction = "action7";
        console.log(this.currentAction);

        
        if (saveData.player.hp <= 0) { this.actionLose(); return; }
        if (this.monsterHP < 1) { this.actionWin(); return; }
        
        this.rotateOutAndMakeNewCard(this.card, "card1");
        
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
    }

    actionWin() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.evenText, "Congratulations! You have defeated the giant!");

        //代表解救了猎人
        saveData.hunter = true;

        this.left_choice_text = "Leaving the fight";
        this.right_choice_text = "Leaving the fight";
    }

    actionLose() {
        this.rotateOutAndMakeNewCard(this.card, "card1");
        this.changeText(this.evenText, "你挂了……");

        this.left_choice_text = "离开";
        this.right_choice_text = "离开";
    }
}