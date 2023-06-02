class reborn extends Base {
    constructor() {
        super("floor four level 1", "rebron scene");
    }

    onEnter() {
        console.log("choice");
        console.log(currentPosition);
        saveData.player.sword++;
        saveData.player.hp = 5;
        this.input.enabled = false;
        if (saveData.player.sword == 1) {
            this.card.setTexture("player");
            this.label = false;
            this.left_choice_text = "I got it.";
            this.right_choice_text = "Ok...";
            //this.changeText("You will be reborn.");
            this.changeText(this.eventText, "After the great pain, with a burst of light, you find that the pain is gone.");
            this.time.delayedCall(5000, () => {
                this.changeText(this.eventText, "You don't know what's happening,\nwhen you find the sword in your hand is shining with a strange light");
                this.time.delayedCall(5000, () => {
                    this.cardReset("sword");
                    this.stopSpotLight = false;
                    this.cardSpotLight();
                    this.changeText(this.eventText, "This may be the mysterious power of the sword that the Guardian speaks of...");
                    this.eventCard("You are still alive?");
                    this.time.delayedCall(3000, () => {
                        this.card.dragable = true;
                        this.card.label = true;
                        this.input.enabled = true;
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