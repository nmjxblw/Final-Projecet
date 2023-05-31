class thirdFloorLevel4 extends Base {
    constructor() {
        //打败巨龙后
        //坏结局
        super("floor three level 4", "Bad Ending")
    }

    onEnter() {
        //坏结局
        this.left_choice_text = dataPath.left1;
        this.right_choice_text = dataPath.right1;

        this.card.setTexture("guardian_off_mask");

        this.eventCard(dataPath.eventCard1,5000);

        this.changeText(this.eventText, dataPath.eventText1);

        this.cardTwinkling("guardian_with_mask",1500,0,0.5);
    }

    judgeChoice() {
        if (this.scene_turn == 1) {

        }
        else if (this.scene_turn == 2) {

        }
        else if (this.scene_turn == 3) {

        }
        else if (this.scene_turn == 4) {

        }
        else if (this.scene_turn == 5) {

        }
        else if (this.scene_turn == 6) {

        }
        this.scene_turn++;
    }

    action() {

    }
}
