class firstFloorLevel1 extends Base {
    constructor(){
        super("floor one level 1", "guardian")
    }

    onEnter(){

        this.left_choice_text = dataPath.left;
        this.right_choice_text = dataPath.right;
        this.card.setTexture("guardian_off_mask");      
        this.changeText(this.eventText, dataPath.eventText);
        
        this.time.delayedCall(500, () => {
            this.eventCard(dataPath.eventCard1);
        });

        this.time.delayedCall(3500, () => {
            this.eventCard(dataPath.eventCard2);
        });
    

        this.time.delayedCall(6500, () => {
            this.eventCard(dataPath.eventCard3, 1000);
        });
    
    
        this.dragrotate(this.card);

    }

    judgeChoice(){
        this.rotateOutAndMakeNewCard("guardian_with_mask");
        this.gotoScene("floor one level 2");
    }
}