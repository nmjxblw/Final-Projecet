class thirdFloorLevel5 extends Base {
    constructor() {
        //打败巨龙后
        //真结局
        super("floor three level 5", "True Ending")
    }

    onEnter() {
        //坏结局
        this.left_choice_text = dataPath.left1;
        this.right_choice_text = dataPath.right1;

        this.card.setTexture("player");

        this.eventCard(dataPath.eventCard1);
        
        this.textChange()
    }

    judgeChoice() {
        if(this.scene_turn == 1){
            
        }
        else if(this.scene_turn == 2){
            
        }
        else if(this.scene_turn == 3){
            
        }
        else if(this.scene_turn == 4){
            
        }
        else if(this.scene_turn == 5){
            
        }
        else if(this.scene_turn == 6){
            
        }
        this.scene_turn++;
    }

    card

    action() {

    }
}
