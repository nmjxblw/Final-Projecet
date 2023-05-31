class firstFloorLevel4 extends Base {
    constructor(){
        super("floor one level 4", "maze")
    }

    exPreload(){
        this.load.image("maze","card1.png");
        this.load.image("card1", "card1.png");
        this.load.image("card2", "card2.png");

    }

    onEnter(){
        this.changeText(this.eventText, "The maze");
        this.left_choice_text = "enter the maze";
        this.right_choice_text = "enter the maze";

        this.card = this.createCard("maze");
        this.dragrotate(this.card);
    }

    judgeChoice(){
        this.gotoScene("floor one level 5");
    }
}

class firstFloorLevel5 extends Base{
    constructor(){
        super("floor one level 5", "fork")
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
        this.rotateOutAndMakeNewCard("fork");
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
        this.gotoScene("floor two level 1");
    }

    lose(){
        console.log(death);
        if(!death){
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
                this.gotoScene("floor one level 0");
            });
            death = true;
        }
        else{
            this.time.delayedCall(1000, () => {
                this.eventCard("Returning to the beginning of the stage...");
            });

            this.time.delayedCall(4000, () => {
                this.gotoScene("floor one level 2");
            });
        }
    }
}