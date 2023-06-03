class firstFloorLevel1 extends Base {
    constructor(){
        super("floor one level 1", "intro")
    }

    onEnter(){
        //bgm.play();

        console.log("floor three level 1");
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;

        this.changeText(this.eventText, dataPath.eventText1);
        this.card.setTexture("dragon_normal");
        this.card.label = false;
        this.card.dragable = false;
        this.time.delayedCall(4000, () => {
            this.changeText(this.eventText, dataPath.eventText2);
        });

        this.time.delayedCall(8000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
        });

        this.time.delayedCall(12000, () => {
            this.changeText(this.eventText, dataPath.eventText4);
            this.cardReset("player");
        });

        this.time.delayedCall(16000, () => {
            this.changeText(this.eventText, dataPath.eventText5);
        });

        this.time.delayedCall(20000, () => {
            this.changeText(this.eventText, dataPath.eventText6);
        });

        this.time.delayedCall(24000, () => {
            this.cardReset("guardian_with_mask");        
            this.changeText(this.eventText, dataPath.eventText7);
        });

        this.time.delayedCall(28000, () => {
            this.changeText(this.eventText, dataPath.eventText8);
        });

        this.time.delayedCall(32000, () => {
            this.cardReset("sword");
            this.stopSpotLight = false;
            this.cardSpotLight();
            this.changeText(this.eventText, dataPath.eventText9);;
        });
    
        this.time.delayedCall(36000, () => {
            this.changeText(this.eventText, dataPath.eventText10);
        });

        this.time.delayedCall(40000, () => {
            this.eventCard(dataPath.eventCard);
            this.card.label = true;
            this.card.dragable = true;
            this.label = true;
            this.stopSpotLight = true;
        });
        this.dragrotate(this.card);
    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("sword");
        this.gotoScene("floor one level 2");
    }
}