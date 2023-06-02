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

        this.card.setTexture("player");

        this.eventCard(dataPath.eventCard1);

        this.changeText(this.eventText, dataPath.eventText1);

        this.dragrotate(this.card);
    }

    judgeChoice() {
        this.scene_turn++;
        this.action()
    }

    action() {
        var sowrd_turn = [3, 10, 11];
        var dragon_turn = [6, 7, 8, 9, 12, 13];
        var guardian_turn = [14, 15, 16, 17];

        this.stopSpotLight = true;
        this.changeText(this.eventText, dataPath[`eventText${this.scene_turn}`]);
        if (sowrd_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("sword");
            if (this.scene_turn == 3) {
                this.tweens.add({
                    targets: this.card,
                    alpha: 0,
                    yoyo: true,
                    repeat: 3,
                    duration: 500,
                    pause: true,
                });
            }
            else if (this.scene_turn == 10 || this.scene_turn == 11) {
                this.stopSpotLight = false;
                this.cardSpotLight();
            }
        }
        else if (dragon_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("dragon_normal");
        }
        else if (guardian_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("guardian_with_mask");
            if (this.scene_turn == 16) {
                this.left_choice_text = dataPath.left2;
                this.right_choice_text = dataPath.right2;
            }
            else if (this.scene_turn == 17) {
                this.card.label = false
                this.eventCard(dataPath.eventCard2, 5000);
                this.time.delayedCall(5000, () => {
                    this.eventCard(dataPath.eventCard3);
                    this.cameras.main.fade(5000, 0, 0, 0);
                    this.time.delayedCall(5000, () => {
                        this.scene.start("credit");
                    });
                });
            }
        }
        else {
            this.rotateOutAndMakeNewCard("player");
        }
    }
}
