class firstFloorLevel0 extends Base {
    constructor(){
        super("floor one level 0", "door")
    }

    exPreload(){
        this.load.image("door","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){
        this.changeText(this.eventText,`You have arrived at the first floor of the dungeon.\nImmediately, you are attacked by a monster.`);
        this.left_choice_text = "Attack the monster";
        this.right_choice_text = "Attack the monster";
        this.card = this.createCard("door");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        this.gotoScene("floor one level 1");
    }
}

class firstFloorLevel1 extends Base {

    constructor(){

        super("floor one level 1", "intro monster")
    }

    exPreload(){
        this.load.image("mob","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){
        this.mobhp = 3;
        this.currentAction;
        initializeLocal(); 
        this.scene_turn = 1;
        this.changeText(this.eventText, `The monster is moving towards you`);
        this.left_choice_text = "Attack";
        this.right_choice_text = "Dodge";
        this.card = this.createCard("mob");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        console.log(`turn ${this.scene_turn}`);
        if (this.player_choice != ""){
                console.log(`turn=${this.scene_turn} choice=${this.player_choice} `);
                this.rotateOutAndMakeNewCard(this.card, "card1");
                this.resettext(this.scene_turn);
                this.damagecalc_textchange(this.scene_turn, this.player_choice);
                this.scene_turn++;
                if(this.mobhp<=0){
                    console.log("win");
                    this.win();
                }
                else if (saveData.player.hp <= 0) {
                    this.lose();
                }
        }
    }

    resettext(num){
        if(num%2 != 0){
            this.changeText(this.eventText, `The monster is moving towards you`);
        }
        else{
            this.changeText(this.eventText, `The monster is trying to attack you`);
        }
    }

    damagecalc_textchange(num, choice){
        if(num%2 == 0){
            if(choice=="left") {
                saveData.player.hp-=1;
                this.mobhp -=1;
                this.changeText(this.eventText, `You took 1 damage!\nAnd you dealt 1 damage!`);
            }
            else {
                this.changeText(this.eventText, `You dodged the attack!`);
            }
        }
        else{
            if(choice=="left") {
                this.mobhp -=1;
                this.changeText(this.eventText, `You dealt 1 damage!`);
            }
            else{
                this.changeText(this.eventText, `Nothing happened.`);
            }
        }       
    }

    win(){
        this.changeText(this.eventText, "you win");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("win");
        this.gotoScene("floor one level 2");
    }

    lost() {
        this.changeText(this.eventText, "You lost.");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("lost");
        this.gotoScene("floor one level 1");
    }
}

class firstFloorLevel2 extends Base {
    constructor(){
        super("floor one level 2", "maze")
    }

    exPreload(){
        this.load.image("maze","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){
        this.createEventText("maze");
        this.left_choice_text = "enter the maze";
        this.right_choice_text = "enter the maze";

        this.card = this.createCard("maze");
        this.dragrotate(this.card);
    }

    judgeChoice(){
        this.gotoScene("floor one level 3");
    }
}

class firstFloorLevel3 extends Base{
    constructor(){
        super("floor one level 3", "fork")
    }

    exPreload(){
        this.load.image("fork","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){
        this.changeText(this.eventText, "You find a fork in the road.");
        this.left_choice_text = "heads left";
        this.right_choice_text = "heads right";

        this.card = this.createCard("fork");
        this.dragrotate(this.card);

        this.scene_turn = 1;
    }

    judgeChoice(){
            console.log(this.scene_turn);
            this.enter_maze(this.scene_turn,this.player_choice);
            this.scene_turn++;
    }


    enter_maze(x, choice){
        if(x==1){
            if(choice=="left"){
                this.changeText(this.eventText, "You do not face any obstacles. You continue forward.");
            }
            else{
                this.changeText(this.eventText, " You fell into a trap. You are dead.");
                this.lose();
            }
        }
        else if(x==2){
            if(choice=="left"){
                this.changeText(this.eventText, "You do not face any obstacles. You continue forward.");
            }
            else{
                this.changeText(this.eventText, " you get camped by a group of monsters. You are dead.");
                this.lose();
            }
        }
        else if(x==3){
            if(choice=="right"){
                this.changeText(this.eventText, "You do not face any obstacles. You continue forward.");
                this.win();
            }
            else{
                this.changeText(this.eventText, " You accidentally activated a switch that fires an arrow behind you. You are shot. You are dead.");
                this.lose();
            }
        }
    }

    win(){
        this.changeText(this.eventText, "you win");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("win");
    }

    lose(){
        if(deathCount==0){
            this.time.delayedCall(500, () => {
                this.eventCard("The power of the great sword is to go back in time.");
            });
    
            this.time.delayedCall(3500, () => {
                this.eventCard("Every time you die, the power of the sword will rewind the time to the beginning of the current stage.");
            });
    
            this.time.delayedCall(6500, () => {
                this.eventCard("The power of the great sword is limited. Every time you revive, the brightness of the great sword darkens.");
            });

            this.time.delayedCall(9500, () => {
                this.eventCard("Returning to the beginning of the stage...");
            });

            this.time.delayedCall(12500, () => {
                this.gotoScene("floor one level 1");
            });
        }
        else{
            this.time.delayedCall(500, () => {
                this.eventCard("Returning to the beginning of the stage...");
            });

            this.time.delayedCall(3500, () => {
                this.gotoScene("floor one level 0");
            });
        }
        deathCount++;
    }
}