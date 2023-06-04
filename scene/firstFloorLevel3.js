class firstFloorLevel3 extends Base {

    constructor(){

        super("floor one level 3", "skeleton")
    }

    onEnter(){
        this.scene1 = this.scene.get('floor one level 2');
        this.scene1.bgm.stop();
        this.battleMusicN.play({fadeIn:1000});

        this.enemy_hp = dataPath.enemy.hp;
        this.enemy_max_hp = dataPath.enemy.hp;
        this.showHp();

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
                this.damagecalc_textchange(this.scene_turn, this.player_choice);
                this.scene_turn++;
                if(this.enemy_hp<=0){
                    this.card.label = false;
                    console.log("win");
                    this.win();
                }
                else if (saveData.player.hp <= 0) {
                    this.card.label = false;
                    this.lose();
                }
        }
    }

    damagecalc_textchange(num, choice){
        if(num%2 == 0){
            if(choice=="left") {
                this.rotateOutAndMakeNewCard("skeleton");
                saveData.player.hp-=1;
                this.enemy_hp -=1;
                this.shakeTween(this.cameras.main);
                this.changeText(this.eventText, dataPath.eventText2);
                this.renewHp();
            }
            else {
                this.rotateOutAndMakeNewCard("skeleton");
                this.changeText(this.eventText, dataPath.eventText3);
            }
        }
        else{
            if(choice=="left") {
                this.rotateOutAndMakeNewCard("skeleton");
                this.enemy_hp -=1;
                this.changeText(this.eventText, dataPath.eventText4);
                this.renewHp();
            }
            else{
                this.rotateOutAndMakeNewCard("skeleton");
                this.changeText(this.eventText, dataPath.eventText5);
            }
        }       
    }

    win(){
        this.eventCard(dataPath.eventCard1);
        this.time.delayedCall(3000, () => {
            this.battleMusicN.stop();
            this.gotoScene("floor one level 4");
        });
    }

    lost() {
        this.changeText(this.eventText, "You lost.");
        this.left_choice_text = "next";
        this.right_choice_text = "next";
        console.log("lost");
        this.battleMusicN.stop();
        this.gotoScene("floor one level 2");
    }
}