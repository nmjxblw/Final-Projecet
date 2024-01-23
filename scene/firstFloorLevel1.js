class firstFloorLevel1 extends Base {
    constructor(){
        super("floor one level 1", "intro")
    }

    onEnter(){

        //赋予初始值
        saveData.player.hp = 5;
        saveData.player.sword = 0;
        saveData.player.shield = false;
        saveData.player.Elf = false;
        writeSaveData();

        //console.log("floor three level 1");
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;

        this.changeText(this.eventText, dataPath.eventText[5]);
        this.card.setTexture("player");
        this.card.label = false;

        //设置背景图片
        this.backgroundImage = this.add.image(0, 0, "background2").setOrigin(0).setDepth(-1);

        this.time.delayedCall(4000, () => {
            this.cardReset("guardian_with_mask");        
            this.changeText(this.eventText, dataPath.eventText[6]);
        });

        this.time.delayedCall(8000, () => {
            this.changeText(this.eventText, dataPath.eventText[7]);
        });

        this.time.delayedCall(12000, () => {
            this.cardReset("sword");
            this.stopSpotLight = false;
            this.cardSpotLight(true);
            this.changeText(this.eventText, dataPath.eventText[8]);
        });

        this.time.delayedCall(16000, () => {
            this.changeText(this.eventText, dataPath.eventText[9]);
        });

        this.time.delayedCall(20000, () => {
            this.eventCard(dataPath.eventCard[0]);
            this.card.label = true;
            this.card.dragable = true;
        });

        this.dragrotate(this.card);
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("sword");
        this.gotoScene("floor one level 2");
    }
}