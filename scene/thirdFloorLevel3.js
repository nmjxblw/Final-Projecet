class thirdFloorLevel3 extends Base {
    constructor() {
        //打败巨龙后
        super("floor three level 3", "after defend dragon")
    }

    onEnter() {
        game.sound.stopAll();
        this.bgm.play();
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;

        this.card.label = false;
        this.card.setTexture("dragon_berserk");

        this.changeText(this.eventText, dataPath.eventText1);

        this.time.delayedCall(3000, () => {
            this.changeText(this.eventText, dataPath.eventText2);
        });

        this.time.delayedCall(6000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
        });

        this.time.delayedCall(9000, () => {
            this.changeText(this.eventText, dataPath.eventText4);
        });

        this.time.delayedCall(12000, () => {
            this.changeText(this.eventText, dataPath.eventText5);
        });

        this.time.delayedCall(15000, () => {
            this.changeText(this.eventText, dataPath.eventText6);
            this.card.dragable = true;
            this.card.label = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.action();
    }

    action() {
        this.shakeTween(this.cameras.main);
        this.card.label = false;
        this.rotateOutAndMakeNewCard("sword");
        if (saveData.player.sword >= 1) {
            this.cardSpotLight();
            this.changeText(this.eventText, dataPath.eventText4);
            this.time.delayedCall(3000, () => {
                this.gotoScene("floor three level 4");
                this.stopSpotLight = false;
            });
        }
        else {
            this.cardSpotLight(true);
            this.changeText(this.eventText, dataPath.eventText5);
            this.time.delayedCall(3000, () => {
                this.gotoScene("floor three level 5");
                this.stopSpotLight = false;
            });
        }

    }
}
