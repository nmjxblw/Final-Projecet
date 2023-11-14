class thirdFloorLevel1 extends Base {
    constructor() {
        //current scene name
        super("floor three level 1", "at the door")
    }

    onEnter() {

        this.left_choice_text = dataPath["left"];
        this.right_choice_text = dataPath["right"];

        const eventTextIterator = dataPath.eventText.entries();
        this.changeText(this.eventText, eventTextIterator.next().value);

        this.card.setTexture("gate");

        this.card.label = false;

        //magic number for the time
        const firstTimeTrigger = 4000;
        const secondTimeTrigger = 8000;

        this.time.delayedCall(firstTimeTrigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
        });

        this.time.delayedCall(secondTimeTrigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
            this.card.label = true;
            this.card.dragable = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.card.label = false;
        this.openDoor.play();
        this.rotateOutAndMakeNewCard("gate");
        this.gotoScene("floor three level 2")
    }
}
