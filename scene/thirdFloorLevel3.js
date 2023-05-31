class thirdFloorLevel3 extends Base {
    constructor() {
        //打败巨龙后
        super("floor three level 3", "after defend dragon")
    }

    onEnter() {

        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;

        this.card.label = false;

        this.eventCard(dataPath.eventCard1);

        this.time.delayedCall(3000, () => {
            this.eventCard(dataPath.eventCard2);
        });

        this.time.delayedCall(6000, () => {
            this.eventCard(dataPath.eventCard3);
        });

        this.card.setTextrue(dataPath.enemy.name);

        this.time.delayedCall(9000, () => {
            this.changeText(this.eventText, dataPath.eventText1);
        });

        this.time.delayedCall(12000, () => {
            this.changeText(this.eventText, dataPath.eventText2);
        });

        this.time.delayedCall(15000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
            this.card.label = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.card.label = false;
        this.rotateOutAndMakeNewCard("sword");
        if (!saveData.player.sword) {
            this.changeText(this.eventText, dataPath.eventText4);
            this.time.delayedCall(3000, () => {
                this.gotoScene("floor three level 4");
            });
        }
        else {
            this.changeText(this.eventText, dataPath.eventText5);
            this.time.delayedCall(3000, () => {
                this.gotoScene("floor three level 5");
            });
        }

    }
}
