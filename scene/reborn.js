class reborn extends Base {
    constructor() {
        super("floor four level 1", "rebron scene");
    }

    onEnter() {
        saveData.player.sword++;
        saveData.player.hp = 5;
        if (saveData.player.sword == 1) {
            this.card.setTexture("player");
            this.label = false;
            this.left_choice_text = "I got it.";
            this.right_choice_text = "Ok...";
            //this.changeText("You will be reborn.");
            this.eventCard("After the great pain, with a burst of light, you find that the pain is gone.",1000);
            this.time.delayedCall(4000, () => {
                this.eventCard("You don't know what's happening,\nwhen you find the sword in your hand is shining with a strange light", 1000);
                this.time.delayedCall(4000, () => {
                    this.cardReset("sword");
                    this.stopSpotLight = false;
                    this.cardSpotLight();
                    this.changeText(this.eventText, "This may be the mysterious power of the sword that the Guardian speaks of...");
                    this.eventCard("You are still alive?");
                    this.time.delayedCall(3000, () => {
                        this.card.dragable = true;
                        this.card.label = true;
                    });
                });
            });

            this.dragrotate(this.card);

        }
        else {
            console.log(currentPosition);
            this.scene.start(currentPosition);
        }
    }

    judgeChoice() {
        this.rotateOutAndMakeNewCard("sword");
        this.gotoScene(currentPosition);
    }
}