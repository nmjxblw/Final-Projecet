class firstFloorLevel4 extends Base {
    constructor(){
        super("floor one level 4", "maze");
    }

    onEnter(){
        this.bgm.play({fadeIn:1000});

        this.changeText(this.eventText, "You move on and come across a maze");
        this.left_choice_text = "enter the maze";
        this.right_choice_text = "enter the maze";

        this.card.setTexture("maze");
        this.dragrotate(this.card);
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("maze");
        this.gotoScene("floor one level 5");
    }
}

class firstFloorLevel5 extends Base{
    constructor(){
        super("floor one level 5", "fork");
    }

    onEnter(){
        this.scene4 = this.scene.get('floor one level 4');
        this.changeText(this.eventText, "You find a fork in the road.");
        this.left_choice_text = "heads left";
        this.right_choice_text = "heads right";

        this.card.setTexture("maze");
        this.dragrotate(this.card);

        this.scene_turn = 1;
    }

    judgeChoice(){
            console.log(this.scene_turn);
            this.enter_maze(this.scene_turn,this.player_choice);
            this.scene_turn++;
    }


    enter_maze(x, choice){
        this.rotateOutAndMakeNewCard("maze");
        if(x==1){
            if(choice=="left"){
                this.changeText(this.eventText, dataPath.eventText);
            }
            else{
                this.card.label = false;
                this.eventCard(dataPath.eventCard1);
                this.time.delayedCall(3000, () => {
                    this.lose();
                });
            }
        }
        else if(x==2){
            if(choice=="left"){
                this.changeText(this.eventText, dataPath.eventText);
            }
            else{
                this.card.label = false;
                this.eventCard(dataPath.eventCard2);
                this.time.delayedCall(3000, () => {
                    this.lose();
                });
            }
        }
        else if(x==3){
            if(choice=="right"){
                this.changeText(this.eventText, dataPath.eventText);
                this.win();
            }
            else{
                this.card.label = false;
                this.eventCard(dataPath.eventCard3);
                this.time.delayedCall(3000, () => {
                    this.lose();
                });
            }
        }
    }

    win(){
        this.changeText(this.eventText, "You finally escaped the maze. You can vaguely see a gate in front of you.");
        this.left_choice_text = "Head towards the gate";
        this.right_choice_text = "Head towards the gate";
        console.log("win");
        this.gotoScene("floor two level 1");
    }

    lose(){
        this.scene4.bgm.stop();
        currentPosition = "floor one level 4";
        console.log(currentPosition);
        console.log("lose");
        this.gotoScene("floor four level 1")
    }
    // lose(){
    //     console.log(death);
    //     if(!death){
    //         this.time.delayedCall(500, () => {
    //             this.eventCard("The power of the great sword is to go back in time.");
    //         });
    
    //         this.time.delayedCall(3500, () => {
    //             this.eventCard("Every time you die, the power of the sword will rewind the time to the beginning of the current stage.");
    //         });
    
    //         this.time.delayedCall(6500, () => {
    //             this.eventCard("The power of the great sword is limited. Every time you revive, the brightness of the great sword darkens.");
    //         });

    //         this.time.delayedCall(9500, () => {
    //             this.eventCard("Returning to the beginning of the stage...");
    //         });

    //         this.time.delayedCall(12500, () => {
    //             this.gotoScene("floor one level 2");
    //         });
    //         death = true;
    //     }
    //     else{
    //         this.time.delayedCall(1000, () => {
    //             this.eventCard("Returning to the beginning of the stage...");
    //         });

    //         this.time.delayedCall(4000, () => {
    //             this.gotoScene("floor one level 2");
    //         });
    //     }
    // }
}