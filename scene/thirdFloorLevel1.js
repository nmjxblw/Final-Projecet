class thirdFloorLevel1 extends Base {
    constructor() {
        //当前场景为第三层大门前
        super("floor three level 1", "at the door")
    }

    onEnter() {

        this.left_choice_text = dataPath["left"];
        this.right_choice_text = dataPath["right"];

        this.changeText(this.eventText, dataPath.eventText1);

        this.card.setTexture("gate");

        this.card.label = false;

        this.time.delayedCall(4000, () => {
            this.changeText(this.eventText, dataPath.eventText2);
        });

        this.time.delayedCall(8000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
            this.card.label = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.rotateOutAndMakeNewCard("gate");
        this.gotoScene("floor three level 2")
    }
}
