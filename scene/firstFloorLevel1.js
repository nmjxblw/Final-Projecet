class firstFloorLevel1 extends Base {
    constructor(){
        super("floor one level 1", "guardian")
    }

    onEnter(){
        this.label = false;
        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.card.setTexture("guardian_off_mask");      
        this.changeText(this.eventText, dataPath.eventText);
        this.time.delayedCall(3000, () => {
            this.changeText(this.eventText, dataPath.eventText1);
        });


        this.time.delayedCall(6000, () => {
            this.cardReset("sword");
            this.stopSpotLight = false;
            this.cardSpotLight();
            this.changeText(this.eventText, dataPath.eventText2);;
        });
    

        this.time.delayedCall(9000, () => {
            this.changeText(this.eventText, dataPath.eventText3);
            this.eventCard(dataPath.eventCard);
        });

        this.label = true;
        this.stopSpotLight = true;
        this.dragrotate(this.card);

    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("card1");
        this.gotoScene("floor one level 2");
    }
}