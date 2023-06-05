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
            if (this.scene_turn == 13) {
                this.backgroundImage.setDepth(-2);
                this.DAV = this.add.image(0, 0, "dragon_attacks_village").setOrigin(0).setDepth(-1).setAlpha(0);
                this.tweens.add({
                    targets: this.DAV,
                    duration: 500,
                    alpha: 1
                });
                this.tweens.add({
                    targets: this.background1,
                    duration: 500,
                    alpha: 0
                });
            }
        }
        else if (guardian_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("guardian_with_mask");
            if (this.scene_turn == 14) {
                this.tweens.add({
                    targets: this.background1,
                    alpha: 1,
                    duration: 500,
                });
            }
            if (this.scene_turn == 15) {
                this.tweens.add({
                    targets: this.DAV,
                    alpha: 0,
                    duration: 500,
                });
            }
            if (this.scene_turn == 16) {
                this.left_choice_text = dataPath.left2;
                this.right_choice_text = dataPath.right2;
            }
            else if (this.scene_turn == 17) {
                this.card.label = false
                this.eventCard(dataPath.eventCard2, 2000);
                this.time.delayedCall(5000, () => {
                    this.eventCard(dataPath.eventCard3);
                    this.cameras.main.fade(5000, 0, 0, 0);
                    this.time.delayedCall(5000, () => {
                        game.sound.stopAll();
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
