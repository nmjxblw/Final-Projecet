class thirdFloorLevel5 extends Base {
    constructor() {
        //打败巨龙后
        //真结局
        super("floor three level 5", "True Ending")
    }

    onEnter() {
        //真结局
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;

        this.card.setTexture("sword");

        this.cardSpotLight(true);

        this.eventCard(dataPath.eventCard1);
        this.changeText(this.eventText, dataPath[`eventText${this.scene_turn}`]);

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.scene_turn++;
        this.action();
    }

    action() {
        this.stopSpotLight = true;
        this.changeText(this.eventText, dataPath[`eventText${this.scene_turn}`]);
        var sowrd_turn = [3, 10, 11];
        var dragon_turn = [6, 7, 8, 9, 12, 13];
        var guardian_turn = [14, 15, 16, 17];
    }
}
