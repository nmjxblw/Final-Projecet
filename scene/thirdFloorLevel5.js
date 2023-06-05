class thirdFloorLevel5 extends Base {
    constructor() {
        //打败巨龙后
        //真结局
        super("floor three level 5", "True Ending")
    }

    onEnter() {
        //真结局
        this.left_choice_text = dataPath.left1;
        this.right_choice_text = dataPath.right1;

        this.card.setTexture("player");

        this.eventCard(dataPath.eventCard1);
        this.changeText(this.eventText, dataPath[`eventText${this.scene_turn}`]);

        this.dragrotate(this.card);

        this.input.keyboard.on("keyup", (event) => {
            if (event.key === "q") {
                console.log("26");
                this.scene_turn = 26;
            }
            if (event.key === "w") {
                console.log("34");
                this.scene_turn = 34;
            }
        });
    }

    judgeChoice() {
        this.scene_turn++;
        this.action();
    }

    action() {
        this.stopSpotLight = true;
        this.changeText(this.eventText, dataPath[`eventText${this.scene_turn}`]);
        var sowrd_turn = [4, 23, 24];
        var dragon_turn = [6, 7, 8, 9, 19, 20];
        var men_turn = [10, 11, 12, 13, 15, 16, 17, 18, 22]
        var guardian_turn = [25, 26, 27];
        var guardian_off_mask_turn = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
        if (sowrd_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("sword");
            if (this.scene_turn == 4) {
                this.stopSpotLight = false;
                this.cardSpotLight(true);
            }
        }
        else if (dragon_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("dragon_normal");
            if (this.scene_turn == 8) {
                this.card.label = false;
                this.tweens.add({
                    targets: this.card,
                    duration: 500,
                    alpha: 0,
                    yoyo: true,
                    repeat: false,
                    oncomplete: () => {
                        this.card.setTexture("sword");
                    }
                });
                this.time.delayedCall(2000, () => {
                    this.card.dragable = true;
                    this.card.label = true;
                });
            }
            if (this.scene_turn == 9) {
                this.stopSpotLight = false;
                this.cardSpotLight(true);
                this.cardTwinkling("men", 250, 0, 1, 6);
            }
            if (this.scene_turn == 20) {
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
        else if (men_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("men");
            if (this.scene_turn == 12) {
                this.card.label = false;
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: this.card,
                        duration: 2000,
                        alpha: 0,
                        repeat: false,
                        yoyo: true,
                        oncomplete: () => {
                            this.time.delayedCall(2000, () => {
                                this.card.setTexture("player");
                                this.card.label = true;
                                this.card.dragable = true;
                            });
                        },
                    });
                });

            }
        }
        else if (guardian_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("guardian_with_mask");
            if (this.scene_turn == 27) {
                this.card.label = false;
                this.time.delayedCall(2000, () => {
                    this.tweens.add({
                        targets: this.card,
                        duration: 2000,
                        alpha: 0,
                        repeat: false,
                        yoyo: true,
                        oncomplete: () => {
                            this.time.delayedCall(2000, () => {
                                this.card.setTexture("guardian_off_mask");
                            });
                        },
                    });
                });
                this.time.delayedCall(4000, () => {
                    this.card.label = true;
                    this.card.dragable = true;
                })
            }
        }
        else if (guardian_off_mask_turn.includes(this.scene_turn)) {
            this.rotateOutAndMakeNewCard("guardian_off_mask");
            if (this.scene_turn == 35) {
                this.card.label = false;
                this.tweens.chain({
                    targets: this.card,
                    tweens: [
                        {
                            alpha: 1,
                            duration: 2000,
                        },
                        {
                            alpha: 0,
                            duration: 500,
                        },
                        {
                            oncomplete: () => {
                                this.card.setTexture("sword");
                            }
                        },
                        {
                            alpha: 1,
                            duration: 500,
                        },
                        {
                            alpha: 1,
                            duration: 1000,
                        },
                        {
                            alpha: 0,
                            duration: 500,
                        },
                        {
                            oncomplete: () => {
                                this.card.setTexture("men");
                            }
                        },
                        {
                            alpha: 1,
                            duration: 1000,
                        },
                        {
                            oncomplete: () => {
                                this.card.dragable = true;
                                this.card.label = true;
                            }
                        }
                    ]
                });
            }

            else if (this.scene_turn == 40) {
                this.left_choice_text = dataPath.left2;
                this.right_choice_text = dataPath.right2;
            }
            else if (this.scene_turn == 41) {
                this.card.label = false;
                this.eventCard(dataPath.eventCard2, 5000);
                this.time.delayedCall(8000, () => {
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
            if (this.scene_turn == 21) {
                this.tweens.add({
                    targets: this.DAV,
                    alpha: 0,
                    duration: 500,
                });
                this.tweens.add({
                    targets: this.background1,
                    alpha: 1,
                    duration: 500,
                });
            }
        }
    }
}