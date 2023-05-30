class thirdFloorLevel1 extends Base {
    constructor() {
        //当前场景为第三层大门前
        super("floor three level 1", "at the door")
    }

    onEnter() {

        console.log(this.scene_turn);

        this.left_choice_text = dataPath["left"];
        this.right_choice_text = dataPath["right"];

        this.createEventText(dataPath["eventText"]);

        //this.card.setTexture("door");

        this.card.label = false;

        this.time.delayedCall(500, () => {
            this.eventCard(dataPath["eventCard1"]);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath["eventCard2"]);
            this.card.label = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.rotateOutAndMakeNewCard("door");
        this.gotoScene("floor three level 2")
    }
}
