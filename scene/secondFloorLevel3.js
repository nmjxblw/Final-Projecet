class secondFloorLevel3 extends Base {
    constructor() {
        super("floor two level 3", "Open Treasure Chest")
    }

    onEnter() {

        currentPosition = "floor two level 3";

        this.bgm.play();

        this.card.setTexture("elf");
        this.left_choice_text = dataPath.left1
        this.right_choice_text = dataPath.right1

        this.normalDelayTime = 1000;
        this.slowDelayTime = 3000;
        this.slowerDelayTime = 5000;
        this.slowestDelayTime = 6000;



        this.card.label = false;
        this.changeText(this.eventText, dataPath.eventText1);

        this.time.delayedCall(this.slowDelayTime, () => {

            this.changeText(this.eventText, dataPath.eventText2);
        })

        this.time.delayedCall(this.slowestDelayTime, () => {
            this.changeText(this.eventText, dataPath.eventText3);
            this.card.label = true;
        })


        this.dragrotate(this.card);

        this.scene_turn = 1;

        this.determineFindChest = 1;
        this.determineChestLock1 = 2;
        this.determineChestLock2 = 3;
        this.determineChestOpen = 4;


    }

    //Determine player choice
    judgeChoice() {
        if (this.player_choice != "") {
            if (this.scene_turn == this.determineFindChest) {
                this.beforeHeadingToChest();
            }
            else if (this.scene_turn == this.determineChestLock1) {
                this.openTheChestLock1();
            }
            else if (this.scene_turn == this.determineChestLock2) {
                this.openTheChestLock2();
            }
            else if (this.scene_turn == this.determineChestOpen) {
                this.openedTheChest();
            }


        }
        this.scene_turn++;
    }

    beforeHeadingToChest() {
        if (this.player_choice == "left") {
            this.card.label = false;
            this.changeText(this.eventText, dataPath.eventText5);
            this.rotateOutAndMakeNewCard("chest");

            this.time.delayedCall(this.slowDelayTime, () => {
                this.card.label = true;
                this.card.dragable = true;
                this.changeText(this.eventText, dataPath.eventText6);
                this.time.delayedCall(this.normalDelayTime, () => { console.log(this.card) })

            })

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else {
            this.card.label = false;
            this.changeText(this.eventText, dataPath.eventText4);

            this.rotateOutAndMakeNewCard("gate");
            this.time.delayedCall(this.slowDelayTime, () => {
                this.gotoScene("floor three level 1");
            })
        }

    }
    openTheChestLock1() {
        if (this.player_choice == "left") {
            this.changeText(this.eventText, dataPath.eventText7);
            this.rotateOutAndMakeNewCard("chest");

            this.unlock.play();

            this.left_choice_text = dataPath.left2;
            this.right_choice_text = dataPath.right2;

        }
        else {
            console.log(saveData);
            this.changeText(this.eventText, dataPath.eventText8);
            this.card.label = false;

            this.rotateOutAndMakeNewCard("chest");
            this.time.delayedCall(this.slowDelayTime, () => {
                this.gotoScene("floor four level 1")
            })
        }

    }

    openTheChestLock2() {
        if (this.player_choice == "left") {
            this.changeText(this.eventText, dataPath.eventText9);
            this.card.label = false;

            saveData.player.shield = true;

            this.unlock.play();

            this.time.delayedCall(this.slowDelayTime, () => {

                this.chestCreak.play();
            })

            this.time.delayedCall(this.slowerDelayTime, () => {
                this.card.label = true;
                this.card.dragable = true;
                this.changeText(this.eventText, dataPath.eventText10);
                this.cardReset("shield");
            })

            this.rotateOutAndMakeNewCard("chest");

            this.left_choice_text = dataPath.left3;
            this.right_choice_text = dataPath.right3;
        }
        else {
            this.changeText(this.eventText, dataPath.eventText8);
            this.card.label = false;

            this.rotateOutAndMakeNewCard("gate");
            this.time.delayedCall(this.slowDelayTime, () => {
                this.gotoScene("floor four level 1")
            })
        }
    }

    openedTheChest() {
        this.card.label = false;
        this.rotateOutAndMakeNewCard("gate");
        this.gotoScene("floor three level 1");
    }


}