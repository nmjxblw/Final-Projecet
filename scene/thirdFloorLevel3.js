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

        const eventTextIterator = dataPath.eventText[Symbol.iterator]();

        this.changeText(this.eventText, eventTextIterator.next().value);

        const first_time_trigger = 3000;
        const second_time_trigger = 6000;
        const third_time_trigger = 9000;
        const fourth_time_trigger = 12000;
        const fifth_time_trigger = 15000;

        this.time.delayedCall(first_time_trigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
        });

        this.time.delayedCall(second_time_trigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
        });

        this.time.delayedCall(third_time_trigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
        });

        this.time.delayedCall(fourth_time_trigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
        });

        this.time.delayedCall(fifth_time_trigger, () => {
            this.changeText(this.eventText, eventTextIterator.next().value);
            this.card.dragable = true;
            this.card.label = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.goToEnd();
    }

    gotToEnd() {
        this.shakeTween(this.cameras.main);
        this.card.label = false;
        this.rotateOutAndMakeNewCard("sword");
        const max_sword = 1;
        const three_seconds = 3000;
        const powerful_sword_event_text_index = 6;
        const weak_sword_event_text_index = 7;
        if (saveData.player.sword >= max_sword) {
            this.cardSpotLight();
            this.changeText(this.eventText, dataPath.eventText[powerful_sword_event_text_index]);
            this.time.delayedCall(three_seconds, () => {
                this.gotoScene("floor three level 4");
                this.stopSpotLight = false;
            });
        }
        else {
            this.cardSpotLight(true);
            this.changeText(this.eventText, dataPath.eventText[weak_sword_event_text_index]);
            this.time.delayedCall(three_seconds, () => {
                this.gotoScene("floor three level 5");
                this.stopSpotLight = false;
            });
        }

    }
}
