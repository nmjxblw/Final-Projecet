class firstFloorLevel3 extends Base {

    constructor(){

        super("floor one level 3", "skeleton")
    }

    onEnter(){
        
        this.mobhp = 3;
        this.currentAction;
        this.scene_turn = 1;
        this.changeText(this.eventText, dataPath.eventText1);
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.eventCard(dataPath.eventCard);
        this.card.setTexture("skeleton");
        this.dragrotate(this.card); 
    }

    judgeChoice(){
        console.log(`turn ${this.scene_turn}`);
        if (this.player_choice != ""){
                console.log(`turn=${this.scene_turn} choice=${this.player_choice} `);
                this.rotateOutAndMakeNewCard("skeleton");
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
            this.changeText(this.eventText, `The skeleton is moving towards you`);
        }
        else{
            this.changeText(this.eventText, `The skeleton is trying to attack you`);
        }
    }

    damagecalc_textchange(num, choice){
        if(num%2 == 0){
            if(choice=="left") {
                this.rotateOutAndMakeNewCard("skeleton");
                saveData.player.hp-=1;
                this.mobhp -=1;
                this.changeText(this.eventText, `You took 1 damage!\nAnd you dealt 1 damage!`);
            }
            else {
                this.rotateOutAndMakeNewCard("skeleton");
                this.changeText(this.eventText, `You dodged the attack!`);
            }
        }
        else{
            if(choice=="left") {
                this.rotateOutAndMakeNewCard("skeleton");
                this.mobhp -=1;
                this.changeText(this.eventText, `You dealt 1 damage!`);
            }
            else{
                this.rotateOutAndMakeNewCard("skeleton");
                this.changeText(this.eventText, `Nothing happened.`);
            }
        }       
    }

    win(){
        this.changeText(this.eventText, "you win");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("win");
        this.gotoScene("floor one level 4");
    }

    lost() {
        this.changeText(this.eventText, "You lost.");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("lost");
        this.gotoScene("floor one level 2");
    }
}